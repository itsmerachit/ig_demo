import uuid

from django.contrib.auth.models import User
from django.db import models
from phonenumber_field.modelfields import PhoneNumberField


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    username = models.CharField(max_length=20, unique=True, null=False)
    bio = models.CharField(max_length=140, blank=True, null=True)
    email = models.EmailField(null=False, blank=False, unique=True)
    phone = PhoneNumberField(blank=True, null=True)
    website = models.CharField(blank=True, null=True, max_length=20)
    profile_pic = models.CharField(max_length=200, blank=True, null=True)
    gender = models.CharField(max_length=6, blank=False, null=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    fs_password = models.CharField(max_length=26, blank=False, null=False)
    fs_user_id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True, db_index=True)

    def __str__(self):
        return self.username


class Post(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    image = models.CharField(max_length=200, blank=False, null=False)
    content = models.CharField(null=False, blank=False, max_length=140)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.id


class Likes(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.user.id} liked post {self.post.id}'


class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.CharField(max_length=40, blank=True, null=True)

    def __str__(self):
        return self.id