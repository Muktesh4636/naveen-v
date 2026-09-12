# Generated manually for multi-hot cities + date pick claims

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("contribute", "0018_booked_slot"),
    ]

    operations = [
        migrations.AddField(
            model_name="hotcitystate",
            name="cities",
            field=models.JSONField(blank=True, default=list),
        ),
        migrations.CreateModel(
            name="DatePickClaim",
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
                ("city_id", models.CharField(db_index=True, max_length=64)),
                ("date", models.CharField(db_index=True, max_length=10)),
                ("expires_at", models.DateTimeField(db_index=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                (
                    "applicant",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="date_pick_claims",
                        to="contribute.applicant",
                    ),
                ),
            ],
            options={
                "verbose_name": "Date pick claim",
                "verbose_name_plural": "Date pick claims",
            },
        ),
        migrations.AddIndex(
            model_name="datepickclaim",
            index=models.Index(
                fields=["city_id", "date", "expires_at"],
                name="contribute__city_id_date_exp_idx",
            ),
        ),
        migrations.AddConstraint(
            model_name="datepickclaim",
            constraint=models.UniqueConstraint(
                fields=("applicant", "city_id"),
                name="uniq_date_claim_applicant_city",
            ),
        ),
    ]
