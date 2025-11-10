# backend/programs/serializers.py
from rest_framework import serializers
from .models import Program, ProgramSession, SessionExercise, UserPlan
from fitness.serializers import ExerciseSerializer

class SessionExerciseSerializer(serializers.ModelSerializer):
    exercise_name = serializers.SerializerMethodField()
    exercise = serializers.SerializerMethodField()

    class Meta:
        model = SessionExercise
        fields = ['id', 'exercise', 'exercise_name', 'sets', 'reps', 'order']

    def get_exercise_name(self, obj):
        lang = self.context.get('lang', 'en')
        return obj.exercise.name.get(lang, obj.exercise.name.get('en', ''))

    def get_exercise(self, obj):
        return ExerciseSerializer(obj.exercise, context=self.context).data

class ProgramSessionSerializer(serializers.ModelSerializer):
    exercises = SessionExerciseSerializer(many=True, read_only=True)
    name = serializers.SerializerMethodField()

    class Meta:
        model = ProgramSession
        fields = ['id', 'day_number', 'name', 'exercises']

    def get_name(self, obj):
        lang = self.context.get('lang', 'en')
        return obj.name.get(lang, obj.name.get('en', f'Day {obj.day_number}'))

class ProgramSerializer(serializers.ModelSerializer):
    sessions = ProgramSessionSerializer(many=True, read_only=True)
    name = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()
    thumbnail = serializers.SerializerMethodField()

    class Meta:
        model = Program
        fields = [
            'id', 'name', 'description', 'difficulty', 'duration_weeks',
            'thumbnail', 'sessions'
        ]

    def get_name(self, obj):
        lang = self.context.get('lang', 'en')
        return obj.name.get(lang, obj.name.get('en', 'Program'))

    def get_description(self, obj):
        lang = self.context.get('lang', 'en')
        return obj.description.get(lang, obj.description.get('en', ''))

    def get_thumbnail(self, obj):
        if obj.thumbnail:
            return obj.thumbnail.url
        return None

class UserPlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserPlan
        fields = ['id', 'user', 'program', 'created_at']
        read_only_fields = ['created_at']