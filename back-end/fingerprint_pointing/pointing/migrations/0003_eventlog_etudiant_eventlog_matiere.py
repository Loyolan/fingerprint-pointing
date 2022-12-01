# Generated by Django 4.1.3 on 2022-12-01 11:28

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('pointing', '0002_remove_eventlog_personid'),
    ]

    operations = [
        migrations.AddField(
            model_name='eventlog',
            name='etudiant',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='pointing.etudiant'),
        ),
        migrations.AddField(
            model_name='eventlog',
            name='matiere',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='pointing.matiere'),
        ),
    ]
