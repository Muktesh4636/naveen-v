# Generated manually for ApplicantDevice + max_devices

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("contribute", "0009_applicant_dates"),
    ]

    operations = [
        migrations.AddField(
            model_name="applicant",
            name="max_devices",
            field=models.PositiveSmallIntegerField(
                default=2,
                help_text="Max Chrome installs for this paid applicant (1–10)",
            ),
        ),
        migrations.CreateModel(
            name="ApplicantDevice",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("device_id", models.CharField(db_index=True, max_length=64)),
                ("user_agent", models.CharField(blank=True, default="", max_length=255)),
                ("label", models.CharField(blank=True, default="", max_length=64)),
                ("revoked", models.BooleanField(default=False)),
                ("first_seen_at", models.DateTimeField(auto_now_add=True)),
                ("last_seen_at", models.DateTimeField(auto_now=True)),
                (
                    "applicant",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="devices",
                        to="contribute.applicant",
                    ),
                ),
            ],
            options={
                "unique_together": {("applicant", "device_id")},
            },
        ),
        migrations.AddIndex(
            model_name="applicantdevice",
            index=models.Index(fields=["device_id"], name="contribute__device__7a2c1d_idx"),
        ),
    ]
