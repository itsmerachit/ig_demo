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
        user = authenticate(request, username=username, password=password)
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
            new_user.set_password(password)
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
    userprofile = request.user.userprofile
    posts_count = Post.objects.filter(owner=request.user).count()
    context = {
        'users': userprofile,
        'config': json.dumps(settings.FIREBASE_CONFIG),
        'fs_id': str(userprofile.fs_user_id) + '@ig.com',
        'fs_pswd': userprofile.fs_password,
        'no_of_posts': posts_count
    }
    return render(request, 'ig_backend/profile.html', context)


@login_required
def upload(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        file_url = data['url']
        caption = data['caption']
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
    posts = Post.objects.all().order_by('-created_at')
    data = []
    for post in posts:
        user = UserProfile.objects.filter(user=post.owner).first()
        likes = Likes.objects.filter(post=post.id)
        liked_by = []
        if likes.count() > 0:
            for like in likes:
                print(like.user.username)
                liked_by.append(str(like.user.username))

        liked_by_current_user = False
        if str(request.user) in liked_by:
            liked_by_current_user = True

        post_data = {
            'id': post.id,
            'image': post.image,
            'owner': user.username,
            'caption': post.content,
            'likes': likes.count(),
            'likedBy': liked_by,
            'likedByCurrentUser': liked_by_current_user
        }
        data.append(post_data)

    return HttpResponse(json.dumps(data),  content_type='application/json')

@login_required
def like(request):
    post_id = json.loads(request.body)['post']
    user = User.objects.get(username=request.user)
    post = Post.objects.get(id=post_id)
    like_post = Likes(post=post, user=user)
    like_post.save()
    return HttpResponse("ok")


@login_required
def unlike(request):
    post_id = json.loads(request.body)['post']
    like_post = Likes.objects.filter(post=post_id, user=request.user.id).first()
    like_post.delete()
    return HttpResponse("ok")