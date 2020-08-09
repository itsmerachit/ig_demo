# Generated by Django 3.0.8 on 2020-08-09 16:21

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('ig_backend', '0004_userprofile_fs_password'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='fs_user_id',
            field=models.UUIDField(db_index=True, default=uuid.uuid4, editable=False, unique=True),
        ),
        migrations.AlterField(
            model_name='post',
            name='image',
            field=models.CharField(max_length=200),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='profile_pic',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
    ]