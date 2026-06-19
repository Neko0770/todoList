from django.urls import path
from . import views

urlpatterns = [
    path("tasks/", views.TaskListCreate.as_view(), name="task-list"),
    path("tasks/delete/<int:pk>/", views.TaskDelete.as_view(), name="delete-task"),
    path("users/", views.UserList.as_view(), name="user-list"),
]
