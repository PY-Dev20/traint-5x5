from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Exercise
from .serializers import ExerciseSerializer

@api_view(['GET'])
def exercise_list(request):
    lang = request.GET.get('lang', 'en')
    if lang not in ['en', 'fr', 'ar']:
        lang = 'en'

    exercises = Exercise.objects.all()
    serializer = ExerciseSerializer(exercises, many=True, context={'lang': lang})
    return Response(serializer.data)

@api_view(['GET'])
def exercise_detail(request, pk):
    lang = request.GET.get('lang', 'en')
    if lang not in ['en', 'fr', 'ar']:
        lang = 'en'

    try:
        exercise = Exercise.objects.get(pk=pk)
        serializer = ExerciseSerializer(exercise, context={'lang': lang})
        return Response(serializer.data)
    except Exercise.DoesNotExist:
        return Response({'error': 'Exercise not found'}, status=404)