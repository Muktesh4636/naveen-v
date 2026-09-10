import base64
import json
import logging
from datetime import datetime, timedelta, timezone as dt_timezone

from django.http import JsonResponse
from django.utils import timezone
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

from .models import Applicant, ApplicantCityPrefs, Contribution, DashboardSnapshot
from .telegram import notify_available_slots, relay_extension_alert
from .city_rotate import (
    build_rotate_plan,
    _normalize_cities,
    decode_plan_request,
    encode_plan_wire,
    encode_cities_wire,
    encode_payment_wire,
)

logger = logging.getLogger(__name__)


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
    Find or create an Applicant row from the profile dict sent by the extension.
    Prefer applicant_id as the lookup key; fall back to email.
    Returns None if the profile is empty or has no usable key.
    """
    if not profile:
        return None

    applicant_id = str(profile.get("id", "")).strip()
    email = str(profile.get("email", "")).strip()

    lookup = {}
    if applicant_id:
        lookup["applicant_id"] = applicant_id
    elif email:
        lookup["email"] = email
    else:
        return None

    applicant, _ = Applicant.objects.get_or_create(**lookup)

    # Always update mutable fields so we have the freshest data.
    applicant.name = str(profile.get("name", "")).strip() or applicant.name
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

    body, err = _parse_json_body(request)
    if err:
        return err

    parsed = decode_plan_request(body)
    profile = parsed["profile"] or body.get("profile") or {}
    applicant = _upsert_applicant(profile, parsed.get("token") or body.get("token") or None)
    if not applicant:
        return JsonResponse(encode_cities_wire(success=False, cities=[], enabled=False, applicant_id=""), status=400)

    cities_src = parsed["cities"] if parsed["cities"] is not None else body.get("cities") or []
    cities = _normalize_cities(cities_src)
    enabled = parsed.get("enabled")
    if enabled is None:
        enabled = body.get("enabled")
    prefs, _ = ApplicantCityPrefs.objects.get_or_create(applicant=applicant)
    prefs.cities = cities
    if isinstance(enabled, bool) or enabled in (0, 1, "0", "1"):
        want_on = bool(int(enabled)) if not isinstance(enabled, bool) else enabled
        # City Change / Tik Tik only when admin accepted payment (payment_id set).
        prefs.enabled = want_on and applicant.is_paid
    prefs.save()

    return JsonResponse(
        encode_cities_wire(
            success=True,
            cities=prefs.cities,
            enabled=prefs.enabled,
            applicant_id=applicant.applicant_id or "",
        )
        | {"w": 1 if applicant.is_paid else 0, "m": f"{applicant.fee_amount:.2f}"}
    )


@csrf_exempt
@require_http_methods(["POST", "OPTIONS"])
def payment_status(request):
    """
    Tik Tik unlock check. Admin sets amount + payment_id in panel;
    payment_id present => paid/unlocked for this applicant on any device.
    """
    if request.method == "OPTIONS":
        return JsonResponse({}, status=204)

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

    return JsonResponse(
        encode_payment_wire(
            success=True,
            paid=applicant.is_paid,
            amount=applicant.fee_amount,
            applicant_id=applicant.applicant_id or "",
        )
    )


@csrf_exempt
@require_http_methods(["POST", "OPTIONS"])
def city_rotate_plan(request):
    """
    Next city + switch time. Wire format uses opaque keys only (see encode_plan_wire).
    """
    if request.method == "OPTIONS":
        return JsonResponse({}, status=204)

    body, err = _parse_json_body(request)
    if err:
        return err

    parsed = decode_plan_request(body)
    profile = parsed["profile"] or {}
    applicant = _upsert_applicant(profile, parsed.get("token") or None)
    if not applicant:
        return JsonResponse(encode_plan_wire({"success": False, "switchAt": 0, "waitMs": 2000}), status=400)

    prefs, _ = ApplicantCityPrefs.objects.get_or_create(applicant=applicant)

    if parsed["cities"]:
        prefs.cities = _normalize_cities(parsed["cities"])
    if parsed.get("enabled") is not None:
        en = parsed["enabled"]
        want_on = bool(int(en)) if not isinstance(en, bool) else en
        prefs.enabled = want_on and applicant.is_paid

    if not applicant.is_paid:
        prefs.enabled = False
        prefs.save()
        wire = encode_plan_wire(
            {
                "success": False,
                "inWindow": False,
                "slot": 0,
                "switchAt": int(timezone.now().timestamp() * 1000) + 15000,
                "waitMs": 15000,
                "cityId": None,
                "gapMs": None,
                "enabled": False,
                "citiesCount": len(prefs.cities or []),
            }
        )
        wire["w"] = 0
        wire["m"] = f"{applicant.fee_amount:.2f}"
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
    wire["w"] = 1
    wire["m"] = f"{applicant.fee_amount:.2f}"
    return JsonResponse(wire)
