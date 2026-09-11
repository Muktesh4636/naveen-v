"""
City-change policy served to the extension.

Timing windows, rotate gaps, and next-city selection live here so the
extension zip only executes switches — it does not own the strategy.
"""

from __future__ import annotations

import os
import random
import time
from datetime import datetime, timedelta, timezone as dt_timezone
from zoneinfo import ZoneInfo

IST = ZoneInfo("Asia/Kolkata")

# Fallback defaults if DB settings are empty (kept in sync with CityChangeSettings).
SLOT_WINDOWS = [
    {"slot": 3, "from_min": 0, "from_sec": 0, "to_min": 2, "to_sec": 59},
    {"slot": 1, "from_min": 14, "from_sec": 0, "to_min": 21, "to_sec": 59},
    {"slot": 2, "from_min": 24, "from_sec": 0, "to_min": 31, "to_sec": 59},
    {"slot": 3, "from_min": 54, "from_sec": 0, "to_min": 59, "to_sec": 59},
]
WINDOW_STARTS_SEC = [0, 14 * 60, 24 * 60, 54 * 60]
SLOT_WINDOW_LABEL = ":14:00–:21:59, :24:00–:31:59, :54:00–:02:59"

ROTATE_MIN_GAP_MS = int(os.environ.get("CITY_ROTATE_MIN_GAP_MS", "13000"))
ROTATE_MAX_GAP_MS = int(os.environ.get("CITY_ROTATE_MAX_GAP_MS", "18000"))
# After a point trigger (:MM:SS–:MM:SS same), stay "active" this long so polls can catch it.
POINT_GRACE_SEC = 3


def get_slot_windows() -> list[dict]:
    try:
        from .models import CityChangeSettings

        return CityChangeSettings.load().normalized_windows()
    except Exception:
        return [dict(w) for w in SLOT_WINDOWS]


def _window_from_total(w: dict) -> int:
    if "from_total" in w:
        return int(w["from_total"])
    return int(w.get("from_min", 0)) * 60 + int(w.get("from_sec") or 0)


def _window_to_total(w: dict) -> int:
    if "to_total" in w:
        return int(w["to_total"])
    # Legacy minute-only: inclusive through end of to_min
    to_min = int(w.get("to_min", 0))
    if "to_sec" in w or "from_sec" in w:
        return to_min * 60 + int(w.get("to_sec") or 0)
    return to_min * 60 + 59


def window_is_point(w: dict) -> bool:
    """Same From and To second → one-shot switch at that IST time each hour."""
    return _window_from_total(w) == _window_to_total(w)


def get_window_starts() -> list[int]:
    """Seconds into the IST hour when each window starts."""
    return [_window_from_total(w) for w in get_slot_windows()]


def get_window_label() -> str:
    try:
        from .models import CityChangeSettings

        return CityChangeSettings.load().window_label()
    except Exception:
        return SLOT_WINDOW_LABEL


def _now_ist(now: datetime | None = None) -> datetime:
    if now is None:
        return datetime.now(IST)
    if now.tzinfo is None:
        return now.replace(tzinfo=dt_timezone.utc).astimezone(IST)
    return now.astimezone(IST)


def _elapsed_sec_in_hour(ist: datetime) -> int:
    return ist.minute * 60 + ist.second


def _hour_anchor_ms(ist: datetime) -> int:
    start = ist.replace(minute=0, second=0, microsecond=0)
    return int(start.timestamp() * 1000)


def find_active_window(now: datetime | None = None) -> dict | None:
    """
    Current timing row, if any.
    Range: active while from..to inclusive.
    Point: active at that second and for POINT_GRACE_SEC after (so polls can fire once).
    """
    ist = _now_ist(now)
    elapsed = _elapsed_sec_in_hour(ist)
    for w in get_slot_windows():
        frm = _window_from_total(w)
        to = _window_to_total(w)
        if window_is_point(w):
            if frm <= elapsed <= frm + POINT_GRACE_SEC:
                return w
        elif frm <= elapsed <= to:
            return w
    return None


def active_slot(now: datetime | None = None) -> int:
    w = find_active_window(now)
    return int(w["slot"]) if w else 0


def ms_until_slot_window(now: datetime | None = None) -> int:
    if find_active_window(now):
        return 0
    ist = _now_ist(now)
    elapsed_sec = _elapsed_sec_in_hour(ist)
    starts = get_window_starts()
    for start_sec in starts:
        if elapsed_sec < start_sec:
            return (start_sec - elapsed_sec) * 1000
    first = starts[0] if starts else 0
    return (3600 - elapsed_sec + first) * 1000


def _point_already_switched(
    *,
    last_switch_at_ms: int | None,
    hour_anchor_ms: int,
    from_total_sec: int,
) -> bool:
    """True if we already switched at/after this point in the current IST hour."""
    if not last_switch_at_ms:
        return False
    point_ms = hour_anchor_ms + int(from_total_sec) * 1000
    return int(last_switch_at_ms) >= point_ms


def _ms_until_next_after_point(
    *,
    now: datetime,
    current_from_sec: int,
) -> int:
    """Wait from now until the next window/point start after this point."""
    elapsed = _elapsed_sec_in_hour(now)
    starts = get_window_starts()
    for start_sec in starts:
        if start_sec > current_from_sec and start_sec > elapsed:
            return (start_sec - elapsed) * 1000
    first = starts[0] if starts else 0
    return (3600 - elapsed + first) * 1000


def _rotate_gap_ms(min_ms: int | None = None, max_ms: int | None = None) -> int:
    lo = int(min_ms) if min_ms else ROTATE_MIN_GAP_MS
    hi = int(max_ms) if max_ms else ROTATE_MAX_GAP_MS
    lo = max(1000, lo)
    hi = max(lo, hi)
    return random.randint(lo, hi)


def _normalize_cities(raw) -> list[dict]:
    out = []
    seen = set()
    if not isinstance(raw, list):
        return out
    for item in raw:
        if not isinstance(item, dict):
            continue
        cid = str(item.get("id") or item.get("i") or "").strip()
        if not cid or cid in seen:
            continue
        seen.add(cid)
        name = str(item.get("name") or item.get("n") or cid).strip()
        out.append({"id": cid, "name": name})
    return out


def pick_next_city(cities: list[dict], current_city_id: str | None) -> dict | None:
    cities = _normalize_cities(cities)
    if not cities:
        return None
    if len(cities) == 1:
        return cities[0]
    cur = str(current_city_id or "").strip()
    others = [c for c in cities if c["id"] != cur]
    if not others:
        return cities[0]
    return random.choice(others)


def _hot_city_plan(
    *,
    cities: list[dict],
    current_city_id: str | None,
    now_ms: int,
) -> dict | None:
    """
    If another applicant found dates in a preferred city, switch there now.
    Returns a plan dict, or None to fall through to normal timing.
    """
    try:
        from .hot_city import get_hot_city

        hot = get_hot_city()
    except Exception:
        return None
    if not hot:
        return None
    hot_id = str(hot.get("id") or "").strip()
    if not hot_id:
        return None
    match = next((c for c in cities if c["id"] == hot_id), None)
    if not match:
        return None
    cur = str(current_city_id or "").strip()
    if cur == hot_id:
        # Already on the hot city — stay; recheck soon.
        return {
            "success": True,
            "inWindow": True,
            "slot": 99,
            "switchAt": now_ms + 1000,
            "waitMs": 1000,
            "cityId": None,
            "gapMs": 0,
            "citiesCount": len(cities),
            "hot": True,
        }
    return {
        "success": True,
        "inWindow": True,
        "slot": 99,
        "switchAt": now_ms,
        "waitMs": 0,
        "cityId": hot_id,
        "gapMs": 0,
        "citiesCount": len(cities),
        "hot": True,
    }


def build_rotate_plan(
    *,
    cities: list[dict],
    current_city_id: str | None,
    last_switch_at_ms: int | None,
    now_ms: int | None = None,
    min_gap_ms: int | None = None,
    max_gap_ms: int | None = None,
) -> dict:
    """
    Internal plan dict (clear names). Call encode_plan_wire() before HTTP.

    Timing rules (IST, every hour):
      - Hot city (dates found by any applicant): jump immediately if that city
        is in this applicant's preferred list (bypasses IST windows / gaps).
      - Point row (From == To, e.g. 12:44–12:44): switch once at that second.
      - Range row (From < To, e.g. 14:00–21:30): keep rotating using 13–18s (or
        applicant min/max gap) while inside the window.
      - Outside all rows: wait until the next From time.
    """
    now_ms = int(now_ms if now_ms is not None else time.time() * 1000)
    cities = _normalize_cities(cities)
    ist = _now_ist()
    # Align "now" clock used for window math with now_ms when provided.
    try:
        ist = datetime.fromtimestamp(now_ms / 1000.0, tz=IST)
    except (TypeError, ValueError, OSError):
        ist = _now_ist()

    if not cities:
        return {
            "success": False,
            "inWindow": False,
            "slot": 0,
            "switchAt": now_ms + 5000,
            "waitMs": 5000,
            "cityId": None,
            "gapMs": None,
            "enabled": False,
            "citiesCount": 0,
        }

    # Dates found elsewhere → pull matching applicants onto that city now.
    hot_plan = _hot_city_plan(
        cities=cities, current_city_id=current_city_id, now_ms=now_ms
    )
    if hot_plan:
        return hot_plan

    win = find_active_window(ist)
    if not win:
        wait = ms_until_slot_window(ist)
        # Re-poll within 1s so a newly announced hot city is picked up immediately.
        wait = min(int(wait), 1_000)
        return {
            "success": True,
            "inWindow": False,
            "slot": 0,
            "switchAt": now_ms + wait,
            "waitMs": wait,
            "cityId": None,
            "gapMs": None,
            "citiesCount": len(cities),
        }

    slot = int(win.get("slot") or 1)
    frm = _window_from_total(win)
    to = _window_to_total(win)
    elapsed = _elapsed_sec_in_hour(ist)
    hour_anchor = _hour_anchor_ms(ist)

    # ── Point trigger: one switch at :MM:SS, then wait for next row ─────────
    if window_is_point(win):
        if _point_already_switched(
            last_switch_at_ms=last_switch_at_ms,
            hour_anchor_ms=hour_anchor,
            from_total_sec=frm,
        ):
            wait = min(int(_ms_until_next_after_point(now=ist, current_from_sec=frm)), 1_000)
            return {
                "success": True,
                "inWindow": False,
                "slot": 0,
                "switchAt": now_ms + wait,
                "waitMs": wait,
                "cityId": None,
                "gapMs": None,
                "citiesCount": len(cities),
            }

        # Not yet at the exact second → wait until it (cap 1s for hot-city recheck).
        if elapsed < frm:
            wait = min((frm - elapsed) * 1000, 1_000)
            return {
                "success": True,
                "inWindow": False,
                "slot": 0,
                "switchAt": now_ms + wait,
                "waitMs": wait,
                "cityId": None,
                "gapMs": None,
                "citiesCount": len(cities),
            }

        nxt = pick_next_city(cities, current_city_id)
        if not nxt:
            return {
                "success": False,
                "inWindow": True,
                "slot": slot,
                "switchAt": now_ms + 2000,
                "waitMs": 2000,
                "cityId": None,
                "gapMs": 0,
                "citiesCount": len(cities),
            }
        return {
            "success": True,
            "inWindow": True,
            "slot": slot,
            "switchAt": now_ms,
            "waitMs": 0,
            "cityId": nxt["id"],
            "gapMs": 0,
            "citiesCount": len(cities),
        }

    # ── Range window: rotate with applicant gap (default 13–18s) ─────────────
    # Cap wait so we don't schedule a switch after the window ends.
    remaining_ms = max(0, (to - elapsed) * 1000)
    gap = _rotate_gap_ms(min_gap_ms, max_gap_ms)
    earliest = now_ms
    if last_switch_at_ms:
        earliest = max(earliest, int(last_switch_at_ms) + gap)

    switch_at = earliest if earliest > now_ms else now_ms
    wait_ms = max(0, switch_at - now_ms)

    # If the next gap would land after the window, wait for the next window instead.
    if wait_ms > remaining_ms:
        past = ist + timedelta(seconds=max(1, to - elapsed + 1))
        wait = min(int(ms_until_slot_window(past)), 1_000)
        return {
            "success": True,
            "inWindow": False,
            "slot": 0,
            "switchAt": now_ms + wait,
            "waitMs": wait,
            "cityId": None,
            "gapMs": None,
            "citiesCount": len(cities),
        }

    nxt = pick_next_city(cities, current_city_id)
    if not nxt:
        return {
            "success": False,
            "inWindow": True,
            "slot": slot,
            "switchAt": now_ms + 1000,
            "waitMs": 1000,
            "cityId": None,
            "gapMs": gap,
            "citiesCount": len(cities),
        }

    # Gap still running → re-poll within 1s (hot city can interrupt).
    if wait_ms > 1_000:
        return {
            "success": True,
            "inWindow": False,
            "slot": slot,
            "switchAt": now_ms + 1000,
            "waitMs": 1000,
            "cityId": None,
            "gapMs": gap,
            "citiesCount": len(cities),
        }

    return {
        "success": True,
        "inWindow": True,
        "slot": slot,
        "switchAt": switch_at,
        "waitMs": wait_ms,
        "cityId": nxt["id"],
        "gapMs": gap,
        "citiesCount": len(cities),
    }


def encode_plan_wire(plan: dict) -> dict:
    """
    Opaque JSON keys so Network tab does not show cityName / switchAt / etc.
      k = ok (0|1)
      q = in window (0|1)
      r = slot
      t = switch epoch ms
      u = wait ms
      v = target post id (no display name)
      x = gap ms
      y = enabled (0|1)
      z = cities count
    """
    if not isinstance(plan, dict):
        return {"k": 0}
    return {
        "k": 1 if plan.get("success") else 0,
        "q": 1 if plan.get("inWindow") else 0,
        "r": int(plan.get("slot") or 0),
        "t": int(plan.get("switchAt") or 0),
        "u": int(plan.get("waitMs") or 0),
        "v": str(plan.get("cityId") or ""),
        "x": int(plan["gapMs"]) if plan.get("gapMs") is not None else 0,
        "y": 1 if plan.get("enabled") else 0,
        "z": int(plan.get("citiesCount") or 0),
    }


def decode_plan_request(body: dict) -> dict:
    """Accept opaque or legacy request bodies from the extension."""
    if not isinstance(body, dict):
        return {}
    profile = body.get("p") if isinstance(body.get("p"), dict) else body.get("profile")
    if isinstance(profile, dict):
        # opaque profile: i/e/n/v  or normal id/email/name/visa
        profile = {
            "id": str(
                profile.get("username")
                or profile.get("i")
                or profile.get("id")
                or profile.get("n")
                or profile.get("name")
                or ""
            ).strip(),
            "email": str(profile.get("e") or profile.get("email") or "").strip(),
            "name": str(profile.get("n") or profile.get("name") or "").strip(),
            "visa": str(profile.get("v") or profile.get("visa") or "").strip(),
            "username": str(
                profile.get("username")
                or profile.get("i")
                or profile.get("id")
                or profile.get("n")
                or profile.get("name")
                or ""
            ).strip(),
            "portalId": str(profile.get("portalId") or profile.get("portal_id") or "").strip(),
        }
        if not profile["name"]:
            profile["name"] = profile["username"] or profile["id"]
        if not profile["id"]:
            profile["id"] = profile["username"] or profile["name"]
        if not profile["username"]:
            profile["username"] = profile["id"] or profile["name"]
    else:
        profile = {}

    cities_raw = body.get("l") if "l" in body else body.get("cities")
    return {
        "profile": profile,
        "currentCityId": str(body.get("c") or body.get("currentCityId") or "").strip(),
        "acknowledgeSwitch": bool(body.get("a") if "a" in body else body.get("acknowledgeSwitch")),
        "switchedCityId": str(body.get("s") or body.get("switchedCityId") or "").strip(),
        "cities": cities_raw if isinstance(cities_raw, list) else None,
        "enabled": body.get("y") if "y" in body else body.get("enabled"),
        "token": body.get("token"),
    }


def encode_cities_wire(*, success: bool, cities: list, enabled: bool, applicant_id: str) -> dict:
    # Only ids on the wire — no display names.
    opaque_list = [{"i": c["id"]} for c in _normalize_cities(cities)]
    return {
        "k": 1 if success else 0,
        "l": opaque_list,
        "y": 1 if enabled else 0,
        "i": str(applicant_id or ""),
    }


def _iso_date(value) -> str:
    if not value:
        return ""
    if hasattr(value, "isoformat"):
        return value.isoformat()[:10]
    s = str(value).strip()
    return s[:10] if len(s) >= 10 else s


def encode_auto_submit_wire(
    *,
    success: bool,
    enabled: bool,
    from_date,
    to_date,
    applicant_id: str,
    max_date_tries: int = 3,
    max_slot_tries: int = 4,
    rules: dict | None = None,
) -> dict:
    """
    Opaque Auto Submit prefs + global pick rules.
    y/f/g/md/ms/i = prefs; sk/sr/dh/p1/p2/p3/pn = rules.
    """
    r = rules or {}
    skip = bool(r.get("skip_highest_slot", True))
    start_rank = max(1, min(5, int(r.get("slot_start_rank") or 2)))
    md = max(1, min(5, int(r.get("max_date_tries") or max_date_tries or 3)))
    ms = max(1, min(5, int(r.get("max_slot_tries") or max_slot_tries or 4)))
    # Per-applicant tries win when explicitly passed higher priority via args
    md = max(1, min(5, int(max_date_tries or md)))
    ms = max(1, min(5, int(max_slot_tries or ms)))
    return {
        "k": 1 if success else 0,
        "y": 1 if enabled else 0,
        "f": _iso_date(from_date),
        "g": _iso_date(to_date),
        "md": md,
        "ms": ms,
        "i": str(applicant_id or ""),
        "sk": 1 if skip else 0,
        "sr": start_rank,
        "dh": 1 if bool(r.get("halt_city_while_booking", True)) else 0,
        "p1": max(0, int(r.get("date_pref_1", 0))),
        "p2": max(0, int(r.get("date_pref_2", 1))),
        "p3": max(0, int(r.get("date_pref_3", 2))),
        "pn": max(0, int(r.get("date_pref_many", 2))),
    }


def encode_payment_wire(
    *,
    success: bool,
    paid: bool,
    amount,
    applicant_id: str = "",
    list_amount=None,
    offer_label: str = "",
    offer_active: bool = False,
    upi_id: str = "",
    qr_url: str = "",
    instructions: str = "",
    pending: bool = False,
    pending_utr: str = "",
    start_date=None,
    end_date=None,
    unlock_token: str = "",
    unlock_exp_ms: int = 0,
    device_ok: bool = True,
    device_message: str = "",
    need_phone: bool = False,
    phone: str = "",
    wipe: bool = False,
) -> dict:
    """
    Opaque payment / Tik Tik unlock status.
      k = ok
      w = paid / unlocked (0|1) — only 1 when paid AND device_ok
      m = amount to pay now
      n = list / original amount (may equal m)
      o = offer label
      b = offer active (0|1)
      g = UPI id
      h = QR image URL
      d = instructions
      s = 0 unpaid, 1 pending UTR, 2 paid
      f = pending UTR (if any)
      i = applicant id
      fs = start date ISO
      fe = end date ISO
      j = signed unlock token (required by city plan)
      x = token expiry epoch ms
      c = device ok (0|1)
      e = message (device lock / errors)
      q = need phone before offers (0|1)
      t = confirmed phone digits
      z = wipe client (0|1) — extension must clear local data
    """
    try:
        amt = f"{amount:.2f}" if amount is not None else "0.00"
    except (TypeError, ValueError):
        amt = "0.00"
    try:
        list_amt = f"{list_amount:.2f}" if list_amount is not None else amt
    except (TypeError, ValueError):
        list_amt = amt
    status = 2 if paid else (1 if pending else 0)
    if wipe:
        device_ok = False
        unlock_token = ""
        unlock_exp_ms = 0
        if not device_message:
            device_message = "client wipe"
    unlocked = bool(paid and device_ok and unlock_token and not wipe)

    def _iso(d):
        if not d:
            return ""
        try:
            return d.isoformat()
        except Exception:
            return str(d)[:10]

    return {
        "k": 1 if success else 0,
        "w": 1 if unlocked else 0,
        "m": amt,
        "n": list_amt,
        "o": str(offer_label or ""),
        "b": 1 if offer_active else 0,
        "g": str(upi_id or ""),
        "h": str(qr_url or ""),
        "d": str(instructions or ""),
        "s": status,
        "f": str(pending_utr or ""),
        "i": str(applicant_id or ""),
        "fs": _iso(start_date),
        "fe": _iso(end_date),
        "j": str(unlock_token or ""),
        "x": int(unlock_exp_ms or 0),
        "c": 1 if device_ok else 0,
        "e": str(device_message or ""),
        "q": 1 if need_phone else 0,
        "t": str(phone or ""),
        "z": 1 if wipe else 0,
    }
