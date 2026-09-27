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
MONTH_SHORT = (
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
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


def _normalize_time(raw) -> str:
    s = str(raw or "").strip()
    iso = None
    if "T" in s:
        try:
            iso = s.split("T", 1)[1][:5]
        except Exception:
            iso = None
    if iso and len(iso) >= 4:
        return iso
    if len(s) >= 5 and s[2] == ":":
        return s[:5]
    return s[:8] if s else ""


def _merge_day_slots(slots_by_date: dict, days, top_times=None):
    """Merge Times from day objects (and optional top-level times) into slots_by_date."""
    if isinstance(days, list):
        for d in days:
            if not isinstance(d, dict):
                continue
            date = str(d.get("Date") or d.get("date") or "").strip()[:10]
            if len(date) < 10:
                continue
            try:
                datetime.strptime(date, "%Y-%m-%d")
            except ValueError:
                continue
            bucket = slots_by_date.setdefault(date, {})
            for t in d.get("Times") or []:
                if not isinstance(t, dict) or not t.get("Time"):
                    continue
                time = _normalize_time(t.get("Time"))
                if not time:
                    continue
                avail = t.get("EntriesAvailable")
                try:
                    avail_n = int(avail) if avail is not None else None
                except (TypeError, ValueError):
                    avail_n = None
                prev = bucket.get(time)
                if prev is None or (avail_n is not None and (prev is None or avail_n > prev)):
                    bucket[time] = avail_n

    if isinstance(top_times, list) and top_times:
        # Top-level times often belong to one drilled date; attach if only one date in days.
        dates = _extract_dates(days)
        if len(dates) == 1:
            bucket = slots_by_date.setdefault(dates[0], {})
            for t in top_times:
                if not isinstance(t, dict) or not t.get("Time"):
                    continue
                time = _normalize_time(t.get("Time"))
                if not time:
                    continue
                avail = t.get("EntriesAvailable")
                try:
                    avail_n = int(avail) if avail is not None else None
                except (TypeError, ValueError):
                    avail_n = None
                prev = bucket.get(time)
                if prev is None or (avail_n is not None and (prev is None or avail_n > prev)):
                    bucket[time] = avail_n


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


def _pretty_date(iso: str) -> str:
    try:
        y, m, d = iso.split("-")
        return f"{int(d)} {MONTH_SHORT[int(m)]} {y}"
    except Exception:
        return iso


def _slots_label(slot_map: dict) -> str:
    if not slot_map:
        return "available"
    parts = []
    for time in sorted(slot_map.keys()):
        avail = slot_map[time]
        if avail is None:
            parts.append(time)
        else:
            parts.append(f"{time} ({avail})")
    return ", ".join(parts)


@csrf_exempt
@require_http_methods(["GET", "POST", "OPTIONS"])
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
            entry = {
                "postId": post_id,
                "name": name,
                "dates": set(dates),
                "slotsByDate": {},
                "seenAt": c.created_at,
                "seenAtByDate": {d: c.created_at for d in dates},
            }
            by_city[post_id] = entry
        else:
            entry["dates"].update(dates)
            if c.created_at and (
                not entry["seenAt"] or c.created_at > entry["seenAt"]
            ):
                entry["seenAt"] = c.created_at
            for d in dates:
                prev = entry["seenAtByDate"].get(d)
                if prev is None or c.created_at > prev:
                    entry["seenAtByDate"][d] = c.created_at
            if name and (not entry["name"] or entry["name"] == post_id):
                entry["name"] = name

        _merge_day_slots(entry["slotsByDate"], c.days, c.times)

    cities = []
    rows = []
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
        for date in dates:
            slot_map = entry["slotsByDate"].get(date) or {}
            seen = entry["seenAtByDate"].get(date) or entry["seenAt"]
            rows.append(
                {
                    "city": entry["name"],
                    "postId": entry["postId"],
                    "date": date,
                    "dateLabel": _pretty_date(date),
                    "slots": _slots_label(slot_map),
                    "slotCount": len(slot_map),
                    "seenAt": seen.isoformat() if seen else "",
                    "seenAgo": _ago(seen, now) if seen else "",
                }
            )

    cities.sort(key=lambda x: (x["seenAt"], x["dateCount"]), reverse=True)
    rows.sort(key=lambda r: (r["city"], r["date"]))

    return JsonResponse(
        {
            "success": True,
            "updatedAt": now.isoformat(),
            "lookbackHours": int(LOOKBACK.total_seconds() // 3600),
            "cities": cities,
            "rows": rows,
        }
    )
