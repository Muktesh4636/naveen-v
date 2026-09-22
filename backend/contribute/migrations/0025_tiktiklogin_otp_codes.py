# Generated manually for TikTikLogin multi-OTP pool

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("contribute", "0024_tiktiklogin"),
    ]

    operations = [
        migrations.AddField(
            model_name="tiktiklogin",
            name="otp_codes",
            field=models.JSONField(blank=True, default=list),
        ),
    ]
