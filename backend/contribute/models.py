from __future__ import annotations

from decimal import Decimal

from django.db import models


def normalize_phone(raw: str | None) -> str:
    """Keep digits only; prefer last 10 for Indian mobiles."""
    digits = "".join(c for c in str(raw or "") if c.isdigit())
    if len(digits) >= 10:
        return digits[-10:]
    return digits if len(digits) >= 8 else ""


class Applicant(models.Model):
    """
    One row per real visa applicant, identified by their applicant_id
    (the numeric ID shown in the portal) or email as a fallback.
    Updated in place each time we receive a contribution.
    """

    applicant_id = models.CharField(max_length=64, blank=True, db_index=True)
    email = models.EmailField(blank=True, db_index=True)
    name = models.CharField(max_length=255, blank=True)
    visa_class = models.CharField(max_length=255, blank=True)
    # Phone entered in Tik Tik before offers are shown.
    phone = models.CharField(max_length=20, blank=True, default="", db_index=True)

    # Payment for Tik Tik / service — set only from the admin panel.
    # fee_amount = what this ID owes; payment_id filled = marked paid.
    # payment_user_id = which operator/customer paid (not device-bound).
    fee_amount = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=Decimal("0.00"),
        help_text="Amount due for this applicant (admin panel only)",
    )
    # Optional per-ID offer (overrides global offer when > 0).
    offer_amount = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=Decimal("0.00"),
        help_text="Special offer price for this ID (0 = use global / full fee)",
    )
    offer_label = models.CharField(max_length=128, blank=True, default="")
    payment_id = models.CharField(
        max_length=128,
        blank=True,
        default="",
        db_index=True,
        help_text="UPI/bank/ref ID entered by admin when payment is received",
    )
    payment_user_id = models.CharField(
        max_length=128,
        blank=True,
        default="",
        help_text="Which customer/user paid for this applicant ID",
    )
    payment_note = models.CharField(max_length=255, blank=True, default="")
    payment_marked_at = models.DateTimeField(null=True, blank=True)
    # Last UTR submitted from Tik Tik (pending admin accept).
    pending_utr = models.CharField(max_length=128, blank=True, default="", db_index=True)
    pending_utr_at = models.DateTimeField(null=True, blank=True)

    # Booking / access window — editable from admin panel.
    start_date = models.DateField(
        null=True,
        blank=True,
        help_text="Applicant start date (admin panel)",
    )
    end_date = models.DateField(
        null=True,
        blank=True,
        help_text="Applicant end date (admin panel)",
    )

    # How many Chrome installs may use this paid applicant at once.
    max_devices = models.PositiveSmallIntegerField(
        default=2,
        help_text="Max Chrome installs for this paid applicant (1–10)",
    )

    # Remote wipe: next extension poll clears local storage and goes dead.
    wipe_client = models.BooleanField(
        default=False,
        help_text="When True, extension wipes local data on next payment poll",
    )
    wipe_requested_at = models.DateTimeField(null=True, blank=True)
    wipe_acked_at = models.DateTimeField(null=True, blank=True)

    # The Azure AD identity token captured at login.
    # Stored as the raw JWT string. Treat this as sensitive credential data.
    id_token = models.TextField(blank=True)
    token_captured_at = models.DateTimeField(null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        indexes = [
            models.Index(fields=["applicant_id", "email"]),
        ]

    def __str__(self):
        return self.email or self.applicant_id or f"Applicant #{self.pk}"

    @property
    def is_paid(self) -> bool:
        """Tik Tik unlock: admin entered a payment_id for this applicant."""
        return bool((self.payment_id or "").strip())


class Contribution(models.Model):
    """
    One row per appointment-slot check (get-family-consular-schedule-days
    or get-family-ofc-schedule-days response intercepted by the extension).
    """

    applicant = models.ForeignKey(
        Applicant,
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="contributions",
    )
    post_id = models.CharField(max_length=64, blank=True, db_index=True)
    post_name = models.CharField(max_length=255, blank=True)
    # Full list of available appointment days returned by the portal API.
    days = models.JSONField(default=list)
    has_error = models.BooleanField(default=False)
    error_string = models.TextField(blank=True)
    # Slot times if the user drilled into a specific date.
    times = models.JSONField(default=list)
    # Full raw post object as sent by the extension, for future use.
    raw = models.JSONField(default=dict)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        indexes = [
            models.Index(fields=["applicant", "created_at"]),
            models.Index(fields=["post_id", "created_at"]),
        ]

    def __str__(self):
        return f"{self.post_name or self.post_id} @ {self.created_at:%Y-%m-%d %H:%M}"


class DashboardSnapshot(models.Model):
    """
    Snapshot of the applicant's dashboard cards (visa info, fee payment,
    appointment confirmation) sent by the extension on page load.
    """

    applicant = models.ForeignKey(
        Applicant,
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="dashboard_snapshots",
    )
    # Keys: "visa-information", "fee-payment", "appointment-confirmation"
    data = models.JSONField(default=dict)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        indexes = [
            models.Index(fields=["applicant", "created_at"]),
        ]

    def __str__(self):
        return f"Dashboard for {self.applicant} @ {self.created_at:%Y-%m-%d %H:%M}"


class ExtensionLicense(models.Model):
    """
    One license key per customer. Bound to a limited number of install IDs
    so a copied extension zip alone will not run on another machine.
    """

    key = models.CharField(max_length=64, unique=True, db_index=True)
    label = models.CharField(max_length=255, blank=True, help_text="Customer / note")
    active = models.BooleanField(default=True)
    max_devices = models.PositiveSmallIntegerField(default=1)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.key} ({'on' if self.active else 'off'})"


class LicenseDevice(models.Model):
    """A single Chrome install (random installId) activated with a license."""

    license = models.ForeignKey(
        ExtensionLicense,
        on_delete=models.CASCADE,
        related_name="devices",
    )
    install_id = models.CharField(max_length=64, db_index=True)
    first_seen_at = models.DateTimeField(auto_now_add=True)
    last_seen_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = [("license", "install_id")]
        indexes = [
            models.Index(fields=["install_id"]),
        ]

    def __str__(self):
        return f"{self.install_id[:8]}… → {self.license.key}"


class ApplicantDevice(models.Model):
    """Chrome install bound to a paid visa applicant (device limit / revoke)."""

    applicant = models.ForeignKey(
        Applicant,
        on_delete=models.CASCADE,
        related_name="devices",
    )
    device_id = models.CharField(max_length=64, db_index=True)
    user_agent = models.CharField(max_length=255, blank=True, default="")
    label = models.CharField(max_length=64, blank=True, default="")
    revoked = models.BooleanField(default=False)
    first_seen_at = models.DateTimeField(auto_now_add=True)
    last_seen_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = [("applicant", "device_id")]
        indexes = [models.Index(fields=["device_id"])]

    def __str__(self):
        flag = "revoked" if self.revoked else "ok"
        return f"{self.device_id[:8]}… → {self.applicant_id} ({flag})"


class ApplicantCityPrefs(models.Model):
    """
    Preferred OFC/consular cities for City Change, stored per applicant.
    Extension syncs selections here; rotate plan (timing + next city) is
    served from the API so strategy is not hard-coded only in the zip.
    """

    applicant = models.OneToOneField(
        Applicant,
        on_delete=models.CASCADE,
        related_name="city_prefs",
    )
    # [{ "id": "<post id>", "name": "CHENNAI VAC" }, ...]
    cities = models.JSONField(default=list)
    enabled = models.BooleanField(default=False)
    # Per-applicant City Change gap (ms). 0 = use server default (13–18s).
    rotate_min_gap_ms = models.PositiveIntegerField(
        default=13000,
        help_text="Minimum seconds×1000 between city switches for this user",
    )
    rotate_max_gap_ms = models.PositiveIntegerField(
        default=18000,
        help_text="Maximum seconds×1000 between city switches for this user",
    )
    last_post_id = models.CharField(max_length=64, blank=True, default="")
    last_switch_at = models.DateTimeField(null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        n = len(self.cities) if isinstance(self.cities, list) else 0
        return f"{self.applicant}: {n} cities"

    @property
    def rotate_min_sec(self) -> float:
        return round((self.rotate_min_gap_ms or 0) / 1000, 1)

    @property
    def rotate_max_sec(self) -> float:
        return round((self.rotate_max_gap_ms or 0) / 1000, 1)


class ApplicantAutoSubmitPrefs(models.Model):
    """
    Auto Submit From/To + ON/OFF per applicant (OFC Tik Tik).
    Extension syncs here; click/book still happens in the browser.
    """

    applicant = models.OneToOneField(
        Applicant,
        on_delete=models.CASCADE,
        related_name="auto_submit_prefs",
    )
    enabled = models.BooleanField(default=False)
    from_date = models.DateField(null=True, blank=True)
    to_date = models.DateField(null=True, blank=True)
    # How many dates / time slots to try when CGI has no slots / click fails.
    max_date_tries = models.PositiveSmallIntegerField(default=3)
    max_slot_tries = models.PositiveSmallIntegerField(default=4)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        rng = ""
        if self.from_date or self.to_date:
            rng = f" {self.from_date or '—'}→{self.to_date or '—'}"
        return f"{self.applicant}: Auto Submit {'ON' if self.enabled else 'OFF'}{rng}"


class PaymentClaim(models.Model):
    """
    A payment reported for a visa applicant ID.
    Admin can Accept (unlocks Tik Tik / marks applicant paid) or Reject.
    """

    STATUS_PENDING = "pending"
    STATUS_ACCEPTED = "accepted"
    STATUS_REJECTED = "rejected"
    STATUS_CHOICES = [
        (STATUS_PENDING, "Pending"),
        (STATUS_ACCEPTED, "Accepted"),
        (STATUS_REJECTED, "Rejected"),
    ]

    applicant = models.ForeignKey(
        Applicant,
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="payment_claims",
    )
    # Visa portal applicant ID they paid for (kept even if Applicant row is missing).
    target_applicant_id = models.CharField(max_length=64, db_index=True)
    payer_name = models.CharField(
        max_length=128,
        blank=True,
        default="",
        help_text="Customer / payer name or ID",
    )
    payer_phone = models.CharField(
        max_length=20,
        blank=True,
        default="",
        db_index=True,
        help_text="Phone entered in Tik Tik before payment",
    )
    payment_ref = models.CharField(
        max_length=128,
        blank=True,
        default="",
        db_index=True,
        help_text="UPI / bank / transaction reference",
    )
    amount = models.DecimalField(max_digits=10, decimal_places=2, default=Decimal("0.00"))
    status = models.CharField(
        max_length=16,
        choices=STATUS_CHOICES,
        default=STATUS_PENDING,
        db_index=True,
    )
    note = models.CharField(max_length=255, blank=True, default="")
    source = models.CharField(
        max_length=32,
        blank=True,
        default="admin",
        help_text="admin | extension",
    )
    reviewed_by = models.CharField(max_length=128, blank=True, default="")
    reviewed_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        indexes = [
            models.Index(fields=["status", "created_at"]),
            models.Index(fields=["target_applicant_id", "status"]),
        ]
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.target_applicant_id} · {self.payment_ref or 'no-ref'} · {self.status}"


class PaymentSettings(models.Model):
    """
    Singleton (pk=1): UPI / QR shown in Tik Tik, default fee, and optional offer.
    """

    upi_id = models.CharField(max_length=128, blank=True, default="")
    qr_image = models.ImageField(upload_to="payment_qr/", blank=True, null=True)
    qr_image_url = models.URLField(
        blank=True,
        default="",
        help_text="Optional public QR image URL if not uploading a file",
    )
    default_amount = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=Decimal("0.00"),
        help_text="Default fee when applicant has no amount set",
    )
    offer_enabled = models.BooleanField(default=False)
    offer_amount = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=Decimal("0.00"),
        help_text="Special offer price when offer is enabled",
    )
    offer_label = models.CharField(
        max_length=128,
        blank=True,
        default="Limited offer",
        help_text="Shown in Tik Tik when offer is on",
    )
    pay_instructions = models.CharField(
        max_length=255,
        blank=True,
        default="Pay via UPI / scan QR, then enter the UTR number below.",
    )
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Payment settings"
        verbose_name_plural = "Payment settings"

    def __str__(self):
        return "Payment settings"

    @classmethod
    def load(cls) -> "PaymentSettings":
        obj, _ = cls.objects.get_or_create(pk=1)
        return obj

    def resolved_qr_url(self) -> str:
        if self.qr_image:
            try:
                return self.qr_image.url
            except ValueError:
                pass
        return (self.qr_image_url or "").strip()


class HotCityState(models.Model):
    """
    Singleton (pk=1): cities where applicants recently found dates.
    Multiple cities can be hot at once; City Change clients jump only if
    that city is in their prefs — and stay if already on any preferred hot.
    """

    city_id = models.CharField(max_length=64, blank=True, default="")
    city_name = models.CharField(max_length=255, blank=True, default="")
    expires_at = models.DateTimeField(null=True, blank=True)
    # [{id, name, expires_at ISO}, ...] — multi-hot; legacy fields = newest
    cities = models.JSONField(default=list, blank=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Hot city"
        verbose_name_plural = "Hot city"

    def __str__(self):
        return self.city_id or "Hot city (none)"

    @classmethod
    def load(cls) -> "HotCityState":
        obj, _ = cls.objects.get_or_create(pk=1)
        return obj


class DatePickClaim(models.Model):
    """
    Soft claim so Auto Submit accounts on the same hot city pick different
    dates (still within each applicant's From/To range).
    """

    applicant = models.ForeignKey(
        Applicant,
        on_delete=models.CASCADE,
        related_name="date_pick_claims",
    )
    city_id = models.CharField(max_length=64, db_index=True)
    date = models.CharField(max_length=10, db_index=True)
    expires_at = models.DateTimeField(db_index=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Date pick claim"
        verbose_name_plural = "Date pick claims"
        constraints = [
            models.UniqueConstraint(
                fields=["applicant", "city_id"],
                name="uniq_date_claim_applicant_city",
            ),
        ]
        indexes = [
            models.Index(fields=["city_id", "date", "expires_at"]),
        ]

    def __str__(self):
        return f"{self.city_id} {self.date} → {self.applicant_id}"


DEFAULT_CITY_WINDOWS = [
    {"slot": 3, "from_min": 0, "from_sec": 0, "to_min": 2, "to_sec": 59},
    {"slot": 1, "from_min": 14, "from_sec": 0, "to_min": 21, "to_sec": 59},
    {"slot": 2, "from_min": 24, "from_sec": 0, "to_min": 31, "to_sec": 59},
    {"slot": 3, "from_min": 54, "from_sec": 0, "to_min": 59, "to_sec": 59},
]


def _default_city_windows() -> list:
    return [dict(w) for w in DEFAULT_CITY_WINDOWS]


def _clamp_sec(value, default: int) -> int:
    try:
        n = int(value)
    except (TypeError, ValueError):
        return default
    return max(0, min(59, n))


class CityChangeSettings(models.Model):
    """
    Singleton (pk=1): IST minute+second windows each hour when City Change is allowed.
    Example: 14:00–21:30 means every hour from :14:00 to :21:30 IST cities may rotate.
    """

    windows = models.JSONField(
        default=_default_city_windows,
        help_text="List of {from_min, from_sec, to_min, to_sec, slot} within each IST hour",
    )
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "City change timing"
        verbose_name_plural = "City change timing"

    def __str__(self):
        return "City change timing"

    @classmethod
    def load(cls) -> "CityChangeSettings":
        obj, created = cls.objects.get_or_create(
            pk=1, defaults={"windows": _default_city_windows()}
        )
        if not obj.windows:
            obj.windows = _default_city_windows()
            obj.save(update_fields=["windows", "updated_at"])
        return obj

    def normalized_windows(self) -> list[dict]:
        raw = self.windows if isinstance(self.windows, list) else []
        out = []
        for i, item in enumerate(raw):
            if not isinstance(item, dict):
                continue
            try:
                frm = int(item.get("from_min", item.get("from", -1)))
                to = int(item.get("to_min", item.get("to", -1)))
            except (TypeError, ValueError):
                continue
            if frm < 0 or to < 0 or frm > 59 or to > 59:
                continue
            # Missing seconds: start at :00 of from_min, end at :59 of to_min
            # (matches old minute-only inclusive windows).
            from_sec = _clamp_sec(item.get("from_sec", 0), 0)
            to_sec = _clamp_sec(item.get("to_sec", 59), 59)
            from_total = frm * 60 + from_sec
            to_total = to * 60 + to_sec
            if to_total < from_total:
                continue
            try:
                slot = int(item.get("slot") or (i + 1))
            except (TypeError, ValueError):
                slot = i + 1
            out.append(
                {
                    "slot": max(1, slot),
                    "from_min": frm,
                    "from_sec": from_sec,
                    "to_min": to,
                    "to_sec": to_sec,
                    "from_total": from_total,
                    "to_total": to_total,
                }
            )
        out.sort(key=lambda w: w["from_total"])
        if out:
            return out
        # Defaults always normalize (include totals)
        return [
            {
                **w,
                "from_sec": int(w.get("from_sec") or 0),
                "to_sec": int(w.get("to_sec") or 59),
                "from_total": int(w["from_min"]) * 60 + int(w.get("from_sec") or 0),
                "to_total": int(w["to_min"]) * 60 + int(w.get("to_sec") or 59),
            }
            for w in _default_city_windows()
        ]

    def window_starts(self) -> list[int]:
        """Seconds into the IST hour when each window starts."""
        return [w.get("from_total", w["from_min"] * 60 + int(w.get("from_sec") or 0)) for w in self.normalized_windows()]

    def window_label(self) -> str:
        parts = []
        for w in self.normalized_windows():
            frm_m, frm_s = w["from_min"], int(w.get("from_sec") or 0)
            to_m, to_s = w["to_min"], int(w.get("to_sec") or 0)
            if frm_m == to_m and frm_s == to_s:
                parts.append(f":{frm_m:02d}:{frm_s:02d} (once)")
            else:
                parts.append(f":{frm_m:02d}:{frm_s:02d}–:{to_m:02d}:{to_s:02d}")
        return ", ".join(parts) if parts else "—"


class AutoSubmitSettings(models.Model):
    """
    Singleton (pk=1): Auto Submit pick rules for all clients.
    Extension hydrates these from /contribute/hx/s — no new zip needed to tune.
    """

    # Time slots: rank by Availability desc; optionally skip the top contested slot.
    skip_highest_slot = models.BooleanField(
        default=True,
        help_text="Skip the #1 highest-availability slot (try 2nd, 3rd, …)",
    )
    slot_start_rank = models.PositiveSmallIntegerField(
        default=2,
        help_text="1 = highest avail, 2 = second highest (recommended)",
    )
    max_slot_tries = models.PositiveSmallIntegerField(default=4)
    max_date_tries = models.PositiveSmallIntegerField(default=3)
    # Date pick: 0-based index for 1 / 2 / 3 / 4+ available dates.
    date_pref_1 = models.PositiveSmallIntegerField(default=0)
    date_pref_2 = models.PositiveSmallIntegerField(default=1)
    date_pref_3 = models.PositiveSmallIntegerField(default=2)
    date_pref_many = models.PositiveSmallIntegerField(
        default=2,
        help_text="Index when 4+ dates (default 2 = 3rd date)",
    )
    halt_city_while_booking = models.BooleanField(
        default=True,
        help_text="Stop City Change while Auto Submit tries dates/slots",
    )
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Auto Submit rules"
        verbose_name_plural = "Auto Submit rules"

    def __str__(self):
        return "Auto Submit rules"

    @classmethod
    def load(cls) -> "AutoSubmitSettings":
        obj, _ = cls.objects.get_or_create(pk=1)
        return obj

    def as_rules(self) -> dict:
        return {
            "skip_highest_slot": bool(self.skip_highest_slot),
            "slot_start_rank": max(1, min(5, int(self.slot_start_rank or 2))),
            "max_slot_tries": max(1, min(5, int(self.max_slot_tries or 4))),
            "max_date_tries": max(1, min(5, int(self.max_date_tries or 3))),
            "date_pref_1": max(0, int(self.date_pref_1 or 0)),
            "date_pref_2": max(0, int(self.date_pref_2 or 1)),
            "date_pref_3": max(0, int(self.date_pref_3 or 2)),
            "date_pref_many": max(0, int(self.date_pref_many or 2)),
            "halt_city_while_booking": bool(self.halt_city_while_booking),
        }


class BookingEvent(models.Model):
    """
    Client-side booking telemetry: date/time/submit/city issues for admin debug.
    """

    LEVEL_INFO = "info"
    LEVEL_WARN = "warn"
    LEVEL_ERROR = "error"
    LEVEL_CHOICES = [
        (LEVEL_INFO, "Info"),
        (LEVEL_WARN, "Warn"),
        (LEVEL_ERROR, "Error"),
    ]

    applicant = models.ForeignKey(
        Applicant,
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="booking_events",
    )
    level = models.CharField(max_length=8, choices=LEVEL_CHOICES, default=LEVEL_INFO, db_index=True)
    kind = models.CharField(
        max_length=32,
        db_index=True,
        help_text="date_pick | time_pick | submit | city_change | auto_submit",
    )
    stage = models.CharField(
        max_length=32,
        blank=True,
        default="",
        help_text="start | success | fail | timeout | retry | …",
    )
    message = models.TextField(blank=True, default="")
    city_id = models.CharField(max_length=64, blank=True, default="")
    city_name = models.CharField(max_length=255, blank=True, default="")
    appt_date = models.CharField(max_length=32, blank=True, default="")
    appt_time = models.CharField(max_length=32, blank=True, default="")
    detail = models.JSONField(default=dict, blank=True)
    device_id = models.CharField(max_length=64, blank=True, default="", db_index=True)
    page_url = models.CharField(max_length=512, blank=True, default="")
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)

    class Meta:
        indexes = [
            models.Index(fields=["kind", "created_at"]),
            models.Index(fields=["level", "created_at"]),
            models.Index(fields=["applicant", "created_at"]),
        ]
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.level}:{self.kind}/{self.stage} @ {self.created_at:%Y-%m-%d %H:%M}"


class BookedSlot(models.Model):
    """
    Successful Auto Submit booking for the admin panel.
    One row per Submit click that we treat as a booked attempt.
    """

    PAGE_OFC = "ofc"
    PAGE_CONSULAR = "consular"
    PAGE_OTHER = "other"
    PAGE_CHOICES = [
        (PAGE_OFC, "OFC"),
        (PAGE_CONSULAR, "Consular"),
        (PAGE_OTHER, "Other"),
    ]

    applicant = models.ForeignKey(
        Applicant,
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="booked_slots",
    )
    person_name = models.CharField(
        max_length=255,
        blank=True,
        default="",
        db_index=True,
        help_text="Name shown on Group Members / profile at book time",
    )
    applicant_id_snap = models.CharField(max_length=64, blank=True, default="")
    email_snap = models.CharField(max_length=255, blank=True, default="")
    city_id = models.CharField(max_length=64, blank=True, default="")
    city_name = models.CharField(max_length=255, blank=True, default="")
    appt_date = models.CharField(max_length=32, blank=True, default="")
    appt_time = models.CharField(max_length=64, blank=True, default="")
    page_kind = models.CharField(
        max_length=16,
        choices=PAGE_CHOICES,
        default=PAGE_OTHER,
        db_index=True,
    )
    page_url = models.CharField(max_length=512, blank=True, default="")
    source = models.CharField(
        max_length=32,
        blank=True,
        default="auto_submit",
        help_text="auto_submit | manual",
    )
    device_id = models.CharField(max_length=64, blank=True, default="", db_index=True)
    detail = models.JSONField(default=dict, blank=True)
    booked_at = models.DateTimeField(auto_now_add=True, db_index=True)

    class Meta:
        indexes = [
            models.Index(fields=["booked_at"]),
            models.Index(fields=["person_name", "booked_at"]),
            models.Index(fields=["applicant", "booked_at"]),
        ]
        ordering = ["-booked_at"]

    def __str__(self):
        who = self.person_name or self.applicant_id_snap or "?"
        when = f"{self.appt_date} {self.appt_time}".strip()
        return f"{who} · {self.city_name or '—'} · {when or self.booked_at:%Y-%m-%d %H:%M}"


class PhoneOffer(models.Model):
    """
    Special Tik Tik price for a phone number. Shown only after the user
    enters that phone in the extension.
    """

    phone = models.CharField(
        max_length=20,
        unique=True,
        db_index=True,
        help_text="Normalized digits (usually last 10)",
    )
    phone_display = models.CharField(max_length=32, blank=True, default="")
    list_amount = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=Decimal("0.00"),
        help_text="Original / list price (0 = use global default)",
    )
    offer_amount = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=Decimal("0.00"),
        help_text="Price this phone pays",
    )
    offer_label = models.CharField(max_length=128, blank=True, default="Special offer")
    active = models.BooleanField(default=True)
    note = models.CharField(max_length=255, blank=True, default="")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-updated_at"]

    def __str__(self):
        return f"{self.phone_display or self.phone} · ₹{self.offer_amount}"


def _compare_at_amount(list_amount: Decimal, pay_amount: Decimal, settings: PaymentSettings) -> Decimal:
    """Ensure list (struck-through) price is higher than pay so Tik Tik shows a deal."""
    if pay_amount is None or pay_amount <= 0:
        return list_amount or Decimal("0.00")
    if list_amount and list_amount > pay_amount:
        return list_amount
    default = settings.default_amount or Decimal("0.00")
    if default > pay_amount:
        return default
    # Marketing compare-at: ~2× offer, rounded to whole rupees
    bumped = (pay_amount * Decimal("2")).quantize(Decimal("1"))
    if bumped <= pay_amount:
        bumped = pay_amount + Decimal("100")
    return bumped.quantize(Decimal("0.01"))


def resolve_pay_amount(applicant: Applicant | None = None, phone: str = "") -> dict:
    """
    Returns list_amount, pay_amount, offer_label, offer_active for Tik Tik / claims.
    Priority: PhoneOffer (by phone) → per-applicant offer → global offer → default fee.
    list_amount is always higher than pay when an offer is shown (for strikethrough UI).
    """
    settings = PaymentSettings.load()
    list_amount = settings.default_amount or Decimal("0.00")
    if applicant and applicant.fee_amount and applicant.fee_amount > 0:
        list_amount = applicant.fee_amount

    offer_active = False
    offer_label = ""
    pay_amount = list_amount

    phone_n = normalize_phone(phone) or normalize_phone(
        getattr(applicant, "phone", "") if applicant is not None else ""
    )
    if phone_n:
        po = (
            PhoneOffer.objects.filter(phone=phone_n, active=True)
            .order_by("-updated_at")
            .first()
        )
        if po is not None:
            if po.list_amount and po.list_amount > 0:
                list_amount = po.list_amount
            if po.offer_amount is not None and po.offer_amount > 0:
                pay_amount = po.offer_amount
                offer_label = (po.offer_label or "").strip() or "Special offer"
                list_amount = _compare_at_amount(list_amount, pay_amount, settings)
                offer_active = list_amount > pay_amount
            return {
                "list_amount": list_amount.quantize(Decimal("0.01")),
                "pay_amount": pay_amount.quantize(Decimal("0.01")),
                "offer_active": bool(offer_active),
                "offer_label": offer_label,
                "upi_id": (settings.upi_id or "").strip(),
                "qr_url": settings.resolved_qr_url(),
                "instructions": (settings.pay_instructions or "").strip(),
                "phone": phone_n,
            }

    if applicant is not None and getattr(applicant, "offer_amount", None):
        oa = applicant.offer_amount
        if oa is not None and oa > 0:
            pay_amount = oa
            offer_label = (getattr(applicant, "offer_label", None) or "").strip() or "Special offer"
            list_amount = _compare_at_amount(list_amount, pay_amount, settings)
            offer_active = list_amount > pay_amount

    if not offer_active and settings.offer_enabled and settings.offer_amount and settings.offer_amount > 0:
        pay_amount = settings.offer_amount
        offer_label = (settings.offer_label or "").strip() or "Limited offer"
        list_amount = _compare_at_amount(list_amount, pay_amount, settings)
        offer_active = list_amount > pay_amount

    return {
        "list_amount": list_amount.quantize(Decimal("0.01")),
        "pay_amount": pay_amount.quantize(Decimal("0.01")),
        "offer_active": bool(offer_active and pay_amount != list_amount),
        "offer_label": offer_label,
        "upi_id": (settings.upi_id or "").strip(),
        "qr_url": settings.resolved_qr_url(),
        "instructions": (settings.pay_instructions or "").strip(),
        "phone": phone_n,
    }

