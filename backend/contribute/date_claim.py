"""
Assign Auto Submit dates so concurrent accounts on the same city don't all
click the same calendar day. Always filtered to each applicant's From/To.
"""

from __future__ import annotations

import os
from datetime import datetime, timedelta

from django.db.models import Count
from django.utils import timezone

DATE_CLAIM_TTL_SEC = int(os.environ.get("DATE_CLAIM_TTL_SEC", "120"))


def _iso(d) -> str:
    if not d:
        return ""
    if hasattr(d, "isoformat"):
        return d.isoformat()[:10]
    s = str(d).strip()
    return s[:10] if len(s) >= 10 else ""


def _in_range(date_s: str, from_s: str, to_s: str) -> bool:
    d = _iso(date_s)
    if not d:
        return False
    f = _iso(from_s)
    t = _iso(to_s)
    if f and d < f:
        return False
    if t and d > t:
        return False
    return True


def claim_spread_date(
    *,
    applicant,
    city_id: str,
    available_dates: list[str],
    from_date: str = "",
    to_date: str = "",
    avoid_dates: list[str] | None = None,
) -> str | None:
    """
    Pick a date in range with the fewest live claims on this city.
    Ties broken by applicant.pk so accounts spread stably.
    """
    from .models import DatePickClaim

    cid = str(city_id or "").strip()
    if not applicant or not cid:
        return None

    today = timezone.localdate().isoformat()
    avoid = {_iso(x) for x in (avoid_dates or []) if _iso(x)}
    pool = []
    seen = set()
    for raw in available_dates or []:
        d = _iso(raw)
        if not d or d in seen:
            continue
        if d < today:
            continue
        if not _in_range(d, from_date, to_date):
            continue
        seen.add(d)
        pool.append(d)
    if not pool:
        return None

    now = timezone.now()
    ttl = max(30, min(int(DATE_CLAIM_TTL_SEC), 600))
    # Drop expired
    DatePickClaim.objects.filter(expires_at__lt=now).delete()

    counts = {
        row["date"]: int(row["n"])
        for row in (
            DatePickClaim.objects.filter(city_id=cid, expires_at__gte=now)
            .exclude(applicant_id=applicant.pk)
            .values("date")
            .annotate(n=Count("id"))
        )
    }

    # Prefer dates not yet claimed by others; among equals, stable by pk.
    candidates = sorted(
        pool,
        key=lambda d: (
            1 if d in avoid else 0,
            counts.get(d, 0),
            d,
        ),
    )
    # Stable secondary spread when many share the same least-count date.
    least = counts.get(candidates[0], 0) if candidates else 0
    under = [
        d
        for d in candidates
        if counts.get(d, 0) == least and d not in avoid
    ] or [d for d in candidates if counts.get(d, 0) == least] or candidates
    if len(under) > 1:
        pick = under[int(applicant.pk) % len(under)]
    else:
        pick = under[0]

    expires = now + timedelta(seconds=ttl)
    DatePickClaim.objects.update_or_create(
        applicant=applicant,
        city_id=cid,
        defaults={"date": pick, "expires_at": expires},
    )
    return pick
