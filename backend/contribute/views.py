import base64
import json
import logging
from datetime import datetime, timedelta, timezone as dt_timezone

from django.http import JsonResponse
from django.utils import timezone
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

from .models import (
    Applicant,
    ApplicantCityPrefs,
    Contribution,
    DashboardSnapshot,
    PaymentClaim,
    resolve_pay_amount,
)
from .telegram import notify_available_slots, relay_extension_alert
from .city_rotate import (
    build_rotate_plan,
    _normalize_cities,
    decode_plan_request,
    encode_plan_wire,
    encode_cities_wire,
    encode_payment_wire,
)
from .hardening import (
    extract_device_id,
    extract_unlock_token,
    mint_unlock_token,
    rate_limit_allow,
    register_or_check_device,
    verify_unlock_token,
)

logger = logging.getLogger(__name__)


def _rate_limited():
    return JsonResponse({"k": 0, "e": "rate limited — try again shortly"}, status=429)


def _ua(request) -> str:
    return (request.META.get("HTTP_USER_AGENT") or "")[:255]


def _payment_wire_for(applicant: Applicant, request=None, body: dict | None = None) -> dict:
    pricing = resolve_pay_amount(applicant)
    pending = bool((applicant.pending_utr or "").strip()) and not applicant.is_paid
    qr = pricing["qr_url"] or ""
    if qr.startswith("/") and request is not None:
        qr = request.build_absolute_uri(qr)

    device_id = extract_device_id(body)
    device = register_or_check_device(applicant, device_id, _ua(request) if request else "")
    unlock_token = ""
    unlock_exp = 0
    # Only mint when paid AND this device is allowed.
    if applicant.is_paid and device["device_ok"]:
        unlock_token, unlock_exp = mint_unlock_token(
            applicant_id=applicant.applicant_id or str(applicant.pk),
            device_id=device_id,
            paid=True,
        )

    msg = device.get("message") or ""
    return encode_payment_wire(
        success=True,
        paid=applicant.is_paid,
        amount=pricing["pay_amount"],
        list_amount=pricing["list_amount"],
        offer_label=pricing["offer_label"],
        offer_active=pricing["offer_active"],
        upi_id=pricing["upi_id"],
        qr_url=qr,
        instructions=pricing["instructions"],
        pending=pending,
        pending_utr=applicant.pending_utr if pending else "",
        applicant_id=applicant.applicant_id or "",
        start_date=getattr(applicant, "start_date", None),
        end_date=getattr(applicant, "end_date", None),
        unlock_token=unlock_token,
        unlock_exp_ms=unlock_exp,
        device_ok=device["device_ok"],
        device_message=msg,
    )


def _parse_json_body(request):
    try:
        body = json.loads(request.body)
    except (json.JSONDecodeError, UnicodeDecodeError) as exc:
        logger.warning("Bad JSON from extension: %s", exc)
        return None, JsonResponse({"success": False, "error": "invalid json"}, status=400)
    if not isinstance(body, dict):
        return None, JsonResponse({"success": False, "error": "expected object"}, status=400)
    return body, None


def _ms_to_dt(ms: int | None):
    if not ms:
        return None
    try:
        return datetime.fromtimestamp(int(ms) / 1000.0, tz=dt_timezone.utc)
    except (TypeError, ValueError, OSError):
        return None


def _dt_to_ms(dt) -> int | None:
    if not dt:
        return None
    return int(dt.timestamp() * 1000)


def _upsert_applicant(profile: dict, token: str | None) -> Applicant | None:
    """
    Find or create an Applicant.
    Username and applicant_id are the same value — any text / number / combined.
    Match existing rows by email, portal number, or username so we do not create duplicates.
    """
    if not profile:
        return None

    from .dedupe import extract_portal_number

    # Canonical identity: username === applicant_id (any format)
    applicant_id = str(
        profile.get("username")
        or profile.get("id")
        or profile.get("name")
        or profile.get("n")
        or ""
    ).strip()
    name = str(profile.get("name") or profile.get("n") or "").strip() or applicant_id
    email = str(profile.get("email", "")).strip()
    portal_num = str(profile.get("portalId") or profile.get("portal_id") or "").strip()
    if not portal_num:
        portal_num = extract_portal_number(applicant_id, name)

    if not applicant_id and not email:
        return None

    applicant = None
    # Prefer stable email match first (avoids duplicate cards in admin)
    if email:
        applicant = (
            Applicant.objects.filter(email__iexact=email).order_by("-updated_at").first()
        )
    if applicant is None and applicant_id:
        applicant = (
            Applicant.objects.filter(applicant_id__iexact=applicant_id)
            .order_by("-updated_at")
            .first()
        )
    if applicant is None and portal_num:
        # Match "12345" or "Name (12345)" already stored
        applicant = (
            Applicant.objects.filter(applicant_id=portal_num)
            .order_by("-updated_at")
            .first()
        )
        if applicant is None:
            applicant = (
                Applicant.objects.filter(applicant_id__endswith=f"({portal_num})")
                .order_by("-updated_at")
                .first()
            )
    if applicant is None and name and name != applicant_id:
        applicant = (
            Applicant.objects.filter(name__iexact=name).order_by("-updated_at").first()
        )
    if applicant is None:
        lookup = {}
        if applicant_id:
            lookup["applicant_id"] = applicant_id
        elif email:
            lookup["email"] = email
        applicant, _ = Applicant.objects.get_or_create(**lookup)

    if name:
        applicant.name = name
    if email:
        applicant.email = email
    if applicant_id:
        applicant.applicant_id = applicant_id
    applicant.visa_class = str(profile.get("visa", "")).strip() or applicant.visa_class

    if token:
        applicant.id_token = token
        applicant.token_captured_at = timezone.now()

    applicant.save()
    return applicant


def _count_contributions_24h(applicant: Applicant | None) -> int:
    """Return the number of contributions from this applicant in the last 24 hours."""
    if not applicant:
        return 0
    since = timezone.now() - timedelta(hours=24)
    return Contribution.objects.filter(applicant=applicant, created_at__gte=since).count()


@csrf_exempt
@require_http_methods(["POST", "OPTIONS"])
def contribute(request):
    """
    Single endpoint for both payload types the extension sends:

    1. Contribution  — { profile, posts: [...], token? }
       Sent after every slot check. The extension reads:
         response.success  → bool
         response.contribs → int (shown in the popup badge)

    2. Dashboard sync — { profile, dashboard: {...}, token }
       Sent when the dashboard page loads. The extension reads:
         response.success  → bool
    """
    # OPTIONS is handled by CorsMiddleware before reaching here,
    # but handle it defensively just in case.
    if request.method == "OPTIONS":
        return JsonResponse({}, status=204)

    # Parse body.
    try:
        body = json.loads(request.body)
    except (json.JSONDecodeError, UnicodeDecodeError) as exc:
        logger.warning("Bad JSON from extension: %s", exc)
        return JsonResponse({"success": False, "error": "invalid json"}, status=400)

    if not isinstance(body, dict):
        return JsonResponse({"success": False, "error": "expected object"}, status=400)

    profile = body.get("profile") or {}
    token = body.get("token") or None

    applicant = _upsert_applicant(profile, token)

    # ── Dashboard sync ────────────────────────────────────────────────────────
    if "dashboard" in body:
        dashboard_data = body["dashboard"]
        if isinstance(dashboard_data, dict) and dashboard_data:
            DashboardSnapshot.objects.create(
                applicant=applicant,
                data=dashboard_data,
            )
        return JsonResponse({"success": True, "contribs": _count_contributions_24h(applicant)})

    # ── Slot contribution ─────────────────────────────────────────────────────
    posts = body.get("posts") or []
    if not isinstance(posts, list):
        posts = []

    created = 0
    for post in posts:
        if not isinstance(post, dict):
            continue
        post_id = str(post.get("ID", "")).strip()
        if not post_id:
            continue
        Contribution.objects.create(
            applicant=applicant,
            post_id=post_id,
            post_name=str(post.get("Name", "")).strip(),
            days=post.get("Days") or [],
            has_error=bool(post.get("HasError")),
            error_string=str(post.get("ErrorString", "")).strip(),
            times=post.get("Times") or [],
            raw=post,
        )
        created += 1
        # Alert Telegram groups only when real dates are present.
        try:
            visa = (applicant.visa_class if applicant else "") or str(
                (profile or {}).get("visa") or ""
            )
            notify_available_slots(post, visa_class=visa)
        except Exception:
            logger.exception("Telegram notify failed")

    contribs = _count_contributions_24h(applicant)

    if created:
        logger.info(
            "Saved %d contribution(s) from %s | 24h total: %d",
            created,
            applicant or "anonymous",
            contribs,
        )

    return JsonResponse({"success": True, "contribs": contribs})


@csrf_exempt
@require_http_methods(["POST", "OPTIONS"])
def telegram_relay(request):
    """
    Extension → server → user's Telegram bot (@visabook_slots_bot).

    Body: {
      text?, caption?, kind?, dedup_key?, skip_dedup?, notify_muktesh?,
      image_base64?  (jpeg, no data: prefix)
    }
    """
    if request.method == "OPTIONS":
        return JsonResponse({}, status=204)

    try:
        body = json.loads(request.body)
    except (json.JSONDecodeError, UnicodeDecodeError):
        return JsonResponse({"success": False, "error": "invalid json"}, status=400)

    if not isinstance(body, dict):
        return JsonResponse({"success": False, "error": "expected object"}, status=400)

    photo_bytes = None
    raw_b64 = body.get("image_base64")
    if isinstance(raw_b64, str) and raw_b64.strip():
        try:
            photo_bytes = base64.b64decode(raw_b64, validate=True)
        except ValueError:
            return JsonResponse({"success": False, "error": "bad image_base64"}, status=400)

    sent = relay_extension_alert(
        text=str(body.get("text") or ""),
        caption=str(body.get("caption") or ""),
        kind=str(body.get("kind") or "alert"),
        dedup_key=str(body.get("dedup_key") or ""),
        skip_dedup=bool(body.get("skip_dedup")),
        notify_muktesh=body.get("notify_muktesh", True) is not False,
        photo_bytes=photo_bytes,
    )
    return JsonResponse({"success": sent > 0, "sent": sent})


@csrf_exempt
@require_http_methods(["POST", "OPTIONS"])
def save_city_prefs(request):
    """
    Store preferred cities for an applicant.
    Accepts opaque body (p/l/y) or legacy profile/cities/enabled.
    Response uses opaque keys (k/l/y/i).
    """
    if request.method == "OPTIONS":
        return JsonResponse({}, status=204)
    if not rate_limit_allow(request, "cities"):
        return _rate_limited()

    body, err = _parse_json_body(request)
    if err:
        return err

    parsed = decode_plan_request(body)
    profile = parsed["profile"] or body.get("profile") or {}
    applicant = _upsert_applicant(profile, parsed.get("token") or body.get("token") or None)
    if not applicant:
        return JsonResponse(encode_cities_wire(success=False, cities=[], enabled=False, applicant_id=""), status=400)

    device_id = extract_device_id(body)
    device = register_or_check_device(applicant, device_id, _ua(request))
    unlock_token = ""
    unlock_exp = 0
    if applicant.is_paid and device["device_ok"]:
        unlock_token, unlock_exp = mint_unlock_token(
            applicant_id=applicant.applicant_id or str(applicant.pk),
            device_id=device_id,
            paid=True,
        )

    cities_src = parsed["cities"] if parsed["cities"] is not None else body.get("cities") or []
    cities = _normalize_cities(cities_src)
    enabled = parsed.get("enabled")
    if enabled is None:
        enabled = body.get("enabled")
    prefs, _ = ApplicantCityPrefs.objects.get_or_create(applicant=applicant)
    prefs.cities = cities
    if isinstance(enabled, bool) or enabled in (0, 1, "0", "1"):
        want_on = bool(int(enabled)) if not isinstance(enabled, bool) else enabled
        # City Change only when paid AND this device is allowed.
        prefs.enabled = want_on and applicant.is_paid and device["device_ok"]
    prefs.save()

    return JsonResponse(
        encode_cities_wire(
            success=True,
            cities=prefs.cities,
            enabled=prefs.enabled,
            applicant_id=applicant.applicant_id or "",
        )
        | {
            "w": 1 if (applicant.is_paid and device["device_ok"]) else 0,
            "m": f"{resolve_pay_amount(applicant)['pay_amount']:.2f}",
            "j": unlock_token,
            "x": unlock_exp,
            "c": 1 if device["device_ok"] else 0,
            "e": device.get("message") or "",
        }
    )


@csrf_exempt
@require_http_methods(["POST", "OPTIONS"])
def payment_status(request):
    """
    Tik Tik unlock + pay UI. Paid + registered device → signed unlock token.
    """
    if request.method == "OPTIONS":
        return JsonResponse({}, status=204)
    if not rate_limit_allow(request, "pay"):
        return _rate_limited()

    body, err = _parse_json_body(request)
    if err:
        return err

    parsed = decode_plan_request(body)
    profile = parsed["profile"] or body.get("profile") or {}
    applicant = _upsert_applicant(profile, parsed.get("token") or body.get("token") or None)
    if not applicant:
        return JsonResponse(
            encode_payment_wire(success=False, paid=False, amount="0.00", applicant_id=""),
            status=400,
        )

    return JsonResponse(_payment_wire_for(applicant, request, body))


@csrf_exempt
@require_http_methods(["POST", "OPTIONS"])
def submit_payment_utr(request):
    """
    User paid via UPI/QR and submits UTR from Tik Tik → pending claim in admin panel.
    """
    if request.method == "OPTIONS":
        return JsonResponse({}, status=204)
    if not rate_limit_allow(request, "utr"):
        return _rate_limited()

    body, err = _parse_json_body(request)
    if err:
        return err

    parsed = decode_plan_request(body)
    profile = parsed["profile"] or body.get("profile") or {}
    applicant = _upsert_applicant(profile, parsed.get("token") or body.get("token") or None)
    if not applicant:
        return JsonResponse(
            encode_payment_wire(success=False, paid=False, amount="0.00", applicant_id=""),
            status=400,
        )

    if applicant.is_paid:
        return JsonResponse(_payment_wire_for(applicant, request, body))

    utr = str(body.get("r") or body.get("utr") or body.get("payment_ref") or "").strip()
    # Normalize common UTR formatting
    utr = " ".join(utr.split())
    if len(utr) < 6:
        wire = _payment_wire_for(applicant, request, body)
        wire["k"] = 0
        wire["e"] = "Enter a valid UTR / UPI reference (at least 6 characters)."
        return JsonResponse(wire, status=400)

    pricing = resolve_pay_amount(applicant)
    payer = str(body.get("g") or body.get("payer") or profile.get("name") or "").strip()

    # Avoid duplicate pending claims with same UTR for same applicant.
    existing = (
        PaymentClaim.objects.filter(
            target_applicant_id=applicant.applicant_id or applicant.pk,
            payment_ref__iexact=utr,
            status=PaymentClaim.STATUS_PENDING,
        )
        .order_by("-created_at")
        .first()
    )
    if not existing:
        PaymentClaim.objects.create(
            applicant=applicant,
            target_applicant_id=applicant.applicant_id or str(applicant.pk),
            payer_name=payer,
            payment_ref=utr,
            amount=pricing["pay_amount"],
            note="Submitted from Tik Tik",
            status=PaymentClaim.STATUS_PENDING,
            source="extension",
        )

    applicant.pending_utr = utr
    applicant.pending_utr_at = timezone.now()
    if pricing["pay_amount"] and (not applicant.fee_amount or applicant.fee_amount <= 0):
        applicant.fee_amount = pricing["list_amount"]
    applicant.save(
        update_fields=["pending_utr", "pending_utr_at", "fee_amount", "updated_at"]
    )

    wire = _payment_wire_for(applicant, request, body)
    wire["e"] = "UTR submitted — waiting for admin to accept."
    return JsonResponse(wire)


@csrf_exempt
@require_http_methods(["POST", "OPTIONS"])
def city_rotate_plan(request):
    """
    Next city + switch time. Requires paid applicant + allowed device + unlock token.
    """
    if request.method == "OPTIONS":
        return JsonResponse({}, status=204)
    if not rate_limit_allow(request, "plan"):
        return _rate_limited()

    body, err = _parse_json_body(request)
    if err:
        return err

    parsed = decode_plan_request(body)
    profile = parsed["profile"] or {}
    applicant = _upsert_applicant(profile, parsed.get("token") or None)
    if not applicant:
        return JsonResponse(encode_plan_wire({"success": False, "switchAt": 0, "waitMs": 2000}), status=400)

    device_id = extract_device_id(body)
    device = register_or_check_device(applicant, device_id, _ua(request))
    aid = applicant.applicant_id or str(applicant.pk)
    token = extract_unlock_token(body)
    token_ok = verify_unlock_token(token, applicant_id=aid, device_id=device_id)

    prefs, _ = ApplicantCityPrefs.objects.get_or_create(applicant=applicant)

    if parsed["cities"]:
        prefs.cities = _normalize_cities(parsed["cities"])
    if parsed.get("enabled") is not None:
        en = parsed["enabled"]
        want_on = bool(int(en)) if not isinstance(en, bool) else en
        prefs.enabled = want_on and applicant.is_paid and device["device_ok"]

    locked = (
        (not applicant.is_paid)
        or (not device["device_ok"])
        or (applicant.is_paid and device["device_ok"] and not token_ok)
    )
    if locked:
        prefs.enabled = False
        prefs.save()
        # Refresh token for valid devices so client can retry quickly.
        fresh_j, fresh_x = ("", 0)
        if applicant.is_paid and device["device_ok"]:
            fresh_j, fresh_x = mint_unlock_token(
                applicant_id=aid, device_id=device_id, paid=True
            )
        wire = encode_plan_wire(
            {
                "success": False,
                "inWindow": False,
                "slot": 0,
                "switchAt": int(timezone.now().timestamp() * 1000) + 8000,
                "waitMs": 8000,
                "cityId": None,
                "gapMs": None,
                "enabled": False,
                "citiesCount": len(prefs.cities or []),
            }
        )
        wire["w"] = 0
        wire["m"] = f"{resolve_pay_amount(applicant)['pay_amount']:.2f}"
        wire["j"] = fresh_j
        wire["x"] = fresh_x
        wire["c"] = 1 if device["device_ok"] else 0
        if not applicant.is_paid:
            wire["e"] = "payment required"
        elif not device["device_ok"]:
            wire["e"] = device.get("message") or "device blocked"
        else:
            wire["e"] = "unlock token expired — refresh"
        return JsonResponse(wire)

    if parsed["acknowledgeSwitch"]:
        switched = parsed["switchedCityId"] or parsed["currentCityId"]
        if switched:
            prefs.last_post_id = switched
        prefs.last_switch_at = timezone.now()
        prefs.save(update_fields=["last_post_id", "last_switch_at", "cities", "enabled", "updated_at"])
    else:
        prefs.save()

    current_id = parsed["currentCityId"] or prefs.last_post_id
    plan = build_rotate_plan(
        cities=prefs.cities or [],
        current_city_id=current_id,
        last_switch_at_ms=_dt_to_ms(prefs.last_switch_at),
        min_gap_ms=prefs.rotate_min_gap_ms,
        max_gap_ms=prefs.rotate_max_gap_ms,
    )
    plan["enabled"] = prefs.enabled
    plan["citiesCount"] = len(prefs.cities or [])
    wire = encode_plan_wire(plan)
    fresh_j, fresh_x = mint_unlock_token(
        applicant_id=aid, device_id=device_id, paid=True
    )
    wire["w"] = 1
    wire["m"] = f"{resolve_pay_amount(applicant)['pay_amount']:.2f}"
    wire["j"] = fresh_j
    wire["x"] = fresh_x
    wire["c"] = 1
    return JsonResponse(wire)
