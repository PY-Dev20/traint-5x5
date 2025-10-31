from rest_framework import serializers
from .models import Program, ProgramSession, SessionExercise, UserPlan

class SessionExerciseSerializer(serializers.ModelSerializer):
    exercise_name = serializers.SerializerMethodField()
    class Meta:
        model = SessionExercise
        fields = ['id', 'exercise', 'exercise_name', 'sets', 'reps', 'order']
    
    def get_exercise_name(self, obj):
        lang = self.context.get('lang', 'en')
        return obj.exercise.name.get(lang, obj.exercise.name.get('en', ''))

class ProgramSessionSerializer(serializers.ModelSerializer):
    exercises = SessionExerciseSerializer(many=True, read_only=True)
    class Meta:
        model = ProgramSession
        fields = ['id', 'day_number', 'name', 'exercises']

class ProgramSerializer(serializers.ModelSerializer):
    sessions = ProgramSessionSerializer(many=True, read_only=True)
    class Meta:
        model = Program
        fields = [
            'id', 'name', 'description', 'difficulty',
            'duration_weeks', 'is_custom', 'coach', 'sessions'
        ]
    
    def to_representation(self, instance):
        lang = self.context.get('lang', 'en')
        data = super().to_representation(instance)
        data['name'] = instance.name.get(lang, instance.name.get('en', ''))
        data['description'] = instance.description.get(lang, instance.description.get('en', ''))
        return data
    
class UserPlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserPlan
        fields = ['id', 'user', 'program', 'created_at']
        read_only_fields = ['created_at']