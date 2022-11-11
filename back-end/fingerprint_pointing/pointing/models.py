import uuid
import datetime
from django.db import models
from rest_framework.validators import UniqueValidator

# Create your models here.
class User(models.Model):
    userId = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    username = models.CharField(max_length=12, unique=True)
    password = models.CharField(max_length=128)
    role = models.CharField(max_length=5, default="")
    fullname = models.CharField(max_length=32)
    email = models.EmailField(max_length=50, unique=True)
    created_at = models.DateField(default=datetime.date.today)

# PARCOURS
class Parcours(models.Model):
    parcoursId= models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    parcoursCode= models.CharField(max_length=4, null=False, unique=True)
    parcoursDesc= models.CharField(max_length=50)

# NIVEAU
class Niveau(models.Model):
    niveauId= models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    niveauCode= models.CharField(max_length=4, unique=True)
    niveauDesc= models.CharField(max_length=50)

# ANNEE UNIV
class AnneeUniv(models.Model):
    anneeUnivId= models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    anneeUnivDesc= models.CharField(max_length=9, unique=True)

# ETUDIANT
class Etudiant(models.Model):
    etudiantId= models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    etudiantNum= models.IntegerField(null=False)
    etudiantMatricule= models.CharField(max_length=7, null=False, unique=True)
    etudiantNomComplet= models.CharField(max_length=255,null=False)
    anneeUniv= models.ForeignKey(AnneeUniv, on_delete=models.CASCADE, null=True)
    niveau= models.ForeignKey(Niveau, on_delete=models.CASCADE, null=True)
    parcours= models.ForeignKey(Parcours, on_delete=models.CASCADE, null=True)

# ENSEIGNANT
class Enseignant(models.Model):
    enseignantId= models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    enseignantCode= models.CharField(max_length=8, unique=True)
    enseignantNomComplet= models.CharField(max_length=255)

# MATIERE
class Matiere(models.Model):
    matiereId= models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    matiereCode= models.CharField(max_length=12, unique=True)
    matiereDesc= models.CharField(max_length=50)
    enseignant= models.ForeignKey(Enseignant, on_delete=models.CASCADE, null=True)