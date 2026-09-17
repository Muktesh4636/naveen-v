import base64
import json
import logging
import re
from datetime import timedelta

from django.db import transaction
from django.http import JsonResponse
from django.utils import timezone
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

from .models import Applicant, Contribution, DashboardSnapshot, HumanClickSample
from .telegram import notify_available_slots, relay_extension_alert

logger = logging.getLogger(__name__)


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
def human_click_sample(request):
    """
    Extension → server: one Verify-you-are-human click sample for model training.

    Body: {
      profile?: { id, email, name, visa },
      sample: { hoverMs, pressMs, approachMs, path, down, up, target, viewport, ... },
      client_id?: str,
      profile_meta?: { avgHoverMs, avgPressMs, sampleCount, ... }
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
