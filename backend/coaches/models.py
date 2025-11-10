# backend/coaches/models.py
from django.db import models
from accounts.models import User

class Coach(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='coach_profile')
    bio = models.JSONField(default=dict)  # {"en": "...", "ar": "...", "fr": "..."}
    specialties = models.JSONField(default=dict)
    experience_years = models.PositiveIntegerField(default=0)
    is_featured = models.BooleanField(default=False)
    photo = models.ImageField(upload_to='coaches/', blank=True, null=True)

    def __str__(self):
        return f"Coach {self.user.email}"