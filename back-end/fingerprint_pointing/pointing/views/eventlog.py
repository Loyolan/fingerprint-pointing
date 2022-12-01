from rest_framework.decorators import api_view
from rest_framework.response import Response
from pointing.serializers import EventLogSerializer
from pointing.models import Etudiant, EventLog
from django.core.exceptions import ValidationError

@api_view(['GET'])
def getAllEventsLogs(request):
    try:
        events  = EventLog.objects.all().order_by('datetime')
        serialisation = EventLogSerializer(events, many=True)
        res = serialisation.data
    except ValidationError:
        res = {'status': 'warning', 'message': 'Invalide data'}
    except:
        res = {'status': 'warning', 'message': 'Une eurreur se produite lors de la recuperation de donnees'}
    return Response(res)

@api_view(['GET'])
def getAllEventsSaved(request):
    try:
        events = EventLog.objects.all().filter(saved=True).order_by('datetime')
        serialisation = EventLogSerializer(events, many=True)
        res = serialisation.data
    except ValidationError:
        res = {'status': 'warning', 'message': 'Invalide data'}
    except:
        res = {'status': 'warning', 'message': 'Une eurreur se produite lors de la recuperation de donnees'}
    return Response(res)

@api_view(['GET'])
def getAllEventsNotSaved(request):
    try:
        events = EventLog.objects.all().filter(saved=False).order_by('datetime')
        serialisation = EventLogSerializer(events, many=True)
        res = serialisation.data
    except ValidationError:
        res = {'status': 'warning', 'message': 'Invalide data'}
    except:
        res = {'status': 'warning', 'message': 'Une eurreur se produite lors de la recuperation de donnees'}
    return Response(res)

@api_view(['GET'])
def getAllEventsDate(request, date):
    try:
        events = EventLog.objects.all().filter(date=date).order_by('datetime')
        serialisation = EventLogSerializer(events, many=True)
        res = serialisation.data
    except ValidationError:
        res = {'status': 'warning', 'message': 'Invalide data'}
    except:
        res = {'status': 'warning', 'message': 'Une eurreur se produite lors de la recuperation de donnees'}
    return Response(res)

@api_view(['GET'])
def getAllEventsDateTime(request, date, time):
    try:
        events = EventLog.objects.all().filter(date=date).filter(time=time).order_by('datetime')
        serialisation = EventLogSerializer(events, many=True)
        res = serialisation.data
    except ValidationError:
        res = {'status': 'warning', 'message': 'Invalide data'}
    except:
        res = {'status': 'warning', 'message': 'Une eurreur se produite lors de la recuperation de donnees'}
    return Response(res)