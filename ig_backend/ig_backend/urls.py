
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
    path('add_profile_pic/', add_profile_pic, name='add_profile_pic')
]

urlpatterns += staticfiles_urlpatterns()

