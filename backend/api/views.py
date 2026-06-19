from django.db.models import Q
from django.contrib.auth.models import User
from rest_framework import generics, permissions
from .serializers import TaskSerializer, UserPublicSerializer
from .models import Task

class TaskListCreate(generics.ListCreateAPIView):
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Task.objects.filter(Q(author=user) | Q(assigned_to=user)).distinct()

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class TaskDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Task.objects.filter(Q(author=user) | Q(assigned_to=user)).distinct()


class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserPublicSerializer
    permission_classes = [permissions.IsAuthenticated]