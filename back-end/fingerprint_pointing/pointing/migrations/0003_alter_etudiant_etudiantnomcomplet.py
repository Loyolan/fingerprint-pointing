# Generated by Django 4.1.2 on 2022-11-11 02:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("pointing", "0002_alter_etudiant_etudiantnomcomplet"),
    ]

    operations = [
        migrations.AlterField(
            model_name="etudiant",
            name="etudiantNomComplet",
            field=models.CharField(max_length=255),
        ),
    ]
