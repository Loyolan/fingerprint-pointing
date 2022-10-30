import uuid
from rest_framework.decorators import api_view
from rest_framework.response import Response
from pointing.serializers import UserSerializer
from pointing.models import User
from django.core.exceptions import ValidationError
from django.contrib.auth.hashers import make_password, check_password

# GET ALL USERS
@api_view(['GET'])
def allUsers(request):
    users = User.objects.all()
    serialisation = UserSerializer(users, many=True)
    return Response(serialisation.data)

# GET USER BY ID
@api_view(['GET'])
def getUserById(request, id):
    try:
        user = User.objects.get(userId=id)
        serialisation = UserSerializer(user, many=False)
        res = serialisation.data
    except ValidationError:
        res = {'status': 'error', 'message': 'Identifiant Invalide'}
    except:
            es = {'status': 'warn', 'message': 'Utilisateur introuvable'}
    return Response(res)

# CREATE NEW USER
@api_view(['POST'])
def addUser(request):
    try:
        request.data['password'] = make_password(password=request.data['password'], salt=None, hasher='default')
        serialisation = UserSerializer(data=request.data, many=False)
        res = None;
        print(serialisation);
        if serialisation.is_valid():
            serialisation.save()
            res = serialisation.data
        else:
            res = {'status': 'error', 'message': "Nom d'utilisateur ou email déjà utilisés"}
    except:
        res = {'status': 'error', 'message': 'Erreur, Veuillez essayer plus tard'}
    return Response(res)

# UPDATE A USER
@api_view(['PUT'])
def updateUser(request, id):
    try:
        user = User.objects.get(userId=id);
        request.data['password'] = user.password;
        request.data['role'] = user.role;
        request.data['created_at'] = user.created_at;
        serialisation = UserSerializer(instance=user, data=request.data)
        if serialisation.is_valid():
            serialisation.save()
            res = {'status': 'success', "user": serialisation.data, "message": "Mis à jour des infos réussi"}
        else:
            res  = {'status': 'error', 'message': "Nom d'utilisateur ou email déjà utilisés"}
    except ValidationError:
        res = {'status': 'error', 'message': "Utilisateur introuvable"}
    except:
        res = {'status': 'error', 'message': 'Erreur, Veuillez essayer plus tard'}
    return Response(res)

# CHANGE PASSWORD
@api_view(['PUT'])
def changePwd(request, id):
    try:
        user = User.objects.get(userId=id)
        if(check_password(password=request.data['old'], encoded = user.password)):
            user.password = make_password(password=request.data['new'], salt=None, hasher='default')
            user.save()
            res = {'status': 'success', 'message': 'Mot de passe bien changé'}
        else:
            res = {'status': 'warning', 'message': 'Ancien mot de passe incorrect'}
    except ValidationError:
        res = {'status': 'error', 'message': "Utilisateur introuvable"}
    except:
        res = {'status': 'error', 'message': 'Erreur, Veuillez essayer plus tard'}
    return Response(res)

# DELETE USER
@api_view(['DELETE'])
def deleteUser(request, id):
    try:
        user = User.objects.get(userId=id)
        user.delete()
        res = {'status': 'success', 'message': 'Suppression d\'Utilisateur reussi'}
    except ValidationError:
        res = {'status': 'error', 'message': "Utilisateur introuvable"}
    except:
        res = {'status': 'error', 'message': 'Erreur, Veuillez essayer plus tard'}
    return Response(res)

#AUTHENTICATION
@api_view(['GET'])
def authentification(request, username, password):
    try:
        user = User.objects.get(username = username)
        if(check_password(password= password, encoded = user.password)):
            user = UserSerializer(user, many=False)
            res = {'status': 'success', 'user': user.data}
        else:
            res = {'status': 'error', 'message': 'Password or username incorrects'}
    except:
        res = {'status': 'error', 'message': "Utilisateur introuvable"}
    return Response(res)