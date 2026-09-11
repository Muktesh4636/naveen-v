"""
Staff admin panel — left-nav console for dashboard, customers, payments,
applicants, and slot dates.
"""

from __future__ import annotations

import json
from datetime import timedelta
from decimal import Decimal, InvalidOperation

from django.contrib import messages
from django.contrib.admin.views.decorators import staff_member_required
from django.contrib.auth import authenticate, login, logout
from django.db.models import Count, Max, Q
from django.shortcuts import get_object_or_404, redirect, render
from django.utils import timezone
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.http import require_http_methods, require_POST

from .city_rotate import _normalize_cities
from .models import (
    Applicant,
    ApplicantAutoSubmitPrefs,
    ApplicantCityPrefs,
    ApplicantDevice,
    AutoSubmitSettings,
    BookedSlot,
    BookingEvent,
    CityChangeSettings,
    Contribution,
    ExtensionLicense,
    PaymentClaim,
    PaymentSettings,
    PhoneOffer,
    normalize_phone,
    resolve_pay_amount,
)
from .hot_city import clear_hot_city, get_hot_city

TIMER_PRESETS = [
    {"id": "fast", "label": "Fast", "hint": "Checks cities quickly", "min": 8, "max": 12},
    {"id": "normal", "label": "Normal", "hint": "Recommended", "min": 13, "max": 18},
    {"id": "slow", "label": "Slow", "hint": "Gentler on the portal", "min": 20, "max": 30},
]

_staff = staff_member_required(login_url="panel_login")
ACTIVE_WINDOW = timedelta(hours=24)


def _parse_fee_amount(raw) -> Decimal:
    text = (raw or "").strip().replace(",", "")
    if not text:
        return Decimal("0.00")
    try:
        value = Decimal(text)
    except (InvalidOperation, ValueError):
        return Decimal("0.00")
    if value < 0:
        value = Decimal("0.00")
    return value.quantize(Decimal("0.01"))


def _parse_date(raw):
    from datetime import datetime as dt

    text = (raw or "").strip()
    if not text:
        return None
    for fmt in ("%Y-%m-%d", "%d-%m-%Y", "%d/%m/%Y"):
        try:
            return dt.strptime(text, fmt).date()
        except ValueError:
            continue
    return None


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
    by_id: dict[str, str] = {}
    for prefs in ApplicantCityPrefs.objects.exclude(cities=[]).only("cities")[:2000]:
        for c in _normalize_cities(prefs.cities):
            by_id.setdefault(c["id"], c["name"])
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


def _nav_context(request, active: str) -> dict:
    pending = PaymentClaim.objects.filter(status=PaymentClaim.STATUS_PENDING).count()
    return {
        "nav_active": active,
        "operator": request.user.get_username(),
        "pending_payments": pending,
        "now": timezone.localtime(),
    }


def _extract_dates(days) -> list[str]:
    out = []
    if not isinstance(days, list):
        return out
    for d in days:
        if isinstance(d, dict) and d.get("Date"):
            out.append(str(d["Date"])[:10])
        elif isinstance(d, str) and d.strip():
            out.append(d.strip()[:10])
    return out


# ── Auth ──────────────────────────────────────────────────────────────────────

@ensure_csrf_cookie
@require_http_methods(["GET", "HEAD", "POST"])
def panel_login(request):
    if request.user.is_authenticated and request.user.is_staff:
        return redirect("panel_dashboard")

    error = ""
    username = ""
    if request.method == "POST":
        username = (request.POST.get("username") or "").strip()
        password = request.POST.get("password") or ""
        user = authenticate(request, username=username, password=password)
        if user is None:
            error = "Incorrect username or password."
        elif not user.is_staff:
            error = "This account cannot open the admin panel."
        elif not user.is_active:
            error = "This account is disabled."
        else:
            login(request, user)
            next_url = request.GET.get("next") or request.POST.get("next") or ""
            if next_url.startswith("/panel"):
                return redirect(next_url)
            return redirect("panel_dashboard")

    return render(
        request,
        "panel/login.html",
        {
            "error": error,
            "username": username,
            "next": request.GET.get("next") or "",
        },
    )


def panel_logout(request):
    logout(request)
    messages.info(request, "Signed out of VisaSlot Admin.")
    return redirect("panel_login")


# ── Dashboard ─────────────────────────────────────────────────────────────────

@_staff
def panel_dashboard(request):
    since = timezone.now() - ACTIVE_WINDOW
    total_applicants = Applicant.objects.count()
    paid_count = Applicant.objects.exclude(payment_id="").count()
    unpaid_count = total_applicants - paid_count
    active_users = Applicant.objects.filter(updated_at__gte=since).count()
    city_on = ApplicantCityPrefs.objects.filter(enabled=True).count()
    pending_payments = PaymentClaim.objects.filter(status=PaymentClaim.STATUS_PENDING).count()
    accepted_payments = PaymentClaim.objects.filter(status=PaymentClaim.STATUS_ACCEPTED).count()
    # Phone customers = unique phones from applicants / claims / offers
    phone_set = set(
        normalize_phone(p)
        for p in Applicant.objects.exclude(phone="").values_list("phone", flat=True)
        if normalize_phone(p)
    )
    phone_set.update(
        normalize_phone(p)
        for p in PaymentClaim.objects.exclude(payer_phone="").values_list("payer_phone", flat=True)
        if normalize_phone(p)
    )
    phone_set.update(
        normalize_phone(p) for p in PhoneOffer.objects.values_list("phone", flat=True) if normalize_phone(p)
    )
    customers = len(phone_set)
    slot_checks_24h = Contribution.objects.filter(created_at__gte=since).count()
    slots_with_dates = (
        Contribution.objects.filter(created_at__gte=since)
        .exclude(days=[])
        .count()
    )

    recent_applicants = Applicant.objects.order_by("-updated_at")[:8]
    recent_slots = (
        Contribution.objects.select_related("applicant")
        .order_by("-created_at")[:10]
    )
    recent_payments = PaymentClaim.objects.select_related("applicant").order_by("-created_at")[:8]

    slot_rows = []
    for c in recent_slots:
        dates = _extract_dates(c.days)
        slot_rows.append(
            {
                "obj": c,
                "dates": dates,
                "date_preview": ", ".join(dates[:5]) + ("…" if len(dates) > 5 else ""),
                "when": timezone.localtime(c.created_at),
            }
        )

    ctx = _nav_context(request, "dashboard")
    ctx.update(
        {
            "total_applicants": total_applicants,
            "paid_count": paid_count,
            "unpaid_count": unpaid_count,
            "active_users": active_users,
            "city_on": city_on,
            "pending_payments": pending_payments,
            "accepted_payments": accepted_payments,
            "customers": customers,
            "slot_checks_24h": slot_checks_24h,
            "slots_with_dates": slots_with_dates,
            "recent_applicants": recent_applicants,
            "slot_rows": slot_rows,
            "recent_payments": recent_payments,
        }
    )
    return render(request, "panel/dashboard.html", ctx)


# Keep old name as alias so bookmarks still work.
panel_home = panel_dashboard


# ── Customers (phone numbers — one phone books many applicants) ───────────────

def _owner_phone_for_paid_applicant(applicant: Applicant) -> str:
    """
    Phone that owns this applicant — only after Accept (paid).
    Prefer accepted claim payer_phone, then payment_user_id, then applicant.phone.
    """
    if not applicant or not applicant.is_paid:
        return ""
    claim = (
        PaymentClaim.objects.filter(
            applicant=applicant,
            status=PaymentClaim.STATUS_ACCEPTED,
        )
        .exclude(payer_phone="")
        .order_by("-reviewed_at", "-created_at")
        .first()
    )
    if claim:
        p = normalize_phone(claim.payer_phone)
        if p:
            return p
    for raw in (applicant.payment_user_id, applicant.phone):
        p = normalize_phone(raw)
        if p:
            return p
    return ""


def _phone_customer_rows(q: str = "") -> list[dict]:
    """
    Phone = customer. Applicants appear under a phone only after payment is Accepted.
    """
    by_phone: dict[str, dict] = {}

    def bucket(phone_raw: str, display: str = "") -> dict | None:
        phone = normalize_phone(phone_raw)
        if not phone:
            return None
        row = by_phone.get(phone)
        if row is None:
            row = {
                "phone": phone,
                "display": display or phone_raw or phone,
                "applicants": [],
                "applicant_ids": set(),
                "paid": 0,
                "pending": 0,
                "last_update": None,
                "offer": None,
            }
            by_phone[phone] = row
        elif display and (not row["display"] or row["display"] == phone):
            row["display"] = display
        return row

    # Only confirmed-paid applicants, under exactly one owner phone.
    for a in Applicant.objects.exclude(payment_id="").order_by("-updated_at"):
        owner = _owner_phone_for_paid_applicant(a)
        if not owner:
            continue
        row = bucket(owner)
        if not row:
            continue
        if a.pk in row["applicant_ids"]:
            continue
        row["applicant_ids"].add(a.pk)
        row["applicants"].append(a)
        row["paid"] += 1
        if row["last_update"] is None or (a.updated_at and a.updated_at > row["last_update"]):
            row["last_update"] = a.updated_at

    # Pending deposit counts per phone (not applicant names until Accept)
    for claim in (
        PaymentClaim.objects.filter(status=PaymentClaim.STATUS_PENDING)
        .exclude(payer_phone="")
        .only("payer_phone", "created_at")
    ):
        row = bucket(claim.payer_phone)
        if not row:
            continue
        row["pending"] += 1
        if row["last_update"] is None or (
            claim.created_at and claim.created_at > row["last_update"]
        ):
            row["last_update"] = claim.created_at

    for offer in PhoneOffer.objects.all():
        row = bucket(offer.phone, offer.phone_display or offer.phone)
        if not row:
            continue
        row["offer"] = offer
        if offer.phone_display:
            row["display"] = offer.phone_display
        if row["last_update"] is None or (
            offer.updated_at and offer.updated_at > row["last_update"]
        ):
            row["last_update"] = offer.updated_at

    rows = list(by_phone.values())
    if q:
        ql = q.lower().strip()
        qdigits = normalize_phone(q)
        rows = [
            r
            for r in rows
            if (qdigits and qdigits in r["phone"])
            or ql in (r["display"] or "").lower()
            or any(
                ql in (a.name or "").lower()
                or ql in (a.applicant_id or "").lower()
                or ql in (a.email or "").lower()
                for a in r["applicants"]
            )
        ]

    for r in rows:
        r["apps"] = len(r["applicant_ids"])
        r["applicants"] = sorted(
            r["applicants"],
            key=lambda a: a.updated_at.timestamp() if a.updated_at else 0,
            reverse=True,
        )[:8]
        del r["applicant_ids"]

    rows.sort(
        key=lambda r: r["last_update"].timestamp() if r["last_update"] else 0,
        reverse=True,
    )
    return rows


@_staff
def panel_customers(request):
    q = (request.GET.get("q") or "").strip()
    rows = _phone_customer_rows(q)
    ctx = _nav_context(request, "customers")
    ctx.update(
        {
            "customers": rows[:300],
            "q": q,
            "customer_count": len(rows),
            "applicant_linked": sum(1 for r in rows if r["apps"] > 0),
        }
    )
    return render(request, "panel/customers.html", ctx)


@_staff
def panel_customer_phone(request, phone: str):
    phone_n = normalize_phone(phone)
    if not phone_n:
        messages.error(request, "Invalid phone number.")
        return redirect("panel_customers")

    # Only paid applicants owned by this phone (Accept confirmed).
    applicants = []
    for a in Applicant.objects.exclude(payment_id="").order_by("-updated_at"):
        if _owner_phone_for_paid_applicant(a) == phone_n:
            applicants.append(a)

    offer = PhoneOffer.objects.filter(phone=phone_n).first()
    claims = (
        PaymentClaim.objects.filter(payer_phone=phone_n)
        .select_related("applicant")
        .order_by("-created_at")[:50]
    )
    display = (offer.phone_display if offer and offer.phone_display else "") or phone_n
    pending_count = PaymentClaim.objects.filter(
        payer_phone=phone_n, status=PaymentClaim.STATUS_PENDING
    ).count()

    ctx = _nav_context(request, "customers")
    ctx.update(
        {
            "phone": phone_n,
            "display": display,
            "offer": offer,
            "applicants": applicants,
            "claims": claims,
            "paid_count": len(applicants),
            "pending_count": pending_count,
        }
    )
    return render(request, "panel/customer_phone.html", ctx)


@_staff
@require_http_methods(["GET", "POST"])
def panel_customer_detail(request, pk: int):
    """Legacy license customer page (kept for old bookmarks)."""
    license_obj = get_object_or_404(ExtensionLicense, pk=pk)
    if request.method == "POST":
        license_obj.label = (request.POST.get("label") or "").strip()
        license_obj.active = request.POST.get("active") == "on"
        try:
            license_obj.max_devices = max(1, int(request.POST.get("max_devices") or 1))
        except ValueError:
            pass
        license_obj.save()
        messages.success(request, f"Saved customer {license_obj.label or license_obj.key}.")
        return redirect("panel_customer_detail", pk=license_obj.pk)

    devices = license_obj.devices.order_by("-last_seen_at")
    ctx = _nav_context(request, "customers")
    ctx.update({"license": license_obj, "devices": devices})
    return render(request, "panel/customer_detail.html", ctx)


# ── Payments (UPI / scanner settings) ─────────────────────────────────────────

@_staff
@require_http_methods(["GET", "POST"])
def panel_payments(request):
    settings_obj = PaymentSettings.load()

    if request.method == "POST":
        action = (request.POST.get("action") or "settings").strip()

        if action == "add_phone_offer":
            raw_phone = (request.POST.get("phone") or "").strip()
            phone = normalize_phone(raw_phone)
            if not phone:
                messages.error(request, "Enter a valid phone number (at least 8 digits).")
                return redirect("panel_payments")
            offer_amount = _parse_fee_amount(request.POST.get("offer_amount"))
            if offer_amount <= 0:
                messages.error(request, "Offer amount must be greater than 0.")
                return redirect("panel_payments")
            list_amount = _parse_fee_amount(request.POST.get("list_amount"))
            label = (request.POST.get("offer_label") or "").strip() or "Special offer"
            note = (request.POST.get("note") or "").strip()
            obj, created = PhoneOffer.objects.update_or_create(
                phone=phone,
                defaults={
                    "phone_display": raw_phone or phone,
                    "list_amount": list_amount,
                    "offer_amount": offer_amount,
                    "offer_label": label,
                    "note": note,
                    "active": True,
                },
            )
            messages.success(
                request,
                f"{'Added' if created else 'Updated'} offer for {obj.phone_display or phone}.",
            )
            return redirect("panel_payments")

        if action == "delete_phone_offer":
            pk = request.POST.get("offer_id")
            deleted, _ = PhoneOffer.objects.filter(pk=pk).delete()
            if deleted:
                messages.success(request, "Phone offer removed.")
            else:
                messages.error(request, "Offer not found.")
            return redirect("panel_payments")

        if action == "toggle_phone_offer":
            obj = get_object_or_404(PhoneOffer, pk=request.POST.get("offer_id"))
            obj.active = not obj.active
            obj.save(update_fields=["active", "updated_at"])
            messages.success(
                request,
                f"Offer for {obj.phone_display or obj.phone} {'enabled' if obj.active else 'disabled'}.",
            )
            return redirect("panel_payments")

        settings_obj.upi_id = (request.POST.get("upi_id") or "").strip()
        settings_obj.qr_image_url = (request.POST.get("qr_image_url") or "").strip()
        settings_obj.default_amount = _parse_fee_amount(request.POST.get("default_amount"))
        settings_obj.offer_enabled = request.POST.get("offer_enabled") == "on"
        settings_obj.offer_amount = _parse_fee_amount(request.POST.get("offer_amount"))
        settings_obj.offer_label = (request.POST.get("offer_label") or "").strip() or "Limited offer"
        settings_obj.pay_instructions = (
            request.POST.get("pay_instructions") or ""
        ).strip() or settings_obj.pay_instructions
        if request.FILES.get("qr_image"):
            settings_obj.qr_image = request.FILES["qr_image"]
        if request.POST.get("clear_qr") == "on":
            settings_obj.qr_image = None
        settings_obj.save()
        messages.success(request, "Payments settings saved — scanner & UPI will show in Tik Tik.")
        return redirect("panel_payments")

    ctx = _nav_context(request, "payments")
    ctx.update(
        {
            "pay_settings": settings_obj,
            "qr_preview": settings_obj.resolved_qr_url(),
            "phone_offers": PhoneOffer.objects.all()[:200],
        }
    )
    return render(request, "panel/payments.html", ctx)


# ── City Change timing (IST windows each hour) ────────────────────────────────

def _parse_city_windows_from_post(request) -> list[dict]:
    """Parse up to 8 from/to minute+second pairs from the timing form."""
    windows = []
    for i in range(1, 9):
        raw_from = (request.POST.get(f"from_{i}") or "").strip()
        raw_to = (request.POST.get(f"to_{i}") or "").strip()
        raw_from_sec = (request.POST.get(f"from_sec_{i}") or "").strip()
        raw_to_sec = (request.POST.get(f"to_sec_{i}") or "").strip()
        if raw_from == "" and raw_to == "" and raw_from_sec == "" and raw_to_sec == "":
            continue
        try:
            frm = int(raw_from)
            to = int(raw_to)
            from_sec = int(raw_from_sec) if raw_from_sec != "" else 0
            to_sec = int(raw_to_sec) if raw_to_sec != "" else 59
        except ValueError:
            continue
        if (
            frm < 0
            or to < 0
            or frm > 59
            or to > 59
            or from_sec < 0
            or to_sec < 0
            or from_sec > 59
            or to_sec > 59
        ):
            continue
        if to * 60 + to_sec < frm * 60 + from_sec:
            continue
        windows.append(
            {
                "slot": len(windows) + 1,
                "from_min": frm,
                "from_sec": from_sec,
                "to_min": to,
                "to_sec": to_sec,
            }
        )
    windows.sort(key=lambda w: w["from_min"] * 60 + w["from_sec"])
    for i, w in enumerate(windows):
        w["slot"] = i + 1
    return windows


@_staff
@require_http_methods(["GET", "POST"])
def panel_city_timing(request):
    settings_obj = CityChangeSettings.load()
    asub_rules = AutoSubmitSettings.load()

    if request.method == "POST":
        action = (request.POST.get("action") or "save").strip()
        if action == "clear_hot_city":
            clear_hot_city()
            messages.success(request, "Cleared hot city — clients return to normal timing.")
            return redirect("panel_city_timing")
        if action == "reset_defaults":
            settings_obj.windows = [
                {"slot": 3, "from_min": 0, "from_sec": 0, "to_min": 2, "to_sec": 59},
                {"slot": 1, "from_min": 14, "from_sec": 0, "to_min": 21, "to_sec": 59},
                {"slot": 2, "from_min": 24, "from_sec": 0, "to_min": 31, "to_sec": 59},
                {"slot": 3, "from_min": 54, "from_sec": 0, "to_min": 59, "to_sec": 59},
            ]
            settings_obj.save()
            messages.success(
                request,
                "Restored default IST windows (:00:00–:02:59, :14:00–:21:59, :24:00–:31:59, :54:00–:59:59).",
            )
            return redirect("panel_city_timing")

        if action == "save_asub_rules":
            asub_rules.skip_highest_slot = request.POST.get("skip_highest_slot") == "on"
            try:
                asub_rules.slot_start_rank = max(1, min(5, int(request.POST.get("slot_start_rank") or 2)))
            except (TypeError, ValueError):
                asub_rules.slot_start_rank = 2
            try:
                asub_rules.max_slot_tries = max(1, min(5, int(request.POST.get("max_slot_tries") or 4)))
            except (TypeError, ValueError):
                asub_rules.max_slot_tries = 4
            try:
                asub_rules.max_date_tries = max(1, min(5, int(request.POST.get("max_date_tries") or 3)))
            except (TypeError, ValueError):
                asub_rules.max_date_tries = 3
            for field, default in (
                ("date_pref_1", 0),
                ("date_pref_2", 1),
                ("date_pref_3", 2),
                ("date_pref_many", 2),
            ):
                try:
                    setattr(asub_rules, field, max(0, min(9, int(request.POST.get(field) or default))))
                except (TypeError, ValueError):
                    setattr(asub_rules, field, default)
            asub_rules.halt_city_while_booking = request.POST.get("halt_city_while_booking") == "on"
            asub_rules.save()
            messages.success(
                request,
                "Auto Submit rules saved — extensions pick them up on next sync.",
            )
            return redirect("panel_city_timing")

        windows = _parse_city_windows_from_post(request)
        if not windows:
            messages.error(
                request,
                "Add at least one valid window (minutes & seconds 0–59, From ≤ To).",
            )
            return redirect("panel_city_timing")
        settings_obj.windows = windows
        settings_obj.save()
        messages.success(
            request,
            f"City Change timing saved — active IST each hour: {settings_obj.window_label()}.",
        )
        return redirect("panel_city_timing")

    windows = settings_obj.normalized_windows()
    form_rows = list(windows)
    while len(form_rows) < 6:
        form_rows.append({"from_min": "", "from_sec": "", "to_min": "", "to_sec": ""})

    hot = get_hot_city()
    ctx = _nav_context(request, "city_timing")
    ctx.update(
        {
            "timing": settings_obj,
            "form_rows": form_rows,
            "window_label": settings_obj.window_label(),
            "hot_city": hot,
            "asub_rules": asub_rules,
        }
    )
    return render(request, "panel/city_timing.html", ctx)


# ── Deposit requests (UTR claims) ─────────────────────────────────────────────

@_staff
@require_http_methods(["GET", "POST"])
def panel_deposits(request):
    if request.method == "POST" and request.POST.get("action") == "create":
        target_id = (request.POST.get("target_applicant_id") or "").strip()
        if not target_id:
            messages.error(request, "Applicant ID is required.")
            return redirect("panel_deposits")

        applicant = (
            Applicant.objects.filter(applicant_id=target_id).order_by("-updated_at").first()
        )
        claim = PaymentClaim.objects.create(
            applicant=applicant,
            target_applicant_id=target_id,
            payer_name=(request.POST.get("payer_name") or "").strip(),
            payment_ref=(request.POST.get("payment_ref") or "").strip(),
            amount=_parse_fee_amount(request.POST.get("amount")),
            note=(request.POST.get("note") or "").strip(),
            status=PaymentClaim.STATUS_PENDING,
            source="admin",
        )
        messages.success(
            request,
            f"Deposit request #{claim.pk} created for applicant ID {target_id} — waiting approval.",
        )
        return redirect("panel_deposits")

    status = (request.GET.get("status") or "pending").strip().lower()
    q = (request.GET.get("q") or "").strip()
    claims = PaymentClaim.objects.select_related("applicant").order_by("-created_at")
    if status in {"pending", "accepted", "rejected"}:
        claims = claims.filter(status=status)
    if q:
        claims = claims.filter(
            Q(target_applicant_id__icontains=q)
            | Q(payer_name__icontains=q)
            | Q(payment_ref__icontains=q)
            | Q(note__icontains=q)
        )

    counts = {
        "pending": PaymentClaim.objects.filter(status=PaymentClaim.STATUS_PENDING).count(),
        "accepted": PaymentClaim.objects.filter(status=PaymentClaim.STATUS_ACCEPTED).count(),
        "rejected": PaymentClaim.objects.filter(status=PaymentClaim.STATUS_REJECTED).count(),
        "all": PaymentClaim.objects.count(),
    }

    ctx = _nav_context(request, "deposits")
    ctx.update(
        {
            "claims": claims[:300],
            "status": status,
            "q": q,
            "counts": counts,
        }
    )
    return render(request, "panel/deposits.html", ctx)


@_staff
@require_POST
def panel_payment_action(request, pk: int):
    claim = get_object_or_404(PaymentClaim, pk=pk)
    action = (request.POST.get("action") or "").strip().lower()
    operator = request.user.get_username()

    if action == "accept":
        claim.status = PaymentClaim.STATUS_ACCEPTED
        claim.reviewed_by = operator
        claim.reviewed_at = timezone.now()
        claim.save(update_fields=["status", "reviewed_by", "reviewed_at"])

        applicant = claim.applicant
        if applicant is None:
            applicant = (
                Applicant.objects.filter(applicant_id=claim.target_applicant_id)
                .order_by("-updated_at")
                .first()
            )
        if applicant is None:
            applicant = Applicant.objects.create(
                applicant_id=claim.target_applicant_id,
                name=claim.payer_name or "",
            )
            claim.applicant = applicant
            claim.save(update_fields=["applicant"])

        if claim.amount and claim.amount > 0:
            applicant.fee_amount = claim.amount
        applicant.payment_id = claim.payment_ref or f"claim-{claim.pk}"
        # Lock ownership to the phone that paid (Accept = confirmed paid under this phone).
        pay_phone = normalize_phone(claim.payer_phone) or normalize_phone(applicant.phone)
        if pay_phone:
            applicant.phone = pay_phone
            applicant.payment_user_id = pay_phone
            if not (claim.payer_phone or "").strip():
                claim.payer_phone = pay_phone
                claim.save(update_fields=["payer_phone"])
        elif claim.payer_name:
            applicant.payment_user_id = claim.payer_name
        if claim.note:
            applicant.payment_note = claim.note
        applicant.payment_marked_at = timezone.now()
        applicant.pending_utr = ""
        applicant.pending_utr_at = None
        applicant.save()
        messages.success(
            request,
            f"Accepted — Tik Tik unlocked for ID {claim.target_applicant_id}"
            f" (UTR {applicant.payment_id})"
            + (f" under phone {pay_phone}." if pay_phone else "."),
        )
    elif action == "reject":
        claim.status = PaymentClaim.STATUS_REJECTED
        claim.reviewed_by = operator
        claim.reviewed_at = timezone.now()
        claim.note = (request.POST.get("note") or claim.note or "").strip()
        claim.save(update_fields=["status", "reviewed_by", "reviewed_at", "note"])
        applicant = claim.applicant
        if applicant and (applicant.pending_utr or "").strip() == (claim.payment_ref or "").strip():
            applicant.pending_utr = ""
            applicant.pending_utr_at = None
            applicant.save(update_fields=["pending_utr", "pending_utr_at", "updated_at"])
        messages.info(request, f"Rejected deposit request for ID {claim.target_applicant_id}.")
    else:
        messages.error(request, "Unknown payment action.")

    return redirect("panel_deposits")


# ── Applicants ────────────────────────────────────────────────────────────────

@_staff
@require_http_methods(["GET", "POST"])
def panel_applicants(request):
    from .dedupe import count_duplicate_groups, dedupe_applicants, extract_portal_number

    if request.method == "POST" and request.POST.get("action") == "dedupe":
        result = dedupe_applicants()
        messages.success(
            request,
            f"Removed {result['removed']} duplicate applicant row(s). "
            f"Now {result['after']} applicants.",
        )
        return redirect("panel_applicants")

    # Auto-clean whenever duplicates exist so the list stays unique.
    pending_groups = count_duplicate_groups()
    if pending_groups:
        result = dedupe_applicants()
        if result["removed"]:
            messages.info(
                request,
                f"Merged {result['removed']} duplicate applicant row(s) automatically.",
            )

    q = (request.GET.get("q") or "").strip()
    status = (request.GET.get("status") or "all").strip().lower()
    applicants = (
        Applicant.objects.all()
        .select_related("city_prefs")
        .annotate(contrib_count=Count("contributions", distinct=True))
        .order_by("-updated_at")
    )
    if q:
        applicants = applicants.filter(
            Q(name__icontains=q)
            | Q(email__icontains=q)
            | Q(applicant_id__icontains=q)
            | Q(visa_class__icontains=q)
            | Q(payment_id__icontains=q)
            | Q(payment_user_id__icontains=q)
            | Q(phone__icontains=q)
        ).distinct()

    rows = []
    on_count = 0
    paid_count = 0
    seen_keys = set()
    for a in applicants[:800]:
        # Collapse residual lookalikes in the UI (email / phone / portal # / username / name)
        portal = extract_portal_number(a.applicant_id, a.name)
        phone = "".join(ch for ch in str(getattr(a, "phone", "") or "") if ch.isdigit())
        keys = [
            k
            for k in (
                (a.email or "").strip().lower(),
                phone[-10:] if len(phone) >= 8 else "",
                portal,
                (a.applicant_id or "").strip().lower(),
                (a.name or "").strip().lower() if len((a.name or "").strip()) >= 5 else "",
            )
            if k
        ] or [f"pk:{a.pk}"]
        if any(k in seen_keys for k in keys):
            continue
        for k in keys:
            seen_keys.add(k)

        prefs = getattr(a, "city_prefs", None)
        cities = _normalize_cities(prefs.cities) if prefs else []
        enabled = bool(prefs and prefs.enabled)
        paid = a.is_paid
        if enabled:
            on_count += 1
        if paid:
            paid_count += 1
        if status == "on" and not enabled:
            continue
        if status == "off" and enabled:
            continue
        if status == "empty" and cities:
            continue
        if status == "paid" and not paid:
            continue
        if status == "unpaid" and paid:
            continue
        rows.append(
            {
                "applicant": a,
                "prefs": prefs,
                "cities": cities,
                "city_names": ", ".join(c["name"] for c in cities) or "No cities yet",
                "city_count": len(cities),
                "enabled": enabled,
                "paid": paid,
                "fee_amount": a.fee_amount,
                "payment_id": a.payment_id,
                "payment_user_id": a.payment_user_id,
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

    ctx = _nav_context(request, "applicants")
    ctx.update(
        {
            "rows": rows,
            "q": q,
            "status": status,
            "total": len(rows) if status == "all" and not q else Applicant.objects.count(),
            "on_count": on_count,
            "paid_count": paid_count,
            "shown": len(rows),
            "dup_groups": count_duplicate_groups(),
        }
    )
    return render(request, "panel/applicants.html", ctx)


@_staff
@require_http_methods(["GET", "POST"])
def panel_user(request, pk: int):
    applicant = get_object_or_404(Applicant, pk=pk)
    prefs, _ = ApplicantCityPrefs.objects.get_or_create(applicant=applicant)
    asub, _ = ApplicantAutoSubmitPrefs.objects.get_or_create(applicant=applicant)

    if request.method == "POST":
        revoke_id = (request.POST.get("revoke_device_id") or "").strip()
        if revoke_id:
            updated = ApplicantDevice.objects.filter(
                applicant=applicant, device_id=revoke_id
            ).update(revoked=True)
            if updated:
                messages.success(request, f"Device {revoke_id[:8]}… revoked.")
            else:
                messages.error(request, "Device not found.")
            return redirect("panel_user", pk=applicant.pk)

        unrevoke_id = (request.POST.get("unrevoke_device_id") or "").strip()
        if unrevoke_id:
            ApplicantDevice.objects.filter(
                applicant=applicant, device_id=unrevoke_id
            ).update(revoked=False)
            messages.success(request, f"Device {unrevoke_id[:8]}… restored.")
            return redirect("panel_user", pk=applicant.pk)

        if (request.POST.get("action") or "").strip() == "reask_payment":
            applicant.payment_id = ""
            applicant.payment_user_id = ""
            applicant.payment_note = (
                (request.POST.get("reask_note") or "").strip()
                or f"Payment re-asked by {request.user.get_username()}"
            )
            applicant.payment_marked_at = None
            applicant.pending_utr = ""
            applicant.pending_utr_at = None
            applicant.save(
                update_fields=[
                    "payment_id",
                    "payment_user_id",
                    "payment_note",
                    "payment_marked_at",
                    "pending_utr",
                    "pending_utr_at",
                    "updated_at",
                ]
            )
            # Lock City Change + Auto Submit until they pay again.
            prefs.enabled = False
            prefs.save(update_fields=["enabled", "updated_at"])
            asub.enabled = False
            asub.save(update_fields=["enabled", "updated_at"])
            # Delete ALL old payment claims for this applicant so stale accepted
            # rows cannot confuse unlock / customer matching.
            deleted, _ = PaymentClaim.objects.filter(
                Q(applicant=applicant)
                | Q(target_applicant_id=applicant.applicant_id or "")
                | Q(payer_phone=normalize_phone(applicant.phone or ""))
            ).delete()
            # Reset devices so the next Chrome install binds cleanly after re-pay.
            ApplicantDevice.objects.filter(applicant=applicant).delete()
            who = applicant.name or applicant.applicant_id or f"#{applicant.pk}"
            messages.success(
                request,
                f"Payment re-asked for {who} — deleted {deleted} old payment record(s), "
                "cleared devices. Tik Tik locked until they pay and you Accept again.",
            )
            return redirect("panel_user", pk=applicant.pk)

        if (request.POST.get("action") or "").strip() == "wipe_client":
            applicant.wipe_client = True
            applicant.wipe_requested_at = timezone.now()
            applicant.save(
                update_fields=["wipe_client", "wipe_requested_at", "updated_at"]
            )
            # Immediately revoke devices + turn off City Change / Auto Submit.
            ApplicantDevice.objects.filter(applicant=applicant).update(revoked=True)
            prefs.enabled = False
            prefs.save(update_fields=["enabled", "updated_at"])
            asub.enabled = False
            asub.save(update_fields=["enabled", "updated_at"])
            who = applicant.name or applicant.applicant_id or f"#{applicant.pk}"
            messages.success(
                request,
                f"Wipe queued for {who} — on next poll the extension clears local data and stops. "
                "Pending until the client acknowledges.",
            )
            return redirect("panel_user", pk=applicant.pk)

        if (request.POST.get("action") or "").strip() == "cancel_wipe":
            applicant.wipe_client = False
            applicant.save(update_fields=["wipe_client", "updated_at"])
            messages.success(request, "Wipe cancelled — client will not wipe on next poll.")
            return redirect("panel_user", pk=applicant.pk)

        applicant.name = (request.POST.get("name") or "").strip()
        applicant.email = (request.POST.get("email") or "").strip()
        applicant.visa_class = (request.POST.get("visa_class") or "").strip()
        applicant.applicant_id = (
            (request.POST.get("applicant_id") or "").strip() or applicant.applicant_id
        )

        applicant.fee_amount = _parse_fee_amount(request.POST.get("fee_amount"))
        applicant.offer_amount = _parse_fee_amount(request.POST.get("offer_amount"))
        applicant.offer_label = (request.POST.get("offer_label") or "").strip()
        start = _parse_date(request.POST.get("start_date"))
        end = _parse_date(request.POST.get("end_date"))
        if start and end and end < start:
            start, end = end, start
        applicant.start_date = start
        applicant.end_date = end
        new_payment_id = (request.POST.get("payment_id") or "").strip()
        prev_payment_id = (applicant.payment_id or "").strip()
        applicant.payment_id = new_payment_id
        applicant.payment_user_id = (request.POST.get("payment_user_id") or "").strip()
        applicant.payment_note = (request.POST.get("payment_note") or "").strip()
        try:
            applicant.max_devices = max(1, min(10, int(request.POST.get("max_devices") or 2)))
        except (TypeError, ValueError):
            applicant.max_devices = 2
        if new_payment_id and not prev_payment_id:
            applicant.payment_marked_at = timezone.now()
            applicant.pending_utr = ""
            applicant.pending_utr_at = None
        elif not new_payment_id:
            applicant.payment_marked_at = None
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

        asub_from = _parse_date(request.POST.get("asub_from"))
        asub_to = _parse_date(request.POST.get("asub_to"))
        if asub_from and asub_to and asub_to < asub_from:
            asub_from, asub_to = asub_to, asub_from
        asub.from_date = asub_from
        asub.to_date = asub_to
        asub.enabled = (
            request.POST.get("asub_enabled") == "on"
            and bool(asub.from_date)
            and bool(asub.to_date)
        )
        try:
            asub.max_date_tries = max(1, min(5, int(request.POST.get("asub_max_dates") or 3)))
        except (TypeError, ValueError):
            asub.max_date_tries = 3
        try:
            asub.max_slot_tries = max(1, min(5, int(request.POST.get("asub_max_slots") or 3)))
        except (TypeError, ValueError):
            asub.max_slot_tries = 3
        asub.save()

        who = applicant.name or applicant.applicant_id or "User"
        pay_bit = (
            f", paid ({applicant.payment_id})"
            if applicant.is_paid
            else ", unpaid"
        )
        date_bit = ""
        if applicant.start_date or applicant.end_date:
            date_bit = (
                f", dates {applicant.start_date or '—'} → {applicant.end_date or '—'}"
            )
        asub_bit = (
            f", Auto Submit ON ({asub.from_date}→{asub.to_date})"
            if asub.enabled
            else ", Auto Submit OFF"
        )
        messages.success(
            request,
            f"Saved settings for {who}: ₹{applicant.fee_amount}{pay_bit}{date_bit}; "
            f"{len(prefs.cities)} preferred "
            f"cit{'y' if len(prefs.cities) == 1 else 'ies'}, "
            f"switch every {min_sec:g}–{max_sec:g} seconds"
            f"{', City Change ON' if prefs.enabled else ', City Change OFF'}"
            f"{asub_bit}.",
        )
        return redirect("panel_user", pk=applicant.pk)

    recent = (
        Contribution.objects.filter(applicant=applicant).order_by("-created_at")[:12]
    )
    cities = _normalize_cities(prefs.cities)
    min_sec = prefs.rotate_min_sec
    max_sec = prefs.rotate_max_sec
    claims = PaymentClaim.objects.filter(
        Q(applicant=applicant) | Q(target_applicant_id=applicant.applicant_id)
    ).order_by("-created_at")[:20]

    ctx = _nav_context(request, "applicants")
    ctx.update(
        {
            "applicant": applicant,
            "prefs": prefs,
            "asub": asub,
            "cities": cities,
            "cities_json": json.dumps(cities),
            "cities_text": _cities_to_text(cities),
            "known_cities": _known_cities(),
            "min_sec": min_sec,
            "max_sec": max_sec,
            "timer_preset": _preset_for(min_sec, max_sec),
            "timer_presets": TIMER_PRESETS,
            "recent": recent,
            "claims": claims,
            "devices": ApplicantDevice.objects.filter(applicant=applicant).order_by("-last_seen_at"),
            "booking_events": BookingEvent.objects.filter(applicant=applicant).order_by("-created_at")[:25],
            "booked_slots": BookedSlot.objects.filter(applicant=applicant).order_by("-booked_at")[:25],
            "updated": timezone.localtime(applicant.updated_at),
        }
    )
    return render(request, "panel/user.html", ctx)


# ── Slots ─────────────────────────────────────────────────────────────────────

@_staff
def panel_slots(request):
    q = (request.GET.get("q") or "").strip()
    only_dates = request.GET.get("dates") == "1"
    contribs = (
        Contribution.objects.select_related("applicant")
        .order_by("-created_at")
    )
    if q:
        contribs = contribs.filter(
            Q(post_name__icontains=q)
            | Q(post_id__icontains=q)
            | Q(applicant__name__icontains=q)
            | Q(applicant__applicant_id__icontains=q)
            | Q(applicant__email__icontains=q)
        )
    if only_dates:
        contribs = contribs.exclude(days=[])

    rows = []
    for c in contribs[:250]:
        dates = _extract_dates(c.days)
        rows.append(
            {
                "obj": c,
                "dates": dates,
                "date_count": len(dates),
                "date_preview": ", ".join(dates[:8]) + ("…" if len(dates) > 8 else ""),
                "when": timezone.localtime(c.created_at),
                "has_error": c.has_error,
            }
        )

    since = timezone.now() - ACTIVE_WINDOW
    ctx = _nav_context(request, "slots")
    ctx.update(
        {
            "rows": rows,
            "q": q,
            "only_dates": only_dates,
            "total": Contribution.objects.count(),
            "with_dates_24h": Contribution.objects.filter(created_at__gte=since)
            .exclude(days=[])
            .count(),
            "checks_24h": Contribution.objects.filter(created_at__gte=since).count(),
        }
    )
    return render(request, "panel/slots.html", ctx)


# ── Booking / Auto Submit issue logs ──────────────────────────────────────────

@_staff
def panel_booking_events(request):
    q = (request.GET.get("q") or "").strip()
    level = (request.GET.get("level") or "").strip().lower()
    kind = (request.GET.get("kind") or "").strip().lower()
    only_issues = request.GET.get("issues") == "1"

    qs = BookingEvent.objects.select_related("applicant").order_by("-created_at")
    if only_issues:
        qs = qs.filter(level__in=["warn", "error"])
    if level in ("info", "warn", "error"):
        qs = qs.filter(level=level)
    if kind:
        qs = qs.filter(kind=kind)
    if q:
        qs = qs.filter(
            Q(message__icontains=q)
            | Q(city_name__icontains=q)
            | Q(city_id__icontains=q)
            | Q(appt_date__icontains=q)
            | Q(kind__icontains=q)
            | Q(stage__icontains=q)
            | Q(applicant__name__icontains=q)
            | Q(applicant__applicant_id__icontains=q)
            | Q(applicant__email__icontains=q)
        )

    since = timezone.now() - timedelta(hours=24)
    base_24h = BookingEvent.objects.filter(created_at__gte=since)
    ctx = _nav_context(request, "booking_events")
    ctx.update(
        {
            "rows": list(qs[:300]),
            "q": q,
            "level": level,
            "kind": kind,
            "only_issues": only_issues,
            "total": BookingEvent.objects.count(),
            "errors_24h": base_24h.filter(level="error").count(),
            "warns_24h": base_24h.filter(level="warn").count(),
            "events_24h": base_24h.count(),
            "kinds": [
                "date_pick",
                "time_pick",
                "submit",
                "city_change",
                "auto_submit",
            ],
        }
    )
    return render(request, "panel/booking_events.html", ctx)


# ── Booked slots (Auto Submit successes) ──────────────────────────────────────

@_staff
def panel_booked_slots(request):
    q = (request.GET.get("q") or "").strip()
    page_kind = (request.GET.get("page") or "").strip().lower()

    qs = BookedSlot.objects.select_related("applicant").order_by("-booked_at")
    if page_kind in ("ofc", "consular", "other"):
        qs = qs.filter(page_kind=page_kind)
    if q:
        qs = qs.filter(
            Q(person_name__icontains=q)
            | Q(city_name__icontains=q)
            | Q(city_id__icontains=q)
            | Q(appt_date__icontains=q)
            | Q(appt_time__icontains=q)
            | Q(email_snap__icontains=q)
            | Q(applicant_id_snap__icontains=q)
            | Q(applicant__name__icontains=q)
            | Q(applicant__applicant_id__icontains=q)
            | Q(applicant__email__icontains=q)
        )

    since = timezone.now() - timedelta(hours=24)
    base_24h = BookedSlot.objects.filter(booked_at__gte=since)
    ctx = _nav_context(request, "booked_slots")
    ctx.update(
        {
            "rows": list(qs[:300]),
            "q": q,
            "page_kind": page_kind,
            "total": BookedSlot.objects.count(),
            "booked_24h": base_24h.count(),
            "ofc_24h": base_24h.filter(page_kind="ofc").count(),
            "consular_24h": base_24h.filter(page_kind="consular").count(),
        }
    )
    return render(request, "panel/booked_slots.html", ctx)
