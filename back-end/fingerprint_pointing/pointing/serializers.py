from rest_framework import serializers
from .models import User, Parcours, Niveau, AnneeUniv, Etudiant, Enseignant, Matiere, EventLog

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

# PARCOURS
class ParcoursSerializer(serializers.ModelSerializer):
    class Meta:
        model = Parcours
        fields = '__all__'

# NIVEAU
class NiveauSerializer(serializers.ModelSerializer):
    class Meta:
        model = Niveau
        fields = '__all__'

# ANNEE UNIV
class AnneeUnivSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnneeUniv
        fields = '__all__'

# ENSEIGNANT
class EnseignantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Enseignant
        fields = '__all__'
        
# MATIERE
class MatiereSerializer(serializers.ModelSerializer):
    class Meta:
        model = Matiere
        fields = '__all__'

# ETUDIANT
class EtudiantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Etudiant
        fields = '__all__'

class EventLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventLog
        fields = '__all__'