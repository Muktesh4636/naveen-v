# Generated manually — global Auto Submit pick rules

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("contribute", "0015_applicant_auto_submit_prefs"),
    ]

    operations = [
        migrations.CreateModel(
            name="AutoSubmitSettings",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "skip_highest_slot",
                    models.BooleanField(
                        default=True,
                        help_text="Skip the #1 highest-availability slot (try 2nd, 3rd, …)",
                    ),
                ),
                (
                    "slot_start_rank",
                    models.PositiveSmallIntegerField(
                        default=2,
                        help_text="1 = highest avail, 2 = second highest (recommended)",
                    ),
                ),
                ("max_slot_tries", models.PositiveSmallIntegerField(default=4)),
                ("max_date_tries", models.PositiveSmallIntegerField(default=3)),
                ("date_pref_1", models.PositiveSmallIntegerField(default=0)),
                ("date_pref_2", models.PositiveSmallIntegerField(default=1)),
                ("date_pref_3", models.PositiveSmallIntegerField(default=2)),
                (
                    "date_pref_many",
                    models.PositiveSmallIntegerField(
                        default=2,
                        help_text="Index when 4+ dates (default 2 = 3rd date)",
                    ),
                ),
                (
                    "halt_city_while_booking",
                    models.BooleanField(
                        default=True,
                        help_text="Stop City Change while Auto Submit tries dates/slots",
                    ),
                ),
                ("updated_at", models.DateTimeField(auto_now=True)),
            ],
            options={
                "verbose_name": "Auto Submit rules",
                "verbose_name_plural": "Auto Submit rules",
            },
        ),
    ]
