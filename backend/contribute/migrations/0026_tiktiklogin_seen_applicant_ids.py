# Generated manually for TikTikLogin.seen_applicant_ids

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("contribute", "0025_tiktiklogin_otp_codes"),
    ]

    operations = [
        migrations.AddField(
            model_name="tiktiklogin",
            name="seen_applicant_ids",
            field=models.JSONField(blank=True, default=list),
        ),
    ]
