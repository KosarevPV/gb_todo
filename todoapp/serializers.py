from rest_framework.serializers import ModelSerializer

from todoapp.models import Project, TODO


class ProjectModelSerializer(ModelSerializer):

    class Meta:
        model = Project
        fields = '__all__'


class TODOModelSerializer(ModelSerializer):

    class Meta:
        model = TODO
        fields = '__all__'
