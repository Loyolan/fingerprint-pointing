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
    path('auth/user/<username>/password/<password>', views.authentification)
]