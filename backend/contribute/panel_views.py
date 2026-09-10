"""
Staff admin panel — branded UI for operators to manage applicants,
preferred cities, and per-user city-change timers.
"""

from __future__ import annotations

import json

from django.contrib import messages
from django.contrib.admin.views.decorators import staff_member_required
from django.db.models import Count, Q
from django.shortcuts import get_object_or_404, redirect, render
from django.utils import timezone
from django.views.decorators.http import require_http_methods

from .city_rotate import _normalize_cities
from .models import Applicant, ApplicantCityPrefs, Contribution

TIMER_PRESETS = [
    {"id": "fast", "label": "Fast", "hint": "Checks cities quickly", "min": 8, "max": 12},
    {"id": "normal", "label": "Normal", "hint": "Recommended", "min": 13, "max": 18},
    {"id": "slow", "label": "Slow", "hint": "Gentler on the portal", "min": 20, "max": 30},
]


def _cities_to_text(cities) -> str:
    lines = []
    for c in _normalize_cities(cities or []):
        lines.append(f"{c['id']}|{c['name']}")
    return "\n".join(lines)


def _text_to_cities(text: str) -> list[dict]:
    rows = []
    for line in (text or "").splitlines():
        line = line.strip()
        if not line or line.startswith("#"):
            continue
        if "|" in line:
            cid, name = line.split("|", 1)
        elif "," in line:
            cid, name = line.split(",", 1)
        else:
            cid, name = line, line
        cid = cid.strip()
        name = name.strip() or cid
        if cid:
            rows.append({"id": cid, "name": name})
    return _normalize_cities(rows)


def _parse_cities_payload(request) -> list[dict]:
    raw_json = (request.POST.get("cities_json") or "").strip()
    if raw_json:
        try:
            data = json.loads(raw_json)
            if isinstance(data, list):
                return _normalize_cities(data)
        except json.JSONDecodeError:
            pass
    return _text_to_cities(request.POST.get("cities_text") or "")


def _known_cities() -> list[dict]:
    """Unique cities seen across all applicants (for quick-add chips)."""
    by_id: dict[str, str] = {}
    for prefs in ApplicantCityPrefs.objects.exclude(cities=[]).only("cities")[:2000]:
        for c in _normalize_cities(prefs.cities):
            by_id.setdefault(c["id"], c["name"])
    # Common India VAC labels if DB is empty — ids filled when users sync.
    defaults = [
        "NEW DELHI VAC",
        "MUMBAI VAC",
        "CHENNAI VAC",
        "HYDERABAD VAC",
        "KOLKATA VAC",
        "BANGALORE VAC",
    ]
    out = [{"id": i, "name": n} for i, n in by_id.items()]
    known_names = {c["name"].upper() for c in out}
    for name in defaults:
        if name not in known_names:
            out.append({"id": "", "name": name})
    out.sort(key=lambda c: c["name"].upper())
    return out


def _preset_for(min_sec: float, max_sec: float) -> str:
    for p in TIMER_PRESETS:
        if abs(p["min"] - min_sec) < 0.6 and abs(p["max"] - max_sec) < 0.6:
            return p["id"]
    return "custom"


@staff_member_required
def panel_home(request):
    q = (request.GET.get("q") or "").strip()
    status = (request.GET.get("status") or "all").strip().lower()
    applicants = (
        Applicant.objects.all()
        .select_related("city_prefs")
        .annotate(contrib_count=Count("contributions"))
        .order_by("-updated_at")
    )
    if q:
        applicants = applicants.filter(
            Q(name__icontains=q)
            | Q(email__icontains=q)
            | Q(applicant_id__icontains=q)
            | Q(visa_class__icontains=q)
        )

    rows = []
    on_count = 0
    for a in applicants[:500]:
        prefs = getattr(a, "city_prefs", None)
        cities = _normalize_cities(prefs.cities) if prefs else []
        enabled = bool(prefs and prefs.enabled)
        if enabled:
            on_count += 1
        if status == "on" and not enabled:
            continue
        if status == "off" and enabled:
            continue
        if status == "empty" and cities:
            continue
        rows.append(
            {
                "applicant": a,
                "prefs": prefs,
                "cities": cities,
                "city_names": ", ".join(c["name"] for c in cities) or "No cities yet",
                "city_count": len(cities),
                "enabled": enabled,
                "min_sec": prefs.rotate_min_sec if prefs else 13,
                "max_sec": prefs.rotate_max_sec if prefs else 18,
                "preset": _preset_for(
                    prefs.rotate_min_sec if prefs else 13,
                    prefs.rotate_max_sec if prefs else 18,
                ),
                "contrib_count": a.contrib_count,
                "updated": timezone.localtime(a.updated_at),
            }
        )

    total = Applicant.objects.count()
    return render(
        request,
        "panel/home.html",
        {
            "rows": rows,
            "q": q,
            "status": status,
            "total": total,
            "on_count": on_count,
            "shown": len(rows),
            "now": timezone.localtime(),
        },
    )


@staff_member_required
@require_http_methods(["GET", "POST"])
def panel_user(request, pk: int):
    applicant = get_object_or_404(Applicant, pk=pk)
    prefs, _ = ApplicantCityPrefs.objects.get_or_create(applicant=applicant)

    if request.method == "POST":
        applicant.name = (request.POST.get("name") or "").strip()
        applicant.email = (request.POST.get("email") or "").strip()
        applicant.visa_class = (request.POST.get("visa_class") or "").strip()
        applicant.applicant_id = (
            (request.POST.get("applicant_id") or "").strip() or applicant.applicant_id
        )
        applicant.save()

        prefs.cities = _parse_cities_payload(request)
        prefs.enabled = request.POST.get("enabled") == "on"

        preset = (request.POST.get("timer_preset") or "custom").strip().lower()
        preset_map = {p["id"]: p for p in TIMER_PRESETS}
        if preset in preset_map:
            min_sec = float(preset_map[preset]["min"])
            max_sec = float(preset_map[preset]["max"])
        else:
            try:
                min_sec = float(request.POST.get("min_sec") or 13)
                max_sec = float(request.POST.get("max_sec") or 18)
            except ValueError:
                min_sec, max_sec = 13.0, 18.0

        min_sec = max(1.0, min_sec)
        max_sec = max(min_sec, max_sec)
        prefs.rotate_min_gap_ms = int(min_sec * 1000)
        prefs.rotate_max_gap_ms = int(max_sec * 1000)
        prefs.save()

        who = applicant.name or applicant.applicant_id or "User"
        messages.success(
            request,
            f"Saved settings for {who}: {len(prefs.cities)} preferred "
            f"cit{'y' if len(prefs.cities) == 1 else 'ies'}, "
            f"switch every {min_sec:g}–{max_sec:g} seconds"
            f"{', City Change ON' if prefs.enabled else ', City Change OFF'}.",
        )
        return redirect("panel_user", pk=applicant.pk)

    recent = (
        Contribution.objects.filter(applicant=applicant).order_by("-created_at")[:12]
    )
    cities = _normalize_cities(prefs.cities)
    min_sec = prefs.rotate_min_sec
    max_sec = prefs.rotate_max_sec

    return render(
        request,
        "panel/user.html",
        {
            "applicant": applicant,
            "prefs": prefs,
            "cities": cities,
            "cities_json": json.dumps(cities),
            "cities_text": _cities_to_text(cities),
            "known_cities": _known_cities(),
            "min_sec": min_sec,
            "max_sec": max_sec,
            "timer_preset": _preset_for(min_sec, max_sec),
            "timer_presets": TIMER_PRESETS,
            "recent": recent,
            "updated": timezone.localtime(applicant.updated_at),
        },
    )
