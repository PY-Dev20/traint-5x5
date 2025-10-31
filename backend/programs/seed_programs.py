# backend/programs/seed_programs.py
import os
import sys
import django

# Add the backend directory to Python path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Now set the settings module
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from django.contrib.auth import get_user_model
from accounts.models import User
from coaches.models import Coach
from programs.models import Program, ProgramSession, SessionExercise
from fitness.models import Exercise

def create_5x5_beginner_program():
    User = get_user_model()

    # Create admin user
    admin_user, _ = User.objects.get_or_create(
        email='admin@traint.com',
        defaults={'first_name': 'Admin', 'role': 'admin', 'is_staff': True, 'is_superuser': True}
    )
    if not admin_user.has_usable_password():
        admin_user.set_password('securepassword123')
        admin_user.save()

    # Create coach user + profile
    coach_user, _ = User.objects.get_or_create(
        email='coach@traint.com',
        defaults={'first_name': 'Mohammed', 'role': 'coach'}
    )
    coach, _ = Coach.objects.get_or_create(
        user=coach_user,
        defaults={
            'bio': {
                'en': 'Founder & Head Coach',
                'ar': 'مؤسس ومدرب رئيسي',
                'fr': 'Fondateur & Entraîneur Principal'
            },
            'experience_years': 10,
            'is_featured': True
        }
    )

    # Create program
    program, created = Program.objects.get_or_create(
        name={
            'en': '5x5 Beginner Program',
            'ar': 'برنامج 5×5 للمبتدئين',
            'fr': 'Programme 5x5 Débutant'
        },
        defaults={
            'description': {
                'en': 'A 4-week full-body strength program for beginners.',
                'ar': 'برنامج قوة كامل الجسم لمدة 4 أسابيع للمبتدئين.',
                'fr': 'Programme de force corps entier de 4 semaines pour débutants.'
            },
            'difficulty': 'beginner',
            'duration_weeks': 4,
            'is_custom': False,
            'coach': coach,
            'created_by': admin_user
        }
    )

    if not created:
        print("✅ Program already exists.")
        return

    # Get exercises
    exercises = Exercise.objects.all()
    bench = exercises.filter(name__en__icontains='Bench Press').first()
    squat = exercises.filter(name__en__icontains='Squat').first()
    deadlift = exercises.filter(name__en__icontains='Deadlift').first()
    pullup = exercises.filter(name__en__icontains='Pull').first()
    press = exercises.filter(name__en__icontains='Overhead').first()

    # Create 3 sessions (Mon/Wed/Fri style)
    session_data = [
        ('en', 'Day 1: Full Body A', 'ar', 'اليوم 1: الجسم بالكامل أ', 'fr', 'Jour 1: Corps Entier A'),
        ('en', 'Day 2: Full Body B', 'ar', 'اليوم 2: الجسم بالكامل ب', 'fr', 'Jour 2: Corps Entier B'),
        ('en', 'Day 3: Full Body C', 'ar', 'اليوم 3: الجسم بالكامل ج', 'fr', 'Jour 3: Corps Entier C'),
    ]

    for i, (en_key, en_val, ar_key, ar_val, fr_key, fr_val) in enumerate(session_data, 1):
        session = ProgramSession.objects.create(
            program=program,
            day_number=i,
            name={'en': en_val, 'ar': ar_val, 'fr': fr_val}
        )
        ex_list = [bench, squat, deadlift, pullup, press]
        for j, ex in enumerate(ex_list, 1):
            if ex:
                SessionExercise.objects.create(
                    session=session,
                    exercise=ex,
                    sets=5,
                    reps=5,
                    order=j
                )

    print("✅ 5x5 Beginner Program seeded successfully!")

if __name__ == '__main__':
    create_5x5_beginner_program()