from rest_framework.decorators import api_view
from rest_framework.response import Response
from pointing.serializers import ParcoursSerializer
from pointing.models import Parcours
from django.core.exceptions import ValidationError

# GET ALL PARCOURS
@api_view(['GET'])
def allParcours(request):
    parcours = Parcours.objects.all()
    serialisation = ParcoursSerializer(parcours, many=True)
    return Response(serialisation.data)

# GET PARCOURS BY
@api_view(['GET'])
def getParcoursById(request, id):
    try:
        parcours = Parcours.objects.get(parcoursId=id)
        serialisation = ParcoursSerializer(parcours, many=False)
        res = serialisation.data
    except ValidationError:
        res = {'status': 'error', 'message': 'Identifiant Invalide'}
    except:
        res = {'status': 'warning', 'message': 'Parcours introuvable'}
    return Response(res)

# CREATE PARCOURS
@api_view(['POST'])
def addParcours(request):
    try:
        serialisation = ParcoursSerializer(data=request.data, many=False)
        res = None;
        if serialisation.is_valid():
            serialisation.save()
            res = {'status': 'success', 'data': serialisation.data, 'message': 'Creation d\'un parcours effectuée' }
        else:
            res = {'status': 'warning', 'message': "Entreés invalides"}
    except:
        res = {'status': 'error', 'message': 'Erreur, Veuillez essayer plus tard'}
    return Response(res)

# UPDATE PARCOURS
@api_view(['PUT'])
def updateParcours(request, id):
    try:
        parcours = Parcours.objects.get(parcoursId=id);
        parcours.parcoursCode = request.data['parcoursCode']
        parcours.parcoursDesc = request.data['parcoursDesc']
        parcours.save()
        res = {'status': 'success', "message": "Mis à jour des infos réussi"}
    except ValidationError:
        res = {'status': 'error', 'message': "Parcours introuvable"}
    except:
        res = {'status': 'error', 'message': 'Erreur, Veuillez essayer plus tard'}
    return Response(res)

# DELETE PARCOURS
@api_view(['DELETE'])
def deleteParcours(request, id):
    try:
        parcours = Parcours.objects.get(parcoursId=id)
        parcours.delete()
        res = {'status': 'success', 'message': 'Suppression d\'un parcours réussi'}
    except ValidationError:
        res = {'status': 'warning', 'message': "Parcours introuvable"}
    except:
        res = {'status': 'error', 'message': 'Erreur, Veuillez essayer plus tard'}
    return Response(res)