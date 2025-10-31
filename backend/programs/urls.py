from django.urls import path
from . import views

urlpatterns = [
    path('', views.program_list, name='program-list'),
    path('<int:pk>/', views.program_detail, name='program-detail'),
    path('user-plans/', views.create_user_plan, name='user-plan-create'),
]