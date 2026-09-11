"""
Cross-applicant hot city: when one account finds dates in a city,
other City Change clients prefer switching there so they can book too.

Stored in DB (not LocMem) so all Gunicorn workers see the same hot city.
"""

from __future__ import annotations

import os
from datetime import timedelta

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


def set_hot_city(city_id: str, city_name: str = "", *, ttl_sec: int | None = None) -> None:
    from .models import HotCityState

    cid = str(city_id or "").strip()
    if not cid:
        return
    ttl = int(ttl_sec if ttl_sec is not None else HOT_CITY_TTL_SEC)
    ttl = max(30, min(ttl, 900))
    obj = HotCityState.load()
    obj.city_id = cid
    obj.city_name = str(city_name or cid).strip() or cid
    obj.expires_at = timezone.now() + timedelta(seconds=ttl)
    obj.save(update_fields=["city_id", "city_name", "expires_at", "updated_at"])


def get_hot_city() -> dict | None:
    from .models import HotCityState

    try:
        obj = HotCityState.objects.filter(pk=1).first()
    except Exception:
        return None
    if not obj:
        return None
    cid = (obj.city_id or "").strip()
    if not cid:
        return None
    if obj.expires_at and timezone.now() >= obj.expires_at:
        if obj.city_id:
            obj.city_id = ""
            obj.city_name = ""
            obj.expires_at = None
            obj.save(update_fields=["city_id", "city_name", "expires_at", "updated_at"])
        return None
    return {
        "id": cid,
        "name": (obj.city_name or cid).strip() or cid,
        "expires_at": obj.expires_at.timestamp() if obj.expires_at else 0,
    }


def clear_hot_city(city_id: str | None = None) -> None:
    from .models import HotCityState

    try:
        obj = HotCityState.objects.filter(pk=1).first()
    except Exception:
        return
    if not obj:
        return
    if city_id is not None and (obj.city_id or "").strip() != str(city_id).strip():
        return
    obj.city_id = ""
    obj.city_name = ""
    obj.expires_at = None
    obj.save(update_fields=["city_id", "city_name", "expires_at", "updated_at"])


def note_contribution_city(
    post_id: str,
    post_name: str,
    days,
    *,
    has_error: bool = False,
) -> None:
    """
    Call after each slot contribution.
    Dates present → mark that city hot; empty/error for the hot city → clear.
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
