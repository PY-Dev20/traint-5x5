# coaches/models.py
from django.db import models
from accounts.models import User  # Custom user

class Coach(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='coach_profile')
    specialties = models.JSONField(default=dict)  # {"en": ["Strength", "Fat Loss"], ...}
    experience_years = models.PositiveIntegerField(default=0)
    is_featured = models.BooleanField(default=False)
    bio = models.JSONField(default=dict)  # Multilingual bio
    photo = models.ImageField(upload_to='coaches/', blank=True, null=True)

    def __str__(self):
        return f"Coach {self.user.username}"