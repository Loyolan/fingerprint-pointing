# Generated by Django 4.1.3 on 2022-12-01 16:04

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('pointing', '0004_eventlog_saved'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='eventlog',
            name='etudiant',
        ),
        migrations.RemoveField(
            model_name='eventlog',
            name='matiere',
        ),
    ]