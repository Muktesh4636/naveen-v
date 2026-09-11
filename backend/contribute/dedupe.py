"""
Merge duplicate Applicant rows that represent the same person
(same email, same portal number, or same username/name).
"""

from __future__ import annotations

import re
from collections import defaultdict

from django.db import transaction
from django.db.models import Count

from .models import (
    Applicant,
    ApplicantCityPrefs,
    Contribution,
    DashboardSnapshot,
    PaymentClaim,
)

try:
    from .models import ApplicantDevice
except ImportError:  # pragma: no cover
    ApplicantDevice = None


_NUM_RE = re.compile(r"\((\d+)\)")
_DIGITS_RE = re.compile(r"^\d+$")


def _norm(s: str) -> str:
    return re.sub(r"\s+", " ", (s or "").strip().lower())


def extract_portal_number(*values: str) -> str:
    for v in values:
        if not v:
            continue
        m = _NUM_RE.search(v)
        if m:
            return m.group(1)
        if _DIGITS_RE.fullmatch(v.strip()):
            return v.strip()
    return ""


def applicant_score(a: Applicant) -> tuple:
    prefs = ApplicantCityPrefs.objects.filter(applicant=a).first()
    cities = len(prefs.cities) if prefs and isinstance(prefs.cities, list) else 0
    devices = 0
    if ApplicantDevice is not None:
        devices = ApplicantDevice.objects.filter(applicant=a, revoked=False).count()
    return (
        1 if a.is_paid else 0,
        cities,
        devices,
        a.contributions.count(),
        1 if (a.payment_id or "").strip() else 0,
        1 if a.start_date or a.end_date else 0,
        1 if (a.email or "").strip() else 0,
        a.updated_at.timestamp() if a.updated_at else 0,
        a.pk,
    )


def merge_into(keeper: Applicant, losers: list[Applicant]) -> int:
    removed = 0
    for loser in losers:
        if loser.pk == keeper.pk:
            continue
        Contribution.objects.filter(applicant=loser).update(applicant=keeper)
        DashboardSnapshot.objects.filter(applicant=loser).update(applicant=keeper)
        PaymentClaim.objects.filter(applicant=loser).update(applicant=keeper)
        if ApplicantDevice is not None:
            for dev in ApplicantDevice.objects.filter(applicant=loser):
                exists = ApplicantDevice.objects.filter(
                    applicant=keeper, device_id=dev.device_id
                ).first()
                if exists:
                    if dev.last_seen_at and (
                        not exists.last_seen_at or dev.last_seen_at > exists.last_seen_at
                    ):
                        exists.last_seen_at = dev.last_seen_at
                        exists.save(update_fields=["last_seen_at"])
                    dev.delete()
                else:
                    dev.applicant = keeper
                    dev.save(update_fields=["applicant"])

        loser_prefs = ApplicantCityPrefs.objects.filter(applicant=loser).first()
        keep_prefs = ApplicantCityPrefs.objects.filter(applicant=keeper).first()
        if loser_prefs:
            if keep_prefs is None:
                loser_prefs.applicant = keeper
                loser_prefs.save(update_fields=["applicant", "updated_at"])
            else:
                if (not keep_prefs.cities) and loser_prefs.cities:
                    keep_prefs.cities = loser_prefs.cities
                if loser_prefs.enabled and not keep_prefs.enabled:
                    keep_prefs.enabled = True
                keep_prefs.rotate_min_gap_ms = (
                    loser_prefs.rotate_min_gap_ms or keep_prefs.rotate_min_gap_ms
                )
                keep_prefs.rotate_max_gap_ms = (
                    loser_prefs.rotate_max_gap_ms or keep_prefs.rotate_max_gap_ms
                )
                keep_prefs.save()
                loser_prefs.delete()

        changed = False
        for field in (
            "name",
            "email",
            "visa_class",
            "applicant_id",
            "payment_id",
            "payment_user_id",
            "payment_note",
            "pending_utr",
            "offer_label",
            "phone",
        ):
            cur = getattr(keeper, field) or ""
            other = getattr(loser, field) or ""
            if not cur and other:
                setattr(keeper, field, other)
                changed = True
        if (not keeper.fee_amount or keeper.fee_amount == 0) and loser.fee_amount:
            keeper.fee_amount = loser.fee_amount
            changed = True
        if not keeper.start_date and loser.start_date:
            keeper.start_date = loser.start_date
            changed = True
        if not keeper.end_date and loser.end_date:
            keeper.end_date = loser.end_date
            changed = True
        if not keeper.payment_marked_at and loser.payment_marked_at:
            keeper.payment_marked_at = loser.payment_marked_at
            changed = True
        if changed:
            keeper.save()
        loser_pk = loser.pk
        loser.delete()
        removed += 1
        print(f"  merged pk={loser_pk} → keeper pk={keeper.pk}")
    return removed


def _merge_groups(groups: dict) -> int:
    removed = 0
    for key, rows in groups.items():
        if len(rows) < 2:
            continue
        rows = sorted(rows, key=applicant_score, reverse=True)
        print(f"group {key!r}: keep {rows[0].pk}, drop {[a.pk for a in rows[1:]]}")
        removed += merge_into(rows[0], rows[1:])
    return removed


@transaction.atomic
def dedupe_applicants() -> dict:
    """
    Merge duplicates in passes:
    1) same applicant_id (case-insensitive)
    2) same email
    3) same phone
    4) same extracted portal number
    5) same normalized name (when name length >= 5)
    """
    before = Applicant.objects.count()
    removed = 0

    # Pass 1: exact/iexact applicant_id
    by_id = defaultdict(list)
    for a in Applicant.objects.all():
        key = _norm(a.applicant_id)
        if key:
            by_id[key].append(a)
    removed += _merge_groups(by_id)

    # Pass 2: email
    by_email = defaultdict(list)
    for a in Applicant.objects.all():
        key = _norm(a.email)
        if key:
            by_email[key].append(a)
    removed += _merge_groups(by_email)

    # Pass 3: phone
    by_phone = defaultdict(list)
    for a in Applicant.objects.all():
        phone = "".join(ch for ch in str(getattr(a, "phone", "") or "") if ch.isdigit())
        if len(phone) >= 8:
            by_phone[phone[-10:]].append(a)
    removed += _merge_groups(by_phone)

    # Pass 4: portal number from id or name
    by_num = defaultdict(list)
    for a in Applicant.objects.all():
        num = extract_portal_number(a.applicant_id, a.name)
        if num:
            by_num[num].append(a)
    removed += _merge_groups(by_num)

    # Pass 5: normalized name
    by_name = defaultdict(list)
    for a in Applicant.objects.all():
        key = _norm(a.name)
        if len(key) >= 5:
            by_name[key].append(a)
    removed += _merge_groups(by_name)

    after = Applicant.objects.count()
    remaining = (
        Applicant.objects.exclude(applicant_id="")
        .values("applicant_id")
        .annotate(c=Count("id"))
        .filter(c__gt=1)
        .count()
    )
    return {
        "before": before,
        "after": after,
        "removed": removed,
        "remaining_id_dup_groups": remaining,
    }


def count_duplicate_groups() -> int:
    """How many mergeable groups exist (without merging)."""
    seen = set()
    groups = 0

    def _count(mapping):
        nonlocal groups
        for key, rows in mapping.items():
            if len(rows) < 2:
                continue
            ids = tuple(sorted(a.pk for a in rows))
            if ids in seen:
                continue
            seen.add(ids)
            groups += 1

    by_id = defaultdict(list)
    by_email = defaultdict(list)
    by_phone = defaultdict(list)
    by_num = defaultdict(list)
    by_name = defaultdict(list)
    for a in Applicant.objects.all():
        if _norm(a.applicant_id):
            by_id[_norm(a.applicant_id)].append(a)
        if _norm(a.email):
            by_email[_norm(a.email)].append(a)
        phone = "".join(ch for ch in str(getattr(a, "phone", "") or "") if ch.isdigit())
        if len(phone) >= 8:
            by_phone[phone[-10:]].append(a)
        num = extract_portal_number(a.applicant_id, a.name)
        if num:
            by_num[num].append(a)
        if len(_norm(a.name)) >= 5:
            by_name[_norm(a.name)].append(a)
    for m in (by_id, by_email, by_phone, by_num, by_name):
        _count(m)
    return groups
