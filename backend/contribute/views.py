import base64
import json
import logging
import re
from datetime import datetime, timedelta, timezone as dt_timezone

from django.db import transaction
from django.http import JsonResponse
from django.utils import timezone
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

from .models import (
    Applicant,
    ApplicantTikTikPrefs,
    Contribution,
    DashboardSnapshot,
    HumanClickSample,
    TikTikCityAlert,
)
from .telegram import notify_available_slots, relay_extension_alert
from .tik_tik_auth import link_applicant_to_tik_tik

logger = logging.getLogger(__name__)


def _link_tik_tik_from_body(body: dict, applicant: Applicant | None) -> None:
    if not applicant:
        return
    aid = _normalize_applicant_id(applicant.applicant_id or "")
    if not aid:
        return
    try:
        link_applicant_to_tik_tik(
            applicant_id=aid,
            tik_tik_email=str(body.get("tikTikEmail") or body.get("tik_tik_email") or ""),
            tik_tik_token=str(body.get("tikTikToken") or body.get("tik_tik_token") or ""),
            device_id=str(body.get("tikTikDeviceId") or body.get("deviceId") or ""),
        )
    except Exception:
        logger.exception("link Tik Tik applicant failed")


def _normalize_applicant_id(raw) -> str:
    """
    Portal usernames look like \"Name (903305578)\". Prefer the numeric id.
    Accept already-numeric ids; otherwise keep a short cleaned token.
    """
    s = str(raw or "").strip()
    if not s:
        return ""
    paren = re.search(r"\((\d{5,})\)", s)
    if paren:
        return paren.group(1)
    if re.fullmatch(r"\d{5,}", s):
        return s
    # Avoid storing the full \"Name (id)\" blob as the key.
    digits = re.findall(r"\d{5,}", s)
    if len(digits) == 1:
        return digits[0]
    return s[:64]


def _upsert_applicant(profile: dict, token: str | None) -> Applicant | None:
    """
    Find or create an Applicant row from the profile dict sent by the extension.
    Prefer applicant_id as the lookup key; fall back to email.
    Returns None if the profile is empty or has no usable key.
    """
    if not profile:
        return None

    applicant_id = _normalize_applicant_id(profile.get("id", ""))
    email = str(profile.get("email", "")).strip()
    email_key = email.lower()

    if not applicant_id and not email_key:
        return None

    with transaction.atomic():
        qs = Applicant.objects.all()
        matches = []
        if applicant_id:
            matches.extend(list(qs.filter(applicant_id=applicant_id).order_by("id")))
            # Legacy rows that stored \"Name (id)\" as applicant_id
            matches.extend(
                list(
                    qs.filter(applicant_id__endswith=f"({applicant_id})")
                    .exclude(id__in=[m.id for m in matches])
                    .order_by("id")
                )
            )
        if email_key:
            matches.extend(
                list(
                    qs.filter(email__iexact=email)
                    .exclude(id__in=[m.id for m in matches])
                    .order_by("id")
                )
            )

        if matches:
            applicant = matches[0]
            # Fold duplicate rows into the keeper.
            for dup in matches[1:]:
                Contribution.objects.filter(applicant=dup).update(applicant=applicant)
                DashboardSnapshot.objects.filter(applicant=dup).update(applicant=applicant)
                HumanClickSample.objects.filter(applicant=dup).update(applicant=applicant)
                dup_prefs = ApplicantTikTikPrefs.objects.filter(applicant=dup).first()
                if dup_prefs is not None:
                    if not ApplicantTikTikPrefs.objects.filter(applicant=applicant).exists():
                        dup_prefs.applicant = applicant
                        dup_prefs.save(update_fields=["applicant"])
                    else:
                        dup_prefs.delete()
                if not applicant.id_token and dup.id_token:
                    applicant.id_token = dup.id_token
                    applicant.token_captured_at = dup.token_captured_at
                if not applicant.visa_class and dup.visa_class:
                    applicant.visa_class = dup.visa_class
                if not applicant.name and dup.name:
                    applicant.name = dup.name
                dup.delete()
        else:
            applicant = Applicant(applicant_id=applicant_id or "", email=email)

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
        _link_tik_tik_from_body(body, applicant)
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

    _link_tik_tik_from_body(body, applicant)
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
@require_http_methods(["GET", "POST", "OPTIONS"])
def human_click_sample(request):
    """
    Extension ↔ server: Verify-you-are-human click samples.

    POST — upload one sample for training.
    GET  — download a replay library (deduped) so other clients can click like humans.
    """
    if request.method == "OPTIONS":
        return JsonResponse({}, status=204)

    if request.method == "GET":
        try:
            limit = int(request.GET.get("limit") or 40)
        except (TypeError, ValueError):
            limit = 40
        limit = max(5, min(limit, 80))

        rows = list(HumanClickSample.objects.order_by("-id")[: limit * 3])
        samples = []
        seen = set()
        for row in rows:
            cid = str(row.client_id or "").strip()
            if cid:
                if cid in seen:
                    continue
                seen.add(cid)
            raw = row.sample if isinstance(row.sample, dict) else {}
            path = raw.get("path") if isinstance(raw.get("path"), list) else []
            if len(path) > 200:
                path = path[-200:]
            hover = int(row.hover_ms or raw.get("hoverMs") or 0)
            press = int(row.press_ms or raw.get("pressMs") or 0)
            # Skip empty / junk blur saves (no path + default 500ms press).
            if not path and press >= 480:
                continue
            samples.append(
                {
                    "hoverMs": hover,
                    "pressMs": press,
                    "approachMs": int(row.approach_ms or raw.get("approachMs") or hover or 0),
                    "path": path,
                    "pointerType": str(row.pointer_type or raw.get("pointerType") or "mouse")[:32],
                    "at": int(raw.get("at") or 0) or None,
                    "source": "server",
                }
            )
            if len(samples) >= limit:
                break

        # Prefer path-rich samples first for clients that only take a subset.
        samples.sort(key=lambda s: (-(len(s.get("path") or [])), -(s.get("at") or 0)))
        avg_hover = 0
        avg_press = 0
        if samples:
            avg_hover = int(sum(s["hoverMs"] for s in samples) / len(samples))
            avg_press = int(sum(s["pressMs"] for s in samples) / len(samples))
        return JsonResponse(
            {
                "success": True,
                "samples": samples,
                "count": len(samples),
                "avgHoverMs": avg_hover,
                "avgPressMs": avg_press,
                "liveTrained": True,
                "source": "server-library",
            }
        )

    try:
        body = json.loads(request.body)
    except (json.JSONDecodeError, UnicodeDecodeError):
        return JsonResponse({"success": False, "error": "invalid json"}, status=400)

    if not isinstance(body, dict):
        return JsonResponse({"success": False, "error": "expected object"}, status=400)

    sample = body.get("sample")
    if not isinstance(sample, dict) or not sample:
        return JsonResponse({"success": False, "error": "sample required"}, status=400)

    # Cap path length so a single row can't blow up storage.
    path = sample.get("path")
    if isinstance(path, list) and len(path) > 200:
        sample = {**sample, "path": path[-200:]}

    profile = body.get("profile") or {}
    applicant = _upsert_applicant(profile if isinstance(profile, dict) else {}, None)

    client_id = str(body.get("client_id") or sample.get("at") or "").strip()[:64]
    if client_id:
        exists = HumanClickSample.objects.filter(client_id=client_id).exists()
        if exists:
            return JsonResponse({"success": True, "deduped": True, "id": None})

    row = HumanClickSample.objects.create(
        applicant=applicant,
        client_id=client_id,
        hover_ms=int(sample.get("hoverMs") or 0),
        press_ms=int(sample.get("pressMs") or 0),
        approach_ms=int(sample.get("approachMs") or 0),
        pointer_type=str(sample.get("pointerType") or "")[:32],
        page_url=str(sample.get("url") or "")[:512],
        sample=sample,
        profile_meta=body.get("profile_meta") if isinstance(body.get("profile_meta"), dict) else {},
    )
    logger.info(
        "Human click sample #%s from %s (hover=%s press=%s path=%s)",
        row.pk,
        applicant or "anonymous",
        row.hover_ms,
        row.press_ms,
        len(sample.get("path") or []) if isinstance(sample.get("path"), list) else 0,
    )
    return JsonResponse({"success": True, "id": row.pk})


def _prefs_to_dict(row: ApplicantTikTikPrefs) -> dict:
    return {
        "cities": row.cities if isinstance(row.cities, list) else [],
        "from": row.date_from or None,
        "to": row.date_to or None,
        "submitEnabled": bool(row.submit_enabled),
        "citiesEnabled": bool(row.cities_enabled),
        "slotWindows": row.slot_windows if isinstance(row.slot_windows, list) else [],
        "termsAgreed": bool(row.terms_agreed),
        "termsPassed": bool(row.terms_passed),
        "termsAgreedAt": int(row.terms_agreed_at.timestamp() * 1000) if row.terms_agreed_at else None,
        "updatedAt": int(row.updated_at.timestamp() * 1000) if row.updated_at else None,
    }


def _clean_cities(raw) -> list:
    out = []
    if not isinstance(raw, list):
        return out
    for item in raw[:20]:
        if not isinstance(item, dict):
            continue
        cid = str(item.get("id") or "").strip()[:64]
        if not cid:
            continue
        out.append({"id": cid, "name": str(item.get("name") or cid).strip()[:255]})
    return out


def _clean_date(raw) -> str:
    s = str(raw or "").strip()[:10]
    if re.fullmatch(r"\d{4}-\d{2}-\d{2}", s):
        return s
    return ""


def _clean_slot_windows(raw) -> list:
    out = []
    if not isinstance(raw, list):
        return out
    for item in raw[:8]:
        if not isinstance(item, dict):
            continue
        try:
            from_min = int(item.get("fromMin"))
            to_min = int(item.get("toMin", item.get("fromMin")))
        except (TypeError, ValueError):
            continue
        if from_min < 0 or from_min > 59 or to_min < 0 or to_min > 59:
            continue
        row = {"fromMin": from_min, "toMin": to_min}
        if "durationMin" in item:
            try:
                row["durationMin"] = max(1, min(6, int(item.get("durationMin"))))
            except (TypeError, ValueError):
                pass
        if "slot" in item:
            try:
                row["slot"] = int(item.get("slot"))
            except (TypeError, ValueError):
                pass
        out.append(row)
    return out


@csrf_exempt
@require_http_methods(["GET", "POST", "OPTIONS"])
def tik_tik_prefs(request):
    """
    Safe Tik Tik prefs sync (cities, dates, toggles, timings, terms).
    Never accepts login passwords or security answers.

    POST body: { profile, token?, prefs: { cities, from, to, submitEnabled, ... } }
    GET query: applicant_id=… and/or email=…
    """
    if request.method == "OPTIONS":
        return JsonResponse({}, status=204)

    if request.method == "GET":
        applicant_id = _normalize_applicant_id(request.GET.get("applicant_id", ""))
        email = str(request.GET.get("email") or "").strip()
        applicant = None
        if applicant_id:
            applicant = Applicant.objects.filter(applicant_id=applicant_id).order_by("id").first()
        if not applicant and email:
            applicant = Applicant.objects.filter(email__iexact=email).order_by("id").first()
        if not applicant:
            return JsonResponse({"success": True, "prefs": None})
        row = ApplicantTikTikPrefs.objects.filter(applicant=applicant).first()
        return JsonResponse({"success": True, "prefs": _prefs_to_dict(row) if row else None})

    try:
        body = json.loads(request.body)
    except (json.JSONDecodeError, UnicodeDecodeError):
        return JsonResponse({"success": False, "error": "invalid json"}, status=400)

    if not isinstance(body, dict):
        return JsonResponse({"success": False, "error": "expected object"}, status=400)

    profile = body.get("profile") if isinstance(body.get("profile"), dict) else {}
    token = body.get("token") if isinstance(body.get("token"), str) else None
    applicant = _upsert_applicant(profile, token)
    if not applicant:
        return JsonResponse({"success": False, "error": "profile required"}, status=400)

    _link_tik_tik_from_body(body, applicant)

    prefs = body.get("prefs")
    if not isinstance(prefs, dict):
        row = ApplicantTikTikPrefs.objects.filter(applicant=applicant).first()
        return JsonResponse({"success": True, "prefs": _prefs_to_dict(row) if row else None})

    row, _created = ApplicantTikTikPrefs.objects.get_or_create(applicant=applicant)
    if "cities" in prefs:
        cleaned = _clean_cities(prefs.get("cities"))
        # Never wipe a non-empty saved city list with an accidental empty upload.
        if cleaned or not (isinstance(row.cities, list) and row.cities):
            row.cities = cleaned
    if "from" in prefs:
        row.date_from = _clean_date(prefs.get("from"))
    if "to" in prefs:
        row.date_to = _clean_date(prefs.get("to"))
    if "submitEnabled" in prefs or "enabled" in prefs:
        row.submit_enabled = bool(
            prefs["submitEnabled"] if "submitEnabled" in prefs else prefs.get("enabled")
        )
    if "citiesEnabled" in prefs:
        row.cities_enabled = bool(prefs.get("citiesEnabled"))
    if "slotWindows" in prefs:
        windows = prefs.get("slotWindows")
        row.slot_windows = _clean_slot_windows(windows) if windows else []
    if "termsAgreed" in prefs:
        row.terms_agreed = bool(prefs.get("termsAgreed"))
    if "termsPassed" in prefs:
        row.terms_passed = bool(prefs.get("termsPassed"))
    if "termsAgreedAt" in prefs:
        raw_ts = prefs.get("termsAgreedAt")
        if raw_ts is None or raw_ts == "":
            row.terms_agreed_at = None
        else:
            try:
                ms = int(raw_ts)
                row.terms_agreed_at = datetime.fromtimestamp(ms / 1000.0, tz=dt_timezone.utc)
            except (TypeError, ValueError, OSError):
                pass

    row.save()
    logger.info("Tik Tik prefs saved for %s", applicant)
    return JsonResponse({"success": True, "prefs": _prefs_to_dict(row)})


def _clean_iso_date(raw) -> str:
    s = str(raw or "").strip()[:10]
    if re.fullmatch(r"\d{4}-\d{2}-\d{2}", s):
        return s
    return ""


def _ranges_overlap(a_from: str, a_to: str, b_from: str, b_to: str) -> bool:
    """True if ranges overlap, or if either side has no range (open match)."""
    if not (a_from and a_to) or not (b_from and b_to):
        return True
    return not (a_to < b_from or b_to < a_from)


def _alert_matches_local(alert, local_from: str, local_to: str) -> bool:
    if not (local_from and local_to):
        return True
    best = _clean_iso_date(getattr(alert, "best_date", "") or "")
    if best and local_from <= best <= local_to:
        return True
    a_from = _clean_iso_date(getattr(alert, "date_from", "") or "")
    a_to = _clean_iso_date(getattr(alert, "date_to", "") or "")
    if a_from and a_to:
        return _ranges_overlap(a_from, a_to, local_from, local_to)
    # Legacy alerts without dates — still pull preferred-city users.
    return True


# Slot alerts stay fresh this long for other extensions to pick up.
_CITY_ALERT_TTL = timedelta(seconds=120)
# Collapse duplicate alerts for the same city within this window.
_CITY_ALERT_DEDUP = timedelta(seconds=1)


@csrf_exempt
@require_http_methods(["POST", "OPTIONS"])
def tik_tik_coord(request):
    """
    Coordinate Tik Tik city hops across applicants.

    Local rotation stays on each extension. This endpoint only broadcasts
    "slots found in city X" so everyone who prefers X can force-switch now.

    POST { action: "alert"|"poll", profile, token?,
           city?, dayCount?, dateFrom?, dateTo?, bestDate?,
           preferredCities?, citiesEnabled?, lastAlertId?,
           dateFrom?/dateTo? (poller range) }
    """
    if request.method == "OPTIONS":
        return JsonResponse({}, status=204)

    try:
        body = json.loads(request.body)
    except (json.JSONDecodeError, UnicodeDecodeError):
        return JsonResponse({"success": False, "error": "invalid json"}, status=400)

    if not isinstance(body, dict):
        return JsonResponse({"success": False, "error": "expected object"}, status=400)

    profile = body.get("profile") if isinstance(body.get("profile"), dict) else {}
    token = body.get("token") if isinstance(body.get("token"), str) else None
    applicant = _upsert_applicant(profile, token)
    _link_tik_tik_from_body(body, applicant)
    action = str(body.get("action") or "").strip().lower()

    if action == "alert":
        city = body.get("city") if isinstance(body.get("city"), dict) else {}
        city_id = str(city.get("id") or "").strip()[:64]
        city_name = str(city.get("name") or city_id).strip()[:255]
        try:
            day_count = int(body.get("dayCount") or 0)
        except (TypeError, ValueError):
            day_count = 0
        if not city_id or day_count < 1:
            return JsonResponse({"success": False, "error": "city + dayCount required"}, status=400)

        date_from = _clean_iso_date(body.get("dateFrom") or body.get("rangeFrom"))
        date_to = _clean_iso_date(body.get("dateTo") or body.get("rangeTo"))
        best_date = _clean_iso_date(body.get("bestDate")) or date_from

        since = timezone.now() - _CITY_ALERT_DEDUP
        recent = (
            TikTikCityAlert.objects.filter(city_id=city_id, created_at__gte=since)
            .order_by("-id")
            .first()
        )
        if recent:
            changed = False
            if day_count > recent.day_count:
                recent.day_count = day_count
                changed = True
            if city_name and city_name != recent.city_name:
                recent.city_name = city_name
                changed = True
            if date_from and (not recent.date_from or date_from < recent.date_from):
                recent.date_from = date_from
                changed = True
            if date_to and (not recent.date_to or date_to > recent.date_to):
                recent.date_to = date_to
                changed = True
            if best_date and (not recent.best_date or best_date < recent.best_date):
                recent.best_date = best_date
                changed = True
            if applicant:
                recent.source_applicant = applicant
                changed = True
            # Refresh freshness so late pollers still get pulled in.
            recent.created_at = timezone.now()
            fields = ["created_at", "day_count", "city_name", "source_applicant", "date_from", "date_to", "best_date"]
            recent.save(update_fields=fields)
            return JsonResponse(
                {
                    "success": True,
                    "alertId": recent.id,
                    "deduped": True,
                    "refreshed": changed,
                    "city": {"id": recent.city_id, "name": recent.city_name},
                    "dayCount": recent.day_count,
                    "dateFrom": recent.date_from or None,
                    "dateTo": recent.date_to or None,
                    "bestDate": recent.best_date or None,
                }
            )

        row = TikTikCityAlert.objects.create(
            city_id=city_id,
            city_name=city_name,
            day_count=day_count,
            date_from=date_from,
            date_to=date_to,
            best_date=best_date,
            source_applicant=applicant,
        )
        logger.info(
            "Tik Tik city alert #%s %s (%s days, best=%s) from %s",
            row.id,
            city_name or city_id,
            day_count,
            best_date or "-",
            applicant or "anonymous",
        )
        return JsonResponse(
            {
                "success": True,
                "alertId": row.id,
                "deduped": False,
                "city": {"id": row.city_id, "name": row.city_name},
                "dayCount": row.day_count,
                "dateFrom": row.date_from or None,
                "dateTo": row.date_to or None,
                "bestDate": row.best_date or None,
            }
        )

    if action == "poll":
        if not bool(body.get("citiesEnabled")):
            return JsonResponse({"success": True, "forceCity": None})

        preferred = _clean_cities(body.get("preferredCities"))
        preferred_ids = {c["id"] for c in preferred}
        if not preferred_ids:
            return JsonResponse({"success": True, "forceCity": None})

        try:
            last_alert_id = int(body.get("lastAlertId") or 0)
        except (TypeError, ValueError):
            last_alert_id = 0

        local_from = _clean_iso_date(body.get("dateFrom") or body.get("from"))
        local_to = _clean_iso_date(body.get("dateTo") or body.get("to"))

        since = timezone.now() - _CITY_ALERT_TTL
        qs = TikTikCityAlert.objects.filter(
            created_at__gte=since,
            city_id__in=list(preferred_ids),
            day_count__gte=1,
        ).order_by("-day_count", "best_date", "-id")

        alert = None
        for cand in qs[:12]:
            if _alert_matches_local(cand, local_from, local_to):
                alert = cand
                break
        if not alert:
            return JsonResponse({"success": True, "forceCity": None})

        current_city = str(body.get("currentCityId") or "").strip()
        already = bool(current_city and current_city == alert.city_id)

        force_payload = {
            "id": alert.city_id,
            "name": alert.city_name or alert.city_id,
            "alertId": alert.id,
            "dayCount": alert.day_count,
            "dateFrom": alert.date_from or None,
            "dateTo": alert.date_to or None,
            "bestDate": alert.best_date or None,
            "at": int(alert.created_at.timestamp() * 1000),
            "alreadyThere": already,
            "priority": True,
        }

        # Already on that city — ack so client can advance lastAlertId.
        if already:
            return JsonResponse({"success": True, "forceCity": force_payload})

        if last_alert_id >= alert.id:
            age = timezone.now() - alert.created_at
            if age > timedelta(seconds=90):
                return JsonResponse({"success": True, "forceCity": None})

        return JsonResponse({"success": True, "forceCity": force_payload})

    return JsonResponse({"success": False, "error": "action must be alert or poll"}, status=400)
