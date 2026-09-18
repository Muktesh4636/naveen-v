from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("contribute", "0021_applicanttiktikprefs"),
    ]

    operations = [
        migrations.CreateModel(
            name="TikTikCityAlert",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("city_id", models.CharField(db_index=True, max_length=64)),
                ("city_name", models.CharField(blank=True, max_length=255)),
                ("day_count", models.PositiveIntegerField(default=0)),
                ("created_at", models.DateTimeField(auto_now_add=True, db_index=True)),
                (
                    "source_applicant",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        related_name="tik_tik_city_alerts",
                        to="contribute.applicant",
                    ),
                ),
            ],
            options={
                "ordering": ["-id"],
            },
        ),
        migrations.AddIndex(
            model_name="tiktikcityalert",
            index=models.Index(fields=["city_id", "-id"], name="tt_city_alert_city_id"),
        ),
        migrations.AddIndex(
            model_name="tiktikcityalert",
            index=models.Index(fields=["-created_at"], name="tt_city_alert_created"),
        ),
    ]
