# Generated by Django 4.1.2 on 2022-11-09 18:24

import datetime
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="AnneeUniv",
            fields=[
                (
                    "anneeUnivId",
                    models.UUIDField(
                        default=uuid.uuid4,
                        editable=False,
                        primary_key=True,
                        serialize=False,
                    ),
                ),
                ("anneeUnivDesc", models.CharField(max_length=9, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name="Enseignant",
            fields=[
                (
                    "enseignantId",
                    models.UUIDField(
                        default=uuid.uuid4,
                        editable=False,
                        primary_key=True,
                        serialize=False,
                    ),
                ),
                ("enseignantCode", models.CharField(max_length=8, unique=True)),
                ("enseignantNomComplet", models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name="Niveau",
            fields=[
                (
                    "niveauId",
                    models.UUIDField(
                        default=uuid.uuid4,
                        editable=False,
                        primary_key=True,
                        serialize=False,
                    ),
                ),
                ("niveauCode", models.CharField(max_length=4, unique=True)),
                ("niveauDesc", models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name="Parcours",
            fields=[
                (
                    "parcoursId",
                    models.UUIDField(
                        default=uuid.uuid4,
                        editable=False,
                        primary_key=True,
                        serialize=False,
                    ),
                ),
                ("parcoursCode", models.CharField(max_length=4, unique=True)),
                ("parcoursDesc", models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name="User",
            fields=[
                (
                    "userId",
                    models.UUIDField(
                        default=uuid.uuid4,
                        editable=False,
                        primary_key=True,
                        serialize=False,
                    ),
                ),
                ("username", models.CharField(max_length=12, unique=True)),
                ("password", models.CharField(max_length=128)),
                ("role", models.CharField(default="", max_length=5)),
                ("fullname", models.CharField(max_length=32)),
                ("email", models.EmailField(max_length=50, unique=True)),
                ("created_at", models.DateField(default=datetime.date.today)),
            ],
        ),
        migrations.CreateModel(
            name="Matiere",
            fields=[
                (
                    "matiereId",
                    models.UUIDField(
                        default=uuid.uuid4,
                        editable=False,
                        primary_key=True,
                        serialize=False,
                    ),
                ),
                ("matiereCode", models.CharField(max_length=12, unique=True)),
                ("matiereDesc", models.CharField(max_length=50)),
                (
                    "enseignant",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        to="pointing.enseignant",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Etudiant",
            fields=[
                (
                    "etudiantId",
                    models.UUIDField(
                        default=uuid.uuid4,
                        editable=False,
                        primary_key=True,
                        serialize=False,
                    ),
                ),
                ("etudiantNum", models.IntegerField()),
                ("etudiantMatricule", models.CharField(max_length=7, unique=True)),
                ("etudiantNomComplet", models.CharField(max_length=255)),
                (
                    "anneeUniv",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        to="pointing.anneeuniv",
                    ),
                ),
                (
                    "niveau",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        to="pointing.niveau",
                    ),
                ),
                (
                    "parcours",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        to="pointing.parcours",
                    ),
                ),
            ],
        ),
    ]
