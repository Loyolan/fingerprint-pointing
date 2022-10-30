# Generated by Django 4.1.2 on 2022-10-30 11:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("pointing", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="user",
            name="email",
            field=models.EmailField(max_length=50, unique=True),
        ),
        migrations.AlterField(
            model_name="user",
            name="role",
            field=models.CharField(default="", max_length=5),
        ),
    ]
