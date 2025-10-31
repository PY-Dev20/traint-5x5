from django.urls import path
from . import views

urlpatterns = [
    path('exercises/', views.exercise_list, name='exercise-list'),
    path('exercises/<int:pk>/', views.exercise_detail, name='exercise-detail'),
]