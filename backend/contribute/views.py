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
    ApplicantAutoSubmitPrefs,
    ApplicantCityPrefs,
    ApplicantDevice,
    AutoSubmitSettings,
    BookedSlot,
    BookingEvent,
    Contribution,
    DashboardSnapshot,
    PaymentClaim,
    normalize_phone,
    resolve_pay_amount,
)
from .telegram import notify_available_slots, relay_extension_alert
from .hot_city import note_contribution_city
from .city_rotate import (
    build_rotate_plan,
    _normalize_cities,
    decode_plan_request,
    encode_plan_wire,
    encode_cities_wire,
    encode_auto_submit_wire,
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


def _extract_phone(body: dict | None, profile: dict | None = None) -> str:
    body = body or {}
    profile = profile or {}
    return normalize_phone(
        body.get("t")
        or body.get("phone")
        or profile.get("phone")
        or profile.get("mobile")
        or ""
    )


def _ack_client_wipe(applicant: Applicant) -> None:
    """Clear wipe flag after extension acknowledges (local wipe done / starting)."""
    if not getattr(applicant, "wipe_client", False):
        return
    applicant.wipe_client = False
    applicant.wipe_acked_at = timezone.now()
    applicant.save(update_fields=["wipe_client", "wipe_acked_at", "updated_at"])
    ApplicantDevice.objects.filter(applicant=applicant).update(revoked=True)
    try:
        prefs = ApplicantCityPrefs.objects.filter(applicant=applicant).first()
        if prefs and prefs.enabled:
            prefs.enabled = False
            prefs.save(update_fields=["enabled", "updated_at"])
    except Exception:
        pass
    try:
        asub = ApplicantAutoSubmitPrefs.objects.filter(applicant=applicant).first()
        if asub and asub.enabled:
            asub.enabled = False
            asub.save(update_fields=["enabled", "updated_at"])
    except Exception:
        pass


def _parse_iso_date(raw):
    s = str(raw or "").strip()[:10]
    if not s or len(s) < 10:
        return None
    try:
        return datetime.strptime(s, "%Y-%m-%d").date()
    except ValueError:
        return None


def _clamp_tries(raw, default=3):
    try:
        n = int(raw)
    except (TypeError, ValueError):
        return default
    return max(1, min(5, n))


def _payment_wire_for(applicant: Applicant, request=None, body: dict | None = None) -> dict:
    body = body or {}
    parsed = decode_plan_request(body) if body else {"profile": {}}
    parsed_profile = parsed.get("profile") or body.get("profile") or {}
    if not isinstance(parsed_profile, dict):
        parsed_profile = {}

    # Extension ACK after receiving wipe — clear flag so reinstall isn't looped.
    if body.get("wa") in (1, "1", True) or body.get("wipe_ack") in (1, "1", True):
        _ack_client_wipe(applicant)
        applicant.refresh_from_db()

    wipe = bool(getattr(applicant, "wipe_client", False))

    phone = _extract_phone(body, parsed_profile)
    if not phone:
        phone = normalize_phone(getattr(applicant, "phone", "") or "")

    # Unpaid users must enter phone before we reveal offer / QR / UPI.
    # Do not overwrite phone after payment is accepted — that phone owns the applicant.
    if phone and not applicant.is_paid and (getattr(applicant, "phone", "") or "") != phone:
        applicant.phone = phone
        applicant.save(update_fields=["phone", "updated_at"])
    elif not phone:
        phone = normalize_phone(getattr(applicant, "phone", "") or "")

    device_id = extract_device_id(body)
    device = register_or_check_device(applicant, device_id, _ua(request) if request else "")
    unlock_token = ""
    unlock_exp = 0
    device_ok = bool(device["device_ok"]) and not wipe
    msg = device.get("message") or ""
    if wipe:
        msg = "client wipe"

    # Only mint when paid AND this device is allowed AND not wiping.
    if applicant.is_paid and device_ok and not wipe:
        unlock_token, unlock_exp = mint_unlock_token(
            applicant_id=applicant.applicant_id or str(applicant.pk),
            device_id=device_id,
            paid=True,
        )

    pending = bool((applicant.pending_utr or "").strip()) and not applicant.is_paid

    # Unpaid users must enter phone before we reveal offer / QR / UPI.
    if not applicant.is_paid and not phone and not wipe:
        return encode_payment_wire(
            success=True,
            paid=False,
            amount="0.00",
            list_amount="0.00",
            offer_label="",
            offer_active=False,
            upi_id="",
            qr_url="",
            instructions="Enter your phone number to see your offer.",
            pending=pending,
            pending_utr=applicant.pending_utr if pending else "",
            applicant_id=applicant.applicant_id or "",
            start_date=getattr(applicant, "start_date", None),
            end_date=getattr(applicant, "end_date", None),
            unlock_token="",
            unlock_exp_ms=0,
            device_ok=device_ok,
            device_message=msg or "Enter phone number to continue.",
            need_phone=True,
            phone="",
            wipe=wipe,
        )

    pricing = resolve_pay_amount(applicant, phone=phone)
    qr = pricing["qr_url"] or ""
    if request is not None:
        if qr.startswith("/"):
            qr = request.build_absolute_uri(qr)
        # Avoid leaking localhost QR URLs to the extension (hangs image load).
        if "127.0.0.1" in qr or "localhost" in qr:
            try:
                from urllib.parse import urlparse

                path = urlparse(qr).path or ""
                if path:
                    qr = request.build_absolute_uri(path)
            except Exception:
                pass

    return encode_payment_wire(
        success=True,
        paid=applicant.is_paid and not wipe,
        amount=pricing["pay_amount"],
        list_amount=pricing["list_amount"],
        offer_label=pricing["offer_label"],
        offer_active=pricing["offer_active"],
        upi_id=pricing["upi_id"] if not wipe else "",
        qr_url=qr if not wipe else "",
        instructions=pricing["instructions"] if not wipe else "",
        pending=pending and not wipe,
        pending_utr=applicant.pending_utr if pending and not wipe else "",
        applicant_id=applicant.applicant_id or "",
        start_date=getattr(applicant, "start_date", None),
        end_date=getattr(applicant, "end_date", None),
        unlock_token=unlock_token,
        unlock_exp_ms=unlock_exp,
        device_ok=device_ok,
        device_message=msg,
        need_phone=False,
        phone=phone if not wipe else "",
        wipe=wipe,
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


def _best_applicant(qs):
    """
    Prefer a paid row when duplicates share the same identity.
    Unpaid duplicates must never steal unlock from a paid applicant.
    """
    rows = list(qs[:30])
    if not rows:
        return None
    paid = [a for a in rows if (a.payment_id or "").strip()]
    pool = paid or rows
    return max(pool, key=lambda a: (a.updated_at or a.created_at))


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
        applicant = _best_applicant(
            Applicant.objects.filter(email__iexact=email).order_by("-updated_at")
        )
    if applicant is None and applicant_id:
        applicant = _best_applicant(
            Applicant.objects.filter(applicant_id__iexact=applicant_id).order_by("-updated_at")
        )
    if applicant is None and portal_num:
        # Match "12345" or "Name (12345)" already stored
        applicant = _best_applicant(
            Applicant.objects.filter(applicant_id=portal_num).order_by("-updated_at")
        )
        if applicant is None:
            applicant = _best_applicant(
                Applicant.objects.filter(applicant_id__endswith=f"({portal_num})").order_by(
                    "-updated_at"
                )
            )
    if applicant is None and name:
        applicant = _best_applicant(
            Applicant.objects.filter(name__iexact=name).order_by("-updated_at")
        )
    if applicant is None:
        lookup = {}
        if applicant_id:
            lookup["applicant_id"] = applicant_id
        elif email:
            lookup["email"] = email
        # Re-check before create — unpaid duplicates must not win over a paid twin.
        if applicant_id:
            applicant = _best_applicant(
                Applicant.objects.filter(applicant_id__iexact=applicant_id).order_by(
                    "-updated_at"
                )
            )
        elif email:
            applicant = _best_applicant(
                Applicant.objects.filter(email__iexact=email).order_by("-updated_at")
            )
        if applicant is None and lookup:
            applicant, created = Applicant.objects.get_or_create(**lookup)
            if created and applicant_id:
                better = _best_applicant(
                    Applicant.objects.filter(applicant_id__iexact=applicant_id).order_by(
                        "-updated_at"
                    )
                )
                if (
                    better
                    and better.pk != applicant.pk
                    and better.is_paid
                    and not applicant.is_paid
                ):
                    try:
                        applicant.delete()
                    except Exception:
                        pass
                    applicant = better

    if name:
        applicant.name = name
    if email:
        applicant.email = email
    # Keep the richer / existing applicant_id when paid row already has one.
    if applicant_id and (
        not (applicant.applicant_id or "").strip()
        or not applicant.is_paid
        or applicant.applicant_id == applicant_id
    ):
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
        # Broadcast hot city so other City Change users jump to dates.
        try:
            note_contribution_city(
                post_id,
                str(post.get("Name", "")).strip(),
                post.get("Days") or [],
                has_error=bool(post.get("HasError")),
            )
        except Exception:
            logger.exception("Hot city update failed")
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
def save_auto_submit_prefs(request):
    """
    Store Auto Submit From/To + ON/OFF for an applicant.
    Opaque body: p/d/j, y=enabled, f=from, g=to, md/ms=try limits (optional).
    Omit y/f/g to only read current prefs (hydrate).
    """
    if request.method == "OPTIONS":
        return JsonResponse({}, status=204)
    if not rate_limit_allow(request, "asub"):
        return _rate_limited()

    body, err = _parse_json_body(request)
    if err:
        return err

    parsed = decode_plan_request(body)
    profile = parsed["profile"] or body.get("profile") or {}
    applicant = _upsert_applicant(profile, parsed.get("token") or body.get("token") or None)
    if not applicant:
        return JsonResponse(
            encode_auto_submit_wire(
                success=False,
                enabled=False,
                from_date=None,
                to_date=None,
                applicant_id="",
            ),
            status=400,
        )

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

    prefs, _ = ApplicantAutoSubmitPrefs.objects.get_or_create(applicant=applicant)
    rules = AutoSubmitSettings.load().as_rules()

    # Update only when keys are present (hydrate = read-only).
    writing = any(k in body for k in ("y", "enabled", "f", "g", "from", "to", "from_date", "to_date", "md", "ms"))
    if writing:
        from_raw = body.get("f") if "f" in body else body.get("from_date", body.get("from"))
        to_raw = body.get("g") if "g" in body else body.get("to_date", body.get("to"))
        if from_raw is not None or to_raw is not None:
            fd = _parse_iso_date(from_raw) if from_raw is not None else prefs.from_date
            td = _parse_iso_date(to_raw) if to_raw is not None else prefs.to_date
            if fd and td and td < fd:
                fd, td = td, fd
            if from_raw is not None:
                prefs.from_date = fd
            if to_raw is not None:
                prefs.to_date = td

        enabled = body.get("y") if "y" in body else body.get("enabled")
        if isinstance(enabled, bool) or enabled in (0, 1, "0", "1"):
            want_on = bool(int(enabled)) if not isinstance(enabled, bool) else enabled
            prefs.enabled = (
                want_on
                and bool(prefs.from_date)
                and bool(prefs.to_date)
                and applicant.is_paid
                and device["device_ok"]
            )

        if "md" in body or "max_date_tries" in body:
            prefs.max_date_tries = _clamp_tries(
                body.get("md", body.get("max_date_tries")), prefs.max_date_tries or 3
            )
        if "ms" in body or "max_slot_tries" in body:
            prefs.max_slot_tries = _clamp_tries(
                body.get("ms", body.get("max_slot_tries")), prefs.max_slot_tries or 4
            )
        prefs.save()

    # Global Auto Submit rules are the source of truth for try limits + pick strategy.
    max_dates = rules.get("max_date_tries") or prefs.max_date_tries or 3
    max_slots = rules.get("max_slot_tries") or prefs.max_slot_tries or 4

    return JsonResponse(
        encode_auto_submit_wire(
            success=True,
            enabled=prefs.enabled,
            from_date=prefs.from_date,
            to_date=prefs.to_date,
            applicant_id=applicant.applicant_id or "",
            max_date_tries=max_dates,
            max_slot_tries=max_slots,
            rules=rules,
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


def _normalize_booking_event_item(raw) -> dict | None:
    if not isinstance(raw, dict):
        return None
    kind = str(raw.get("k") or raw.get("kind") or "").strip().lower()[:32]
    if not kind:
        return None
    level = str(raw.get("l") or raw.get("level") or "info").strip().lower()[:8]
    if level not in ("info", "warn", "error"):
        level = "info"
    stage = str(raw.get("s") or raw.get("stage") or "").strip()[:32]
    message = str(raw.get("m") or raw.get("message") or "").strip()[:4000]
    city_id = str(raw.get("ci") or raw.get("city_id") or "").strip()[:64]
    city_name = str(
        raw.get("cn") or raw.get("city_name") or raw.get("city") or ""
    ).strip()[:255]
    appt_date = str(
        raw.get("f") or raw.get("date") or raw.get("appt_date") or ""
    ).strip()[:32]
    appt_time = str(
        raw.get("t") or raw.get("time") or raw.get("appt_time") or ""
    ).strip()[:32]
    page_url = str(raw.get("u") or raw.get("url") or "").strip()[:512]
    detail = raw.get("x") if isinstance(raw.get("x"), dict) else raw.get("detail")
    if not isinstance(detail, dict):
        detail = {}
    return {
        "kind": kind,
        "level": level,
        "stage": stage,
        "message": message,
        "city_id": city_id,
        "city_name": city_name,
        "appt_date": appt_date,
        "appt_time": appt_time,
        "page_url": page_url,
        "detail": detail,
    }


def _page_kind_from_url(url: str) -> str:
    path = str(url or "").lower()
    if "/ofc-schedule" in path:
        return BookedSlot.PAGE_OFC
    if "/schedule" in path or "/c-schedule" in path:
        return BookedSlot.PAGE_CONSULAR
    return BookedSlot.PAGE_OTHER


def _maybe_record_booked_slot(applicant, device_id: str, item: dict, profile: dict) -> bool:
    """
    Persist a BookedSlot when Auto Submit reports a successful Submit.
    """
    kind = (item.get("kind") or "").lower()
    stage = (item.get("stage") or "").lower()
    # Prefer explicit "booked"; also accept submit/success from older clients.
    if kind == "booked":
        pass
    elif kind == "submit" and stage == "success":
        pass
    else:
        return False

    detail = item.get("detail") if isinstance(item.get("detail"), dict) else {}
    if detail.get("skipBooked"):
        return False

    person = (
        str(detail.get("personName") or detail.get("person_name") or "").strip()
        or (applicant.name if applicant else "")
        or str(profile.get("n") or profile.get("name") or "").strip()
        or str(profile.get("i") or profile.get("username") or "").strip()
    )[:255]
    members = detail.get("members")
    if isinstance(members, list) and members and not str(detail.get("personName") or "").strip():
        person = (", ".join(str(m).strip() for m in members if str(m).strip()))[:255] or person

    applicant_id_snap = (
        (applicant.applicant_id if applicant else "")
        or str(profile.get("i") or profile.get("username") or profile.get("portalId") or "")
    )[:64]
    email_snap = (
        (applicant.email if applicant else "")
        or str(profile.get("e") or profile.get("email") or "")
    )[:255]

    BookedSlot.objects.create(
        applicant=applicant,
        person_name=person,
        applicant_id_snap=applicant_id_snap,
        email_snap=email_snap,
        city_id=item.get("city_id") or "",
        city_name=item.get("city_name") or "",
        appt_date=item.get("appt_date") or "",
        appt_time=(item.get("appt_time") or "")[:64],
        page_kind=_page_kind_from_url(item.get("page_url") or ""),
        page_url=item.get("page_url") or "",
        source=str(detail.get("source") or "auto_submit")[:32],
        device_id=device_id or "",
        detail=detail,
    )
    return True


@csrf_exempt
@require_http_methods(["POST", "OPTIONS"])
def save_booking_events(request):
    """
    Batch booking telemetry from extension (date/time/submit/city issues).
    Opaque: p/d/j + v=[{k,s,l,m,ci,cn,f,t,u,x}, ...]
    Also creates BookedSlot rows for submit/success and kind=booked.
    """
    if request.method == "OPTIONS":
        return JsonResponse({}, status=204)
    if not rate_limit_allow(request, "events"):
        return _rate_limited()

    body, err = _parse_json_body(request)
    if err:
        return err

    parsed = decode_plan_request(body)
    profile = parsed["profile"] or body.get("profile") or {}
    applicant = _upsert_applicant(profile, parsed.get("token") or body.get("token") or None)
    device_id = extract_device_id(body)

    raw_list = body.get("v") if isinstance(body.get("v"), list) else body.get("events")
    if not isinstance(raw_list, list):
        raw_list = []
    items = []
    for raw in raw_list[:40]:
        item = _normalize_booking_event_item(raw)
        if item:
            items.append(item)
    if not items:
        return JsonResponse({"k": 0, "n": 0, "e": "no events"}, status=400)

    rows = [
        BookingEvent(
            applicant=applicant,
            device_id=device_id or "",
            **item,
        )
        for item in items
    ]
    BookingEvent.objects.bulk_create(rows)

    # Prefer explicit "booked" events; fall back to submit/success once per batch.
    booked_items = [i for i in items if (i.get("kind") or "").lower() == "booked"]
    if not booked_items:
        booked_items = [
            i
            for i in items
            if (i.get("kind") or "").lower() == "submit"
            and (i.get("stage") or "").lower() == "success"
        ][:1]

    booked_n = 0
    for item in booked_items:
        if _maybe_record_booked_slot(
            applicant, device_id or "", item, profile if isinstance(profile, dict) else {}
        ):
            booked_n += 1

    return JsonResponse({"k": 1, "n": len(rows), "b": booked_n})


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

    phone = _extract_phone(body, profile) or normalize_phone(getattr(applicant, "phone", "") or "")
    if not phone:
        wire = _payment_wire_for(applicant, request, body)
        wire["k"] = 0
        wire["q"] = 1
        wire["e"] = "Enter your phone number first to see your offer."
        return JsonResponse(wire, status=400)

    if (getattr(applicant, "phone", "") or "") != phone:
        applicant.phone = phone
        applicant.save(update_fields=["phone", "updated_at"])

    utr = str(body.get("r") or body.get("utr") or body.get("payment_ref") or "").strip()
    # Normalize common UTR formatting
    utr = " ".join(utr.split())
    if len(utr) < 6:
        wire = _payment_wire_for(applicant, request, body)
        wire["k"] = 0
        wire["e"] = "Enter a valid UTR / UPI reference (at least 6 characters)."
        return JsonResponse(wire, status=400)

    pricing = resolve_pay_amount(applicant, phone=phone)
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
            payer_phone=phone,
            payment_ref=utr,
            amount=pricing["pay_amount"],
            note="Submitted from Tik Tik",
            status=PaymentClaim.STATUS_PENDING,
            source="extension",
        )
    elif not (existing.payer_phone or "").strip():
        existing.payer_phone = phone
        existing.save(update_fields=["payer_phone"])

    applicant.pending_utr = utr
    applicant.pending_utr_at = timezone.now()
    if pricing["pay_amount"] and (not applicant.fee_amount or applicant.fee_amount <= 0):
        applicant.fee_amount = pricing["list_amount"]
    applicant.save(
        update_fields=["pending_utr", "pending_utr_at", "fee_amount", "phone", "updated_at"]
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
    wipe = bool(getattr(applicant, "wipe_client", False))

    # Always mint a fresh unlock token for paid+allowed devices so a missing/expired
    # client token does not lock Tik Tik or flash the payment UI again.
    unlock_token = ""
    unlock_exp = 0
    if applicant.is_paid and device["device_ok"] and not wipe:
        unlock_token, unlock_exp = mint_unlock_token(
            applicant_id=aid, device_id=device_id, paid=True
        )

    prefs, _ = ApplicantCityPrefs.objects.get_or_create(applicant=applicant)

    if parsed["cities"]:
        prefs.cities = _normalize_cities(parsed["cities"])
    if parsed.get("enabled") is not None:
        en = parsed["enabled"]
        want_on = bool(int(en)) if not isinstance(en, bool) else en
        prefs.enabled = want_on and applicant.is_paid and device["device_ok"] and not wipe

    # Payment / device gates only — never treat a missing unlock token as "unpaid".
    locked = wipe or (not applicant.is_paid) or (not device["device_ok"])
    if locked:
        if wipe or (not applicant.is_paid) or (not device["device_ok"]):
            prefs.enabled = False
        prefs.save()
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
        # w = payment unlock (not "this plan has a city"). Paid users stay unlocked.
        wire["w"] = 1 if (applicant.is_paid and device["device_ok"] and not wipe) else 0
        wire["m"] = f"{resolve_pay_amount(applicant)['pay_amount']:.2f}"
        wire["j"] = unlock_token
        wire["x"] = unlock_exp
        wire["c"] = 0 if wipe else (1 if device["device_ok"] else 0)
        if wipe:
            wire["e"] = "client wipe"
        elif not applicant.is_paid:
            wire["e"] = "payment required"
        else:
            wire["e"] = device.get("message") or "device blocked"
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
    # Keep last_post_id in sync even without ACK so live split counts are accurate.
    if current_id and str(prefs.last_post_id or "") != str(current_id):
        prefs.last_post_id = str(current_id)
        prefs.save(update_fields=["last_post_id", "updated_at"])
    plan = build_rotate_plan(
        cities=prefs.cities or [],
        current_city_id=current_id,
        last_switch_at_ms=_dt_to_ms(prefs.last_switch_at),
        min_gap_ms=prefs.rotate_min_gap_ms,
        max_gap_ms=prefs.rotate_max_gap_ms,
        applicant_pk=int(applicant.pk),
        fail_next_hot=bool(parsed.get("failNextHot")),
    )
    plan["enabled"] = prefs.enabled
    plan["citiesCount"] = len(prefs.cities or [])
    wire = encode_plan_wire(plan)
    wire["w"] = 1
    wire["m"] = f"{resolve_pay_amount(applicant)['pay_amount']:.2f}"
    wire["j"] = unlock_token
    wire["x"] = unlock_exp
    wire["c"] = 1
    wire["e"] = ""
    return JsonResponse(wire)


@csrf_exempt
@require_http_methods(["POST", "OPTIONS"])
def claim_auto_submit_date(request):
    """
    Assign a calendar date so concurrent Auto Submit accounts spread across
    available dates (still inside each applicant's From/To).
    Opaque: p/d/j, c=cityId, l=[dates], f=from, g=to, x=[avoid dates]
    Wire out: k, v=assigned date YYYY-MM-DD
    """
    if request.method == "OPTIONS":
        return JsonResponse({}, status=204)
    if not rate_limit_allow(request, "dclaim"):
        return _rate_limited()

    body, err = _parse_json_body(request)
    if err:
        return err

    parsed = decode_plan_request(body)
    profile = parsed["profile"] or {}
    applicant = _upsert_applicant(profile, parsed.get("token") or None)
    if not applicant:
        return JsonResponse({"k": 0, "v": ""}, status=400)

    device_id = extract_device_id(body)
    device = register_or_check_device(applicant, device_id, _ua(request))
    if not applicant.is_paid or not device["device_ok"]:
        return JsonResponse({"k": 0, "v": "", "e": "locked"}, status=403)

    city_id = str(body.get("c") or parsed.get("currentCityId") or "").strip()
    dates_raw = body.get("l") if isinstance(body.get("l"), list) else body.get("dates")
    if not isinstance(dates_raw, list):
        dates_raw = []
    dates = [str(x).strip()[:10] for x in dates_raw if str(x).strip()]
    from_s = str(body.get("f") or body.get("from") or "").strip()[:10]
    to_s = str(body.get("g") or body.get("to") or "").strip()[:10]
    avoid_raw = body.get("x") if isinstance(body.get("x"), list) else body.get("avoid")
    avoid = [str(x).strip()[:10] for x in (avoid_raw or []) if str(x).strip()]

    # Prefer stored Auto Submit range when client omits f/g.
    if not from_s or not to_s:
        prefs, _ = ApplicantAutoSubmitPrefs.objects.get_or_create(applicant=applicant)
        if not from_s and prefs.from_date:
            from_s = prefs.from_date.isoformat()[:10]
        if not to_s and prefs.to_date:
            to_s = prefs.to_date.isoformat()[:10]

    from .date_claim import claim_spread_date

    picked = claim_spread_date(
        applicant=applicant,
        city_id=city_id,
        available_dates=dates,
        from_date=from_s,
        to_date=to_s,
        avoid_dates=avoid,
    )
    return JsonResponse({"k": 1 if picked else 0, "v": picked or ""})
