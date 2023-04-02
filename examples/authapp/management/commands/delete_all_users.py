from django.core.management.base import BaseCommand

from authapp.models import CustomUser


class Command(BaseCommand):

    def handle(self, *args, **options):
        CustomUser.objects.all().delete()
