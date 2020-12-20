from django.db import models


class Task(models.Model):
    """Task object"""
    name = models.CharField(max_length=120)
    # user -
    # data - solution

    def __str__(self):
        return self.name
