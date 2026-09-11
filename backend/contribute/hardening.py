"""
Hardening helpers: unlock tokens, device binding, simple rate limits.
Copied extension UI still needs a valid server token + registered device.
"""

from __future__ import annotations

import hashlib
import hmac
import secrets
import time
from typing import Any

from django.conf import settings
from django.core.cache import cache
from django.utils import timezone

# How long an unlock token stays valid (extension must refresh via payment-status).
UNLOCK_TTL_SEC = int(getattr(settings, "UNLOCK_TOKEN_TTL_SEC", 6 * 60 * 60))
DEFAULT_MAX_DEVICES = int(getattr(settings, "APPLICANT_MAX_DEVICES", 2))
RATE_LIMIT_WINDOW_SEC = 60
RATE_LIMIT_MAX_HITS = int(getattr(settings, "API_RATE_LIMIT_PER_MIN", 90))


def _secret() -> bytes:
    raw = getattr(settings, "UNLOCK_SIGNING_SECRET", None) or settings.SECRET_KEY
    return str(raw).encode("utf-8")


def _b64url(data: bytes) -> str:
    import base64

    return base64.urlsafe_b64encode(data).decode("ascii").rstrip("=")


def _b64url_decode(s: str) -> bytes:
    import base64

    pad = "=" * (-len(s) % 4)
    return base64.urlsafe_b64decode(s + pad)


def mint_unlock_token(*, applicant_id: str, device_id: str, paid: bool) -> tuple[str, int]:
    """
    Returns (token, exp_epoch_ms). Unpaid tokens are empty.
    """
    if not paid or not applicant_id or not device_id:
        return "", 0
    exp = int(time.time()) + UNLOCK_TTL_SEC
    payload = f"1|{applicant_id.strip()}|{device_id.strip()}|{exp}"
    sig = hmac.new(_secret(), payload.encode("utf-8"), hashlib.sha256).digest()
    token = _b64url(payload.encode("utf-8")) + "." + _b64url(sig)
    return token, exp * 1000


def verify_unlock_token(token: str, *, applicant_id: str, device_id: str) -> bool:
    if not token or not applicant_id or not device_id:
        return False
    try:
        body_b64, sig_b64 = token.split(".", 1)
        payload = _b64url_decode(body_b64).decode("utf-8")
        expect = hmac.new(_secret(), payload.encode("utf-8"), hashlib.sha256).digest()
        if not hmac.compare_digest(expect, _b64url_decode(sig_b64)):
            return False
        paid_flag, aid, did, exp_s = payload.split("|", 3)
        if paid_flag != "1":
            return False
        if aid != applicant_id.strip() or did != device_id.strip():
            return False
        if int(exp_s) < int(time.time()):
            return False
        return True
    except Exception:
        return False


def extract_device_id(body: dict | None) -> str:
    if not isinstance(body, dict):
        return ""
    return str(body.get("d") or body.get("deviceId") or body.get("installId") or "").strip()[:64]


def extract_unlock_token(body: dict | None) -> str:
    if not isinstance(body, dict):
        return ""
    return str(body.get("j") or body.get("unlockToken") or "").strip()[:256]


def client_ip(request) -> str:
    forwarded = request.META.get("HTTP_X_FORWARDED_FOR") or ""
    if forwarded:
        return forwarded.split(",")[0].strip()[:64]
    return (request.META.get("REMOTE_ADDR") or "")[:64]


def rate_limit_allow(request, bucket: str = "api") -> bool:
    """
    Sliding window counter in Django cache. Returns False when over limit.
    """
    ip = client_ip(request) or "unknown"
    key = f"rl:{bucket}:{ip}"
    try:
        n = cache.get(key)
        if n is None:
            cache.set(key, 1, RATE_LIMIT_WINDOW_SEC)
            return True
        if int(n) >= RATE_LIMIT_MAX_HITS:
            return False
        try:
            cache.incr(key)
        except ValueError:
            cache.set(key, int(n) + 1, RATE_LIMIT_WINDOW_SEC)
        return True
    except Exception:
        # If cache is down, do not lock out real users.
        return True


def register_or_check_device(applicant, device_id: str, user_agent: str = "") -> dict[str, Any]:
    """
    Bind Chrome install id to a paid applicant.
    Unpaid: always ok (no bind required).
    Paid: allow existing device, or new if under max_devices and not revoked.
    """
    from .models import ApplicantDevice

    device_id = (device_id or "").strip()[:64]
    if not device_id:
        return {
            "ok": False,
            "device_ok": False,
            "reason": "missing-device",
            "message": "Reload extension (missing device id).",
        }

    if not applicant.is_paid:
        return {"ok": True, "device_ok": True, "reason": "unpaid", "message": ""}

    max_dev = int(getattr(applicant, "max_devices", None) or DEFAULT_MAX_DEVICES)
    max_dev = max(1, min(max_dev, 10))

    existing = ApplicantDevice.objects.filter(
        applicant=applicant, device_id=device_id
    ).first()
    if existing:
        if existing.revoked:
            return {
                "ok": False,
                "device_ok": False,
                "reason": "revoked",
                "message": "This device was revoked. Contact admin.",
            }
        existing.user_agent = (user_agent or existing.user_agent or "")[:255]
        existing.last_seen_at = timezone.now()
        existing.save(update_fields=["user_agent", "last_seen_at"])
        return {"ok": True, "device_ok": True, "reason": "known", "message": ""}

    active_count = ApplicantDevice.objects.filter(
        applicant=applicant, revoked=False
    ).count()
    if active_count >= max_dev:
        return {
            "ok": False,
            "device_ok": False,
            "reason": "device-limit",
            "message": f"Device limit reached ({max_dev}). Ask admin to remove an old device.",
        }

    ApplicantDevice.objects.create(
        applicant=applicant,
        device_id=device_id,
        user_agent=(user_agent or "")[:255],
    )
    return {"ok": True, "device_ok": True, "reason": "registered", "message": ""}


def new_install_id() -> str:
    return secrets.token_hex(16)
