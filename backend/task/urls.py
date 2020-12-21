from .views import TaskViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'', TaskViewSet, basename='tasks')
urlpatterns = router.urls

# from django.urls import path
# from .views import (
#     TaskListView, 
#     TaskDetailView, 
#     TaskCreateView,
#     TaskUpdateView,
#     TaskDeleteView
# )


# urlpatterns = [
#     path('', TaskListView.as_view()),
#     path('create/', TaskCreateView.as_view()),
#     path('<pk>/update', TaskUpdateView.as_view()),
#     path('<pk>/delete', TaskDeleteView.as_view()),
#     path('<pk>', TaskDetailView.as_view()),
# ]
