from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Program
from .serializers import ProgramSerializer, UserPlanSerializer




@api_view(['GET'])
def program_list(request):
    lang = request.GET.get('lang', 'en')
    if lang not in ['en', 'fr', 'ar']:
        lang = 'en'
    programs = Program.objects.filter(is_custom=False)
    serializer = ProgramSerializer(programs, many=True, context={'lang': lang})
    return Response(serializer.data)

@api_view(['GET'])
def program_detail(request, pk):
    lang = request.GET.get('lang', 'en')
    if lang not in ['en', 'fr', 'ar']:
        lang = 'en'
    try:
        program = Program.objects.get(pk=pk, is_custom=False)
        serializer = ProgramSerializer(program, context={'lang': lang})
        return Response(serializer.data)
    except Program.DoesNotExist:
        return Response({'error': 'Program not found'}, status=404)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_user_plan(request):
    serializer = UserPlanSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user=request.user)
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)