# backend/fitness/admin.py
from django.contrib import admin
from django.db import models
from .models import Exercise
from django_json_widget.widgets import JSONEditorWidget  # ✅ Correct import

@admin.register(Exercise)
class ExerciseAdmin(admin.ModelAdmin):
    list_display = ['id', 'get_english_name', 'difficulty']
    
    # Enable JSON editor for all JSONFields
    formfield_overrides = {
        models.JSONField: {'widget': JSONEditorWidget},
    }

    def get_english_name(self, obj):
        return obj.name.get('en', '—')
    get_english_name.short_description = 'Name (EN)'