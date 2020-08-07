from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from django.shortcuts import render, redirect
from .models import *


def home(request):
    if not request.user.is_authenticated:
        return render(request, 'ig_backend/homepage.html', {})
    else:
        users = UserProfile.objects.all()
        context = {
            'users': users
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
                user=new_user, username=username, email=email, gender=gender
            )
            user_profile.save()
            login(request, new_user)
            response = HttpResponse("OK")
            response.set_cookie("username", new_user.username, max_age=86400)
            return response


def check_username(request):
    username = request.GET.get('username')
    user = UserProfile.objects.filter(username=username).first()
    if not user:
        return HttpResponse('OK', status=200)
    else:
        return HttpResponse('Bad Request', status=400)


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
        pass
    return HttpResponse("OK")