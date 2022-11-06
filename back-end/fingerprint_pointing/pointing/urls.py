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

    path('etudiants/annee_univs/<id_annee>/niveaux/<id_niveau>', views.allEtudiantsAnneeUnivNiveau),
    path('etudiants/annee_univs/<id_annee>/niveaux/<id_niveau>/parcours/<id_parcours>', views.allEtudiantsAnneeUnivNiveauParcours),
    path('etudiants/<id>/', views.getEtudiantById),
    path('etudiants/annee_univs/<id_annee>/niveaux/<id_niveau>/parcours/<id_parcours>/add', views.addEtudiant),
    path('etudiants/<id>/update', views.updateEtudiant),
    path('etudiants/<id>/delete', views.deleteEtudiant),
    path('etudiants/annee_univs/<id_annee>/niveaux/<id_niveau>/delete', views.deleteAllEtudiantAnneeUnivNiveau),
    path('etudiants/annee_univs/<id_annee>/niveaux/<id_niveau>/parcours/<id_parcours>/delete', views.deleteAllEtudiantAnneeUnivNiveauParcours)
]