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
    phone = models.CharField(max_length=20, blank=True, default="", db_index=True)

    # Payment fields exist on production DB — keep defaults so creates succeed.
    fee_amount = models.DecimalField(max_digits=10, decimal_places=2, default=Decimal("0.00"))
    offer_amount = models.DecimalField(max_digits=10, decimal_places=2, default=Decimal("0.00"))
    offer_label = models.CharField(max_length=128, blank=True, default="")
    payment_id = models.CharField(max_length=128, blank=True, default="", db_index=True)
    payment_user_id = models.CharField(max_length=128, blank=True, default="")
    payment_note = models.CharField(max_length=255, blank=True, default="")
    payment_marked_at = models.DateTimeField(null=True, blank=True)
    pending_utr = models.CharField(max_length=128, blank=True, default="", db_index=True)
    pending_utr_at = models.DateTimeField(null=True, blank=True)
    start_date = models.DateField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True)
    max_devices = models.PositiveSmallIntegerField(default=2)
    wipe_client = models.BooleanField(default=False)
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


class HumanClickSample(models.Model):
    """
    One recorded "Verify you are human" click (mouse path + timings)
    for later model training. Sent by the extension after each live train click.
    """

    applicant = models.ForeignKey(
        Applicant,
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="human_click_samples",
    )
    # Client-generated id for light dedupe (timestamp-based).
    client_id = models.CharField(max_length=64, blank=True, db_index=True)
    hover_ms = models.IntegerField(default=0)
    press_ms = models.IntegerField(default=0)
    approach_ms = models.IntegerField(default=0)
    pointer_type = models.CharField(max_length=32, blank=True)
    page_url = models.CharField(max_length=512, blank=True)
    # Full sample: path, down/up coords, target rect, viewport, etc.
    sample = models.JSONField(default=dict)
    # Optional profile averages at save time.
    profile_meta = models.JSONField(default=dict)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        indexes = [
            models.Index(fields=["created_at"]),
            models.Index(fields=["applicant", "created_at"]),
            models.Index(fields=["client_id"]),
        ]

    def __str__(self):
        return f"HumanClick #{self.pk} hover={self.hover_ms} press={self.press_ms}"


class ApplicantTikTikPrefs(models.Model):
    """
    Safe Tik Tik preferences per applicant (no passwords / security answers).
    Synced from the extension so settings survive reinstall / new devices.
    """

    applicant = models.OneToOneField(
        Applicant,
        on_delete=models.CASCADE,
        related_name="tik_tik_prefs",
    )
    # [{ "id": "...", "name": "..." }, ...]
    cities = models.JSONField(default=list, blank=True)
    date_from = models.CharField(max_length=10, blank=True)  # YYYY-MM-DD
    date_to = models.CharField(max_length=10, blank=True)
    submit_enabled = models.BooleanField(default=False)
    cities_enabled = models.BooleanField(default=False)
    # [{ "fromMin": n, "toMin": n, "durationMin"?: n, "slot"?: n }, ...]
    slot_windows = models.JSONField(default=list, blank=True)
    terms_agreed = models.BooleanField(default=False)
    terms_passed = models.BooleanField(default=False)
    terms_agreed_at = models.DateTimeField(null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"TikTik prefs for {self.applicant}"


class TikTikCityAlert(models.Model):
    """
    Broadcast when an extension finds appointment days in a city.
    Other clients with that city preferred poll and force-switch immediately.
    """

    city_id = models.CharField(max_length=64, db_index=True)
    city_name = models.CharField(max_length=255, blank=True)
    day_count = models.PositiveIntegerField(default=0)
    date_from = models.CharField(max_length=10, blank=True, default="")
    date_to = models.CharField(max_length=10, blank=True, default="")
    best_date = models.CharField(max_length=10, blank=True, default="")
    source_applicant = models.ForeignKey(
        Applicant,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="tik_tik_city_alerts",
    )
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)

    class Meta:
        ordering = ["-id"]
        indexes = [
            models.Index(fields=["city_id", "-id"]),
            models.Index(fields=["-created_at"]),
        ]

    def __str__(self):
        return f"TikTik alert {self.city_name or self.city_id} ({self.day_count} days)"


class TikTikLogin(models.Model):
    """Email login for Tik Tik. One active laptop. One chosen plan."""

    email = models.EmailField(unique=True)
    otp_hash = models.CharField(max_length=64, blank=True, default="")
    otp_expires = models.DateTimeField(null=True, blank=True)
    otp_sent_at = models.DateTimeField(null=True, blank=True)
    device_id = models.CharField(max_length=64, blank=True, default="")
    session_hash = models.CharField(max_length=64, blank=True, default="")
    plan = models.CharField(max_length=16, blank=True, default="")
    amount_inr = models.PositiveIntegerField(default=0)
    plan_started = models.DateTimeField(null=True, blank=True)
    plan_ends = models.DateTimeField(null=True, blank=True)
    trial_used = models.BooleanField(default=False)
    applicant_id = models.CharField(max_length=64, blank=True, default="")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.email
