from graphene import ObjectType, Schema, List, Field, Int, String, Mutation, ID
from graphene_django import DjangoObjectType
from authapp.models import CustomUser
from todoapp.models import TODO, Project


class UserType(DjangoObjectType):
    class Meta:
        model = CustomUser
        fields = '__all__'


class TODOType(DjangoObjectType):
    class Meta:
        model = TODO
        fields = '__all__'


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class Query(ObjectType):
    all_users = List(UserType)
    all_todo = List(TODOType)
    all_project = List(ProjectType)

    user_by_id = Field(UserType, id=Int(required=True))

    def resolve_all_users(root, info):
        return CustomUser.objects.all()

    def resolve_all_todo(root, info):
        return TODO.objects.all()

    def resolve_all_project(root, info):
        return Project.objects.all()

    def resolve_user_by_id(self, info, id=None):
        users = CustomUser.objects.all()
        if id:
            users = users.get(id=id)
        return users


class TodoMutation(Mutation):

    class Arguments:
        text = String(required=False)
        id = ID()

    todo = Field(TODOType)

    @classmethod
    def mutate(cls, root, info, text, id):
        todo = TODO.objects.get(pk=id)
        todo.text = text
        todo.save()
        return TodoMutation(todo=todo)


class Mutation(ObjectType):
    update_todo = TodoMutation.Field()


schema = Schema(query=Query, mutation=Mutation)
