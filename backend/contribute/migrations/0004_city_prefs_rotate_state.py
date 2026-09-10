# Generated manually — rotate state on ApplicantCityPrefs

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("contribute", "0003_applicant_city_prefs"),
    ]

    operations = [
        migrations.AddField(
            model_name="applicantcityprefs",
            name="last_post_id",
            field=models.CharField(blank=True, default="", max_length=64),
        ),
        migrations.AddField(
            model_name="applicantcityprefs",
            name="last_switch_at",
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name="applicantcityprefs",
            name="enabled",
            field=models.BooleanField(default=False),
        ),
    ]
