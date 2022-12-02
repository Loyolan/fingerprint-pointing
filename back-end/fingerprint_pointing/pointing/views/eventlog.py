from rest_framework.decorators import api_view
from rest_framework.response import Response
from pointing.serializers import EventLogSerializer, EtudiantSerializer, ParcoursSerializer, NiveauSerializer
from pointing.models import Etudiant, EventLog, AnneeUniv, Parcours, Niveau
from django.core.exceptions import ValidationError

@api_view(['GET'])
def getAllEventsLogs(request):
    try:
        events  = EventLog.objects.all().order_by('datetime')
        res = []
        for ev in events:
            eventData = EventLogSerializer(ev, many=False).data
            annee = AnneeUniv.objects.get(anneeEncours= True)
            
            etudiant = Etudiant.objects.filter(etudiantNomComplet=ev.person).filter(anneeUniv=annee.anneeUnivId).get()
            print(etudiant.etudiantNomComplet)
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
def getAllEventsSaved(request):
    try:
        events = EventLog.objects.all().filter(saved=True).order_by('datetime')
        res = []
        for ev in events:
            eventData = EventLogSerializer(ev, many=False).data
            annee = AnneeUniv.objects.get(anneeEncours= True)
            
            etudiant = Etudiant.objects.filter(etudiantNomComplet=ev.person).filter(anneeUniv=annee.anneeUnivId).get()
            print(etudiant.etudiantNomComplet)
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
def getAllEventsNotSaved(request):
    try:
        events = EventLog.objects.all().filter(saved=False).order_by('datetime')
        res = []
        for ev in events:
            eventData = EventLogSerializer(ev, many=False).data
            annee = AnneeUniv.objects.get(anneeEncours= True)
            
            etudiant = Etudiant.objects.filter(etudiantNomComplet=ev.person).filter(anneeUniv=annee.anneeUnivId).get()
            print(etudiant.etudiantNomComplet)
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
def getAllEventsDate(request, date):
    try:
        events = EventLog.objects.all().filter(date=date).order_by('datetime')
        res = []
        for ev in events:
            eventData = EventLogSerializer(ev, many=False).data
            annee = AnneeUniv.objects.get(anneeEncours= True)
            
            etudiant = Etudiant.objects.filter(etudiantNomComplet=ev.person).filter(anneeUniv=annee.anneeUnivId).get()
            print(etudiant.etudiantNomComplet)
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
def getAllEventsDateTime(request, date, time):
    try:
        events = EventLog.objects.all().filter(date=date).filter(time=time).order_by('datetime')
        res = []
        for ev in events:
            eventData = EventLogSerializer(ev, many=False).data
            annee = AnneeUniv.objects.get(anneeEncours= True)
            
            etudiant = Etudiant.objects.filter(etudiantNomComplet=ev.person).filter(anneeUniv=annee.anneeUnivId).get()
            print(etudiant.etudiantNomComplet)
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