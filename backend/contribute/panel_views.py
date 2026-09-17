"""
Staff ops panel: edit extension timings + browse city/slot contribution history.
"""

from __future__ import annotations

import json
import os
import re
from datetime import timedelta
from pathlib import Path

from django.conf import settings
from django.contrib import messages
from django.contrib.admin.views.decorators import staff_member_required
from django.contrib.auth import authenticate, login, logout
from django.db.models import Count, F, Max, Q
from django.shortcuts import redirect, render
from django.utils import timezone
from django.views.decorators.http import require_http_methods

from .models import Applicant, Contribution, HumanClickSample

DEFAULT_CONFIG = {
    "version": 1,
    "updatedAt": "",
    "slotWindowLabel": ":05–:13, :14–:21, :24–:31, :35–:50, :54–:02",
    "slotWindows": [
        {"slot": 5, "fromMin": 0, "toMin": 2},
        {"slot": 1, "fromMin": 5, "toMin": 13},
        {"slot": 2, "fromMin": 14, "toMin": 21},
        {"slot": 3, "fromMin": 24, "toMin": 31},
        {"slot": 4, "fromMin": 35, "toMin": 50},
        {"slot": 5, "fromMin": 54, "toMin": 59},
    ],
    "cityLoadingMaxMs": 180000,
    "cityCalendarNoDatesMs": 20000,
    "cityRotateMinGapMs": 13000,
    "cityRotateMaxGapMs": 18000,
    "cityHoldMaxMs": 45000,
    "homeKeepaliveMinMs": 600000,
    "homeKeepaliveMaxMs": 600000,
    "homeKeepaliveDebounceMs": 480000,
    "loadingStuckMs": 120000,
    "loadingStuckDebounceMs": 90000,
}


def _config_paths() -> list[Path]:
    paths: list[Path] = []
    env = getattr(settings, "RUNTIME_CONFIG_PATH", "") or os.environ.get("RUNTIME_CONFIG_PATH", "")
    if env:
        paths.append(Path(env))
    # Production static site
    paths.append(Path("/var/www/the.gopg.online/frontend/extension-runtime-config.json"))
    paths.append(Path("/var/www/the.gopg.online/extension-runtime-config.json"))
    # Local repo website copy
    repo_root = Path(settings.BASE_DIR).resolve().parent.parent
    paths.append(repo_root / "website" / "extension-runtime-config.json")
    return paths


def load_runtime_config() -> dict:
    for path in _config_paths():
        try:
            if path.is_file():
                with path.open("r", encoding="utf-8") as f:
                    data = json.load(f)
                if isinstance(data, dict):
                    merged = {**DEFAULT_CONFIG, **data}
                    return merged
        except Exception:
            continue
    return dict(DEFAULT_CONFIG)


def save_runtime_config(data: dict) -> list[str]:
    """Write config to all writable known paths. Returns list of written paths."""
    written: list[str] = []
    payload = json.dumps(data, indent=2, ensure_ascii=False) + "\n"
    for path in _config_paths():
        try:
            path.parent.mkdir(parents=True, exist_ok=True)
            path.write_text(payload, encoding="utf-8")
            written.append(str(path))
        except Exception:
            continue
    return written


def _clamp_int(raw, lo, hi, default):
    try:
        v = int(raw)
    except (TypeError, ValueError):
        return default
    return max(lo, min(hi, v))


def _parse_windows_from_post(post) -> list[dict]:
    windows = []
    # Prefer structured rows: from_0, to_0, slot_0 ...
    for i in range(12):
        fr = post.get(f"from_{i}")
        to = post.get(f"to_{i}")
        if fr in (None, "") and to in (None, ""):
            continue
        windows.append(
            {
                "slot": _clamp_int(post.get(f"slot_{i}"), 1, 12, i + 1),
                "fromMin": _clamp_int(fr, 0, 59, 0),
                "toMin": _clamp_int(to, 0, 59, 0),
            }
        )
    # Fallback: textarea "5-13\n14-21"
    if not windows:
        raw = (post.get("windows_text") or "").strip()
        for line in raw.splitlines():
            line = line.strip()
            if not line or line.startswith("#"):
                continue
            line = line.replace("–", "-").replace(":", "")
            parts = [p.strip() for p in line.replace(",", "-").split("-") if p.strip()]
            if len(parts) >= 2:
                windows.append(
                    {
                        "slot": len(windows) + 1,
                        "fromMin": _clamp_int(parts[0], 0, 59, 0),
                        "toMin": _clamp_int(parts[1], 0, 59, 0),
                    }
                )
    # Keep only valid from<=to. Empty list is allowed (user deleted all rows).
    clean = []
    for w in windows:
        if w["fromMin"] <= w["toMin"]:
            clean.append(w)
    return clean


def _label_from_windows(windows: list[dict]) -> str:
    parts = []
    for w in windows:
        if w["fromMin"] == 0 and w["toMin"] <= 2:
            continue  # wrap tail shown with :54
        parts.append(f":{w['fromMin']:02d}–:{w['toMin']:02d}")
    # Ensure :54–:02 style if wrap exists
    has_wrap = any(w["fromMin"] >= 54 for w in windows) and any(w["fromMin"] == 0 for w in windows)
    if has_wrap and parts and not parts[-1].startswith(":54"):
        # rebuild chronologically without 0-2 alone
        ordered = sorted(
            [w for w in windows if not (w["fromMin"] == 0 and w["toMin"] <= 2)],
            key=lambda x: x["fromMin"],
        )
        parts = [f":{w['fromMin']:02d}–:{w['toMin']:02d}" for w in ordered]
        parts.append(":54–:02")
    return ", ".join(parts) if parts else DEFAULT_CONFIG["slotWindowLabel"]


def _day_count(days) -> int:
    if not isinstance(days, list):
        return 0
    return len(days)


def _days_fingerprint(days) -> str:
    """Stable signature of available dates so identical CGI results can be deduped."""
    if not isinstance(days, list) or not days:
        return ""
    labels = []
    for d in days:
        if isinstance(d, dict):
            labels.append(str(d.get("Date") or d.get("date") or "").strip()[:10])
        else:
            labels.append(str(d).strip()[:10])
    return "|".join(sorted(x for x in labels if x))


def _contrib_dedupe_key(c) -> tuple:
    aid = getattr(c, "applicant_id", None) or 0
    return (
        aid,
        str(getattr(c, "post_id", "") or ""),
        bool(getattr(c, "has_error", False)),
        _days_fingerprint(getattr(c, "days", None)),
    )


def _dedupe_contributions(items, window_sec: int = 120):
    """
    Keep only real unique checks: same user + city + same date result
    within `window_sec` collapses to the newest row.
    `items` must be newest-first.
    """
    kept = []
    last_kept: dict[tuple, object] = {}
    for c in items:
        key = _contrib_dedupe_key(c)
        prev = last_kept.get(key)
        if prev is not None:
            dt = abs((c.created_at - prev.created_at).total_seconds())
            if dt <= window_sec:
                continue
        kept.append(c)
        last_kept[key] = c
    return kept


def _format_days(days, limit=8) -> str:
    if not isinstance(days, list) or not days:
        return "—"
    labels = []
    for d in days[:limit]:
        if isinstance(d, dict):
            labels.append(str(d.get("Date") or d.get("date") or "")[:10])
        else:
            labels.append(str(d)[:10])
    labels = [x for x in labels if x]
    extra = len(days) - limit
    text = ", ".join(labels) if labels else "—"
    if extra > 0:
        text += f" (+{extra})"
    return text


@require_http_methods(["GET", "POST"])
def panel_login(request):
    if request.user.is_authenticated and request.user.is_staff:
        return redirect("panel_home")
    error = ""
    if request.method == "POST":
        user = authenticate(
            request,
            username=(request.POST.get("username") or "").strip(),
            password=request.POST.get("password") or "",
        )
        if user and user.is_staff:
            login(request, user)
            return redirect(request.GET.get("next") or "panel_home")
        error = "Invalid staff login."
    return render(request, "panel/login.html", {"error": error})


def panel_logout(request):
    logout(request)
    return redirect("panel_login")


@staff_member_required(login_url="/panel/login/")
def panel_home(request):
    now = timezone.now()
    since_24h = now - timedelta(hours=24)
    since_7d = now - timedelta(days=7)

    # Unique people (email preferred), not raw Applicant rows.
    seen_keys = set()
    total_users = 0
    for a in Applicant.objects.only("id", "email", "applicant_id"):
        email = (a.email or "").strip().lower()
        if email:
            key = ("e", email)
        else:
            aid = str(a.applicant_id or "").strip()
            m = re.search(r"\((\d{5,})\)", aid)
            key = ("i", m.group(1) if m else aid.lower() or f"pk:{a.pk}")
        if key in seen_keys:
            continue
        seen_keys.add(key)
        total_users += 1
    active_24h = (
        Contribution.objects.filter(created_at__gte=since_24h)
        .exclude(applicant_id=None)
        .values("applicant_id")
        .distinct()
        .count()
    )

    raw_24h = list(
        Contribution.objects.filter(created_at__gte=since_24h).order_by("-created_at")[:2000]
    )
    uniq_24h = _dedupe_contributions(raw_24h)
    checks_24h = len(uniq_24h)
    slots_24h = sum(
        1 for c in uniq_24h if (not c.has_error and _day_count(c.days) > 0)
    )

    clicks = 0
    try:
        clicks = HumanClickSample.objects.filter(created_at__gte=since_24h).count()
    except Exception:
        clicks = 0

    raw_7d = list(
        Contribution.objects.filter(created_at__gte=since_7d).order_by("-created_at")[:5000]
    )
    uniq_7d = _dedupe_contributions(raw_7d)
    city_map: dict[tuple, dict] = {}
    for c in uniq_7d:
        key = (c.post_id or "", c.post_name or "")
        row = city_map.setdefault(
            key,
            {"post_id": c.post_id, "post_name": c.post_name, "checks": 0, "with_slots": 0, "errors": 0, "last_at": c.created_at},
        )
        row["checks"] += 1
        if c.has_error:
            row["errors"] += 1
        elif _day_count(c.days) > 0:
            row["with_slots"] += 1
        if c.created_at and (row["last_at"] is None or c.created_at > row["last_at"]):
            row["last_at"] = c.created_at
    city_rows = sorted(
        city_map.values(),
        key=lambda r: (r["with_slots"], r["checks"]),
        reverse=True,
    )

    recent_src = _dedupe_contributions(
        list(Contribution.objects.select_related("applicant").order_by("-created_at")[:400])
    )[:40]
    recent_rows = []
    for c in recent_src:
        n_days = _day_count(c.days)
        recent_rows.append(
            {
                "when": timezone.localtime(c.created_at),
                "city": c.post_name or c.post_id or "—",
                "user": (c.applicant.name or c.applicant.email or c.applicant.applicant_id)
                if c.applicant
                else "—",
                "days": n_days,
                "days_preview": _format_days(c.days),
                "status": "SLOTS" if (not c.has_error and n_days) else ("ERROR" if c.has_error else "EMPTY"),
                "error": (c.error_string or "")[:120],
            }
        )

    cfg = load_runtime_config()
    return render(
        request,
        "panel/home.html",
        {
            "stats": {
                "users": total_users,
                "active_24h": active_24h,
                "checks_24h": checks_24h,
                "slots_24h": slots_24h,
                "clicks_24h": clicks,
            },
            "city_rows": city_rows,
            "recent_rows": recent_rows,
            "cfg": cfg,
            "section": "home",
        },
    )


@staff_member_required(login_url="/panel/login/")
@require_http_methods(["GET", "POST"])
def panel_timings(request):
    cfg = load_runtime_config()
    if request.method == "POST":
        windows = _parse_windows_from_post(request.POST)
        if not windows:
            messages.error(request, "Add at least one timing window before saving.")
            return redirect("panel_timings")
        label = (request.POST.get("slotWindowLabel") or "").strip() or _label_from_windows(windows)
        next_cfg = {
            "version": _clamp_int(request.POST.get("version"), 1, 999999, cfg.get("version", 1)),
            "updatedAt": timezone.localtime().strftime("%Y-%m-%d %H:%M IST"),
            "slotWindowLabel": label[:120],
            "slotWindows": windows,
            "cityLoadingMaxMs": _clamp_int(request.POST.get("cityLoadingMaxMs"), 10000, 300000, 180000),
            "cityCalendarNoDatesMs": _clamp_int(request.POST.get("cityCalendarNoDatesMs"), 5000, 120000, 20000),
            "cityRotateMinGapMs": _clamp_int(request.POST.get("cityRotateMinGapMs"), 5000, 60000, 13000),
            "cityRotateMaxGapMs": _clamp_int(request.POST.get("cityRotateMaxGapMs"), 5000, 90000, 18000),
            "cityHoldMaxMs": _clamp_int(request.POST.get("cityHoldMaxMs"), 10000, 180000, 45000),
            "homeKeepaliveMinMs": _clamp_int(request.POST.get("homeKeepaliveMinMs"), 120000, 1800000, 600000),
            "homeKeepaliveMaxMs": _clamp_int(request.POST.get("homeKeepaliveMaxMs"), 120000, 1800000, 600000),
            "homeKeepaliveDebounceMs": _clamp_int(request.POST.get("homeKeepaliveDebounceMs"), 60000, 1800000, 480000),
            "loadingStuckMs": _clamp_int(request.POST.get("loadingStuckMs"), 30000, 600000, 120000),
            "loadingStuckDebounceMs": _clamp_int(request.POST.get("loadingStuckDebounceMs"), 30000, 600000, 90000),
        }
        if next_cfg["cityRotateMaxGapMs"] < next_cfg["cityRotateMinGapMs"]:
            next_cfg["cityRotateMaxGapMs"] = next_cfg["cityRotateMinGapMs"]
        if next_cfg["homeKeepaliveMaxMs"] < next_cfg["homeKeepaliveMinMs"]:
            next_cfg["homeKeepaliveMaxMs"] = next_cfg["homeKeepaliveMinMs"]

        written = save_runtime_config(next_cfg)
        if written:
            messages.success(request, f"Timings saved ({len(written)} file(s)). Extensions pick up within ~5 min.")
        else:
            messages.error(request, "Could not write config file — check server permissions.")
        return redirect("panel_timings")

    # Existing windows only — add/delete rows in the form.
    windows = list(cfg.get("slotWindows") or [])
    if not windows:
        windows = [{"slot": 1, "fromMin": "", "toMin": ""}]

    return render(
        request,
        "panel/timings.html",
        {
            "cfg": cfg,
            "windows": windows,
            "section": "timings",
        },
    )


@staff_member_required(login_url="/panel/login/")
def panel_history(request):
    q_city = (request.GET.get("city") or "").strip()
    q_user = (request.GET.get("user") or "").strip()
    only_slots = request.GET.get("slots") == "1"
    hours = _clamp_int(request.GET.get("hours"), 1, 24 * 30, 48)

    since = timezone.now() - timedelta(hours=hours)
    qs = Contribution.objects.select_related("applicant").filter(created_at__gte=since)
    if q_city:
        qs = qs.filter(Q(post_name__icontains=q_city) | Q(post_id__icontains=q_city))
    if q_user:
        qs = qs.filter(
            Q(applicant__name__icontains=q_user)
            | Q(applicant__email__icontains=q_user)
            | Q(applicant__applicant_id__icontains=q_user)
        )
    if only_slots:
        qs = qs.filter(has_error=False).exclude(days=[])

    qs = qs.order_by("-created_at")[:800]
    uniq = _dedupe_contributions(list(qs))[:300]
    rows = []
    for c in uniq:
        n_days = _day_count(c.days)
        rows.append(
            {
                "when": timezone.localtime(c.created_at),
                "city": c.post_name or c.post_id or "—",
                "post_id": c.post_id,
                "user": (c.applicant.name or c.applicant.email or c.applicant.applicant_id)
                if c.applicant
                else "—",
                "email": c.applicant.email if c.applicant else "",
                "days": n_days,
                "days_preview": _format_days(c.days, limit=12),
                "status": "SLOTS" if (not c.has_error and n_days) else ("ERROR" if c.has_error else "EMPTY"),
                "error": (c.error_string or "")[:160],
            }
        )

    cities = (
        Contribution.objects.filter(created_at__gte=since)
        .exclude(post_name="")
        .values_list("post_name", flat=True)
        .distinct()
        .order_by("post_name")
    )

    return render(
        request,
        "panel/history.html",
        {
            "rows": rows,
            "cities": cities,
            "q_city": q_city,
            "q_user": q_user,
            "only_slots": only_slots,
            "hours": hours,
            "section": "history",
        },
    )


@staff_member_required(login_url="/panel/login/")
def panel_users(request):
    since = timezone.now() - timedelta(days=14)
    users = list(
        Applicant.objects.annotate(
            checks=Count("contributions", filter=Q(contributions__created_at__gte=since)),
            slots=Count(
                "contributions",
                filter=Q(contributions__created_at__gte=since, contributions__has_error=False)
                & ~Q(contributions__days=[]),
            ),
            last_check=Max("contributions__created_at"),
        )
        .order_by(F("last_check").desc(nulls_last=True), "-updated_at")[:400]
    )

    def _norm_id(raw: str) -> str:
        s = str(raw or "").strip()
        m = re.search(r"\((\d{5,})\)", s)
        if m:
            return m.group(1)
        if re.fullmatch(r"\d{5,}", s):
            return s
        return s

    def _user_key(u):
        email = (u.email or "").strip().lower()
        if email:
            return ("email", email)
        aid = _norm_id(u.applicant_id or "")
        if aid:
            return ("id", aid.lower())
        return ("pk", u.pk)

    # Collapse duplicate Applicant rows (same email / numeric id).
    grouped: dict = {}
    for u in users:
        key = _user_key(u)
        prev = grouped.get(key)
        if prev is None:
            grouped[key] = u
            continue
        prev_last = prev.last_check or prev.updated_at
        cur_last = u.last_check or u.updated_at
        if cur_last and (not prev_last or cur_last > prev_last):
            grouped[key] = u

    # Collect sibling PKs so checks include all duplicate applicant rows.
    siblings: dict = {}
    for u in users:
        key = _user_key(u)
        siblings.setdefault(key, []).append(u.pk)

    user_rows = []
    for key, u in grouped.items():
        pks = siblings.get(key) or [u.pk]
        raw = list(
            Contribution.objects.filter(applicant_id__in=pks, created_at__gte=since)
            .order_by("-created_at")[:500]
        )
        uniq = _dedupe_contributions(raw)
        slots_n = sum(1 for c in uniq if (not c.has_error and _day_count(c.days) > 0))
        last = uniq[0] if uniq else None
        last_city = "—"
        last_status = "—"
        if last:
            last_city = last.post_name or last.post_id or "—"
            n = _day_count(last.days)
            last_status = "SLOTS" if (not last.has_error and n) else ("ERROR" if last.has_error else "EMPTY")
        display_id = _norm_id(u.applicant_id or "") or "—"
        user_rows.append(
            {
                "name": u.name or "—",
                "email": u.email or "—",
                "applicant_id": display_id,
                "visa": u.visa_class or "—",
                "checks": len(uniq),
                "slots": slots_n,
                "last_check": timezone.localtime(last.created_at)
                if last
                else (timezone.localtime(u.last_check) if u.last_check else None),
                "last_city": last_city,
                "last_status": last_status,
            }
        )

    user_rows.sort(
        key=lambda r: r["last_check"].timestamp() if r["last_check"] else 0,
        reverse=True,
    )

    return render(
        request,
        "panel/users.html",
        {"user_rows": user_rows[:200], "section": "users"},
    )
