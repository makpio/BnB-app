from rest_framework import viewsets

from core.models import Task
from .serializers import TaskSerializer

class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    queryset = Task.objects.all()

# from rest_framework.generics import (
#     ListAPIView, 
#     RetrieveAPIView, 
#     CreateAPIView,
#     UpdateAPIView, 
#     DestroyAPIView
# )

# from core.models import Task
# from .serializers import TaskSerializer


# class TaskListView(ListAPIView):
#     queryset = Task.objects.all()
#     serializer_class = TaskSerializer


# class TaskDetailView(RetrieveAPIView):
#     queryset = Task.objects.all()
#     serializer_class = TaskSerializer


# class TaskCreateView(CreateAPIView):
#     queryset = Task.objects.all()
#     serializer_class = TaskSerializer


# class TaskUpdateView(UpdateAPIView):
#     queryset = Task.objects.all()
#     serializer_class = TaskSerializer


# class TaskDeleteView(DestroyAPIView):
#     queryset = Task.objects.all()
#     serializer_class = TaskSerializer
