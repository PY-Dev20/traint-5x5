# backend/accounts/urls.py
from django.urls import path
from . import views
from .views import CustomTokenObtainPairView, register_user

urlpatterns = [
    path('login/', CustomTokenObtainPairView.as_view(), name='login'),
    path('register/', views.register_user, name='register'),
    path('logout/', views.logout_view, name='logout'),
    path('profile/', views.user_profile, name='user-profile'),
]