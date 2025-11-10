# backend/fitness/models.py
from django.db import models

class Exercise(models.Model):
    # ✅ Use JSONField for multilingual support
    name = models.JSONField()  # {"en": "...", "ar": "...", "fr": "..."}
    description = models.JSONField()
    instructions = models.JSONField()
    category = models.JSONField()  # {"en": "Chest", "ar": "الصدر", ...}
    
    difficulty = models.CharField(
        max_length=20,
        choices=[('beginner', 'Beginner'), ('intermediate', 'Intermediate'), ('advanced', 'Advanced')],
        default='beginner'
    )
    demo_video_url = models.URLField(blank=True)
    target_muscles = models.JSONField(default=list)
    
    # New metadata fields (for Muscle & Strength style)
    main_muscle = models.CharField(max_length=50, default='Full Body')
    equipment = models.CharField(max_length=50, default='Bodyweight')
    mechanics = models.CharField(max_length=20, default='Compound')

    def __str__(self):
        return self.name.get('en', 'Unnamed Exercise')