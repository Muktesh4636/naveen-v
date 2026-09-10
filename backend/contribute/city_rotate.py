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


def _rotate_gap_ms() -> int:
    lo = max(1000, ROTATE_MIN_GAP_MS)
    hi = max(lo, ROTATE_MAX_GAP_MS)
    return random.randint(lo, hi)


def _normalize_cities(raw) -> list[dict]:
    out = []
    seen = set()
    if not isinstance(raw, list):
        return out
    for item in raw:
        if not isinstance(item, dict):
            continue
        cid = str(item.get("id") or "").strip()
        if not cid or cid in seen:
            continue
        seen.add(cid)
        name = str(item.get("name") or cid).strip()
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
) -> dict:
    """
    Return a plan the extension can execute locally.

    Fields:
      success, inWindow, slot, switchAt (epoch ms), waitMs, cityId, cityName,
      gapMs, windowLabel, message
    """
    now_ms = int(now_ms if now_ms is not None else time.time() * 1000)
    cities = _normalize_cities(cities)
    label = SLOT_WINDOW_LABEL

    if not cities:
        return {
            "success": False,
            "error": "no_cities",
            "inWindow": False,
            "slot": 0,
            "switchAt": now_ms + 5000,
            "waitMs": 5000,
            "cityId": None,
            "cityName": None,
            "gapMs": None,
            "windowLabel": label,
            "message": "No cities stored for this applicant — select cities in Tik Tik.",
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
            "cityName": None,
            "gapMs": None,
            "windowLabel": label,
            "message": f"Outside IST windows {label}; next window in {max(1, wait // 1000)}s",
        }

    gap = _rotate_gap_ms()
    earliest = now_ms
    if last_switch_at_ms:
        earliest = max(earliest, int(last_switch_at_ms) + gap)

    # If due immediately, still attach a tiny delay so prefetch can complete.
    switch_at = earliest if earliest > now_ms else now_ms
    wait_ms = max(0, switch_at - now_ms)

    nxt = pick_next_city(cities, current_city_id)
    if not nxt:
        return {
            "success": False,
            "error": "no_next_city",
            "inWindow": True,
            "slot": slot,
            "switchAt": now_ms + 5000,
            "waitMs": 5000,
            "cityId": None,
            "cityName": None,
            "gapMs": gap,
            "windowLabel": label,
            "message": "Could not pick next city",
        }

    return {
        "success": True,
        "inWindow": True,
        "slot": slot,
        "switchAt": switch_at,
        "waitMs": wait_ms,
        "cityId": nxt["id"],
        "cityName": nxt["name"],
        "gapMs": gap,
        "windowLabel": label,
        "message": (
            f"Slot {slot}: next {nxt['name']} in {max(0, wait_ms // 1000)}s "
            f"(server plan)"
        ),
    }
