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

PLANS = {
    "trial": {"days": 3, "amount": 1, "label": "3-day trial", "rank": 1},
    "month": {"days": 30, "amount": 2999, "label": "30 days", "rank": 3},
    "applicant": {"days": None, "amount": 300, "label": "one applicant", "rank": 2},
}


def _plan_active(row: TikTikLogin, now=None) -> bool:
    now = now or timezone.now()
    if row.plan == "applicant" and row.applicant_id:
        return True
    if row.plan and row.plan_ends and now < row.plan_ends:
        return True
    return False


def _plan_rank(plan: str) -> int:
    spec = PLANS.get(plan or "")
    return int(spec["rank"]) if spec else 0


def _hash(value: str) -> str:
    return hashlib.sha256(value.encode()).hexdigest()


def _norm_email(raw) -> str:
    return str(raw or "").strip().lower()


def _valid_email(email: str) -> bool:
    return "@" in email and "." in email.split("@")[-1] and len(email) <= 254


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
        "access": access,
        "reason": reason,
        "canUpgrade": _plan_active(row, now) and _plan_rank(row.plan) < _plan_rank("month"),
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
        if row.otp_sent_at and timezone.now() - row.otp_sent_at < timedelta(seconds=30):
            wait = max(1, 30 - int((timezone.now() - row.otp_sent_at).total_seconds()))
            return JsonResponse(
                {"success": False, "error": f"Wait {wait}s, then tap Resend.", "waitSec": wait},
                status=429,
            )
        code = f"{secrets.randbelow(10000):04d}"
        try:
            _send_code(email, code)
        except Exception:
            return JsonResponse({"success": False, "error": "Could not send the email. Try again."}, status=502)
        row.otp_hash = _hash(f"{email}:{code}")
        row.otp_expires = timezone.now() + timedelta(minutes=10)
        row.otp_sent_at = timezone.now()
        row.save(update_fields=["otp_hash", "otp_expires", "otp_sent_at", "updated_at"])
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
        if not row or not row.otp_hash or not row.otp_expires:
            return JsonResponse({"success": False, "error": "Ask for a new code first."}, status=400)
        if timezone.now() > row.otp_expires:
            return JsonResponse({"success": False, "error": "That code has expired. Tap Resend."}, status=400)
        if not hmac.compare_digest(row.otp_hash, _hash(f"{email}:{code}")):
            return JsonResponse({"success": False, "error": "Wrong code. Check your email and try again."}, status=400)
        token = secrets.token_urlsafe(32)
        row.session_hash = _hash(token)
        row.device_id = device_id
        row.otp_hash = ""
        row.otp_expires = None
        row.save(update_fields=["session_hash", "device_id", "otp_hash", "otp_expires", "updated_at"])
        payload = _public(row, applicant_id)
        payload["token"] = token
        return JsonResponse(payload)

    if action == "status":
        row, why = _load_session(body.get("token"), device_id)
        if why == "kicked":
            return JsonResponse(_public(None, kicked=True))
        if not row:
            return JsonResponse(_public(None))
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
        spec = PLANS.get(plan)
        if not spec:
            return JsonResponse({"success": False, "error": "Pick a plan."}, status=400)
        now = timezone.now()
        active = _plan_active(row, now)
        if active:
            cur_rank = _plan_rank(row.plan)
            new_rank = _plan_rank(plan)
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
            return JsonResponse({"success": False, "error": "The ₹1 trial was already used on this email."}, status=400)
        if plan == "applicant" and not applicant_id:
            return JsonResponse({"success": False, "error": "Open your visa account page, then choose this plan."}, status=400)
        row.plan = plan
        row.amount_inr = spec["amount"]
        row.plan_started = now
        if spec["days"]:
            row.plan_ends = now + timedelta(days=spec["days"])
        else:
            row.plan_ends = None
        if plan == "trial":
            row.trial_used = True
        if plan == "applicant":
            row.applicant_id = applicant_id
        elif plan == "month":
            # Full access — clear single-applicant lock from a prior plan.
            row.applicant_id = ""
        row.save()
        return JsonResponse(_public(row, applicant_id))

    return JsonResponse({"success": False, "error": "unknown action"}, status=400)
