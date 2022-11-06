from rest_framework.decorators import api_view
from rest_framework.response import Response
from pointing.serializers import NiveauSerializer
from pointing.models import Niveau
from django.core.exceptions import ValidationError

# GET ALL NIVEAU
@api_view(['GET'])
def allNiveaux(request):
    try:
        niveaux = Niveau.objects.all()
        serialisation = NiveauSerializer(niveaux, many=True)
        res = serialisation.data
    except: 
        res = {'status': 'warning', 'message': 'Une erreur c\'est produite, essayez plus tard'}
    return Response(res)

# GET NIVEAU BY ID
@api_view(['GET'])
def getNiveauById(request, id):
    try:
        niveau = Niveau.objects.get(niveauId=id)
        serialisation = NiveauSerializer(niveau, many=False)
        res = serialisation.data
    except ValidationError:
        res = {'status': 'error', 'message': 'Identifiant Invalide'}
    except:
        res = {'status': 'warning', 'message': 'Donnee introuvable'}
    return Response(res)

# ADD NEW NIVEAU
@api_view(['POST'])
def addNiveau(request):
    try:
        serialisation = NiveauSerializer(data=request.data, many=False)
        res = None;
        if serialisation.is_valid():
            serialisation.save()
            res = {'status': 'success', 'data': serialisation.data, 'message': 'Creation d\'un niveau effectuée' }
        else:
            res = {'status': 'warning', 'message': "Entreés invalides"}
    except:
        res = {'status': 'error', 'message': 'Erreur, Veuillez essayer plus tard'}
    return Response(res);

# UPDATE NIVEAU
@api_view(['PUT'])
def updateNiveau(request, id):
    try:
        niveau = Niveau.objects.get(niveauId=id);
        niveau.niveauCode = request.data['niveauCode']
        niveau.niveauDesc = request.data['niveauDesc']
        niveau.save()
        res = {'status': 'success', "message": "Mis à jour des infos réussi"}
    except ValidationError:
        res = {'status': 'error', 'message': "Niveau introuvable introuvable"}
    except:
        res = {'status': 'error', 'message': 'Erreur, Veuillez essayer plus tard'}
    return Response(res)

# DELETE NIVEAU
@api_view(['DELETE'])
def deleteNiveau(request, id):
    try:
        niveau = Niveau.objects.get(niveauId=id)
        niveau.delete()
        res = {'status': 'success', 'message': 'Suppression d\'un niveau réussi'}
    except ValidationError:
        res = {'status': 'warning', 'message': "Niveau introuvable"}
    except:
        res = {'status': 'error', 'message': 'Erreur, Veuillez essayer plus tard'}
    return Response(res)