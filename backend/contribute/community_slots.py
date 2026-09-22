"""Community slot feed — aggregate recent contribution dates by city."""

from __future__ import annotations

from collections import defaultdict
from datetime import datetime, timedelta

from django.http import JsonResponse
from django.utils import timezone
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

from .models import Contribution

LOOKBACK = timedelta(hours=6)
MAX_ROWS = 2500
MONTH_NAMES = (
    "",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
)


def _extract_dates(days) -> list[str]:
    if not isinstance(days, list):
        return []
    out = []
    seen = set()
    for d in days:
        if isinstance(d, dict):
            raw = str(d.get("Date") or d.get("date") or "").strip()[:10]
        else:
            raw = str(d or "").strip()[:10]
        if len(raw) < 10 or raw in seen:
            continue
        try:
            datetime.strptime(raw, "%Y-%m-%d")
        except ValueError:
            continue
        seen.add(raw)
        out.append(raw)
    out.sort()
    return out


def _ago(dt, now) -> str:
    sec = max(0, int((now - dt).total_seconds()))
    if sec < 60:
        return f"{sec}s"
    if sec < 3600:
        return f"{sec // 60}m"
    if sec < 86400:
        return f"{sec // 3600}h"
    return f"{sec // 86400}d"


def _group_months(dates: list[str]) -> list[dict]:
    buckets: dict[tuple[int, int], list[str]] = defaultdict(list)
    for iso in dates:
        y, m, day = iso.split("-")
        buckets[(int(y), int(m))].append(str(int(day)))
    months = []
    for (y, m) in sorted(buckets.keys()):
        months.append(
            {
                "label": f"{y} {MONTH_NAMES[m]}",
                "year": y,
                "month": m,
                "dates": buckets[(y, m)],
            }
        )
    return months


@csrf_exempt
@require_http_methods(["POST", "OPTIONS"])
def community_slots(request):
    if request.method == "OPTIONS":
        return JsonResponse({}, status=204)

    now = timezone.now()
    since = now - LOOKBACK
    qs = (
        Contribution.objects.filter(created_at__gte=since, has_error=False)
        .exclude(days=[])
        .order_by("-created_at")[:MAX_ROWS]
    )

    by_city: dict[str, dict] = {}
    for c in qs:
        post_id = str(c.post_id or "").strip()
        if not post_id:
            continue
        dates = _extract_dates(c.days)
        if not dates:
            continue
        name = str(c.post_name or "").strip() or post_id
        entry = by_city.get(post_id)
        if not entry:
            by_city[post_id] = {
                "postId": post_id,
                "name": name,
                "dates": set(dates),
                "seenAt": c.created_at,
            }
        else:
            entry["dates"].update(dates)
            if name and (not entry["name"] or entry["name"] == post_id):
                entry["name"] = name

    cities = []
    for entry in by_city.values():
        dates = sorted(entry["dates"])
        if not dates:
            continue
        cities.append(
            {
                "postId": entry["postId"],
                "name": entry["name"],
                "dateCount": len(dates),
                "earliest": dates[0],
                "latest": dates[-1],
                "seenAt": entry["seenAt"].isoformat(),
                "seenAgo": _ago(entry["seenAt"], now),
                "months": _group_months(dates),
            }
        )

    cities.sort(key=lambda x: (x["seenAt"], x["dateCount"]), reverse=True)

    return JsonResponse(
        {
            "success": True,
            "updatedAt": now.isoformat(),
            "lookbackHours": int(LOOKBACK.total_seconds() // 3600),
            "cities": cities,
        }
    )
