from django.core.management.base import BaseCommand

from authapp.models import CustomUser


class Command(BaseCommand):

    def handle(self, *args, **options):
        CustomUser.objects.create(
            password=f'pbkdf2_sha256$260000$jg0zd4YOkKMS4o4cgtXJ2T$wi2Y4YG0vTn8PmBcCX'
                     f'6skaj7Ub8I0Y37mWMvYK64SgY=',
            is_superuser=True, username='admin', is_staff=True, email='admin@admin.com')
        for i in range(1, 6):
            CustomUser.objects.create(username=f'User{i}', first_name=f'FirstName{i}',
                                      last_name=f'LastName{i}', email=f'user{i}@user{i}.com')
