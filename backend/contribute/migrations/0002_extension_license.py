# Generated manually for ExtensionLicense / LicenseDevice

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("contribute", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="ExtensionLicense",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("key", models.CharField(db_index=True, max_length=64, unique=True)),
                ("label", models.CharField(blank=True, help_text="Customer / note", max_length=255)),
                ("active", models.BooleanField(default=True)),
                ("max_devices", models.PositiveSmallIntegerField(default=1)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name="LicenseDevice",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("install_id", models.CharField(db_index=True, max_length=64)),
                ("first_seen_at", models.DateTimeField(auto_now_add=True)),
                ("last_seen_at", models.DateTimeField(auto_now=True)),
                (
                    "license",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="devices",
                        to="contribute.extensionlicense",
                    ),
                ),
            ],
            options={
                "indexes": [models.Index(fields=["install_id"], name="contribute__install_8a1b2c_idx")],
                "unique_together": {("license", "install_id")},
            },
        ),
    ]
