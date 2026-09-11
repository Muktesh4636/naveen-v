# Generated manually — Auto Submit prefs per applicant

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("contribute", "0014_hot_city_state"),
    ]

    operations = [
        migrations.CreateModel(
            name="ApplicantAutoSubmitPrefs",
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
                ("enabled", models.BooleanField(default=False)),
                ("from_date", models.DateField(blank=True, null=True)),
                ("to_date", models.DateField(blank=True, null=True)),
                ("max_date_tries", models.PositiveSmallIntegerField(default=3)),
                ("max_slot_tries", models.PositiveSmallIntegerField(default=3)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                (
                    "applicant",
                    models.OneToOneField(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="auto_submit_prefs",
                        to="contribute.applicant",
                    ),
                ),
            ],
        ),
    ]
