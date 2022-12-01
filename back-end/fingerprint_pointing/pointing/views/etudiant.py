from rest_framework.decorators import api_view
from rest_framework.response import Response
from pointing.serializers import EtudiantSerializer
from pointing.models import Etudiant, AnneeUniv, Niveau, Parcours
from django.core.exceptions import ValidationError
from django.core.files.storage import FileSystemStorage
from django.http.response import FileResponse, HttpResponseRedirect
import pandas as pd

# GET ALL ETUDIANT D'UNE ANNEE UNIV
@api_view(['GET'])
def allEtudiantsAnneeUniv(request, id_annee):
    try:
        annee = AnneeUniv.objects.get(anneeUnivId=id_annee)
        etudiants  = Etudiant.objects.all().filter(anneeUniv=annee.anneeUnivId).order_by('etudiantNomComplet')
        serialisation = EtudiantSerializer(etudiants, many=True)
        res = serialisation.data
    except ValidationError:
        res = {'status': 'warning', 'message': 'Invalide annee ou niveau'}
    except:
        res = {'status': 'warning', 'message': 'Une eurreur se produite lors de la recuperation de donnees'}
    return Response(res)

# GET ALL ETUDIANT D'UN PARCOURS & D'UNE ANNEE UNIV
@api_view(['GET'])
def allEtudiantsAnneeUnivParcours(request, id_annee, id_parcours):
    try:
        annee = AnneeUniv.objects.get(anneeUnivId=id_annee)
        parcours = Parcours.objects.get(parcoursId=id_parcours)
        etudiants  = Etudiant.objects.all().filter(anneeUniv=annee.anneeUnivId).filter(parcours=parcours.parcoursId).order_by('etudiantNomComplet')
        serialisation = EtudiantSerializer(etudiants, many=True)
        res = serialisation.data
    except ValidationError:
        res = {'status': 'warning', 'message': 'Invalide annee ou niveau'}
    except:
        res = {'status': 'warning', 'message': 'Une eurreur se produite lors de la recuperation de donnees'}
    return Response(res)

# GET ALL ETUDIANT D'UN NIVEAU & D'UNE ANNEE UNIV
@api_view(['GET'])
def  allEtudiantsAnneeUnivNiveau(request, id_annee, id_niveau):
    try:
        annee = AnneeUniv.objects.get(anneeUnivId=id_annee)
        niveau = Niveau.objects.get(niveauId=id_niveau)
        etudiants  = Etudiant.objects.all().filter(anneeUniv=annee.anneeUnivId).filter(niveau=niveau.niveauId).order_by('etudiantNum')
        serialisation = EtudiantSerializer(etudiants, many=True)
        res = serialisation.data
    except ValidationError:
        res = {'status': 'warning', 'message': 'Invalide annee ou niveau'}
    except:
        res = {'status': 'warning', 'message': 'Une eurreur se produite lors de la recuperation de donnees'}
    return Response(res)

# GET ALL ETUDIANT D'UN PARCOURS, D'UN NIVEAU & D'UNE ANNEE UNIV
@api_view(['GET'])
def allEtudiantsAnneeUnivNiveauParcours(request, id_annee, id_niveau, id_parcours):
    try:
        annee = AnneeUniv.objects.get(anneeUnivId=id_annee)
        niveau = Niveau.objects.get(niveauId=id_niveau)
        parcours = Parcours.objects.get(parcoursId=id_parcours)
        etudiants  = Etudiant.objects.all().filter(anneeUniv=annee.anneeUnivId).filter(niveau=niveau.niveauId).filter(parcours=parcours.parcoursId).order_by('etudiantNum')
        serialisation = EtudiantSerializer(etudiants, many=True)
        res = serialisation.data
    except ValidationError:
        res = {'status': 'warning', 'message': 'Invalide annee ou niveau ou bien parcours'}
    except:
        res = {'status': 'error', 'message': 'Une eurreur se produite lors de la recuperation de donnees'}
    return Response(res)

# GET ETUDIANT BY ID
@api_view(['GET'])
def getEtudiantById(request, id):
    try:
        etudiant = Etudiant.objects.get(etudiantId=id)
        serialisation = EtudiantSerializer(etudiant, many=False)
        res = serialisation.data
    except ValidationError:
        res = {'status': 'error', 'message': 'Identifiant Invalide'}
    except:
        res = {'status': 'warning', 'message': 'Donnee introuvable'}
    return Response(res)

# ADD NEW ETUDIANT
@api_view(['POST'])
def addEtudiant(request, id_annee, id_niveau, id_parcours):
    try:
        annee = AnneeUniv.objects.get(anneeUnivId=id_annee)
        niveau = Niveau.objects.get(niveauId=id_niveau)
        parcours = Parcours.objects.get(parcoursId=id_parcours)
        request.data['anneeUniv'] = annee.anneeUnivId
        request.data['niveau'] = niveau.niveauId
        request.data['parcours'] = parcours.parcoursId
        serialisation = EtudiantSerializer(data=request.data, many=False)
        res = None;
        if serialisation.is_valid():
            serialisation.save()
            res = {'status': 'success', 'data': serialisation.data, 'message': 'Creation d\'un etudiant {0}, parcours {1}, annee {2} effectuée'.format(niveau.niveauCode, parcours.parcoursCode, annee.anneeUnivDesc) }
        else:
            res = {'status': 'warning', 'message': "Entreés invalides"}
    except:
        res = {'status': 'error', 'message': 'Erreur, Veuillez essayer plus tard'}
    return Response(res)

# UPDATE ETUDIANT
@api_view(['PUT'])
def updateEtudiant(request, id):
    try:
        etudiant = Etudiant.objects.get(etudiantId=id);
        etudiant.etudiantNum = request.data['etudiantNum'];
        etudiant.etudiantMatricule = request.data['etudiantMatricule']
        etudiant.etudiantNomComplet = request.data['etudiantNomComplet']
        etudiant.save()
        res = {'status': 'success',  "message": "Mis à jour des infos réussi"}
    except ValidationError:
        res = {'status': 'error', 'message': "Etudiant introuvable introuvable"}
    except:
        res = {'status': 'error', 'message': 'Erreur, Veuillez essayer plus tard'}
    return Response(res)

# DELETE ETUDIANT
@api_view(['DELETE'])
def deleteEtudiant(request, id):
    try:
        etudiant = Etudiant.objects.get(etudiantId=id)
        etudiant.delete()
        res = {'status': 'success', 'message': 'Suppression d\'un etudiant réussi'}
    except ValidationError:
        res = {'status': 'warning', 'message': "Etudiant introuvable"}
    except:
        res = {'status': 'error', 'message': 'Erreur, Veuillez essayer plus tard'}
    return Response(res)

# DELETE ALL ETUDIANT OF A PARCOURS N NIVEAU IN AN YEAR
@api_view(['DELETE'])
def deleteAllEtudiantAnneeUnivNiveauParcours(request, id_annee, id_niveau, id_parcours):
    try:
        annee = AnneeUniv.objects.get(anneeUnivId=id_annee)
        niveau = Niveau.objects.get(niveauId=id_niveau)
        parcours = Parcours.objects.get(parcoursId=id_parcours)
        etudiants  = Etudiant.objects.all().filter(anneeUniv=annee.anneeUnivId).filter(niveau=niveau.niveauId).filter(parcours=parcours.parcoursId)
        etudiants.delete()
        res = {'status': 'success', 'message': 'Suppression des etudiants en {0}, parcours {1} de l\'annee {2} réussi'.format(niveau.niveauCode, parcours.parcoursCode, annee.anneeUnivDesc)}
    except ValidationError:
        res = {'status': 'warning', 'message': "Etudiant introuvable"}
    except:
        res = {'status': 'error', 'message': 'Erreur, Veuillez essayer plus tard'}
    return Response(res)

def convertMat(mat):
    m = ''
    if(len(mat) == 1):
        m = '000'+ mat
    elif(len(mat) == 2):
        m = '00' + mat
    elif(len(mat) == 3):
        m = '0' + mat
    else:
        m = mat
    return m

@api_view(['POST'])
def addEtudiantViaExcelData(request, id_annee, id_niveau, id_parcours):
    try:
        annee = AnneeUniv.objects.get(anneeUnivId=id_annee)
        niveau = Niveau.objects.get(niveauId=id_niveau)
        parcours = Parcours.objects.get(parcoursId=id_parcours)
        request.data['anneeUniv'] = annee.anneeUnivId
        request.data['niveau'] = niveau.niveauId
        request.data['parcours'] = parcours.parcoursId

        myfile = request.FILES['file']
        fs = FileSystemStorage('media/excel_data')
        f_name = niveau.niveauCode +'_'+ parcours.parcoursCode +'_'+ annee.anneeUnivDesc +'.xlsx'
        if(fs.exists(f_name)):
            fs.delete(f_name)
        fs.save(f_name, myfile)
        uploaded_file_url = "/media/excel_data/"+ f_name
        data = pd.read_excel(fs.path(f_name))
        data['Matricule'] = data['Matricule'].astype(str)
        print(data.head())
        for i in data.index:
            genre = 1;
            if data['Genre'][i] == 'F':
                genre = 2
            etudiant = Etudiant.objects.create(
                etudiantNum = int(data['Numero'][i]), 
                etudiantMatricule = convertMat(data['Matricule'][i]),
                etudiantNomComplet = data['Nom et Prenoms'][i],
                etudiantSexe = genre,
                anneeUniv = annee,
                niveau = niveau,
                parcours = parcours
                )
            etudiant.save()
        res = {'status': 'success', 'uploaded_file_url': uploaded_file_url, 'message': 'Creation de {0} etudiants, niveau {1}, parcours {2}, annee {3} effectuée'.format(data.shape[0], niveau.niveauCode, parcours.parcoursCode, annee.anneeUnivDesc) }
    except:
        res = {'status': 'error', 'message': 'Erreur, Veuillez essayer plus tard'}
    return Response(res)

def exportDataToExcel(request, id_annee, id_niveau, id_parcours, eff_t, exp):
    try:
        annee = AnneeUniv.objects.get(anneeUnivId=id_annee)
        niveau = Niveau.objects.get(niveauId=id_niveau)
        parcours = Parcours.objects.get(parcoursId=id_parcours)
        etudiants  = Etudiant.objects.all().filter(anneeUniv=annee.anneeUnivId).filter(niveau=niveau.niveauId).filter(parcours=parcours.parcoursId).order_by('etudiantNum')
        identifiants = []
        organisations = []
        persons = []
        genders = []
        contacts = []
        emails = []
        eff_times = []
        expiries = []
        cards = []
        rooms = []
        floors = []
        organisation = ('{0}/{1}'.format(niveau.niveauCode, parcours.parcoursCode))
        eff_time = eff_t
        expiry = exp
        vide = ''
        for etudiant in etudiants:
            identifiants.append(etudiant.etudiantId)
            organisations.append(organisation)
            persons.append(etudiant.etudiantNomComplet)
            genders.append(etudiant.etudiantSexe)
            contacts.append(vide)
            emails.append(vide)
            eff_times.append(eff_time)
            expiries.append(expiry)
            cards.append(vide)
            rooms.append(vide)
            floors.append(vide)
        data = {
            '*Person ID': identifiants,
            '*Organizations': organisations,
            '*Person': persons,
            '*Gender': genders,
            'Contact': contacts,
            'Email': emails,
            'Effective Time': eff_times,
            'Expiry': expiries,
            'Card No.': cards,
            'Room No.': rooms,
            'Floor No.': floors
        }
        df = pd.DataFrame(data)
        fs = FileSystemStorage('media/export_data')
        f_name = 'Exported_'+ niveau.niveauCode +'_'+ parcours.parcoursCode +'_'+ annee.anneeUnivDesc +'.xlsx'
        df.to_excel(fs.path(f_name), index=False)
        fl_path = fs.path(f_name)
        fl = open(fl_path, 'rb')
        res = FileResponse(fl)
        return res
    except:
        url = request.get_host() +'eni/api/errors'
        return HttpResponseRedirect(redirect_to=url)
        
@api_view(['GET'])
def error(request):
    res = {'status': 'error', 'message': 'Erreur, Veuillez essayer plus tard'}
    return Response(res)