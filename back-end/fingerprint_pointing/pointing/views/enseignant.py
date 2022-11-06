from rest_framework.decorators import api_view
from rest_framework.response import Response
from pointing.serializers import EnseignantSerializer
from pointing.models import Enseignant
from django.core.exceptions import ValidationError

# GET ALL ENSEIGNANT
@api_view(['GET'])
def allEnseignants(request):
    try:
        enseignants = Enseignant.objects.all()
        serialisation = EnseignantSerializer(enseignants, many=True)
        res = serialisation.data
    except: 
        res = {'status': 'warning', 'message': 'Une erreur c\'est produite, essayez plus tard'}
    return Response(res)

# GET ENSEIGNANT BY ID
@api_view(['GET'])
def getEnseignantById(request, id):
    try:
        enseignant = Enseignant.objects.get(enseignantId=id)
        serialisation = EnseignantSerializer(enseignant, many=False)
        res = serialisation.data
    except ValidationError:
        res = {'status': 'error', 'message': 'Identifiant Invalide'}
    except:
        res = {'status': 'warning', 'message': 'Donnee introuvable'}
    return Response(res)

# ADD NEW ENSEIGNANT
@api_view(['POST'])
def addEnseignant(request):
    try:
        serialisation = EnseignantSerializer(data=request.data, many=False)
        res = None;
        if serialisation.is_valid():
            serialisation.save()
            res = {'status': 'success', 'data': serialisation.data, 'message': 'Creation d\'un enseignant effectuée' }
        else:
            res = {'status': 'warning', 'message': "Entreés invalides"}
    except:
        res = {'status': 'error', 'message': 'Erreur, Veuillez essayer plus tard'}
    return Response(res);

# UPDATE ENSEIGNANT
@api_view(['PUT'])
def updateEnseignant(request, id):
    try:
        enseignant = Enseignant.objects.get(enseignantId=id);
        enseignant.enseignantCode = request.data['enseignantCode']
        enseignant.enseignantNomComplet = request.data['enseignantNomComplet']
        enseignant.save()
        res = {'status': 'success', "message": "Mis à jour des infos réussi"}
    except ValidationError:
        res = {'status': 'error', 'message': "Enseignant introuvable introuvable"}
    except:
        res = {'status': 'error', 'message': 'Erreur, Veuillez essayer plus tard'}
    return Response(res)

# DELETE ENSEIGNANT
@api_view(['DELETE'])
def deleteEnseignant(request, id):
    try:
        enseignant = Enseignant.objects.get(enseignantId=id)
        enseignant.delete()
        res = {'status': 'success', 'message': 'Suppression d\'un enseignant réussi'}
    except ValidationError:
        res = {'status': 'warning', 'message': "Enseignant introuvable"}
    except:
        res = {'status': 'error', 'message': 'Erreur, Veuillez essayer plus tard'}
    return Response(res)