from rest_framework.decorators import api_view
from rest_framework.response import Response
from pointing.serializers import AnneeUnivSerializer
from pointing.models import AnneeUniv
from django.core.exceptions import ValidationError

# GET ALL ANNEE UNIV
@api_view(['GET'])
def allAnneeUnivs(request):
    try:
        anneeUnivs = AnneeUniv.objects.all()
        serialisation = AnneeUnivSerializer(anneeUnivs, many=True)
        res = serialisation.data
    except: 
        res = {'status': 'warning', 'message': 'Une erreur c\'est produite, essayez plus tard'}
    return Response(res)

# GET ANNEE UNIV BY ID
@api_view(['GET'])
def getAnneeUnivById(request, id):
    try:
        anneeUniv = AnneeUniv.objects.get(anneeUnivId=id)
        serialisation = AnneeUnivSerializer(anneeUniv, many=False)
        res = serialisation.data
    except ValidationError:
        res = {'status': 'error', 'message': 'Identifiant Invalide'}
    except:
        res = {'status': 'warning', 'message': 'Donnee introuvable'}
    return Response(res)

# ADD NEW ANNEE UNIV
@api_view(['POST'])
def addAnneeUniv(request):
    try:
        serialisation = AnneeUnivSerializer(data=request.data, many=False)
        res = None;
        if serialisation.is_valid():
            serialisation.save()
            res = {'status': 'success', 'data': serialisation.data, 'message': 'Creation d\'un anneeUniv effectuée' }
        else:
            res = {'status': 'warning', 'message': "Entreés invalides"}
    except:
        res = {'status': 'error', 'message': 'Erreur, Veuillez essayer plus tard'}
    return Response(res);

# UPDATE ANNEE UNIV
@api_view(['PUT'])
def updateAnneeUniv(request, id):
    try:
        anneeUniv = AnneeUniv.objects.get(anneeUnivId=id);
        anneeUniv.anneeUnivDesc = request.data['anneeUnivDesc']
        anneeUniv.save()
        res = {'status': 'success', "message": "Mis à jour des infos réussi"}
    except ValidationError:
        res = {'status': 'error', 'message': "AnneeUniv introuvable introuvable"}
    except:
        res = {'status': 'error', 'message': 'Erreur, Veuillez essayer plus tard'}
    return Response(res)

# DELETE ANNEE UNIV
@api_view(['DELETE'])
def deleteAnneeUniv(request, id):
    try:
        anneeUniv = AnneeUniv.objects.get(anneeUnivId=id)
        anneeUniv.delete()
        res = {'status': 'success', 'message': 'Suppression d\'un anneeUniv réussi'}
    except ValidationError:
        res = {'status': 'warning', 'message': "AnneeUniv introuvable"}
    except:
        res = {'status': 'error', 'message': 'Erreur, Veuillez essayer plus tard'}
    return Response(res)