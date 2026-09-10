# Generated manually for ApplicantCityPrefs

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("contribute", "0002_extension_license"),
    ]

    operations = [
        migrations.CreateModel(
            name="ApplicantCityPrefs",
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
                ("cities", models.JSONField(default=list)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                (
                    "applicant",
                    models.OneToOneField(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="city_prefs",
                        to="contribute.applicant",
                    ),
                ),
            ],
        ),
    ]
