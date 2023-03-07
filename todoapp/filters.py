from django.db import models
from django_filters import rest_framework, FilterSet, DateFromToRangeFilter

from todoapp.models import Project, TODO


class ProjectFilter(rest_framework.FilterSet):
    name = rest_framework.CharFilter(lookup_expr='contains')

    class Meta:
        model = Project
        fields = ['name']


class TODOFilter(rest_framework.FilterSet):
    created = DateFromToRangeFilter()

    class Meta:
        model = TODO
        fields = ['created', 'project']
