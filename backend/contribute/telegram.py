"""Send available-slot alerts to Telegram groups/channels via Bot API."""

from __future__ import annotations

import hashlib
import json
import logging
import os
import urllib.error
import urllib.parse
import urllib.request

from django.core.cache import cache
from django.utils import timezone

logger = logging.getLogger(__name__)

# Avoid spamming the same post+dates into Telegram more than once per window.
# Keep this short so new sightings still alert quickly; 45s is enough to stop floods.
DEDUP_SECONDS = int(os.environ.get("TELEGRAM_DEDUP_SECONDS", "45"))


def _bot_token() -> str:
    return (os.environ.get("TELEGRAM_BOT_TOKEN") or "").strip()


def _chat_ids() -> list[str]:
    raw = (os.environ.get("TELEGRAM_CHAT_IDS") or "").strip()
    if not raw:
        return []
    return [c.strip() for c in raw.split(",") if c.strip()]


def _muktesh_chat_ids() -> list[str]:
    raw = (os.environ.get("TELEGRAM_MUKTESH_CHAT_ID") or "").strip()
    if not raw:
        return []
    return [c.strip() for c in raw.split(",") if c.strip()]


def relay_chat_ids(*, include_muktesh: bool = False) -> list[str]:
    """Configured chats plus optional Muktesh recipient(s)."""
    out: list[str] = []
    seen: set[str] = set()
    for cid in _chat_ids() + (_muktesh_chat_ids() if include_muktesh else []):
        if cid and cid not in seen:
            seen.add(cid)
            out.append(cid)
    return out


def _extract_dates(days) -> list[str]:
    out = []
    if not isinstance(days, list):
        return out
    for d in days:
        if isinstance(d, dict) and d.get("Date"):
            out.append(str(d["Date"])[:10])
        elif isinstance(d, str) and d:
            out.append(d[:10])
    return out


def _pretty_date(date_str: str) -> str:
    """Convert YYYY-MM-DD → 23 August 2026."""
    try:
        from datetime import datetime

        dt = datetime.strptime(str(date_str)[:10], "%Y-%m-%d")
        # Day without leading zero + full month name + year
        return f"{dt.day} {dt.strftime('%B %Y')}"
    except Exception:
        return str(date_str)[:10]


def _extract_times(days) -> list[str]:
    out = []
    if not isinstance(days, list):
        return out
    for d in days:
        if not isinstance(d, dict):
            continue
        date = str(d.get("Date") or "")[:10]
        pretty = _pretty_date(date) if date else ""
        for t in d.get("Times") or []:
            if not isinstance(t, dict) or not t.get("Time"):
                continue
            avail = t.get("EntriesAvailable")
            label = f"{pretty} {t['Time']}" if pretty else str(t["Time"])
            if avail is not None:
                label += f" (avail: {avail})"
            out.append(label)
    return out


def _date_emoji(date_str: str) -> str:
    """Pick a calendar emoji colour based on the month number."""
    month_emojis = {
        "01": "❄️", "02": "💐", "03": "🌸", "04": "🌼",
        "05": "🌞", "06": "☀️", "07": "🏖️", "08": "🍂",
        "09": "🍁", "10": "🎃", "11": "🦃", "12": "🎄",
    }
    try:
        month = date_str[5:7]
        return month_emojis.get(month, "📅")
    except Exception:
        return "📅"


def format_slot_message(post_name: str, days, visa_class: str = "") -> str:
    dates = _extract_dates(days)
    times = _extract_times(days)
    now = timezone.localtime().strftime("%d %B %Y %H:%M:%S IST")
    post = post_name or "Unknown post"

    lines = [
        "<b>VISA SLOTS AVAILABLE!</b>",
        "",
        f"🏛️ <b>Post:</b>  {post}",
    ]
    if visa_class:
        lines.append(f"🪪 <b>Visa:</b>  {visa_class}")
    lines.append(f"🕐 <b>Checked:</b>  {now}")
    lines.append("")
    lines.append("━━━━━━━━━━━━━━━━━━━━")

    if dates:
        lines.append(f"📆 <b>Available Dates ({len(dates)}):</b>")
        lines.append("")
        shown = dates[:40]
        for i, d in enumerate(shown):
            lines.append(f"🟢  <b>{_pretty_date(d)}</b>")
            if i < len(shown) - 1:
                lines.append("")  # space between dates
        if len(dates) > 40:
            lines.append("")
            lines.append(f"➕ <i>+{len(dates) - 40} more dates</i>")

    if times:
        lines.append("")
        lines.append("⏰ <b>Available Time Slots:</b>")
        lines.append("")
        shown_t = times[:20]
        for i, t in enumerate(shown_t):
            lines.append(f"🟢  {t}")
            if i < len(shown_t) - 1:
                lines.append("")  # space between times
        if len(times) > 20:
            lines.append("")
            lines.append(f"➕ <i>+{len(times) - 20} more slots</i>")

    lines.append("")
    lines.append("━━━━━━━━━━━━━━━━━━━━")
    lines.append(f"🌐 <a href=\"https://the.gopg.online\">the.gopg.online</a>")
    return "\n".join(lines)


def _dedup_key(post_id: str, days) -> str:
    dates = _extract_dates(days)
    payload = json.dumps({"post": post_id, "dates": dates}, sort_keys=True)
    digest = hashlib.sha256(payload.encode()).hexdigest()[:24]
    return f"tg:slot:{digest}"


def _send_telegram(chat_id: str, text: str, token: str) -> bool:
    url = f"https://api.telegram.org/bot{token}/sendMessage"
    body = urllib.parse.urlencode(
        {
            "chat_id": chat_id,
            "text": text,
            "parse_mode": "HTML",
            "disable_web_page_preview": "true",
        }
    ).encode()
    req = urllib.request.Request(
        url,
        data=body,
        method="POST",
        headers={"Content-Type": "application/x-www-form-urlencoded"},
    )
    try:
        # Short timeout so a slow Telegram hop cannot stall the whole alert path
        with urllib.request.urlopen(req, timeout=5) as resp:
            raw = resp.read().decode("utf-8", errors="replace")
            data = json.loads(raw)
            if not data.get("ok"):
                logger.warning("Telegram API not ok for %s: %s", chat_id, data)
                return False
            return True
    except (urllib.error.URLError, urllib.error.HTTPError, TimeoutError, json.JSONDecodeError) as exc:
        logger.warning("Telegram send failed for %s: %s", chat_id, exc)
        return False


def _send_telegram_photo(chat_id: str, caption: str, photo_bytes: bytes, token: str) -> bool:
    import uuid

    boundary = uuid.uuid4().hex
    body = bytearray()
    for name, val in (
        ("chat_id", chat_id),
        ("parse_mode", "HTML"),
    ):
        body.extend(f"--{boundary}\r\n".encode())
        body.extend(f'Content-Disposition: form-data; name="{name}"\r\n\r\n'.encode())
        body.extend(f"{val}\r\n".encode())
    if caption:
        body.extend(f"--{boundary}\r\n".encode())
        body.extend(b'Content-Disposition: form-data; name="caption"\r\n\r\n')
        body.extend(caption[:1024].encode("utf-8"))
        body.extend(b"\r\n")
    body.extend(f"--{boundary}\r\n".encode())
    body.extend(
        b'Content-Disposition: form-data; name="photo"; filename="visa.jpg"\r\n'
        b"Content-Type: image/jpeg\r\n\r\n"
    )
    body.extend(photo_bytes)
    body.extend(f"\r\n--{boundary}--\r\n".encode())

    url = f"https://api.telegram.org/bot{token}/sendPhoto"
    req = urllib.request.Request(
        url,
        data=bytes(body),
        method="POST",
        headers={"Content-Type": f"multipart/form-data; boundary={boundary}"},
    )
    try:
        with urllib.request.urlopen(req, timeout=12) as resp:
            data = json.loads(resp.read().decode("utf-8", errors="replace"))
            return bool(data.get("ok"))
    except (urllib.error.URLError, urllib.error.HTTPError, TimeoutError, json.JSONDecodeError) as exc:
        logger.warning("Telegram photo failed for %s: %s", chat_id, exc)
        return False


def relay_extension_alert(
    *,
    text: str = "",
    caption: str = "",
    kind: str = "alert",
    dedup_key: str = "",
    skip_dedup: bool = False,
    notify_muktesh: bool = True,
    photo_bytes: bytes | None = None,
) -> int:
    """
    Send a text and/or photo alert from the server bot (user's @visabook_slots_bot).
    Used when the extension relays screenshots / submit / slot alerts.
    """
    token = _bot_token()
    chats = relay_chat_ids(include_muktesh=notify_muktesh)
    if not token or not chats:
        return 0

    msg = (caption or text or "").strip()
    if not msg and not photo_bytes:
        return 0

    if not skip_dedup and dedup_key:
        key = f"tg:relay:{dedup_key}"
        if cache.get(key):
            return 0
        cache.set(key, 1, timeout=max(15, DEDUP_SECONDS))

    sent = 0
    for chat_id in chats:
        ok = False
        if photo_bytes:
            ok = _send_telegram_photo(chat_id, msg, photo_bytes, token)
        elif msg:
            ok = _send_telegram(chat_id, msg, token)
        if ok:
            sent += 1
    if sent:
        logger.info("Telegram relay (%s) sent to %d chat(s)", kind, sent)
    return sent


def notify_available_slots(post: dict, visa_class: str = "") -> int:
    """
    If the post has available Days, send a Telegram alert to all configured chats.
    Returns number of successful sends (0 if skipped / failed / fire-and-forget queued).
    """
    token = _bot_token()
    chats = _chat_ids()
    if not token or not chats:
        return 0

    days = post.get("Days") or []
    dates = _extract_dates(days)
    if not dates:
        return 0
    if post.get("HasError"):
        return 0

    post_id = str(post.get("ID") or post.get("Name") or "unknown")
    key = _dedup_key(post_id, days)
    if cache.get(key):
        logger.info("Telegram skipped (dedup) for %s", post.get("Name") or post_id)
        return 0
    cache.set(key, 1, timeout=max(15, DEDUP_SECONDS))

    text = format_slot_message(
        post_name=str(post.get("Name") or post_id),
        days=days,
        visa_class=visa_class or "",
    )

    # Send in a background thread so slow Telegram API cannot delay /contribute
    # or hold up the next contribution from the extension.
    import threading

    def _fanout():
        sent = 0
        for chat_id in chats:
            if _send_telegram(chat_id, text, token):
                sent += 1
        if sent:
            logger.info(
                "Telegram alert sent to %d chat(s) for %s (%d dates)",
                sent,
                post.get("Name") or post_id,
                len(dates),
            )
        else:
            logger.warning(
                "Telegram alert failed for all chats (%s)",
                post.get("Name") or post_id,
            )

    threading.Thread(target=_fanout, name="tg-notify", daemon=True).start()
    return len(chats)