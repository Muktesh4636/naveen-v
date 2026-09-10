from django.contrib import admin
from django.utils import timezone
from django.utils.html import format_html
from .models import Applicant, ApplicantCityPrefs, Contribution, DashboardSnapshot, ExtensionLicense


def _ist(dt):
    """Format a datetime in Indian Standard Time with seconds."""
    if not dt:
        return "—"
    local = timezone.localtime(dt)  # uses TIME_ZONE=Asia/Kolkata
    return local.strftime("%Y-%m-%d %H:%M:%S IST")


def _dates_summary(days):
    if not isinstance(days, list) or not days:
        return "—"
    dates = []
    for d in days:
        if isinstance(d, dict) and d.get("Date"):
            dates.append(str(d["Date"])[:10])
        elif isinstance(d, str):
            dates.append(d[:10])
    if not dates:
        return "—"
    preview = ", ".join(dates[:8])
    if len(dates) > 8:
        preview += f" (+{len(dates) - 8} more)"
    return f"{len(dates)}: {preview}"


def _times_summary(days, times):
    # Prefer times on the day objects; fall back to top-level times field.
    slots = []
    if isinstance(days, list):
        for d in days:
            if not isinstance(d, dict):
                continue
            for t in d.get("Times") or []:
                if isinstance(t, dict) and t.get("Time"):
                    avail = t.get("EntriesAvailable")
                    label = str(t["Time"])
                    if avail is not None:
                        label += f" ({avail})"
                    slots.append(label)
    if not slots and isinstance(times, list):
        for t in times:
            if isinstance(t, dict) and t.get("Time"):
                slots.append(str(t["Time"]))
    if not slots:
        return "—"
    preview = ", ".join(slots[:6])
    if len(slots) > 6:
        preview += f" (+{len(slots) - 6} more)"
    return preview


@admin.register(Applicant)
class ApplicantAdmin(admin.ModelAdmin):
    list_display = (
        "applicant_id",
        "email",
        "name",
        "visa_class",
        "fee_amount",
        "payment_id",
        "payment_user_id",
        "paid_status",
        "cities_summary",
        "timer_summary",
        "updated_ist",
    )
    search_fields = ("applicant_id", "email", "name", "payment_id", "payment_user_id")
    list_filter = ("visa_class",)
    readonly_fields = (
        "created_at",
        "updated_at",
        "token_captured_at",
        "created_ist",
        "updated_ist",
        "id_token",
        "payment_marked_at",
    )
    list_select_related = ("city_prefs",)
    fieldsets = (
        (None, {"fields": ("applicant_id", "email", "name", "visa_class")}),
        (
            "Payment (admin only)",
            {
                "fields": (
                    "fee_amount",
                    "payment_id",
                    "payment_user_id",
                    "payment_note",
                    "payment_marked_at",
                )
            },
        ),
        (
            "Sensitive",
            {"classes": ("collapse",), "fields": ("id_token", "token_captured_at")},
        ),
        ("Timestamps", {"fields": ("created_at", "updated_at", "created_ist", "updated_ist")}),
    )
    inlines = []

    @admin.display(description="Paid", boolean=True)
    def paid_status(self, obj):
        return obj.is_paid

    @admin.display(description="Updated (IST)", ordering="updated_at")
    def updated_ist(self, obj):
        return _ist(obj.updated_at)

    @admin.display(description="Created (IST)")
    def created_ist(self, obj):
        return _ist(obj.created_at)

    @admin.display(description="Cities")
    def cities_summary(self, obj):
        prefs = getattr(obj, "city_prefs", None)
        if not prefs or not isinstance(prefs.cities, list):
            return "—"
        names = [str(c.get("name") or c.get("id") or "") for c in prefs.cities if isinstance(c, dict)]
        return ", ".join(n for n in names if n)[:80] or "—"

    @admin.display(description="Timer")
    def timer_summary(self, obj):
        prefs = getattr(obj, "city_prefs", None)
        if not prefs:
            return "—"
        return f"{prefs.rotate_min_sec:g}–{prefs.rotate_max_sec:g}s"

    def save_model(self, request, obj, form, change):
        new_id = (obj.payment_id or "").strip()
        if change:
            old = Applicant.objects.filter(pk=obj.pk).only("payment_id").first()
            prev = (old.payment_id or "").strip() if old else ""
        else:
            prev = ""
        if new_id and not prev:
            obj.payment_marked_at = timezone.now()
        elif not new_id:
            obj.payment_marked_at = None
        super().save_model(request, obj, form, change)


class ApplicantCityPrefsInline(admin.StackedInline):
    model = ApplicantCityPrefs
    extra = 0
    fields = (
        "enabled",
        "cities",
        "rotate_min_gap_ms",
        "rotate_max_gap_ms",
        "last_post_id",
        "last_switch_at",
        "updated_at",
    )
    readonly_fields = ("updated_at", "last_switch_at")


# Re-bind Applicant admin with inline
ApplicantAdmin.inlines = [ApplicantCityPrefsInline]


@admin.register(ApplicantCityPrefs)
class ApplicantCityPrefsAdmin(admin.ModelAdmin):
    list_display = (
        "applicant",
        "enabled",
        "city_count",
        "timer_display",
        "last_post_id",
        "updated_at",
    )
    search_fields = ("applicant__applicant_id", "applicant__email", "applicant__name")
    list_filter = ("enabled",)
    fields = (
        "applicant",
        "enabled",
        "cities",
        "rotate_min_gap_ms",
        "rotate_max_gap_ms",
        "last_post_id",
        "last_switch_at",
        "updated_at",
    )
    readonly_fields = ("updated_at", "last_switch_at")

    @admin.display(description="Cities")
    def city_count(self, obj):
        return len(obj.cities) if isinstance(obj.cities, list) else 0

    @admin.display(description="Timer (s)")
    def timer_display(self, obj):
        return f"{obj.rotate_min_sec:g}–{obj.rotate_max_sec:g}"


@admin.register(Contribution)
class ContributionAdmin(admin.ModelAdmin):
    list_display = (
        "created_ist",
        "post_name",
        "applicant",
        "dates_list",
        "times_list",
        "slot_count",
        "has_error",
    )
    list_filter = ("has_error", "post_name", "created_at")
    search_fields = ("post_id", "post_name", "applicant__email", "applicant__name")
    readonly_fields = ("created_at", "created_ist", "dates_pretty", "times_pretty")
    fields = (
        "applicant",
        "post_id",
        "post_name",
        "has_error",
        "error_string",
        "dates_pretty",
        "times_pretty",
        "days",
        "times",
        "raw",
        "created_ist",
        "created_at",
    )

    @admin.display(description="Created (IST)", ordering="created_at")
    def created_ist(self, obj):
        return _ist(obj.created_at)

    @admin.display(description="Dates")
    def dates_list(self, obj):
        return _dates_summary(obj.days)

    @admin.display(description="Times")
    def times_list(self, obj):
        return _times_summary(obj.days, obj.times)

    @admin.display(description="#")
    def slot_count(self, obj):
        days = obj.days if isinstance(obj.days, list) else []
        return len(days)

    @admin.display(description="All available dates")
    def dates_pretty(self, obj):
        days = obj.days if isinstance(obj.days, list) else []
        if not days:
            return "No dates in this contribution"
        lines = []
        for d in days:
            if not isinstance(d, dict):
                lines.append(str(d))
                continue
            date = str(d.get("Date") or "")[:10]
            times = d.get("Times") or []
            if times:
                parts = []
                for t in times:
                    if not isinstance(t, dict):
                        continue
                    avail = t.get("EntriesAvailable")
                    part = t.get("Time") or "?"
                    if avail is not None:
                        part = f"{part} (avail: {avail})"
                    parts.append(part)
                lines.append(f"{date} → {', '.join(parts)}")
            else:
                lines.append(date)
        return format_html("<br>".join(lines))

    @admin.display(description="Top-level times")
    def times_pretty(self, obj):
        times = obj.times if isinstance(obj.times, list) else []
        if not times:
            return "—"
        parts = []
        for t in times:
            if isinstance(t, dict):
                parts.append(f"{t.get('Time')} (avail: {t.get('EntriesAvailable')})")
            else:
                parts.append(str(t))
        return ", ".join(parts)


@admin.register(DashboardSnapshot)
class DashboardSnapshotAdmin(admin.ModelAdmin):
    list_display = ("applicant", "created_ist")
    readonly_fields = ("created_at", "created_ist")

    @admin.display(description="Created (IST)", ordering="created_at")
    def created_ist(self, obj):
        return _ist(obj.created_at)


@admin.register(ExtensionLicense)
class ExtensionLicenseAdmin(admin.ModelAdmin):
    list_display = ("key", "label", "active", "max_devices", "updated_at")
    list_filter = ("active",)
    search_fields = ("key", "label")
