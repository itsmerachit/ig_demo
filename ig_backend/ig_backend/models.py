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
    profile_pic = models.FileField(upload_to='images/', blank=True, null=True)
    gender = models.CharField(max_length=6, blank=False, null=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.username


class Post(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    image = models.FileField(upload_to="images/", blank=False, null=True)
    content = models.CharField(null=False, blank=False, max_length=140)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.id
