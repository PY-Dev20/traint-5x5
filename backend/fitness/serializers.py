# backend/fitness/serializers.py
from rest_framework import serializers
from .models import Exercise

class ExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exercise
        fields = [
            'id', 'name', 'description', 'instructions',
            'category', 'difficulty', 'demo_video_url', 'target_muscles',
            'main_muscle', 'equipment', 'mechanics'
        ]

    def to_representation(self, instance):
        lang = self.context.get('lang', 'en')
        data = super().to_representation(instance)
        for field in ['name', 'description', 'category', 'instructions']:
            if field in data:
                data[field] = getattr(instance, field, {}).get(lang, getattr(instance, field, {}).get('en', ''))
        return data