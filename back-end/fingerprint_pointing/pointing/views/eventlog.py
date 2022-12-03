from rest_framework.decorators import api_view
from rest_framework.response import Response
from pointing.serializers import EventLogSerializer, EtudiantSerializer, ParcoursSerializer, NiveauSerializer
from pointing.models import Etudiant, EventLog, AnneeUniv, Parcours, Niveau
from django.core.exceptions import ValidationError
from datetime import datetime

@api_view(['GET'])
def getAllEventsLogs(request):
    try:
        events  = EventLog.objects.all().order_by('datetime')
        res = []
        for ev in events:
            eventData = EventLogSerializer(ev, many=False).data
            annee = AnneeUniv.objects.get(anneeEncours= True)
            
            etudiant = Etudiant.objects.filter(etudiantNomComplet=ev.person).filter(anneeUniv=annee.anneeUnivId).get()
            parcours = Parcours.objects.get(parcoursId=etudiant.parcours.parcoursId)
            niveau = Niveau.objects.get(niveauId=etudiant.niveau.niveauId)
            etudiantData = EtudiantSerializer(etudiant, many=False).data
            parcoursData = ParcoursSerializer(parcours, many=False).data
            niveauData = NiveauSerializer(niveau, many=False).data
            event = {'event': eventData, 'etudiant': etudiantData, 'parcours': parcoursData, 'niveau': niveauData}
            res.append(event)
    except ValidationError:
        res = {'status': 'warning', 'message': 'Invalide data'}
    except:
        res = {'status': 'warning', 'message': 'Une eurreur se produite lors de la recuperation de donnees'}
    return Response(res)

@api_view(['GET'])
def getAllEvents2DateTime(request, debut, fin):
    try:
        events = EventLog.objects.filter(datetime__range=(datetime.fromisoformat(debut), datetime.fromisoformat(fin))).order_by('datetime')
        res = []
        for ev in events:
            eventData = EventLogSerializer(ev, many=False).data
            annee = AnneeUniv.objects.get(anneeEncours= True)
            
            etudiant = Etudiant.objects.filter(etudiantNomComplet=ev.person).filter(anneeUniv=annee.anneeUnivId).get()
            parcours = Parcours.objects.get(parcoursId=etudiant.parcours.parcoursId)
            niveau = Niveau.objects.get(niveauId=etudiant.niveau.niveauId)
            etudiantData = EtudiantSerializer(etudiant, many=False).data
            parcoursData = ParcoursSerializer(parcours, many=False).data
            niveauData = NiveauSerializer(niveau, many=False).data
            event = {'event': eventData, 'etudiant': etudiantData, 'parcours': parcoursData, 'niveau': niveauData}
            res.append(event)
    except ValidationError:
        res = {'status': 'warning', 'message': 'Invalide data'}
    except:
        res = {'status': 'warning', 'message': 'Une eurreur se produite lors de la recuperation de donnees'}
    return Response(res)

@api_view(['GET'])
def getAllEventsNiveauParcours(request, id_niveau, id_parcours):
    try:
        events = EventLog.objects.filter().order_by('datetime')
        res = []
        for ev in events:
            eventData = EventLogSerializer(ev, many=False).data
            annee = AnneeUniv.objects.get(anneeEncours= True)
            
            etudiant = Etudiant.objects.filter(etudiantNomComplet=ev.person).filter(anneeUniv=annee.anneeUnivId).get()
            parcours = Parcours.objects.get(parcoursId=etudiant.parcours.parcoursId)
            niveau = Niveau.objects.get(niveauId=etudiant.niveau.niveauId)
            etudiantData = EtudiantSerializer(etudiant, many=False).data
            parcoursData = ParcoursSerializer(parcours, many=False).data
            niveauData = NiveauSerializer(niveau, many=False).data
            event = {'event': eventData, 'etudiant': etudiantData, 'parcours': parcoursData, 'niveau': niveauData}
            if str(etudiant.niveau.niveauId) == id_niveau and str(etudiant.parcours.parcoursId) == id_parcours:
                res.append(event)
    except ValidationError:
        res = {'status': 'warning', 'message': 'Invalide data'}
    except:
        res = {'status': 'warning', 'message': 'Une eurreur se produite lors de la recuperation de donnees'}
    return Response(res)

@api_view(['GET'])
def getAllEventsNiveauParcours2DateTime(request, id_niveau, id_parcours, debut, fin):
    try:
        events = EventLog.objects.filter(datetime__range=(datetime.fromisoformat(debut), datetime.fromisoformat(fin))).order_by('datetime')
        res = []
        for ev in events:
            eventData = EventLogSerializer(ev, many=False).data
            annee = AnneeUniv.objects.get(anneeEncours= True)
            
            etudiant = Etudiant.objects.filter(etudiantNomComplet=ev.person).filter(anneeUniv=annee.anneeUnivId).get()
            parcours = Parcours.objects.get(parcoursId=etudiant.parcours.parcoursId)
            niveau = Niveau.objects.get(niveauId=etudiant.niveau.niveauId)
            etudiantData = EtudiantSerializer(etudiant, many=False).data
            parcoursData = ParcoursSerializer(parcours, many=False).data
            niveauData = NiveauSerializer(niveau, many=False).data
            event = {'event': eventData, 'etudiant': etudiantData, 'parcours': parcoursData, 'niveau': niveauData}
            if(str(etudiant.niveau.niveauId) == id_niveau and str(etudiant.parcours.parcoursId) == id_parcours):
                res.append(event)
    except ValidationError:
        res = {'status': 'warning', 'message': 'Invalide data'}
    except:
        res = {'status': 'warning', 'message': 'Une eurreur se produite lors de la recuperation de donnees'}
    return Response(res)

@api_view(['DELETE'])
def deleteAllEventsNiveauParcours2DateTime(request, id_niveau, id_parcours, debut, fin):
    try:
        events = EventLog.objects.filter(datetime__range=(datetime.fromisoformat(debut), datetime.fromisoformat(fin))).order_by('datetime')
        for ev in events:
            annee = AnneeUniv.objects.get(anneeEncours= True)
            etudiant = Etudiant.objects.filter(etudiantNomComplet=ev.person).filter(anneeUniv=annee.anneeUnivId).get()
            if(str(etudiant.niveau.niveauId) == id_niveau and str(etudiant.parcours.parcoursId) == id_parcours):
                ev.delete()
            res = {'status': 'success', 'message': 'Suppression des evenements réussi'}
    except ValidationError:
        res = {'status': 'warning', 'message': 'Invalide data'}
    except:
        res = {'status': 'warning', 'message': 'Une eurreur se produite lors de la recuperation de donnees'}
    return Response(res)

@api_view(['DELETE'])
def deleteEvent(request, id):
    try:
        event = EventLog.objects.get(id=id)
        event.delete()
        res = {'status': 'success', 'message': 'Suppression des evenements réussi'}
    except:
        res = {'status': 'warning', 'message': 'Une eurreur se produite lors de la recuperation de donnees'}
    return Response(res)