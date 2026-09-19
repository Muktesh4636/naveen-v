from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("contribute", "0022_tiktikcityalert"),
    ]

    operations = [
        migrations.AddField(
            model_name="tiktikcityalert",
            name="best_date",
            field=models.CharField(blank=True, default="", max_length=10),
        ),
        migrations.AddField(
            model_name="tiktikcityalert",
            name="date_from",
            field=models.CharField(blank=True, default="", max_length=10),
        ),
        migrations.AddField(
            model_name="tiktikcityalert",
            name="date_to",
            field=models.CharField(blank=True, default="", max_length=10),
        ),
    ]
