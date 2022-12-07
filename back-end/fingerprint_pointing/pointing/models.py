import uuid
import datetime
from django.db import models

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
    anneeEncours= models.BooleanField(default=False);

# ETUDIANT
class Etudiant(models.Model):
    etudiantId= models.AutoField(primary_key=True)
    etudiantNum= models.IntegerField(null=False)
    etudiantMatricule= models.CharField(max_length=7, null=False, unique=True)
    etudiantNomComplet= models.CharField(max_length=255,null=False)
    etudiantSexe= models.IntegerField(default=1)
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

# EVENTS LOGS
class EventLog(models.Model):
    id= models.IntegerField(primary_key=True, db_index=True)
    datetime= models.DateTimeField()
    date= models.DateField()
    time= models.TimeField()
    direction= models.CharField(max_length=255, default='UKN')
    devicename= models.CharField(max_length=255)
    devicesn= models.CharField(max_length=255)
    person = models.CharField(max_length=255)
    card= models.CharField(max_length=255)

# POINTAGE
class Pointage(models.Model):
    #pointageId= models.UUIDField(primary_key=True, unique=True, default=uuid.uuid4, editable=False)
    id = models.AutoField(primary_key=True)
    datetimeDebut= models.DateTimeField(null=True)
    datetimeFin= models.DateTimeField(null=True)
    pointageIn = models.CharField(max_length=3,default='UKN')
    pointageOut = models.CharField(max_length=3, default='UKN')
    etudiant= models.ForeignKey(Etudiant, on_delete=models.CASCADE, null=True)
    matiere= models.ForeignKey(Matiere, on_delete=models.SET_NULL, null=True)