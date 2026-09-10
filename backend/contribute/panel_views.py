"""
Staff admin panel — list applicants, edit cities + rotate timer per user.
"""

from __future__ import annotations

from django.contrib import messages
from django.contrib.admin.views.decorators import staff_member_required
from django.db.models import Count, Q
from django.shortcuts import get_object_or_404, redirect, render
from django.utils import timezone
from django.views.decorators.http import require_http_methods

from .city_rotate import _normalize_cities
from .models import Applicant, ApplicantCityPrefs, Contribution


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


@staff_member_required
def panel_home(request):
    q = (request.GET.get("q") or "").strip()
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
    for a in applicants[:500]:
        prefs = getattr(a, "city_prefs", None)
        cities = _normalize_cities(prefs.cities) if prefs else []
        rows.append(
            {
                "applicant": a,
                "prefs": prefs,
                "cities": cities,
                "city_names": ", ".join(c["name"] for c in cities) or "—",
                "enabled": bool(prefs and prefs.enabled),
                "min_sec": prefs.rotate_min_sec if prefs else 13,
                "max_sec": prefs.rotate_max_sec if prefs else 18,
                "contrib_count": a.contrib_count,
                "updated": timezone.localtime(a.updated_at),
            }
        )

    return render(
        request,
        "panel/home.html",
        {
            "rows": rows,
            "q": q,
            "total": Applicant.objects.count(),
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
        applicant.applicant_id = (request.POST.get("applicant_id") or "").strip() or applicant.applicant_id
        applicant.save()

        prefs.cities = _text_to_cities(request.POST.get("cities_text") or "")
        prefs.enabled = request.POST.get("enabled") == "on"
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

        messages.success(
            request,
            f"Saved {applicant.name or applicant.applicant_id}: "
            f"{len(prefs.cities)} cities, timer {min_sec:g}–{max_sec:g}s.",
        )
        return redirect("panel_user", pk=applicant.pk)

    recent = (
        Contribution.objects.filter(applicant=applicant)
        .order_by("-created_at")[:15]
    )

    return render(
        request,
        "panel/user.html",
        {
            "applicant": applicant,
            "prefs": prefs,
            "cities_text": _cities_to_text(prefs.cities),
            "min_sec": prefs.rotate_min_sec,
            "max_sec": prefs.rotate_max_sec,
            "recent": recent,
            "updated": timezone.localtime(applicant.updated_at),
        },
    )
