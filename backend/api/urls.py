from django.urls import path
from . import views

urlpatterns = [
    path("tasks/", views.TaskListCreate.as_view(), name="task-list"),
    path("tasks/<int:pk>/", views.TaskDetail.as_view(), name="task-detail"),
    path("users/", views.UserList.as_view(), name="user-list"),
]
