from django.contrib import admin
from django.utils import timezone
from django.utils.html import format_html
from .models import Applicant, Contribution, DashboardSnapshot, HumanClickSample, TikTikLogin


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
    list_display = ("applicant_id", "email", "name", "visa_class", "updated_ist")
    search_fields = ("applicant_id", "email", "name")
    readonly_fields = ("created_at", "updated_at", "token_captured_at", "created_ist", "updated_ist")

    @admin.display(description="Updated (IST)", ordering="updated_at")
    def updated_ist(self, obj):
        return _ist(obj.updated_at)

    @admin.display(description="Created (IST)")
    def created_ist(self, obj):
        return _ist(obj.created_at)


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


@admin.register(HumanClickSample)
class HumanClickSampleAdmin(admin.ModelAdmin):
    list_display = (
        "created_ist",
        "applicant",
        "hover_ms",
        "press_ms",
        "approach_ms",
        "pointer_type",
        "path_len",
        "page_url",
    )
    list_filter = ("pointer_type", "created_at")
    search_fields = ("client_id", "page_url", "applicant__email", "applicant__applicant_id")
    readonly_fields = ("created_at", "created_ist", "sample", "profile_meta")

    @admin.display(description="Created (IST)", ordering="created_at")
    def created_ist(self, obj):
        return _ist(obj.created_at)

    @admin.display(description="Path pts")
    def path_len(self, obj):
        path = (obj.sample or {}).get("path") if isinstance(obj.sample, dict) else None
        return len(path) if isinstance(path, list) else 0


@admin.register(TikTikLogin)
class TikTikLoginAdmin(admin.ModelAdmin):
    list_display = (
        "email",
        "applicants_count_col",
        "applicant_ids_preview",
        "plan_col",
        "amount_col",
        "status_col",
        "trial_col",
        "plan_started_ist",
        "plan_ends_ist",
        "device_col",
        "logged_in_col",
        "updated_ist",
    )
    list_display_links = ("email",)
    list_filter = ("plan", "trial_used")
    search_fields = ("email", "applicant_id", "device_id", "seen_applicant_ids")
    ordering = ("email",)
    list_per_page = 50
    readonly_fields = (
        "email",
        "seen_applicant_ids",
        "plan_started_ist",
        "plan_ends_ist",
        "otp_hash",
        "otp_codes",
        "otp_expires",
        "otp_sent_at",
        "otp_sent_ist",
        "created_at",
        "updated_at",
        "created_ist",
        "updated_ist",
        "status_detail",
        "applicants_under_email",
    )
    fieldsets = (
        (
            "Account (login email = real user)",
            {
                "fields": (
                    "email",
                    "applicants_under_email",
                    "applicant_id",
                    "seen_applicant_ids",
                    "status_detail",
                )
            },
        ),
        (
            "Plan (editable — staff override)",
            {
                "fields": (
                    "plan",
                    "amount_inr",
                    "trial_used",
                    "plan_started",
                    "plan_started_ist",
                    "plan_ends",
                    "plan_ends_ist",
                ),
                "description": "Set plan to month for full access. plan_ends empty = no expiry (applicant plan).",
            },
        ),
        (
            "Login / device",
            {
                "fields": (
                    "device_id",
                    "session_hash",
                    "otp_sent_at",
                    "otp_sent_ist",
                    "otp_expires",
                    "otp_codes",
                    "otp_hash",
                )
            },
        ),
        (
            "Timestamps",
            {"fields": ("created_at", "created_ist", "updated_at", "updated_ist")},
        ),
    )

    def _applicant_ids_for(self, obj):
        ids = []
        seen = set()
        for raw in list(obj.seen_applicant_ids or []) + [obj.applicant_id]:
            aid = str(raw or "").strip()
            if not aid or aid in seen:
                continue
            seen.add(aid)
            ids.append(aid)
        # Also include Applicant rows that share this login email.
        email = (obj.email or "").strip()
        if email:
            for a in Applicant.objects.filter(email__iexact=email).only("applicant_id"):
                aid = str(a.applicant_id or "").strip()
                if aid and aid not in seen:
                    seen.add(aid)
                    ids.append(aid)
        return ids

    @admin.display(description="# Applicants")
    def applicants_count_col(self, obj):
        n = len(self._applicant_ids_for(obj))
        if n == 0:
            return format_html('<span style="color:#94a3b8">0</span>')
        return format_html("<strong>{}</strong>", n)

    @admin.display(description="Applicant IDs under this email")
    def applicant_ids_preview(self, obj):
        ids = self._applicant_ids_for(obj)
        if not ids:
            return format_html('<span style="color:#94a3b8">none yet</span>')
        preview = ", ".join(ids[:4])
        if len(ids) > 4:
            preview += f" (+{len(ids) - 4})"
        return preview

    @admin.display(description="Plan", ordering="plan")
    def plan_col(self, obj):
        labels = {
            "trial": "₹1 · 3-day trial",
            "month": "₹2999 · 30 days",
            "applicant": "₹300 · one applicant",
        }
        plan = (obj.plan or "").strip()
        if not plan:
            return format_html('<span style="color:#b45309">No plan</span>')
        return labels.get(plan, plan)

    @admin.display(description="Paid ₹", ordering="amount_inr")
    def amount_col(self, obj):
        return obj.amount_inr or "—"

    @admin.display(description="Status")
    def status_col(self, obj):
        now = timezone.now()
        plan = (obj.plan or "").strip()
        if not plan:
            return format_html('<span style="color:#b45309">Choose plan</span>')
        if plan == "applicant":
            if obj.applicant_id:
                return format_html('<span style="color:#15803d">Active</span>')
            return format_html('<span style="color:#b45309">Needs applicant</span>')
        if obj.plan_ends and now >= obj.plan_ends:
            return format_html('<span style="color:#b91c1c">Expired</span>')
        return format_html('<span style="color:#15803d">Active</span>')

    @admin.display(description="Trial used", boolean=True, ordering="trial_used")
    def trial_col(self, obj):
        return bool(obj.trial_used)

    @admin.display(description="Plan start (IST)", ordering="plan_started")
    def plan_started_ist(self, obj):
        return _ist(obj.plan_started)

    @admin.display(description="Plan ends (IST)", ordering="plan_ends")
    def plan_ends_ist(self, obj):
        return _ist(obj.plan_ends)

    @admin.display(description="Device")
    def device_col(self, obj):
        d = (obj.device_id or "").strip()
        if not d:
            return "—"
        return f"{d[:8]}…" if len(d) > 10 else d

    @admin.display(description="Logged in", boolean=True)
    def logged_in_col(self, obj):
        return bool((obj.session_hash or "").strip() and (obj.device_id or "").strip())

    @admin.display(description="Updated (IST)", ordering="updated_at")
    def updated_ist(self, obj):
        return _ist(obj.updated_at)

    @admin.display(description="Created (IST)")
    def created_ist(self, obj):
        return _ist(obj.created_at)

    @admin.display(description="Last OTP sent (IST)")
    def otp_sent_ist(self, obj):
        return _ist(obj.otp_sent_at)

    @admin.display(description="Access summary")
    def status_detail(self, obj):
        ids = self._applicant_ids_for(obj)
        bits = [
            f"Login email (user): {obj.email}",
            f"Applicants under this email: {len(ids)}",
            f"Applicant IDs: {', '.join(ids) if ids else '—'}",
            f"Plan: {(obj.plan or '').strip() or 'none'}",
            f"Amount: ₹{obj.amount_inr or 0}",
            f"Trial used: {'yes' if obj.trial_used else 'no'}",
            f"Logged in: {'yes' if (obj.session_hash and obj.device_id) else 'no'}",
            f"Device: {(obj.device_id or '').strip() or '—'}",
            f"Plan start: {_ist(obj.plan_started)}",
            f"Plan ends: {_ist(obj.plan_ends)}",
        ]
        return format_html("<br>".join(bits))

    @admin.display(description="All applicants under this email")
    def applicants_under_email(self, obj):
        ids = self._applicant_ids_for(obj)
        email = (obj.email or "").strip()
        by_id = {
            str(a.applicant_id or "").strip(): a
            for a in Applicant.objects.filter(applicant_id__in=ids)
        }
        if email:
            for a in Applicant.objects.filter(email__iexact=email):
                aid = str(a.applicant_id or "").strip()
                if aid:
                    by_id[aid] = a

        if not ids and not by_id:
            return format_html(
                '<span style="color:#64748b">No applicants yet. '
                "They appear when this email uses Tik Tik on a visa account.</span>"
            )

        rows = [
            "<table style='border-collapse:collapse;width:100%;max-width:900px'>"
            "<thead><tr>"
            "<th style='text-align:left;padding:6px 10px;border-bottom:1px solid #e2e8f0'>#</th>"
            "<th style='text-align:left;padding:6px 10px;border-bottom:1px solid #e2e8f0'>Applicant ID</th>"
            "<th style='text-align:left;padding:6px 10px;border-bottom:1px solid #e2e8f0'>Name</th>"
            "<th style='text-align:left;padding:6px 10px;border-bottom:1px solid #e2e8f0'>Portal email</th>"
            "<th style='text-align:left;padding:6px 10px;border-bottom:1px solid #e2e8f0'>Visa</th>"
            "<th style='text-align:left;padding:6px 10px;border-bottom:1px solid #e2e8f0'>Updated</th>"
            "</tr></thead><tbody>"
        ]
        show_ids = ids or list(by_id.keys())
        for i, aid in enumerate(show_ids, 1):
            a = by_id.get(aid)
            rows.append(
                "<tr>"
                f"<td style='padding:6px 10px;border-bottom:1px solid #f1f5f9'>{i}</td>"
                f"<td style='padding:6px 10px;border-bottom:1px solid #f1f5f9'><strong>{aid}</strong></td>"
                f"<td style='padding:6px 10px;border-bottom:1px solid #f1f5f9'>{(a.name if a else '') or '—'}</td>"
                f"<td style='padding:6px 10px;border-bottom:1px solid #f1f5f9'>{(a.email if a else '') or '—'}</td>"
                f"<td style='padding:6px 10px;border-bottom:1px solid #f1f5f9'>{(a.visa_class if a else '') or '—'}</td>"
                f"<td style='padding:6px 10px;border-bottom:1px solid #f1f5f9'>{_ist(a.updated_at) if a else '—'}</td>"
                "</tr>"
            )
        rows.append("</tbody></table>")
        rows.append(
            f"<p style='margin:8px 0 0;color:#64748b'>Total under <b>{email}</b>: "
            f"<b>{len(show_ids)}</b> applicant(s)</p>"
        )
        return format_html("".join(rows))
