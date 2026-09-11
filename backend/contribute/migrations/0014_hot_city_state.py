# Generated for HotCityState

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("contribute", "0013_applicant_wipe_client"),
    ]

    operations = [
        migrations.CreateModel(
            name="HotCityState",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("city_id", models.CharField(blank=True, default="", max_length=64)),
                ("city_name", models.CharField(blank=True, default="", max_length=255)),
                ("expires_at", models.DateTimeField(blank=True, null=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
            ],
            options={
                "verbose_name": "Hot city",
                "verbose_name_plural": "Hot city",
            },
        ),
    ]
