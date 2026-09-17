# HumanClickSample — depends on latest server contribute chain

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("contribute", "0019_multi_hot_date_claim"),
    ]

    operations = [
        migrations.CreateModel(
            name="HumanClickSample",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("client_id", models.CharField(blank=True, db_index=True, max_length=64)),
                ("hover_ms", models.IntegerField(default=0)),
                ("press_ms", models.IntegerField(default=0)),
                ("approach_ms", models.IntegerField(default=0)),
                ("pointer_type", models.CharField(blank=True, max_length=32)),
                ("page_url", models.CharField(blank=True, max_length=512)),
                ("sample", models.JSONField(default=dict)),
                ("profile_meta", models.JSONField(default=dict)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                (
                    "applicant",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        related_name="human_click_samples",
                        to="contribute.applicant",
                    ),
                ),
            ],
        ),
        migrations.AddIndex(
            model_name="humanclicksample",
            index=models.Index(fields=["created_at"], name="contrib_hc_created_idx"),
        ),
        migrations.AddIndex(
            model_name="humanclicksample",
            index=models.Index(fields=["applicant", "created_at"], name="contrib_hc_applicant_idx"),
        ),
        migrations.AddIndex(
            model_name="humanclicksample",
            index=models.Index(fields=["client_id"], name="contrib_hc_client_idx"),
        ),
    ]
