from django.db import models
from django.contrib.auth.models import User


class Task(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="tasks")
    completed = models.BooleanField(default=False)
    due_date = models.DateField()
    assigned_to = models.ForeignKey(User,
                                    on_delete=models.SET_NULL,
                                    null=True,
                                    blank=True,
                                    related_name="assigned_tasks"
                                    )
    urgent = models.BooleanField(default=False)

    assigned_to = models.ForeignKey(User,
                                    on_delete=models.SET_NULL,
                                    null=True,
                                    blank=True,
                                    related_name="assigned_tasks")
    def __str__(self):
        return self.title
