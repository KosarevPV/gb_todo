from rest_framework.serializers import ModelSerializer

from .models import CustomUser


class CustomUserModelSerializerBasic(ModelSerializer):

    class Meta:
        model = CustomUser
        fields = ('id', 'username', 'first_name', 'last_name', 'email',)


class CustomUserModelSerializer(ModelSerializer):

    class Meta:
        model = CustomUser
        fields = ('username', 'first_name', 'last_name', 'email', 'is_superuser', 'is_staff')
