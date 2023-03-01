from django.db import models
from authapp.models import CustomUser


class Project(models.Model):
    name = models.CharField(max_length=128, unique=True)
    repo_url = models.URLField(blank=True)
    users = models.ManyToManyField(CustomUser)


class TODO(models.Model):
    project = models.ForeignKey(Project, models.CASCADE)
    text = models.TextField()
    created = models.DateTimeField(auto_now_add=True, editable=False)
    updated = models.DateTimeField(auto_now=True, editable=False)
    user_creator = models.ForeignKey(CustomUser, models.PROTECT)
    active = models.BooleanField(default=True)
