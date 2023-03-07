from rest_framework.viewsets import ModelViewSet
from rest_framework import mixins, viewsets

from .models import CustomUser
from .serializers import CustomUserModelSerializer


class CustomUserModelViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin,
                             mixins.UpdateModelMixin, viewsets.GenericViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserModelSerializer
