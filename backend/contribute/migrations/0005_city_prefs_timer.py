# Per-applicant rotate timer fields

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("contribute", "0004_city_prefs_rotate_state"),
    ]

    operations = [
        migrations.AddField(
            model_name="applicantcityprefs",
            name="rotate_min_gap_ms",
            field=models.PositiveIntegerField(
                default=13000,
                help_text="Minimum seconds×1000 between city switches for this user",
            ),
        ),
        migrations.AddField(
            model_name="applicantcityprefs",
            name="rotate_max_gap_ms",
            field=models.PositiveIntegerField(
                default=18000,
                help_text="Maximum seconds×1000 between city switches for this user",
            ),
        ),
    ]
