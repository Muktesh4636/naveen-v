from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("contribute", "0008_payment_upi_offer"),
    ]

    operations = [
        migrations.AddField(
            model_name="applicant",
            name="start_date",
            field=models.DateField(
                blank=True,
                help_text="Applicant start date (admin panel)",
                null=True,
            ),
        ),
        migrations.AddField(
            model_name="applicant",
            name="end_date",
            field=models.DateField(
                blank=True,
                help_text="Applicant end date (admin panel)",
                null=True,
            ),
        ),
    ]
