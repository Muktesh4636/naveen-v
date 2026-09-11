# Generated manually — booking event telemetry for admin panel

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("contribute", "0016_auto_submit_settings"),
    ]

    operations = [
        migrations.CreateModel(
            name="BookingEvent",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "level",
                    models.CharField(
                        choices=[
                            ("info", "Info"),
                            ("warn", "Warn"),
                            ("error", "Error"),
                        ],
                        db_index=True,
                        default="info",
                        max_length=8,
                    ),
                ),
                (
                    "kind",
                    models.CharField(
                        db_index=True,
                        help_text="date_pick | time_pick | submit | city_change | auto_submit",
                        max_length=32,
                    ),
                ),
                (
                    "stage",
                    models.CharField(
                        blank=True,
                        default="",
                        help_text="start | success | fail | timeout | retry | …",
                        max_length=32,
                    ),
                ),
                ("message", models.TextField(blank=True, default="")),
                ("city_id", models.CharField(blank=True, default="", max_length=64)),
                ("city_name", models.CharField(blank=True, default="", max_length=255)),
                ("appt_date", models.CharField(blank=True, default="", max_length=32)),
                ("appt_time", models.CharField(blank=True, default="", max_length=32)),
                ("detail", models.JSONField(blank=True, default=dict)),
                (
                    "device_id",
                    models.CharField(blank=True, db_index=True, default="", max_length=64),
                ),
                ("page_url", models.CharField(blank=True, default="", max_length=512)),
                ("created_at", models.DateTimeField(auto_now_add=True, db_index=True)),
                (
                    "applicant",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        related_name="booking_events",
                        to="contribute.applicant",
                    ),
                ),
            ],
            options={
                "ordering": ["-created_at"],
                "indexes": [
                    models.Index(
                        fields=["kind", "created_at"],
                        name="contribute__kind_7a2e1f_idx",
                    ),
                    models.Index(
                        fields=["level", "created_at"],
                        name="contribute__level_3c9b2a_idx",
                    ),
                    models.Index(
                        fields=["applicant", "created_at"],
                        name="contribute__applica_8d4e1c_idx",
                    ),
                ],
            },
        ),
    ]
