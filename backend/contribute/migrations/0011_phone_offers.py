from decimal import Decimal

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("contribute", "0010_applicant_device"),
    ]

    operations = [
        migrations.AddField(
            model_name="applicant",
            name="phone",
            field=models.CharField(blank=True, db_index=True, default="", max_length=20),
        ),
        migrations.AddField(
            model_name="paymentclaim",
            name="payer_phone",
            field=models.CharField(
                blank=True,
                db_index=True,
                default="",
                help_text="Phone entered in Tik Tik before payment",
                max_length=20,
            ),
        ),
        migrations.CreateModel(
            name="PhoneOffer",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                (
                    "phone",
                    models.CharField(
                        db_index=True,
                        help_text="Normalized digits (usually last 10)",
                        max_length=20,
                        unique=True,
                    ),
                ),
                ("phone_display", models.CharField(blank=True, default="", max_length=32)),
                (
                    "list_amount",
                    models.DecimalField(
                        decimal_places=2,
                        default=Decimal("0.00"),
                        help_text="Original / list price (0 = use global default)",
                        max_digits=10,
                    ),
                ),
                (
                    "offer_amount",
                    models.DecimalField(
                        decimal_places=2,
                        default=Decimal("0.00"),
                        help_text="Price this phone pays",
                        max_digits=10,
                    ),
                ),
                ("offer_label", models.CharField(blank=True, default="Special offer", max_length=128)),
                ("active", models.BooleanField(default=True)),
                ("note", models.CharField(blank=True, default="", max_length=255)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
            ],
            options={
                "ordering": ["-updated_at"],
            },
        ),
    ]
