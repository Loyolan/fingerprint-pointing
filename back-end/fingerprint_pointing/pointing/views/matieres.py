from rest_framework.decorators import api_view
from rest_framework.response import Response
from pointing.serializers import MatiereSerializer
from pointing.models import Matiere, Enseignant
from django.core.exceptions import ValidationError

# GET ALL MATIERE
@api_view(['GET'])
def allMatieres(request):
    try:
        matieres = Matiere.objects.all()
        serialisation = MatiereSerializer(matieres, many=True)
        res = serialisation.data
    except: 
        res = {'status': 'warning', 'message': 'Une erreur c\'est produite, essayez plus tard'}
    return Response(res)

# GET ALL MATIERES OF AN ENSEIGNANT
@api_view(['GET'])
def getMatieresProfs(request, id):
    try:
        matieres = Matiere.objects.all().filter(enseignant=id)
        serialisation = MatiereSerializer(matieres, many=True)
        res = serialisation.data
    except: 
        res = {'status': 'warning', 'message': 'Une erreur c\'est produite, essayez plus tard'}
    return Response(res)

# GET MATIERE BY ID
@api_view(['GET'])
def getMatiereById(request, id):
    try:
        matiere = Matiere.objects.get(matiereId=id)
        serialisation = MatiereSerializer(matiere, many=False)
        res = serialisation.data
    except ValidationError:
        res = {'status': 'error', 'message': 'Identifiant Invalide'}
    except:
        res = {'status': 'warning', 'message': 'Donnee introuvable'}
    return Response(res)

# ADD NEW MATIERE
@api_view(['POST'])
def addMatiere(request, id_prof):
    try:
        enseignant = Enseignant.objects.get(enseignantId=id_prof)
        request.data['enseignant'] = enseignant.enseignantId
        serialisation = MatiereSerializer(data=request.data, many=False)
        res = None
        if serialisation.is_valid():
            serialisation.save()
            res = {'status': 'success', 'user': serialisation.data, 'message': 'Creation d\'une matiere effectuée' }
        else:
            res = {'status': 'warning', 'message': "Entreés invalides"}
    except:
        res = {'status': 'error', 'message': 'Erreur, Veuillez essayer plus tard'}
    return Response(res)

# UPDATE MATIERE
@api_view(['PUT'])
def updateMatiere(request, id):
    try:
        matiere = Matiere.objects.get(matiereId=id)
        matiere.matiereCode = request.data['matiereCode']
        matiere.matiereDesc = request.data['matiereDesc']
        matiere.save()
        res = {'status': 'success', "message": "Mis à jour des infos réussi"}
    except ValidationError:
        res = {'status': 'error', 'message': "Matiere introuvable introuvable"}
    except:
        res = {'status': 'error', 'message': 'Erreur, Veuillez essayer plus tard'}
    return Response(res)

# CHANGE PROF
@api_view(['PUT'])
def changeProf(request, id, id_prof):
    try:
        matiere = Matiere.objects.get(matiereId=id)
        prof = Enseignant.objects.get(enseignantId=id_prof)
        matiere.enseignant = prof
        matiere.save()
        res = {'status': 'success', "message": "Enseignant d'un matiere bien changE"}
    except ValidationError:
        res = {'status': 'error', 'message': "Matiere introuvable introuvable"}
    except:
        res = {'status': 'error', 'message': 'Erreur, Veuillez essayer plus tard'}
    return Response(res)

# DELETE MATIERE
@api_view(['DELETE'])
def deleteMatiere(request, id):
    try:
        matiere = Matiere.objects.get(matiereId=id)
        matiere.delete()
        res = {'status': 'success', 'message': 'Suppression d\'un matiere réussi'}
    except ValidationError:
        res = {'status': 'warning', 'message': "Matiere introuvable"}
    except:
        res = {'status': 'error', 'message': 'Erreur, Veuillez essayer plus tard'}
    return Response(res)