# backend/programs/seed_real_programs.py
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from django.contrib.auth import get_user_model
from accounts.models import User
from coaches.models import Coach
from programs.models import Program, ProgramSession, SessionExercise
from fitness.models import Exercise

def create_real_programs():
    User = get_user_model()

    # Ensure admin & coach exist
    admin_user, _ = User.objects.get_or_create(
        email='admin@traint.com',
        defaults={'first_name': 'Admin', 'role': 'admin', 'is_staff': True, 'is_superuser': True}
    )
    if not admin_user.has_usable_password():
        admin_user.set_password('securepassword123')
        admin_user.save()

    coach_user, _ = User.objects.get_or_create(email='coach@traint.com', defaults={'first_name': 'Mohammed', 'role': 'coach'})
    coach, _ = Coach.objects.get_or_create(user=coach_user)

    # Get all exercises
    exercises = Exercise.objects.all()
    exercise_map = {}
    for ex in exercises:
        name_en = ex.name.get('en', '').lower()
        exercise_map[name_en] = ex

    # Helper to get exercise safely
    def get_ex(name):
        return exercise_map.get(name.lower())

    programs_data = [
        # Fat Loss
        {
            'name': {'en': 'Complete Fat Destroyer Program', 'ar': 'برنامج تدمير الدهون الكامل', 'fr': 'Programme Complet de Destruction des Graisses'},
            'description': {'en': '12-week fat loss program for beginners.', 'ar': 'برنامج فقدان الدهون لمدة 12 أسبوعًا للمبتدئين.', 'fr': 'Programme de perte de graisse de 12 semaines pour débutants.'},
            'category': 'Fat Loss',
            'difficulty': 'beginner',
            'weeks': 12,
            'sessions': [
                {
                    'name': {'en': 'Day 1: Full Body A', 'ar': 'اليوم 1: الجسم بالكامل أ', 'fr': 'Jour 1: Corps Entier A'},
                    'exercises': [
                        ('Bench Press', 3, 10),
                        ('Barbell Squat', 3, 10),
                        ('Bent Over Row', 3, 10),
                        ('Plank', 3, 30),
                    ]
                },
                {
                    'name': {'en': 'Day 2: Cardio & Core', 'ar': 'اليوم 2: الكارديو والعضلات الأساسية', 'fr': 'Jour 2: Cardio & Abdos'},
                    'exercises': [
                        ('Jumping Jacks', 3, 30),
                        ('Mountain Climber', 3, 20),
                        ('Russian Twist', 3, 20),
                        ('Burpees', 3, 15),
                    ]
                }
            ]
        },
        # Muscle Building
        {
            'name': {'en': 'Complete Beginner Program', 'ar': 'البرنامج الكامل للمبتدئين', 'fr': 'Programme Complet pour Débutants'},
            'description': {'en': '6-week muscle building for beginners.', 'ar': 'بناء العضلات لمدة 6 أسابيع للمبتدئين.', 'fr': 'Développement musculaire de 6 semaines pour débutants.'},
            'category': 'Muscle Building',
            'difficulty': 'beginner',
            'weeks': 6,
            'sessions': [
                {
                    'name': {'en': 'Day 1: Chest & Triceps', 'ar': 'اليوم 1: الصدر والثلاثية', 'fr': 'Jour 1: Pectoraux & Triceps'},
                    'exercises': [
                        ('Bench Press', 4, 8),
                        ('Incline Dumbbell Press', 3, 10),
                        ('Tricep Dips', 3, 12),
                        ('Cable Tricep Pushdown', 3, 15),
                    ]
                },
                {
                    'name': {'en': 'Day 2: Back & Biceps', 'ar': 'اليوم 2: الظهر والعضلة ذات الرأسين', 'fr': 'Jour 2: Dos & Biceps'},
                    'exercises': [
                        ('Pull-ups', 4, 6),
                        ('Barbell Row', 3, 8),
                        ('Bicep Curls', 3, 12),
                        ('Hammer Curls', 3, 12),
                    ]
                },
                {
                    'name': {'en': 'Day 3: Legs & Shoulders', 'ar': 'اليوم 3: الساقين والكتفين', 'fr': 'Jour 3: Jambes & Épaules'},
                    'exercises': [
                        ('Barbell Squat', 4, 8),
                        ('Romanian Deadlift', 3, 10),
                        ('Overhead Press', 3, 8),
                        ('Lateral Raise', 3, 15),
                    ]
                }
            ]
        },
        # Strength
        {
            'name': {'en': 'Strength And Bulk Beginner Workout', 'ar': 'تمرين القوة والكتلة للمبتدئين', 'fr': 'Entraînement Force et Masse pour Débutants'},
            'description': {'en': '10-week strength program for beginners.', 'ar': 'برنامج القوة لمدة 10 أسابيع للمبتدئين.', 'fr': 'Programme de force de 10 semaines pour débutants.'},
            'category': 'Strength',
            'difficulty': 'beginner',
            'weeks': 10,
            'sessions': [
                {
                    'name': {'en': 'Day 1: Lower Body', 'ar': 'اليوم 1: الجزء السفلي', 'fr': 'Jour 1: Corps Inférieur'},
                    'exercises': [
                        ('Barbell Squat', 5, 5),
                        ('Romanian Deadlift', 4, 6),
                        ('Leg Press', 3, 10),
                    ]
                },
                {
                    'name': {'en': 'Day 2: Upper Body', 'ar': 'اليوم 2: الجزء العلوي', 'fr': 'Jour 2: Corps Supérieur'},
                    'exercises': [
                        ('Bench Press', 5, 5),
                        ('Barbell Row', 5, 5),
                        ('Overhead Press', 4, 6),
                    ]
                }
            ]
        },
        # Abs
        {
            'name': {'en': 'Home Based Abs Workout', 'ar': 'تمارين البطن المنزلية', 'fr': 'Programme d’Abdos à Domicile'},
            'description': {'en': '6-week core program for beginners.', 'ar': 'برنامج العضلات الأساسية لمدة 6 أسابيع للمبتدئين.', 'fr': 'Programme de gainage de 6 semaines pour débutants.'},
            'category': 'Abs',
            'difficulty': 'beginner',
            'weeks': 6,
            'sessions': [
                {
                    'name': {'en': 'Day 1: Core Stability', 'ar': 'اليوم 1: ثبات العضلات الأساسية', 'fr': 'Jour 1: Stabilité du Gainage'},
                    'exercises': [
                        ('Plank', 3, 30),
                        ('Bird-Dog', 3, 10),
                        ('Dead Bug', 3, 12),
                    ]
                }
            ]
        },
        # Arms
        {
            'name': {'en': 'Big Arms Fast', 'ar': 'ذراعان كبيرتان بسرعة', 'fr': 'Gros Bras Rapidement'},
            'description': {'en': '4-week arm specialization for beginners.', 'ar': 'برنامج تخصص الذراعين لمدة 4 أسابيع للمبتدئين.', 'fr': 'Spécialisation bras de 4 semaines pour débutants.'},
            'category': 'Arm (Biceps & Triceps)',
            'difficulty': 'beginner',
            'weeks': 4,
            'sessions': [
                {
                    'name': {'en': 'Day 1: Arms', 'ar': 'اليوم 1: الذراعين', 'fr': 'Jour 1: Bras'},
                    'exercises': [
                        ('Barbell Curl', 4, 10),
                        ('Tricep Dips', 4, 10),
                        ('Hammer Curl', 3, 12),
                        ('Skullcrusher', 3, 12),
                    ]
                }
            ]
        },
        # Back
        {
            'name': {'en': 'Muscular Back Building Rotation', 'ar': 'دوران بناء عضلات الظهر', 'fr': 'Rotation pour un Dos Musclé'},
            'description': {'en': '3-week back specialization for beginners.', 'ar': 'برنامج تخصص الظهر لمدة 3 أسابيع للمبتدئين.', 'fr': 'Spécialisation dos de 3 semaines pour débutants.'},
            'category': 'Back',
            'difficulty': 'beginner',
            'weeks': 3,
            'sessions': [
                {
                    'name': {'en': 'Day 1: Vertical Pull', 'ar': 'اليوم 1: سحب عمودي', 'fr': 'Jour 1: Traction Verticale'},
                    'exercises': [
                        ('Pull-ups', 4, 6),
                        ('Lat Pulldown', 3, 10),
                    ]
                },
                {
                    'name': {'en': 'Day 2: Horizontal Pull', 'ar': 'اليوم 2: سحب أفقي', 'fr': 'Jour 2: Traction Horizontale'},
                    'exercises': [
                        ('Barbell Row', 4, 8),
                        ('Seated Cable Row', 3, 10),
                    ]
                }
            ]
        },
        # Shoulders
        {
            'name': {'en': 'Beginner Shoulder Workout', 'ar': 'تمرين الكتف للمبتدئين', 'fr': 'Entraînement Épaules Débutant'},
            'description': {'en': '6-week shoulder program for beginners.', 'ar': 'برنامج الكتف لمدة 6 أسابيع للمبتدئين.', 'fr': 'Programme épaules de 6 semaines pour débutants.'},
            'category': 'Shoulder',
            'difficulty': 'beginner',
            'weeks': 6,
            'sessions': [
                {
                    'name': {'en': 'Day 1: Shoulders', 'ar': 'اليوم 1: الكتفين', 'fr': 'Jour 1: Épaules'},
                    'exercises': [
                        ('Overhead Press', 4, 8),
                        ('Lateral Raise', 3, 15),
                        ('Rear Delt Fly', 3, 15),
                    ]
                }
            ]
        },
        # Chest
        {
            'name': {'en': 'Bench Most Days', 'ar': 'ضغط المقعد معظم الأيام', 'fr': 'Développé la Plupart des Jours'},
            'description': {'en': '6-week chest specialization for beginners.', 'ar': 'برنامج تخصص الصدر لمدة 6 أسابيع للمبتدئين.', 'fr': 'Spécialisation pectoraux de 6 semaines pour débutants.'},
            'category': 'Chest',
            'difficulty': 'beginner',
            'weeks': 6,
            'sessions': [
                {
                    'name': {'en': 'Day 1: Chest', 'ar': 'اليوم 1: الصدر', 'fr': 'Jour 1: Pectoraux'},
                    'exercises': [
                        ('Bench Press', 5, 5),
                        ('Incline Dumbbell Press', 4, 8),
                        ('Cable Fly', 3, 12),
                    ]
                }
            ]
        },
        # Legs
        {
            'name': {'en': 'Workout Routine to Build Serious Mass', 'ar': 'روتين تمارين لبناء كتلة عضلية جادة', 'fr': 'Routine pour une Masse Musculaire Sérieuse'},
            'description': {'en': '8-week leg mass program for advanced.', 'ar': 'برنامج كتلة الساق لمدة 8 أسابيع للمتقدمين.', 'fr': 'Programme de masse jambes de 8 semaines pour avancés.'},
            'category': 'Leg',
            'difficulty': 'advanced',
            'weeks': 8,
            'sessions': [
                {
                    'name': {'en': 'Day 1: Quads & Glutes', 'ar': 'اليوم 1: عضلات الفخذ الأمامية والألوية', 'fr': 'Jour 1: Quadriceps & Fessiers'},
                    'exercises': [
                        ('Barbell Squat', 5, 5),
                        ('Leg Press', 4, 10),
                        ('Walking Lunges', 3, 12),
                    ]
                }
            ]
        },
        # Full Body
        {
            'name': {'en': 'Dumbbell Only Full Body Workout', 'ar': 'تمرين الجسم بالكامل باستخدام الدمبل فقط', 'fr': 'Programme Corps Entier avec Haltères Seulement'},
            'description': {'en': '8-week home workout with dumbbells.', 'ar': 'تمارين منزلية لمدة 8 أسابيع باستخدام الدمبل.', 'fr': 'Programme à domicile de 8 semaines avec haltères.'},
            'category': 'Full Body',
            'difficulty': 'beginner',
            'weeks': 8,
            'sessions': [
                {
                    'name': {'en': 'Day 1: Full Body', 'ar': 'اليوم 1: الجسم بالكامل', 'fr': 'Jour 1: Corps Entier'},
                    'exercises': [
                        ('Goblet Squat', 3, 10),
                        ('Dumbbell Bench Press', 3, 10),
                        ('Bent Over Row', 3, 10),
                        ('Overhead Press', 3, 10),
                    ]
                }
            ]
        }
    ]

    for program_data in programs_data:
        program, created = Program.objects.get_or_create(
            name=program_data['name'],
            defaults={
                'description': program_data['description'],
                'difficulty': program_data['difficulty'],
                'duration_weeks': program_data['weeks'],
                'coach': coach,
                'created_by': admin_user,
                'is_custom': False
            }
        )
        if not created:
            print(f"✅ Program already exists: {program_data['name']['en']}")
            continue

        for i, session_data in enumerate(program_data['sessions'], 1):
            session = ProgramSession.objects.create(
                program=program,
                day_number=i,
                name=session_data['name']
            )
            for j, (ex_name, sets, reps) in enumerate(session_data['exercises'], 1):
                exercise = get_ex(ex_name)
                if exercise:
                    SessionExercise.objects.create(
                        session=session,
                        exercise=exercise,
                        sets=sets,
                        reps=reps,
                        order=j
                    )
        print(f"✅ Seeded program: {program_data['name']['en']}")

if __name__ == '__main__':
    create_real_programs()