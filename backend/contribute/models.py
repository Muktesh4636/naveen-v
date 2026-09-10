from decimal import Decimal

from django.db import models


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

    # Payment for Tik Tik / service — set only from the admin panel.
    # fee_amount = what this ID owes; payment_id filled = marked paid.
    # payment_user_id = which operator/customer paid (not device-bound).
    fee_amount = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=Decimal("0.00"),
        help_text="Amount due for this applicant (admin panel only)",
    )
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
