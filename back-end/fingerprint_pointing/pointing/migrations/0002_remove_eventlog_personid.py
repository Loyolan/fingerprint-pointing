# Generated by Django 4.1.3 on 2022-11-30 17:36

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('pointing', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='eventlog',
            name='personId',
        ),
    ]