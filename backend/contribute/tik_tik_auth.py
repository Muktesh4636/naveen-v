"""Email OTP login and plan check for Tik Tik. One laptop per email."""

from __future__ import annotations

import hashlib
import hmac
import json
import os
import secrets
import smtplib
from datetime import timedelta
from email.message import EmailMessage

from django.http import JsonResponse
from django.utils import timezone
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

from .models import TikTikLogin
from .plan_catalog import get_plan, load_plan_catalog, plan_amount, plans_for_client

# Back-compat for panel imports that still reference PLANS shape.
def _plans_map():
    return load_plan_catalog()


PLANS = None  # resolved dynamically via get_plan / load_plan_catalog


OTP_TTL = timedelta(minutes=10)
OTP_POOL_MAX = 3
OTP_RESEND_GAP = timedelta(seconds=30)


def _plan_active(row: TikTikLogin, now=None) -> bool:
    now = now or timezone.now()
    if row.plan == "applicant" and row.applicant_id:
        return True
    if row.plan and row.plan_ends and now < row.plan_ends:
        return True
    return False


def _plan_rank(plan: str) -> int:
    spec = get_plan(plan) or load_plan_catalog().get(plan or "")
    if not spec:
        return 0
    return int(spec.get("rank") or 0)


def admin_apply_plan(
    row: TikTikLogin,
    *,
    plan: str,
    days: int | None = None,
    amount: int | None = None,
    applicant_id: str = "",
    mark_trial_used: bool | None = None,
) -> str:
    """
    Staff override: set any plan on a Tik Tik login without payment / upgrade rules.
    Returns a short human label of what was applied.
    """
    plan = str(plan or "").strip().lower()
    now = timezone.now()
    if plan in ("", "none", "clear"):
        row.plan = ""
        row.amount_inr = 0
        row.plan_started = None
        row.plan_ends = None
        row.save(
            update_fields=[
                "plan",
                "amount_inr",
                "plan_started",
                "plan_ends",
                "updated_at",
            ]
        )
        return "cleared plan"

    spec = get_plan(plan) or load_plan_catalog().get(plan)
    if not spec:
        raise ValueError(f"Unknown plan: {plan}")

    aid = str(applicant_id or "").strip()[:64]
    row.plan = plan
    row.amount_inr = int(amount) if amount is not None else int(spec.get("offerPrice") or 0)
    row.plan_started = now
    if plan == "applicant":
        row.plan_ends = None
        if aid:
            row.applicant_id = aid
            _note_applicant(row, aid)
    else:
        use_days = days
        if use_days is None:
            use_days = spec.get("days") or 30
        use_days = max(1, min(3650, int(use_days)))
        row.plan_ends = now + timedelta(days=use_days)
        if plan == "month":
            # Full access — no single-applicant lock.
            pass
    if mark_trial_used is True or (plan == "trial" and mark_trial_used is not False):
        row.trial_used = True
    elif mark_trial_used is False:
        row.trial_used = False
    if aid and plan != "applicant":
        _note_applicant(row, aid)
    row.save()
    ends = row.plan_ends.isoformat() if row.plan_ends else "open"
    return f"{spec.get('label') or plan} (ends {ends})"


def _hash(value: str) -> str:
    return hashlib.sha256(value.encode()).hexdigest()


def _norm_email(raw) -> str:
    return str(raw or "").strip().lower()


def _valid_email(email: str) -> bool:
    return "@" in email and "." in email.split("@")[-1] and len(email) <= 254


def _parse_expires(raw):
    if not raw:
        return None
    try:
        from django.utils.dateparse import parse_datetime

        dt = parse_datetime(str(raw))
        if dt is None:
            return None
        if timezone.is_naive(dt):
            dt = timezone.make_aware(dt, timezone.get_current_timezone())
        return dt
    except Exception:
        return None


def _live_otp_pool(row: TikTikLogin, now=None) -> list[dict]:
    """Active OTPs only (not expired). Migrates legacy single otp_hash if needed."""
    now = now or timezone.now()
    pool: list[dict] = []
    raw = row.otp_codes if isinstance(row.otp_codes, list) else []
    for item in raw:
        if not isinstance(item, dict):
            continue
        h = str(item.get("hash") or "").strip()
        exp = _parse_expires(item.get("expires"))
        if not h or not exp or now > exp:
            continue
        pool.append({"hash": h, "expires": exp.isoformat()})
    # Legacy single-code field (before otp_codes).
    if row.otp_hash and row.otp_expires and now <= row.otp_expires:
        legacy = {"hash": row.otp_hash, "expires": row.otp_expires.isoformat()}
        if not any(p["hash"] == legacy["hash"] for p in pool):
            pool.append(legacy)
    return pool[-OTP_POOL_MAX:]


def _clear_otps(row: TikTikLogin) -> None:
    row.otp_codes = []
    row.otp_hash = ""
    row.otp_expires = None


def _add_otp(row: TikTikLogin, email: str, code: str, now=None) -> None:
    now = now or timezone.now()
    expires = now + OTP_TTL
    pool = _live_otp_pool(row, now)
    entry = {"hash": _hash(f"{email}:{code}"), "expires": expires.isoformat()}
    pool = [p for p in pool if p["hash"] != entry["hash"]]
    pool.append(entry)
    row.otp_codes = pool[-OTP_POOL_MAX:]
    row.otp_hash = entry["hash"]
    row.otp_expires = expires
    row.otp_sent_at = now


def _otp_matches(row: TikTikLogin, email: str, code: str, now=None) -> bool:
    now = now or timezone.now()
    want = _hash(f"{email}:{code}")
    for item in _live_otp_pool(row, now):
        if hmac.compare_digest(str(item.get("hash") or ""), want):
            return True
    return False


def _send_code(to: str, code: str) -> None:
    host = os.environ.get("TIKTIK_SMTP_HOST", "smtp.hostinger.com")
    port = int(os.environ.get("TIKTIK_SMTP_PORT", "587"))
    user = os.environ.get("TIKTIK_SMTP_USER", "security@pravoo.in")
    password = (os.environ.get("TIKTIK_SMTP_PASSWORD") or "").strip()
    if not password:
        raise RuntimeError("email login is not configured")
    msg = EmailMessage()
    msg["Subject"] = "Tik Tik login code"
    msg["From"] = user
    msg["To"] = to
    msg.set_content(
        f"Your Tik Tik login code is {code}.\n\n"
        "It is a 4-digit code and expires in 10 minutes. "
        "If you did not ask for this, ignore this email."
    )
    with smtplib.SMTP(host, port, timeout=20) as smtp:
        smtp.ehlo()
        smtp.starttls()
        smtp.ehlo()
        smtp.login(user, password)
        smtp.send_message(msg)


def _note_applicant(row: TikTikLogin, applicant_id: str) -> bool:
    """Remember every applicant ID used under this login email."""
    aid = str(applicant_id or "").strip()[:64]
    if not aid or not row:
        return False
    ids = [str(x).strip() for x in (row.seen_applicant_ids or []) if str(x).strip()]
    changed = False
    if aid not in ids:
        ids.append(aid)
        row.seen_applicant_ids = ids[-100:]
        changed = True
    # Keep primary applicant_id filled with the latest seen id when empty,
    # or when on the one-applicant plan (already set elsewhere).
    if not (row.applicant_id or "").strip():
        row.applicant_id = aid
        changed = True
    return changed


def link_applicant_to_tik_tik(
    *,
    applicant_id: str = "",
    tik_tik_email: str = "",
    tik_tik_token: str = "",
    device_id: str = "",
) -> bool:
    """
    Attach a visa applicant ID to a Tik Tik login email.
    Used from contribute / prefs so panel shows applicants under the login email
    even when portal email ≠ Tik Tik email.
    """
    aid = str(applicant_id or "").strip()[:64]
    if not aid:
        return False
    row = None
    token = str(tik_tik_token or "").strip()
    email = _norm_email(tik_tik_email)
    device_id = str(device_id or "").strip()[:64]
    if token:
        row = TikTikLogin.objects.filter(session_hash=_hash(token)).first()
        if row and device_id and row.device_id and row.device_id != device_id:
            row = None
    if not row and email:
        row = TikTikLogin.objects.filter(email=email).first()
    if not row:
        return False
    if not _note_applicant(row, aid):
        return False
    row.save(update_fields=["seen_applicant_ids", "applicant_id", "updated_at"])
    return True


def _load_session(token: str, device_id: str):
    token = str(token or "").strip()
    device_id = str(device_id or "").strip()[:64]
    if not token or not device_id:
        return None, "missing"
    row = TikTikLogin.objects.filter(session_hash=_hash(token)).first()
    if not row:
        return None, "missing"
    if row.device_id != device_id:
        return None, "kicked"
    return row, ""


def _public(row: TikTikLogin | None, applicant_id: str = "", kicked: bool = False) -> dict:
    if row is None:
        return {
            "success": True,
            "loggedIn": False,
            "kicked": kicked,
            "access": False,
            "trialUsed": False,
            "reason": "This email is logged in on another laptop." if kicked else "",
        }
    now = timezone.now()
    applicant_id = str(applicant_id or "").strip()
    access = False
    reason = ""
    if not row.plan:
        reason = "Choose a plan to use Tik Tik."
    elif row.plan == "applicant":
        if applicant_id and applicant_id == row.applicant_id:
            access = True
        else:
            reason = f"This plan is only for applicant {row.applicant_id}."
    elif row.plan_ends and now >= row.plan_ends:
        reason = "This plan has ended. Choose a plan again."
    else:
        access = True
    ends = row.plan_ends.isoformat() if row.plan_ends else None
    return {
        "success": True,
        "loggedIn": True,
        "kicked": False,
        "email": row.email,
        "plan": row.plan,
        "amount": row.amount_inr,
        "planEnds": ends,
        "trialUsed": row.trial_used,
        "applicantId": row.applicant_id,
        "applicantIds": list(row.seen_applicant_ids or []),
        "applicantCount": len(list(row.seen_applicant_ids or [])),
        "access": access,
        "reason": reason,
        "canUpgrade": _plan_active(row, now) and _plan_rank(row.plan) < _plan_rank("month"),
        "plans": plans_for_client(),
    }


@csrf_exempt
@require_http_methods(["POST", "OPTIONS"])
def tik_tik_auth(request):
    if request.method == "OPTIONS":
        return JsonResponse({}, status=204)
    try:
        body = json.loads(request.body)
    except (json.JSONDecodeError, UnicodeDecodeError):
        return JsonResponse({"success": False, "error": "invalid json"}, status=400)
    if not isinstance(body, dict):
        return JsonResponse({"success": False, "error": "expected object"}, status=400)

    action = str(body.get("action") or "").strip().lower()
    email = _norm_email(body.get("email"))
    device_id = str(body.get("deviceId") or "").strip()[:64]
    applicant_id = str(body.get("applicantId") or "").strip()[:64]

    if action == "send":
        if not _valid_email(email):
            return JsonResponse({"success": False, "error": "Enter a valid email."}, status=400)
        row, _created = TikTikLogin.objects.get_or_create(email=email)
        now = timezone.now()
        if row.otp_sent_at and now - row.otp_sent_at < OTP_RESEND_GAP:
            wait = max(1, int(OTP_RESEND_GAP.total_seconds()) - int((now - row.otp_sent_at).total_seconds()))
            return JsonResponse(
                {"success": False, "error": f"Wait {wait}s, then tap Resend.", "waitSec": wait},
                status=429,
            )
        code = f"{secrets.randbelow(10000):04d}"
        try:
            _send_code(email, code)
        except Exception:
            return JsonResponse({"success": False, "error": "Could not send the email. Try again."}, status=502)
        _add_otp(row, email, code, now)
        row.save(update_fields=["otp_codes", "otp_hash", "otp_expires", "otp_sent_at", "updated_at"])
        return JsonResponse({"success": True, "sent": True, "digits": 4})

    if action == "verify":
        code = str(body.get("code") or "").strip().replace(" ", "")
        if not _valid_email(email):
            return JsonResponse({"success": False, "error": "Enter a valid email first."}, status=400)
        if not device_id:
            return JsonResponse({"success": False, "error": "Reload the page and try again."}, status=400)
        if not code.isdigit() or len(code) != 4:
            return JsonResponse({"success": False, "error": "Enter the 4-digit code from your email."}, status=400)
        row = TikTikLogin.objects.filter(email=email).first()
        now = timezone.now()
        pool = _live_otp_pool(row, now) if row else []
        if not row or not pool:
            return JsonResponse({"success": False, "error": "Ask for a new code first."}, status=400)
        if not _otp_matches(row, email, code, now):
            # Keep pool intact so other recent codes still work.
            return JsonResponse({"success": False, "error": "Wrong code. Check your email and try again."}, status=400)
        token = secrets.token_urlsafe(32)
        row.session_hash = _hash(token)
        row.device_id = device_id
        _clear_otps(row)  # login success → all remaining OTPs stop working
        fields = [
            "session_hash",
            "device_id",
            "otp_codes",
            "otp_hash",
            "otp_expires",
            "updated_at",
        ]
        if _note_applicant(row, applicant_id):
            fields.extend(["seen_applicant_ids", "applicant_id"])
        row.save(update_fields=fields)
        payload = _public(row, applicant_id)
        payload["token"] = token
        return JsonResponse(payload)

    if action == "status":
        row, why = _load_session(body.get("token"), device_id)
        if why == "kicked":
            return JsonResponse(_public(None, kicked=True))
        if not row:
            return JsonResponse(_public(None))
        if _note_applicant(row, applicant_id):
            row.save(update_fields=["seen_applicant_ids", "applicant_id", "updated_at"])
        return JsonResponse(_public(row, applicant_id))

    if action == "logout":
        row, _why = _load_session(body.get("token"), device_id)
        if row:
            row.session_hash = ""
            row.device_id = ""
            row.save(update_fields=["session_hash", "device_id", "updated_at"])
        return JsonResponse({"success": True, "loggedIn": False, "access": False})

    if action == "choose":
        row, why = _load_session(body.get("token"), device_id)
        if why == "kicked":
            return JsonResponse(_public(None, kicked=True))
        if not row:
            return JsonResponse({"success": False, "error": "Log in again."}, status=401)
        plan = str(body.get("plan") or "").strip().lower()
        catalog = load_plan_catalog()
        spec = get_plan(plan, catalog)
        if not spec:
            return JsonResponse({"success": False, "error": "Pick a plan."}, status=400)
        now = timezone.now()
        active = _plan_active(row, now)
        if active:
            cur_rank = _plan_rank(row.plan)
            new_rank = int(spec.get("rank") or 0)
            if new_rank <= cur_rank:
                if plan == row.plan:
                    return JsonResponse(
                        {"success": False, "error": "You are already on this plan."},
                        status=400,
                    )
                return JsonResponse(
                    {"success": False, "error": "Pick a higher plan to upgrade."},
                    status=400,
                )
        if plan == "trial" and row.trial_used:
            offer = int(spec.get("offerPrice") or 1)
            return JsonResponse(
                {"success": False, "error": f"The ₹{offer} trial was already used on this email."},
                status=400,
            )
        if plan == "applicant" and not applicant_id:
            return JsonResponse({"success": False, "error": "Open your visa account page, then choose this plan."}, status=400)
        row.plan = plan
        row.amount_inr = plan_amount(plan, catalog)
        row.plan_started = now
        if spec.get("days"):
            row.plan_ends = now + timedelta(days=int(spec["days"]))
        else:
            row.plan_ends = None
        if plan == "trial":
            row.trial_used = True
        if plan == "applicant":
            row.applicant_id = applicant_id
        elif plan == "month":
            # Full access — clear single-applicant lock from a prior plan.
            # Keep seen_applicant_ids history.
            pass
        _note_applicant(row, applicant_id)
        row.save()
        return JsonResponse(_public(row, applicant_id))

    return JsonResponse({"success": False, "error": "unknown action"}, status=400)
