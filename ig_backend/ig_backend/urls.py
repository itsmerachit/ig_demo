"""ig_backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from .views import *
from django.contrib.staticfiles.urls import staticfiles_urlpatterns


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', home, name='home'),
    path('login/', sign_in, name='sign_in'),
    path('logout/', sign_out, name='logout'),
    path('signup/', sign_up, name='sign_up'),
    path('check_username/', check_username, name='check_username'),
    path('<str:username>', profile, name='profile'),
    path('upload/', upload, name='upload'),
    path('posts/', get_posts, name='get_posts'),
    path('like/', like, name='like'),
    path('unlike/', unlike, name='unlike'),
    path('comment/', add_comment, name='add_comment'),
    path('add_profile_pic/', add_profile_pic, name='add_profile_pic'),
]

urlpatterns += staticfiles_urlpatterns()

