from rest_framework.viewsets import ModelViewSet
from rest_framework import mixins, viewsets

from .models import CustomUser
from .serializers import CustomUserModelSerializer, CustomUserModelSerializerBasic


class CustomUserModelViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin,
                             mixins.UpdateModelMixin, viewsets.GenericViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserModelSerializer

    def get_serializer_class(self):
        if self.request.version == '0.2':
            return CustomUserModelSerializer
        return CustomUserModelSerializerBasic
