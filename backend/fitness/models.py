from django.db import models

class Exercise(models.Model):
    name = models.JSONField(help_text='{"en": "...", "fr": "...", "ar": "..."}')
    description = models.JSONField()
    instructions = models.JSONField(help_text='{"en": [...], "fr": [...], "ar": [...]}')
    category = models.JSONField()  # e.g., {"en": "Chest", "ar": "الصدر", ...}
    difficulty = models.CharField(
        max_length=20,
        choices=[('beginner', 'Beginner'), ('intermediate', 'Intermediate'), ('advanced', 'Advanced')],
        default='beginner'
    )
    demo_video_url = models.URLField(blank=True)
    target_muscles = models.JSONField(default=list)  # e.g., ["chest", "triceps"]

    def __str__(self):
        return self.name.get('en', 'Unnamed Exercise')