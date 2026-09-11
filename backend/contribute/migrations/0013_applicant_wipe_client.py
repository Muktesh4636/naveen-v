from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("contribute", "0012_city_change_settings"),
    ]

    operations = [
        migrations.AddField(
            model_name="applicant",
            name="wipe_client",
            field=models.BooleanField(
                default=False,
                help_text="When True, extension wipes local data on next payment poll",
            ),
        ),
        migrations.AddField(
            model_name="applicant",
            name="wipe_requested_at",
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name="applicant",
            name="wipe_acked_at",
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]
