from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("contribute", "0026_tiktiklogin_seen_applicant_ids"),
    ]

    operations = [
        migrations.CreateModel(
            name="ExtensionLog",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("applicant_key", models.CharField(blank=True, db_index=True, default="", max_length=64)),
                ("user_label", models.CharField(blank=True, default="", max_length=255)),
                ("version", models.CharField(blank=True, default="", max_length=16)),
                ("level", models.CharField(blank=True, default="info", max_length=8)),
                ("kind", models.CharField(blank=True, db_index=True, default="", max_length=32)),
                ("city", models.CharField(blank=True, default="", max_length=255)),
                ("message", models.TextField(blank=True, default="")),
                ("data", models.JSONField(blank=True, default=dict)),
                ("page", models.CharField(blank=True, default="", max_length=32)),
                ("client_at", models.DateTimeField(blank=True, null=True)),
                ("created_at", models.DateTimeField(auto_now_add=True, db_index=True)),
                (
                    "applicant",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        related_name="extension_logs",
                        to="contribute.applicant",
                    ),
                ),
            ],
            options={
                "ordering": ["-id"],
                "indexes": [
                    models.Index(fields=["applicant_key", "-id"], name="contribute__applica_3b1f0e_idx"),
                    models.Index(fields=["kind", "-id"], name="contribute__kind_7c2d41_idx"),
                ],
            },
        ),
    ]
