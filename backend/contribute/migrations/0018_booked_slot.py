# Generated manually — successful Auto Submit bookings for admin panel

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("contribute", "0017_booking_event"),
    ]

    operations = [
        migrations.CreateModel(
            name="BookedSlot",
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
                    "person_name",
                    models.CharField(
                        blank=True,
                        db_index=True,
                        default="",
                        help_text="Name shown on Group Members / profile at book time",
                        max_length=255,
                    ),
                ),
                (
                    "applicant_id_snap",
                    models.CharField(blank=True, default="", max_length=64),
                ),
                (
                    "email_snap",
                    models.CharField(blank=True, default="", max_length=255),
                ),
                ("city_id", models.CharField(blank=True, default="", max_length=64)),
                ("city_name", models.CharField(blank=True, default="", max_length=255)),
                ("appt_date", models.CharField(blank=True, default="", max_length=32)),
                ("appt_time", models.CharField(blank=True, default="", max_length=64)),
                (
                    "page_kind",
                    models.CharField(
                        choices=[
                            ("ofc", "OFC"),
                            ("consular", "Consular"),
                            ("other", "Other"),
                        ],
                        db_index=True,
                        default="other",
                        max_length=16,
                    ),
                ),
                ("page_url", models.CharField(blank=True, default="", max_length=512)),
                (
                    "source",
                    models.CharField(
                        blank=True,
                        default="auto_submit",
                        help_text="auto_submit | manual",
                        max_length=32,
                    ),
                ),
                (
                    "device_id",
                    models.CharField(
                        blank=True, db_index=True, default="", max_length=64
                    ),
                ),
                ("detail", models.JSONField(blank=True, default=dict)),
                ("booked_at", models.DateTimeField(auto_now_add=True, db_index=True)),
                (
                    "applicant",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        related_name="booked_slots",
                        to="contribute.applicant",
                    ),
                ),
            ],
            options={
                "ordering": ["-booked_at"],
            },
        ),
        migrations.AddIndex(
            model_name="bookedslot",
            index=models.Index(fields=["booked_at"], name="contribute__booked__43a4f3_idx"),
        ),
        migrations.AddIndex(
            model_name="bookedslot",
            index=models.Index(
                fields=["person_name", "booked_at"],
                name="contribute__person__d58228_idx",
            ),
        ),
        migrations.AddIndex(
            model_name="bookedslot",
            index=models.Index(
                fields=["applicant", "booked_at"],
                name="contribute__applica_539f3f_idx",
            ),
        ),
    ]
