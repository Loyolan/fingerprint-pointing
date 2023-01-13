from rest_framework.decorators import api_view
from rest_framework.response import Response
from pointing.models import Pointage, Etudiant, Parcours, Niveau, Enseignant, Matiere
from pointing.serializers import PointageSerializer
import datetime
import time
import pandas as pd
from django.core.files.storage import FileSystemStorage
from django.http.response import FileResponse, HttpResponseRedirect

def datetime_to_milliseconds(d):
    return int(time.mktime(d.timetuple()) * 1000)

@api_view(['GET'])
def sttAgilityEtudiants(request, annee):
    try:
        a = datetime.datetime(year=int(annee), month=1, day=1, hour=0,minute=0, second=0, microsecond=0, tzinfo=datetime.timezone.utc)
        f = datetime.datetime(year=int(annee), month=12, day=31, hour=0,minute=0, second=0, microsecond=0, tzinfo=datetime.timezone.utc)
        a_debut = datetime_to_milliseconds(a) + 10800000
        a_fin = datetime_to_milliseconds(f) + 10800000
        res = []
        while (a_debut<=a_fin):
            fin = a_debut + (24*60*60*1000)
            d = datetime.datetime.fromtimestamp((a_debut-10800000)/1000.0)
            b = datetime.datetime.fromtimestamp((fin-10800000)/1000.0)
            pointed  = Pointage.objects.filter(datetimeDebut__range=(d, b)).filter(datetimeFin__range=(d, b)).filter(pointageIn='YES').filter(pointageOut='YES')
            pointages = Pointage.objects.filter(datetimeDebut__range=(d, b)).filter(datetimeFin__range=(d, b))
            if (len(pointages)>0):
                percent = (len(pointed) * 100)//len(pointages)
            else:
                percent = 5
            res.append([a_debut, (percent)])
            a_debut += (24*60*60*1000)
    except:
        res = {'status': 'warning', 'message': 'Une erreur se produite lors de la recuperation de donnees'}
    return Response(res)

@api_view(['GET'])
def sttPointedOrNot(request, annee):
    try:
        a = datetime.datetime(year=int(annee), month=1, day=1, hour=0,minute=0, second=0, microsecond=0, tzinfo=datetime.timezone.utc)
        f = datetime.datetime(year=int(annee), month=12, day=31, hour=0,minute=0, second=0, microsecond=0, tzinfo=datetime.timezone.utc)
        a_debut = datetime_to_milliseconds(a) + 10800000
        a_fin = datetime_to_milliseconds(f) + 10800000
        res = []
        yes_data = []
        no_data = []
        in_data = []
        out_data = []
        categories = []
        while (a_debut<=a_fin):
            fin = a_debut + (24*60*60*1000)
            d = datetime.datetime.fromtimestamp((a_debut-10800000)/1000.0)
            b = datetime.datetime.fromtimestamp((fin-10800000)/1000.0)
            pointed  = Pointage.objects.filter(datetimeDebut__range=(d, b)).filter(datetimeFin__range=(d, b)).filter(pointageIn='YES').filter(pointageOut='YES')
            not_pointed  = Pointage.objects.filter(datetimeDebut__range=(d, b)).filter(datetimeFin__range=(d, b)).filter(pointageIn='NO').filter(pointageOut='NO')
            out_pointed  = Pointage.objects.filter(datetimeDebut__range=(d, b)).filter(datetimeFin__range=(d, b)).filter(pointageIn='NO').filter(pointageOut='YES')
            in_pointed  = Pointage.objects.filter(datetimeDebut__range=(d, b)).filter(datetimeFin__range=(d, b)).filter(pointageIn='YES').filter(pointageOut='NO')
            pointages = Pointage.objects.filter(datetimeDebut__range=(d, b)).filter(datetimeFin__range=(d, b))
            categories.append(d)
            if (len(pointages)>0):
                y = (len(pointed) * 100)//len(pointages)
                n = (len(not_pointed) * 100)//len(pointages)
                o = (len(out_pointed) * 100)//len(pointages)
                i = (len(in_pointed) * 100)//len(pointages)
            else:
                y=0
                n=0
                o=0
                i=0
            yes_data.append(y)
            no_data.append(n)
            in_data.append(i)
            out_data.append(o)
            a_debut += (24*60*60*1000)
        series = [{
            'name': 'PRESENT',
            'data': yes_data
            },{
            'name': 'ABSENT',
            'data': no_data
            },{
            'name': 'SORTIE NON RENSEIGNEE',
            'data': in_data
            },{
            'name': 'ENTREE NON RENSEIGNEE',
            'data': out_data
        }]
        res = {'series': series, 'categories': categories}
    except:
        res = {'status': 'warning', 'message': 'Une erreur se produite lors de la recuperation de donnees'}
    return Response(res)

def convertUUIDToBytes(uuid):
    uuid = str(uuid)
    return uuid.replace('-', '')

@api_view(['GET'])
def getDatasets(request, annee):
    try:
        a = datetime.datetime(year=int(annee), month=1, day=1, hour=0,minute=0, second=0, microsecond=0, tzinfo=datetime.timezone.utc)
        f = datetime.datetime(year=int(annee), month=12, day=31, hour=0,minute=0, second=0, microsecond=0, tzinfo=datetime.timezone.utc)
        
        pointages = Pointage.objects.filter(datetimeDebut__range=(a, f)).filter(datetimeFin__range=(a, f))
        print(convertUUIDToBytes(pointages[0].matiere.matiereId))
        pointagesData = PointageSerializer(pointages, many=True)
        df_pointage = pd.DataFrame(pointagesData.data)
        df_pointage['nom_etudiant'] = df_pointage.apply(lambda df: Etudiant.objects.get(etudiantId=df['etudiant']).etudiantNomComplet, axis=1)
        df_pointage['sex_etudiant'] = df_pointage.apply(lambda df: Etudiant.objects.get(etudiantId=df['etudiant']).etudiantSexe, axis=1)
        df_pointage['nom_matiere'] = df_pointage.apply(lambda x: Matiere.objects.get(matiereId=convertUUIDToBytes(x['matiere'])).matiereDesc, axis=1)
        df_pointage['nom_profs'] = df_pointage.apply(lambda x: Enseignant.objects.get(enseignantId=Matiere.objects.get(matiereId=convertUUIDToBytes(x['matiere'])).enseignant.enseignantId).enseignantNomComplet, axis=1)
        df_pointage['nom_niveau'] = df_pointage.apply(lambda x: Niveau.objects.get(niveauId=Etudiant.objects.get(etudiantId=convertUUIDToBytes(x['etudiant'])).niveau.niveauId).niveauCode, axis=1)
        df_pointage['nom_parcours'] = df_pointage.apply(lambda x: Parcours.objects.get(parcoursId=Etudiant.objects.get(etudiantId=convertUUIDToBytes(x['etudiant'])).parcours.parcoursId).parcoursCode, axis=1)
        fs = FileSystemStorage('media/data_pointage')
        f_name = 'data_pointage_{0}.xlsx'.format(str(datetime.datetime.now().date()))
        df_pointage.to_excel(fs.path(f_name), index=False)
        fl_path = fs.path(f_name)
        fl = open(fl_path, 'rb')
        res = FileResponse(fl)
        return res

    except:
        url = request.get_host() +'eni/api/errors'
        return HttpResponseRedirect(redirect_to=url)