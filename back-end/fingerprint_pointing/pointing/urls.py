from django.urls import path
from . import views

urlpatterns = [
    path('users/', views.allUsers),
    path('users/<id>/', views.getUserById),
    path('users/add', views.addUser),
    path('users/<id>/update', views.updateUser),
    path('users/<id>/change_pwd', views.changePwd),
    path('users/<id>/delete', views.deleteUser),
    path('users/<id>/to_admin', views.userToAdmin),
    path('users/<id>/confirm', views.confirmDemande),
    path('auth/user/<username>/password/<password>', views.authentification),

    path('annee_univs/', views.allAnneeUnivs),
    path('annee_univs/<id>/', views.getAnneeUnivById),
    path('annee_univs/add', views.addAnneeUniv),
    path('annee_univs/<id>/update', views.updateAnneeUniv),
    path('annee_univs/<id>/activate', views.activateAnneeUniv),
    path('annee_univs/<id>/delete', views.deleteAnneeUniv),

    path('parcours/', views.allParcours),
    path('parcours/<id>/', views.getParcoursById),
    path('parcours/add', views.addParcours),
    path('parcours/<id>/update', views.updateParcours),
    path('parcours/<id>/delete', views.deleteParcours),

    path('niveaux/', views.allNiveaux),
    path('niveaux/<id>/', views.getNiveauById),
    path('niveaux/add', views.addNiveau),
    path('niveaux/<id>/update', views.updateNiveau),
    path('niveaux/<id>/delete', views.deleteNiveau),

    path('enseignants/', views.allEnseignants),
     path('enseignants/<id>/matieres', views.getMatieresProfs),
    path('enseignants/<id>/', views.getEnseignantById),
    path('enseignants/add', views.addEnseignant),
    path('enseignants/<id>/update', views.updateEnseignant),
    path('enseignants/<id>/delete', views.deleteEnseignant),

    path('matieres/', views.allMatieres),
    path('matieres/<id>/', views.getMatiereById),
    path('matieres/<id>/enseignants/<id_prof>', views.changeProf),
    path('matieres/enseignants/<id_prof>/add', views.addMatiere),
    path('matieres/<id>/update', views.updateMatiere),
    path('matieres/<id>/delete', views.deleteMatiere),

    path('etudiants/annee_univs/<id_annee>', views.allEtudiantsAnneeUniv),
    path('etudiants/annee_univs/<id_annee>/parcours/<id_parcours>', views.allEtudiantsAnneeUnivParcours),
    path('etudiants/annee_univs/<id_annee>/niveaux/<id_niveau>', views.allEtudiantsAnneeUnivNiveau),
    path('etudiants/annee_univs/<id_annee>/niveaux/<id_niveau>/parcours/<id_parcours>', views.allEtudiantsAnneeUnivNiveauParcours),
    path('etudiants/<id>/', views.getEtudiantById),
    path('etudiants/annee_univs/<id_annee>/niveaux/<id_niveau>/parcours/<id_parcours>/add', views.addEtudiant),
    path('etudiants/<id>/update', views.updateEtudiant),
    path('etudiants/<id>/delete', views.deleteEtudiant),
    path('etudiants/annee_univs/<id_annee>/niveaux/<id_niveau>/parcours/<id_parcours>/delete', views.deleteAllEtudiantAnneeUnivNiveauParcours),

    path('etudiants/annee_univs/<id_annee>/niveaux/<id_niveau>/parcours/<id_parcours>/add_via_excel', views.addEtudiantViaExcelData),
    path('etudiants/annee_univs/<id_annee>/niveaux/<id_niveau>/parcours/<id_parcours>/effective_time/<eff_t>/expiries/<exp>/export_data_to_excel', views.exportDataToExcel),

    path('events/', views.getAllEventsLogs),
    path('events/debut/<debut>/fin/<fin>', views.getAllEvents2DateTime),
    path('events/niveaux/<id_niveau>/parcours/<id_parcours>', views.getAllEventsNiveauParcours),
    path('events/niveaux/<id_niveau>/parcours/<id_parcours>/debut/<debut>/fin/<fin>', views.getAllEventsNiveauParcours2DateTime),
    path('events/niveaux/<id_niveau>/parcours/<id_parcours>/debut/<debut>/fin/<fin>/save', views.saveEvents),
    path('events/niveaux/<id_niveau>/parcours/<id_parcours>/debut/<debut>/fin/<fin>/delete', views.deleteAllEventsNiveauParcours2DateTime),
    path('events/<id>/delete', views.deleteEvent),

    path('pointages/', views.getAllPointages),
    path('pointages/debut/<debut>/fin/<fin>', views.getAllPointage2DateTime),
    path('pointages/niveaux/<id_niveau>/parcours/<id_parcours>', views.getAllPointageNiveauParcours),
    path('pointages/niveaux/<id_niveau>/parcours/<id_parcours>/debut/<debut>/fin/<fin>', views.getAllPointageNiveauParcours2DateTime),
    path('pointages/niveaux/<id_niveau>/parcours/<id_parcours>/debut/<debut>/fin/<fin>/delete', views.deleteAllPointagesNiveauParcours2DateTime),
    path('pointages/<id>/delete', views.deletePointage),

    path('errors', views.error)
]