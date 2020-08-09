import json

import firebase_admin, os
from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, redirect
from .models import *
from . import settings
from firebase_admin import auth, firestore, credentials
import uuid
from django.core import serializers


if (not len(firebase_admin._apps)):
    cred = credentials.Certificate(os.path.join(settings.BASE_DIR, 'ig_backend/db.json'))
    firebase_admin.initialize_app(cred)

db = firestore.client()


def home(request):
    if not request.user.is_authenticated:
        return render(request, 'ig_backend/homepage.html', {})
    else:
        userprofile = request.user.userprofile
        context = {
            'users': userprofile,
            'config': json.dumps(settings.FIREBASE_CONFIG),
            'fs_id': str(userprofile.fs_user_id) + '@ig.com',
            'fs_pswd': userprofile.fs_password
        }
        return render(request, 'ig_backend/welcome.html', context)


def sign_in(request):
    if request.method == "GET":
        return render(request, 'ig_backend/homepage.html', {})
    else:
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(username=username, password=password)
        if user is not None:
            print("logging in")
            login(request, user)
            return HttpResponse("OK")
        else:
            print('Not a user')
            return HttpResponse('Invalid Username or Password!')


def sign_up(request):
    if request.method == "GET":
        return render(request, 'ig_backend/signupform.html', {})
    else:
        first_name = request.POST.get('first_name')
        last_name = request.POST.get('last_name')
        username = request.POST.get('username')
        email = request.POST.get('email')
        password = request.POST.get('password')
        gender = request.POST.get('gender')
        if User.objects.filter(email=email).first():
            return HttpResponse("This email is already taken. Please try again with different email.")
        else:
            new_user = User.objects.create_user(
                first_name=first_name, last_name=last_name, username=username, email=email
            )
            new_user.is_staff = False
            new_user.save()
            user_profile = UserProfile(
                user=new_user, username=username, email=email, gender=gender, fs_password=password
            )
            user_profile.save()
            login(request, new_user)
            create_fs_user(user_profile)
            response = HttpResponse("OK")
            response.set_cookie("username", new_user.username, max_age=86400)
            return response


def check_username(request):
    username = request.GET.get('username')
    user = UserProfile.objects.filter(username=username).first()
    if not user:
        return HttpResponse('OK', status=200)
    else:
        return HttpResponse('Username already taken.', status=200)


@login_required
def sign_out(request):
    logout(request)
    response = HttpResponse("OK")
    response.delete_cookie('username')
    return response


@login_required
def profile(request, username):
    context = {
        'username': username
    }
    return render(request, 'ig_backend/profile.html', context)


@login_required
def upload(request):
    if request.method == 'POST':
        file_url = request.body
        caption = 'My First Post'
        owner = User.objects.filter(id=request.user.id).first()
        post = Post(
            owner=owner, image=file_url, content=caption
        )
        post.save()
        return HttpResponse("OK")
    else:
        print("Error in request")
        return HttpResponse("BAD", status=400)


def create_fs_user(user_obj):
    email = str(user_obj.fs_user_id) + '@ig.com'
    try:
        user = auth.create_user(
            email=email,
            password=user_obj.fs_password,
            display_name=user_obj.username,
            uid=str(user_obj.fs_user_id),
            disabled=False
        )
        print('Sucessfully created new user: {0}'.format(user.uid))

        doc_ref = db.collection(u'users').document(user.uid)
        doc_ref.set({
            'first_name': user_obj.user.first_name,
            'last_name': user_obj.user.last_name,
            'email': email,
            'data_synced': True,
            'photoURL': ''
        })
        return 1
    except auth.AuthError as e:
        print(e.detail)
        return -1


@login_required
def get_posts(request):
    posts = Post.objects.all()
    posts_json = serializers.serialize('json', posts)
    return HttpResponse(posts_json,  content_type='application/json')