from decimal import Decimal

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("contribute", "0005_city_prefs_timer"),
    ]

    operations = [
        migrations.AddField(
            model_name="applicant",
            name="fee_amount",
            field=models.DecimalField(
                decimal_places=2,
                default=Decimal("0.00"),
                help_text="Amount due for this applicant (admin panel only)",
                max_digits=10,
            ),
        ),
        migrations.AddField(
            model_name="applicant",
            name="payment_id",
            field=models.CharField(
                blank=True,
                db_index=True,
                default="",
                help_text="UPI/bank/ref ID entered by admin when payment is received",
                max_length=128,
            ),
        ),
        migrations.AddField(
            model_name="applicant",
            name="payment_user_id",
            field=models.CharField(
                blank=True,
                default="",
                help_text="Which customer/user paid for this applicant ID",
                max_length=128,
            ),
        ),
        migrations.AddField(
            model_name="applicant",
            name="payment_note",
            field=models.CharField(blank=True, default="", max_length=255),
        ),
        migrations.AddField(
            model_name="applicant",
            name="payment_marked_at",
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]
