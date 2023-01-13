from rest_framework.decorators import api_view
from rest_framework.response import Response
from pointing.serializers import EtudiantSerializer, ParcoursSerializer, NiveauSerializer, PointageSerializer, MatiereSerializer
from pointing.models import Etudiant, EventLog, AnneeUniv, Parcours, Niveau, Pointage, Matiere
from django.core.exceptions import ValidationError
from datetime import datetime
from django.core.exceptions import MultipleObjectsReturned

@api_view(['POST'])
def saveEvents(request, id_niveau, id_parcours, debut, fin):
    try:
        annee = AnneeUniv.objects.get(anneeEncours= True)
        parcours = Parcours.objects.get(parcoursId=id_parcours)
        niveau = Niveau.objects.get(niveauId=id_niveau)
        data = request.data
        etudiants = Etudiant.objects.all().filter(anneeUniv=annee.anneeUnivId).filter(niveau=niveau.niveauId).filter(parcours=parcours.parcoursId)
        for et in etudiants:
            try:
                eventIn = EventLog.objects.filter(datetime__range=(datetime.fromisoformat(debut), datetime.fromisoformat(fin))).filter(person=et.etudiantNomComplet).filter(direction='IN').get()
                data['pointageIn'] = 'YES'
                eventIn.delete()
            except MultipleObjectsReturned:
                eventIn = EventLog.objects.filter(datetime__range=(datetime.fromisoformat(debut), datetime.fromisoformat(fin))).filter(person=et.etudiantNomComplet).filter(direction='IN')
                eventIn.delete()
                data['pointageIn'] = 'YES'
            except:
                data['pointageIn'] = 'NO'
            try:
                eventOut = EventLog.objects.filter(datetime__range=(datetime.fromisoformat(debut), datetime.fromisoformat(fin))).filter(person=et.etudiantNomComplet).filter(direction='OUT').get()
                data['pointageOut'] = 'YES'
                eventOut.delete()
            except MultipleObjectsReturned:
                eventOut = EventLog.objects.filter(datetime__range=(datetime.fromisoformat(debut), datetime.fromisoformat(fin))).filter(person=et.etudiantNomComplet).filter(direction='OUT')
                data['pointageOut'] = 'YES'
                eventOut.delete()
            except:
                data['pointageOut'] = 'NO'

            data['etudiant'] = et.etudiantId
            
            serialisation = PointageSerializer(data=data, many=False)
            if serialisation.is_valid():
                serialisation.save()
                res = {'status': 'success', 'data': serialisation.data, 'message': 'Creation d\'un etudiant {0}, parcours {1}, annee {2} effectuée'.format(niveau.niveauCode, parcours.parcoursCode, annee.anneeUnivDesc) }
            else:
                res = {'status': 'warning', 'message': "Entreés invalides"}        
    except ValidationError:
        res = {'status': 'warning', 'message': 'Invalide data'}
    except:
        res = {'status': 'warning', 'message': 'Une erreur se produite lors de l\'enregistrement de donnees'}
    return Response(res)

@api_view(['GET'])
def getAllPointages(request, limit):
    try:
        pointages  = Pointage.objects.all().order_by('datetimeDebut')[:int(limit)]
        res = []
        for point in pointages:
            pointageData = PointageSerializer(point, many=False).data
            matiere = Matiere.objects.get(matiereId=point.matiere.matiereId)
            matiereData = MatiereSerializer(matiere, many=False).data
            annee = AnneeUniv.objects.get(anneeEncours= True)
            
            etudiant = Etudiant.objects.filter(etudiantId=point.etudiant.etudiantId).filter(anneeUniv=annee.anneeUnivId).get()
            parcours = Parcours.objects.get(parcoursId=etudiant.parcours.parcoursId)
            niveau = Niveau.objects.get(niveauId=etudiant.niveau.niveauId)
            etudiantData = EtudiantSerializer(etudiant, many=False).data
            parcoursData = ParcoursSerializer(parcours, many=False).data
            niveauData = NiveauSerializer(niveau, many=False).data
            pointage = {'pointage': pointageData, 'matiere': matiereData, 'etudiant': etudiantData, 'parcours': parcoursData, 'niveau': niveauData}
            res.append(pointage)
    except ValidationError:
        res = {'status': 'warning', 'message': 'Invalide data'}
    except:
        res = {'status': 'warning', 'message': 'Une erreur se produite lors de la recuperation de donnees'}
    return Response(res)

@api_view(['GET'])
def getAllPointage2DateTime(request, debut, fin):
    try:
        pointages = Pointage.objects.filter(datetimeDebut__range=(datetime.fromisoformat(debut), datetime.fromisoformat(fin))).filter(datetimeFin__range=(datetime.fromisoformat(debut), datetime.fromisoformat(fin))).order_by('datetimeDebut')
        res = []
        for point in pointages:
            pointageData = PointageSerializer(point, many=False).data
            matiere = Matiere.objects.get(matiereId=point.matiere.matiereId)
            matiereData = MatiereSerializer(matiere, many=False).data
            etudiant = Etudiant.objects.get(etudiantId=point.etudiant.etudiantId)
            parcours = Parcours.objects.get(parcoursId=etudiant.parcours.parcoursId)
            niveau = Niveau.objects.get(niveauId=etudiant.niveau.niveauId)
            etudiantData = EtudiantSerializer(etudiant, many=False).data
            parcoursData = ParcoursSerializer(parcours, many=False).data
            niveauData = NiveauSerializer(niveau, many=False).data
            pointage = {'pointage': pointageData, 'matiere': matiereData, 'etudiant': etudiantData, 'parcours': parcoursData, 'niveau': niveauData}
            res.append(pointage)
    except ValidationError:
        res = {'status': 'warning', 'message': 'Invalide data'}
    except:
        res = {'status': 'warning', 'message': 'Une erreur se produite lors de la recuperation de donnees'}
    return Response(res)

@api_view(['GET'])
def getAllPointageNiveauParcours(request, id_niveau, id_parcours, limit):
    try:
        parcours = Parcours.objects.get(parcoursId=id_parcours)
        niveau = Niveau.objects.get(niveauId=id_niveau)
        parcoursData = ParcoursSerializer(parcours, many=False).data
        niveauData = NiveauSerializer(niveau, many=False).data
        etudiants = Etudiant.objects.filter(niveau=id_niveau).filter(parcours=id_parcours)
        res = []
        for et in etudiants:
            pointages = Pointage.objects.filter(etudiant=et.etudiantId)
            for point in pointages:
                pointageData = PointageSerializer(point, many=False).data
                matiere = Matiere.objects.get(matiereId=point.matiere.matiereId)
                matiereData = MatiereSerializer(matiere, many=False).data
                etudiantData = EtudiantSerializer(et, many=False).data
                pointage = {'pointage': pointageData, 'matiere': matiereData, 'etudiant': etudiantData, 'parcours': parcoursData, 'niveau': niveauData}
                res.append(pointage)
        if int(limit) > len(res):
            limit = len(res)
        res = res[0:int(limit)]
    except ValidationError:
        res = {'status': 'warning', 'message': 'Invalide data'}
    except:
        res = {'status': 'warning', 'message': 'Une erreur se produite lors de la recuperation de donnees'}
    return Response(res)

@api_view(['GET'])
def getAllPointageNiveauParcours2DateTime(request, id_niveau, id_parcours, debut, fin):
    try:
        parcours = Parcours.objects.get(parcoursId=id_parcours)
        niveau = Niveau.objects.get(niveauId=id_niveau)
        parcoursData = ParcoursSerializer(parcours, many=False).data
        niveauData = NiveauSerializer(niveau, many=False).data
        etudiants = Etudiant.objects.filter(niveau=id_niveau).filter(parcours=id_parcours)
        res = []
        for et in etudiants:
            pointages = Pointage.objects.filter(etudiant=et.etudiantId).filter(datetimeDebut__range=(datetime.fromisoformat(debut), datetime.fromisoformat(fin))).filter(datetimeFin__range=(datetime.fromisoformat(debut), datetime.fromisoformat(fin)))
            for point in pointages:
                pointageData = PointageSerializer(point, many=False).data
                matiere = Matiere.objects.get(matiereId=point.matiere.matiereId)
                matiereData = MatiereSerializer(matiere, many=False).data
                etudiantData = EtudiantSerializer(et, many=False).data
                pointage = {'pointage': pointageData, 'matiere': matiereData, 'etudiant': etudiantData, 'parcours': parcoursData, 'niveau': niveauData}
                res.append(pointage)
    except ValidationError:
        res = {'status': 'warning', 'message': 'Invalide data'}
    except:
        res = {'status': 'warning', 'message': 'Une erreur se produite lors de la recuperation de donnees'}
    return Response(res)

@api_view(['DELETE'])
def deleteAllPointagesNiveauParcours2DateTime(request, id_niveau, id_parcours, debut, fin):
    try:
        etudiants = Etudiant.objects.filter(niveau=id_niveau).filter(parcours=id_parcours)
        res = []
        for et in etudiants:
            pointages = Pointage.objects.filter(etudiant=et.etudiantId).filter(datetimeDebut__range=(datetime.fromisoformat(debut), datetime.fromisoformat(fin))).filter(datetimeFin__range=(datetime.fromisoformat(debut), datetime.fromisoformat(fin)))
            pointages.delete()
        res = {'status': 'success', 'message':'Suppression des pointages reussi'}
    except ValidationError:
        res = {'status': 'warning', 'message': 'Invalide data'}
    except:
        res = {'status': 'warning', 'message': 'Une erreur se produite lors de la recuperation de donnees'}
    return Response(res)

@api_view(['DELETE'])
def deletePointage(request, id):
    try:
        pointage = Pointage.objects.get(pointageId=id)
        pointage.delete()
        res = {'status': 'success', 'message':'Suppression d\'un pointage reussi'}
    except ValidationError:
        res = {'status': 'warning', 'message': 'Invalide data'}
    except:
        res = {'status': 'warning', 'message': 'Une erreur se produite lors de la recuperation de donnees'}
    return Response(res)

