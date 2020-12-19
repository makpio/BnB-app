from django.db import models

# Create your models here.




class Task(models.Model):
    """Task object"""
    name = models.CharField(max_length=120)
    #category
    #user -
    #data - solution


    def _str_(self):
        return self.name