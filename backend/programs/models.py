# backend/programs/models.py
from django.db import models
from accounts.models import User
from coaches.models import Coach

class ProgramCategory(models.Model):
    name = models.JSONField()  # {"en": "Fat Loss", ...}

    def __str__(self):
        return self.name.get('en', 'Uncategorized')

class Program(models.Model):
    name = models.JSONField()
    description = models.JSONField()
    DIFFICULTY_CHOICES = [
        ('beginner', 'Beginner'),
        ('intermediate', 'Intermediate'),
        ('advanced', 'Advanced'),
    ]
    difficulty = models.CharField(max_length=20, choices=DIFFICULTY_CHOICES)
    duration_weeks = models.PositiveIntegerField(default=4)
    is_custom = models.BooleanField(default=False)
    category = models.ForeignKey(ProgramCategory, on_delete=models.CASCADE)
    coach = models.ForeignKey(Coach, on_delete=models.SET_NULL, null=True, blank=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    thumbnail = models.ImageField(upload_to='programs/thumbnails/', blank=True, null=True)

class ProgramSession(models.Model):
    program = models.ForeignKey(Program, on_delete=models.CASCADE, related_name='sessions')
    day_number = models.PositiveIntegerField()
    name = models.JSONField()  # {"en": "Day 1: Full Body", ...}

class SessionExercise(models.Model):
    session = models.ForeignKey(ProgramSession, on_delete=models.CASCADE, related_name='exercises')
    exercise = models.ForeignKey('fitness.Exercise', on_delete=models.CASCADE)
    sets = models.PositiveIntegerField(default=5)
    reps = models.PositiveIntegerField(default=5)
    order = models.PositiveIntegerField()

class UserPlan(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    program = models.ForeignKey(Program, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'program')