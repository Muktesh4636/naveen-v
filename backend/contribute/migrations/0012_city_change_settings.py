# Generated manually for CityChangeSettings

from django.db import migrations, models


def _default_windows():
    return [
        {"slot": 3, "from_min": 0, "to_min": 2},
        {"slot": 1, "from_min": 14, "to_min": 21},
        {"slot": 2, "from_min": 24, "to_min": 31},
        {"slot": 3, "from_min": 54, "to_min": 59},
    ]


class Migration(migrations.Migration):

    dependencies = [
        ("contribute", "0011_phone_offers"),
    ]

    operations = [
        migrations.CreateModel(
            name="CityChangeSettings",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                (
                    "windows",
                    models.JSONField(
                        default=_default_windows,
                        help_text="List of {from_min, to_min, slot} within each IST hour",
                    ),
                ),
                ("updated_at", models.DateTimeField(auto_now=True)),
            ],
            options={
                "verbose_name": "City change timing",
                "verbose_name_plural": "City change timing",
            },
        ),
    ]
