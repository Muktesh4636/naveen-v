"""
Cross-applicant hot cities: when accounts find dates, others with that city
in prefs can jump there. Multiple cities can be hot at once (e.g. Chennai +
Hyderabad) so users already on a hot city are left alone.
"""

from __future__ import annotations

import os
from datetime import datetime, timedelta, timezone as dt_timezone

from django.utils import timezone

HOT_CITY_TTL_SEC = int(os.environ.get("HOT_CITY_TTL_SEC", "180"))


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


def _parse_expires(raw) -> datetime | None:
    if raw is None:
        return None
    if isinstance(raw, datetime):
        if raw.tzinfo is None:
            return raw.replace(tzinfo=dt_timezone.utc)
        return raw
    s = str(raw).strip()
    if not s:
        return None
    try:
        # ISO from JSON
        dt = datetime.fromisoformat(s.replace("Z", "+00:00"))
        if dt.tzinfo is None:
            dt = dt.replace(tzinfo=dt_timezone.utc)
        return dt
    except ValueError:
        return None


def _entry_from_legacy(obj) -> dict | None:
    cid = (obj.city_id or "").strip()
    if not cid:
        return None
    return {
        "id": cid,
        "name": (obj.city_name or cid).strip() or cid,
        "expires_at": obj.expires_at.isoformat() if obj.expires_at else None,
    }


def _load_cities_list(obj) -> list[dict]:
    raw = getattr(obj, "cities", None)
    out: list[dict] = []
    seen = set()
    if isinstance(raw, list):
        for item in raw:
            if not isinstance(item, dict):
                continue
            cid = str(item.get("id") or "").strip()
            if not cid or cid in seen:
                continue
            seen.add(cid)
            out.append(
                {
                    "id": cid,
                    "name": str(item.get("name") or cid).strip() or cid,
                    "expires_at": item.get("expires_at"),
                }
            )
    # Migrate legacy singleton fields into the list once.
    if not out:
        legacy = _entry_from_legacy(obj)
        if legacy:
            out.append(legacy)
    return out


def _prune(cities: list[dict], now: datetime | None = None) -> list[dict]:
    now = now or timezone.now()
    kept = []
    for c in cities:
        exp = _parse_expires(c.get("expires_at"))
        if exp and now >= exp:
            continue
        kept.append(c)
    return kept


def _sync_legacy_fields(obj, cities: list[dict]) -> None:
    """Keep city_id/name/expires_at = most recently touched entry for panel UI."""
    if not cities:
        obj.city_id = ""
        obj.city_name = ""
        obj.expires_at = None
        return
    # Prefer the one with latest expires_at (refreshed = still hot).
    def sort_key(c):
        exp = _parse_expires(c.get("expires_at"))
        return exp or datetime.min.replace(tzinfo=dt_timezone.utc)

    top = max(cities, key=sort_key)
    obj.city_id = top["id"]
    obj.city_name = top.get("name") or top["id"]
    obj.expires_at = _parse_expires(top.get("expires_at"))


def set_hot_city(city_id: str, city_name: str = "", *, ttl_sec: int | None = None) -> None:
    from .models import HotCityState

    cid = str(city_id or "").strip()
    if not cid:
        return
    ttl = int(ttl_sec if ttl_sec is not None else HOT_CITY_TTL_SEC)
    ttl = max(30, min(ttl, 900))
    now = timezone.now()
    expires = now + timedelta(seconds=ttl)
    obj = HotCityState.load()
    cities = _prune(_load_cities_list(obj), now)
    name = str(city_name or cid).strip() or cid
    found = False
    for c in cities:
        if c["id"] == cid:
            c["name"] = name
            c["expires_at"] = expires.isoformat()
            found = True
            break
    if not found:
        cities.append({"id": cid, "name": name, "expires_at": expires.isoformat()})
    obj.cities = cities
    _sync_legacy_fields(obj, cities)
    obj.save(update_fields=["cities", "city_id", "city_name", "expires_at", "updated_at"])


def get_hot_cities() -> list[dict]:
    from .models import HotCityState

    try:
        obj = HotCityState.objects.filter(pk=1).first()
    except Exception:
        return []
    if not obj:
        return []
    now = timezone.now()
    cities = _prune(_load_cities_list(obj), now)
    # Persist prune if something expired.
    if cities != _load_cities_list(obj):
        obj.cities = cities
        _sync_legacy_fields(obj, cities)
        try:
            obj.save(
                update_fields=["cities", "city_id", "city_name", "expires_at", "updated_at"]
            )
        except Exception:
            pass
    return [
        {
            "id": c["id"],
            "name": c.get("name") or c["id"],
            "expires_at": (_parse_expires(c.get("expires_at")) or now).timestamp(),
        }
        for c in cities
    ]


def get_hot_city() -> dict | None:
    """Most recently refreshed hot city (back-compat)."""
    cities = get_hot_cities()
    if not cities:
        return None
    return max(cities, key=lambda c: c.get("expires_at") or 0)


def clear_hot_city(city_id: str | None = None) -> None:
    from .models import HotCityState

    try:
        obj = HotCityState.objects.filter(pk=1).first()
    except Exception:
        return
    if not obj:
        return
    if city_id is None:
        obj.cities = []
        obj.city_id = ""
        obj.city_name = ""
        obj.expires_at = None
        obj.save(
            update_fields=["cities", "city_id", "city_name", "expires_at", "updated_at"]
        )
        return
    want = str(city_id).strip()
    cities = [c for c in _load_cities_list(obj) if c.get("id") != want]
    cities = _prune(cities)
    obj.cities = cities
    _sync_legacy_fields(obj, cities)
    obj.save(update_fields=["cities", "city_id", "city_name", "expires_at", "updated_at"])


def note_contribution_city(
    post_id: str,
    post_name: str,
    days,
    *,
    has_error: bool = False,
) -> None:
    """
    Call after each slot contribution.
    Dates present → mark that city hot (keep other hot cities);
    empty/error for that city → clear only that city.
    """
    cid = str(post_id or "").strip()
    if not cid:
        return
    if has_error:
        clear_hot_city(cid)
        return
    dates = _extract_dates(days)
    if dates:
        set_hot_city(cid, post_name or cid)
    else:
        clear_hot_city(cid)
