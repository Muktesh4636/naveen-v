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
