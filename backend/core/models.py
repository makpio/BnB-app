from django.db import models


class Task(models.Model):
    """Task object"""
    name = models.CharField(max_length=120)
    description = models.TextField(max_length=500, default="123")
    data = models.JSONField(null=True, default=dict)
    solution = models.FloatField(default=123)


    def __str__(self):
        return self.name
