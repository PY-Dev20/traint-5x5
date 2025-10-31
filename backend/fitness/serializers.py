from rest_framework import serializers
from .models import Exercise

class ExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exercise
        fields = [
            'id', 'name', 'description', 'instructions',
            'category', 'difficulty', 'demo_video_url', 'target_muscles'
        ]

    def to_representation(self, instance):
        # Get requested language from context (passed from view)
        lang = self.context.get('lang', 'en')
        data = super().to_representation(instance)

        # Extract localized values
        data['name'] = instance.name.get(lang, instance.name.get('en', ''))
        data['description'] = instance.description.get(lang, instance.description.get('en', ''))
        data['category'] = instance.category.get(lang, instance.category.get('en', ''))
        data['instructions'] = instance.instructions.get(lang, instance.instructions.get('en', []))

        return data
    
    
