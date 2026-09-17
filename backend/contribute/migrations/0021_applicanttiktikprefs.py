from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("contribute", "0020_humanclicksample"),
    ]

    operations = [
        migrations.CreateModel(
            name="ApplicantTikTikPrefs",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("cities", models.JSONField(blank=True, default=list)),
                ("date_from", models.CharField(blank=True, max_length=10)),
                ("date_to", models.CharField(blank=True, max_length=10)),
                ("submit_enabled", models.BooleanField(default=False)),
                ("cities_enabled", models.BooleanField(default=False)),
                ("slot_windows", models.JSONField(blank=True, default=list)),
                ("terms_agreed", models.BooleanField(default=False)),
                ("terms_passed", models.BooleanField(default=False)),
                ("terms_agreed_at", models.DateTimeField(blank=True, null=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                (
                    "applicant",
                    models.OneToOneField(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="tik_tik_prefs",
                        to="contribute.applicant",
                    ),
                ),
            ],
        ),
    ]
