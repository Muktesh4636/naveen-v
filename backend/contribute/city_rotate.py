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

# Hourly IST burst windows (same product behaviour as before, now server-owned).
SLOT_WINDOWS = [
    {"slot": 3, "from_min": 0, "to_min": 2},
    {"slot": 1, "from_min": 14, "to_min": 21},
    {"slot": 2, "from_min": 24, "to_min": 31},
    {"slot": 3, "from_min": 54, "to_min": 59},
]
WINDOW_STARTS_MIN = [0, 14, 24, 54]
SLOT_WINDOW_LABEL = ":14–:21, :24–:31, :54–:02"

ROTATE_MIN_GAP_MS = int(os.environ.get("CITY_ROTATE_MIN_GAP_MS", "13000"))
ROTATE_MAX_GAP_MS = int(os.environ.get("CITY_ROTATE_MAX_GAP_MS", "18000"))


def _now_ist(now: datetime | None = None) -> datetime:
    if now is None:
        return datetime.now(IST)
    if now.tzinfo is None:
        return now.replace(tzinfo=dt_timezone.utc).astimezone(IST)
    return now.astimezone(IST)


def active_slot(now: datetime | None = None) -> int:
    ist = _now_ist(now)
    minute = ist.minute
    for w in SLOT_WINDOWS:
        if w["from_min"] <= minute <= w["to_min"]:
            return int(w["slot"])
    return 0


def ms_until_slot_window(now: datetime | None = None) -> int:
    if active_slot(now):
        return 0
    ist = _now_ist(now)
    elapsed_sec = ist.minute * 60 + ist.second
    for start_min in WINDOW_STARTS_MIN:
        start_sec = start_min * 60
        if elapsed_sec < start_sec:
            return (start_sec - elapsed_sec) * 1000
    # Past :54–:59 → next hour :00
    return (3600 - elapsed_sec) * 1000


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
    """
    now_ms = int(now_ms if now_ms is not None else time.time() * 1000)
    cities = _normalize_cities(cities)

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

    slot = active_slot()
    if not slot:
        wait = ms_until_slot_window()
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

    gap = _rotate_gap_ms(min_gap_ms, max_gap_ms)
    earliest = now_ms
    if last_switch_at_ms:
        earliest = max(earliest, int(last_switch_at_ms) + gap)

    switch_at = earliest if earliest > now_ms else now_ms
    wait_ms = max(0, switch_at - now_ms)

    nxt = pick_next_city(cities, current_city_id)
    if not nxt:
        return {
            "success": False,
            "inWindow": True,
            "slot": slot,
            "switchAt": now_ms + 5000,
            "waitMs": 5000,
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
        # city name intentionally omitted from wire format
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
            "id": str(profile.get("i") or profile.get("id") or profile.get("n") or profile.get("name") or "").strip(),
            "email": str(profile.get("e") or profile.get("email") or "").strip(),
            "name": str(profile.get("n") or profile.get("name") or "").strip(),
            "visa": str(profile.get("v") or profile.get("visa") or "").strip(),
            "username": str(profile.get("username") or profile.get("n") or profile.get("name") or "").strip(),
            "portalId": str(profile.get("portalId") or profile.get("portal_id") or "").strip(),
        }
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
) -> dict:
    """
    Opaque payment / Tik Tik unlock status.
      k = ok
      w = paid / unlocked (0|1)
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
    return {
        "k": 1 if success else 0,
        "w": 1 if paid else 0,
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
    }
