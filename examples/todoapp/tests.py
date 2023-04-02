from django.test import TestCase
from requests.auth import HTTPBasicAuth
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APITestCase, \
    CoreAPIClient, APILiveServerTestCase, RequestsClient
from mixer.backend.django import mixer

from todoapp.views import ProjectModelViewSet
from todoapp.models import Project, TODO
from authapp.models import CustomUser


class TestProjectViewSet(TestCase):

    def setUp(self):
        self.username = 'admin'
        self.password = 'admin123456'
        self.admin = CustomUser.objects.create_superuser(self.username, 'admin@admin.com',
                                                         self.password)
        self.user1 = CustomUser.objects.create(username=f'User1', first_name=f'FirstName1',
                                               last_name=f'LastName1', email=f'user1@user1.com')
        self.url = '/api/projects/'
        self.project = Project.objects.create(name='name3')

    def test_get_list_auth_no(self):
        factory = APIRequestFactory()
        request = factory.get(self.url)
        view = ProjectModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_list_auth_yes(self):
        factory = APIRequestFactory()
        request = factory.get(self.url)
        force_authenticate(request, self.admin)
        view = ProjectModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_project_auth_yes(self):
        factory = APIRequestFactory()
        request = factory.post(self.url, {'name': 'name4', 'users': [1, 2]}, format='json')
        force_authenticate(request, self.admin)
        view = ProjectModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


class TestTODOViewSet(TestCase):
    def setUp(self):
        self.username = 'admin'
        self.password = 'admin123456'
        self.admin = CustomUser.objects.create_superuser(self.username, 'admin@admin.com',
                                                         self.password)
        self.user1 = CustomUser.objects.create(username=f'User1', first_name=f'FirstName1',
                                               last_name=f'LastName1', email=f'user1@user1.com')
        self.url = '/api/todo/'
        self.project = Project.objects.create(name='name3')
        self.data_todo = {'text': 'text_todo', 'project': self.project, 'user_creator': self.user1}

    def test_get_todo_detail_auth_no(self):
        todo = TODO.objects.create(**self.data_todo)
        client = APIClient()
        response = client.get(f'{self.url}{todo.id}/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_todo_detail_auth_yes(self):
        todo = TODO.objects.create(**self.data_todo)
        client = APIClient()
        client.login(username=self.username, password=self.password)
        response = client.get(f'{self.url}{todo.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class TestTODOViewSetTestCase(APITestCase):

    def setUp(self):
        self.username = 'admin'
        self.password = 'admin123456'
        self.admin = CustomUser.objects.create_superuser(self.username, 'admin@admin.com',
                                                         self.password)
        self.url = '/api/todo/'
        self.user1 = CustomUser.objects.create(username=f'User1', first_name=f'FirstName1',
                                               last_name=f'LastName1', email=f'user1@user1.com')
        self.project = Project.objects.create(name='name3')
        self.data_todo = {'text': 'text_todo', 'project': self.project, 'user_creator': self.user1}

    def test_get_list_auth_no(self):
        response = self.client.put(self.url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_put_todo_auth_yes(self):
        todo = TODO.objects.create(**self.data_todo)
        self.client.login(username=self.username, password=self.password)
        response = self.client.put(f'{self.url}{todo.id}/',
                                   {'text': '1234',
                                    'project': self.project.id,
                                    'user_creator': self.user1.id})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        todo_ = TODO.objects.get(id=todo.id)
        self.assertEqual(todo_.text, '1234')

    def test_put_todo_auth_yes_mixer(self):
        todo = mixer.blend(TODO)
        self.client.login(username=self.username, password=self.password)
        response = self.client.put(f'{self.url}{todo.id}/',
                                   {'text': '1234',
                                    'project': self.project.id,
                                    'user_creator': self.user1.id})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        todo_ = TODO.objects.get(id=todo.id)
        self.assertEqual(todo_.text, '1234')
