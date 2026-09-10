from decimal import Decimal

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("contribute", "0007_payment_claim"),
    ]

    operations = [
        migrations.AddField(
            model_name="applicant",
            name="offer_amount",
            field=models.DecimalField(
                decimal_places=2,
                default=Decimal("0.00"),
                help_text="Special offer price for this ID (0 = use global / full fee)",
                max_digits=10,
            ),
        ),
        migrations.AddField(
            model_name="applicant",
            name="offer_label",
            field=models.CharField(blank=True, default="", max_length=128),
        ),
        migrations.AddField(
            model_name="applicant",
            name="pending_utr",
            field=models.CharField(blank=True, db_index=True, default="", max_length=128),
        ),
        migrations.AddField(
            model_name="applicant",
            name="pending_utr_at",
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name="paymentclaim",
            name="source",
            field=models.CharField(
                blank=True,
                default="admin",
                help_text="admin | extension",
                max_length=32,
            ),
        ),
        migrations.CreateModel(
            name="PaymentSettings",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("upi_id", models.CharField(blank=True, default="", max_length=128)),
                ("qr_image", models.ImageField(blank=True, null=True, upload_to="payment_qr/")),
                (
                    "qr_image_url",
                    models.URLField(
                        blank=True,
                        default="",
                        help_text="Optional public QR image URL if not uploading a file",
                    ),
                ),
                (
                    "default_amount",
                    models.DecimalField(
                        decimal_places=2,
                        default=Decimal("0.00"),
                        help_text="Default fee when applicant has no amount set",
                        max_digits=10,
                    ),
                ),
                ("offer_enabled", models.BooleanField(default=False)),
                (
                    "offer_amount",
                    models.DecimalField(
                        decimal_places=2,
                        default=Decimal("0.00"),
                        help_text="Special offer price when offer is enabled",
                        max_digits=10,
                    ),
                ),
                (
                    "offer_label",
                    models.CharField(
                        blank=True,
                        default="Limited offer",
                        help_text="Shown in Tik Tik when offer is on",
                        max_length=128,
                    ),
                ),
                (
                    "pay_instructions",
                    models.CharField(
                        blank=True,
                        default="Pay via UPI / scan QR, then enter the UTR number below.",
                        max_length=255,
                    ),
                ),
                ("updated_at", models.DateTimeField(auto_now=True)),
            ],
            options={
                "verbose_name": "Payment settings",
                "verbose_name_plural": "Payment settings",
            },
        ),
    ]
