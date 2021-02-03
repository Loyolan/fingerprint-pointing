from rest_framework.decorators import api_view
from rest_framework.response import Response
from pointing.serializers import EtudiantSerializer
from pointing.models import Etudiant, AnneeUniv, Niveau, Parcours
from django.core.exceptions import ValidationError
from django.core.files.storage import FileSystemStorage
#import pandas as pd

# GET ALL ETUDIANT D'UN NIVEAU & D'UNE ANNEE UNIV
@api_view(['GET'])
def allEtudiantsAnneeUnivNiveau(request, id_annee, id_niveau):
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
        etudiant.matricule = request.data['etudiantMatricule']
        etudiant.nomComplet = request.data['etudiantNomComplet']
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

# DELETE ALL ETUDIANT OF A NIVEAU IN AN YEAR
@api_view(['DELETE'])
def deleteAllEtudiantAnneeUnivNiveau(request, id_annee, id_niveau):
    try:
        annee = AnneeUniv.objects.get(anneeUnivId=id_annee)
        niveau = Niveau.objects.get(niveauId=id_niveau)
        etudiants  = Etudiant.objects.all().filter(anneUniv=annee.anneeUnivId).filter(niveau=niveau.niveauId)
        etudiants.delete()
        res = {'status': 'success', 'message': 'Suppression des etudiants en {0} de l\'annee {1} réussi'.format(niveau.niveauCode, annee.anneeUnivDesc)}
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


@api_view(['POST'])
def addEtudiantViaExcelData(request, id_annee, id_niveau, id_parcours):
    # try:
    #     annee = AnneeUniv.objects.get(anneeUnivId=id_annee)
    #     niveau = Niveau.objects.get(niveauId=id_niveau)
    #     parcours = Parcours.objects.get(parcoursId=id_parcours)
    #     request.data['anneeUniv'] = annee.anneeUnivId
    #     request.data['niveau'] = niveau.niveauId
    #     request.data['parcours'] = parcours.parcoursId

    #     myfile = request.FILES['file']
    #     fs = FileSystemStorage('media/excel_data')
    #     f_name = niveau.niveauCode +'_'+ parcours.parcoursCode +'_'+ annee.anneeUnivDesc +'.xlsx'
    #     if(fs.exists(f_name)):
    #         fs.delete(f_name)
    #     filename = fs.save(f_name, myfile)
    #     uploaded_file_url = "/media/excel_data/"+ f_name
    #     data = pd.read_excel(fs.path(f_name))
    #     for i in data.index:
    #         etudiant = Etudiant.objects.create(
    #             etudiantNum = int(data['Numero'][i]), 
    #             etudiantMatricule = data['Matricule'][i],
    #             etudiantNomComplet = data['Nom et Prenoms'][i],
    #             anneeUniv = annee,
    #             niveau = niveau,
    #             parcours = parcours
    #             )
    #         etudiant.save()
    #     res = {'status': 'success', 'uploaded_file_url': uploaded_file_url, 'message': 'Creation de {0} etudiants, niveau {1}, parcours {2}, annee {3} effectuée'.format(data.shape[0], niveau.niveauCode, parcours.parcoursCode, annee.anneeUnivDesc) }
    # except:
    res = {'status': 'error', 'message': 'Erreur, Veuillez essayer plus tard'}
    return Response(res)