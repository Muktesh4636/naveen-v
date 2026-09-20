from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("contribute", "0023_tiktikcityalert_dates"),
    ]

    operations = [
        migrations.CreateModel(
            name="TikTikLogin",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("email", models.EmailField(max_length=254, unique=True)),
                ("otp_hash", models.CharField(blank=True, default="", max_length=64)),
                ("otp_expires", models.DateTimeField(blank=True, null=True)),
                ("otp_sent_at", models.DateTimeField(blank=True, null=True)),
                ("device_id", models.CharField(blank=True, default="", max_length=64)),
                ("session_hash", models.CharField(blank=True, default="", max_length=64)),
                ("plan", models.CharField(blank=True, default="", max_length=16)),
                ("amount_inr", models.PositiveIntegerField(default=0)),
                ("plan_started", models.DateTimeField(blank=True, null=True)),
                ("plan_ends", models.DateTimeField(blank=True, null=True)),
                ("trial_used", models.BooleanField(default=False)),
                ("applicant_id", models.CharField(blank=True, default="", max_length=64)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
            ],
        ),
    ]
