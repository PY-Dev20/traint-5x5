# backend/seed_all.py
import os
import sys
import django

# Setup Django
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from django.contrib.auth import get_user_model
from accounts.models import User
from coaches.models import Coach
from fitness.models import Exercise
from programs.models import Program, ProgramCategory, ProgramSession, SessionExercise, UserPlan

User = get_user_model()

def create_users():
    print("🌱 Creating 21 users...")
    users = []

    # Admin
    admin, _ = User.objects.get_or_create(
        email='admin@traint.com',
        defaults={'first_name': 'Admin', 'role': 'admin', 'is_staff': True, 'is_superuser': True}
    )
    if not admin.has_usable_password():
        admin.set_password('securepassword123')
        admin.save()
    users.append(admin)

    # Coaches (3)
    coach_emails = ['coach1@traint.com', 'coach2@traint.com', 'coach3@traint.com']
    for i, email in enumerate(coach_emails, 1):
        user, _ = User.objects.get_or_create(
            email=email,
            defaults={'first_name': f'Coach{i}', 'role': 'coach'}
        )
        if not user.has_usable_password():
            user.set_password('coachpass123')
            user.save()
        users.append(user)

    # Clients (18)
    for i in range(1, 19):
        email = f'client{i}@example.com'
        user, _ = User.objects.get_or_create(
            email=email,
            defaults={
                'first_name': f'Client{i}',
                'role': 'client',
                'preferred_language': 'en' if i % 3 == 0 else 'ar' if i % 3 == 1 else 'fr'
            }
        )
        if not user.has_usable_password():
            user.set_password('clientpass123')
            user.save()
        users.append(user)

    print(f"✅ Created {len(users)} users")
    return users

def create_coaches(users):
    print("🌱 Creating coach profiles...")
    coaches = []
    coach_users = [u for u in users if u.role == 'coach']
    
    specialties = {
        'en': ['Strength', 'Fat Loss', 'Mobility'],
        'ar': ['القوة', 'حرق الدهون', 'المرونة'],
        'fr': ['Force', 'Perte de graisse', 'Mobilité']
    }
    
    bio_texts = {
        'en': 'Certified Strength & Conditioning Coach with 10+ years of experience.',
        'ar': 'مدرب معتمد في القوة والتحمل بخبرة أكثر من 10 سنوات.',
        'fr': 'Entraîneur certifié en force et conditionnement avec plus de 10 ans d’expérience.'
    }

    for i, user in enumerate(coach_users, 1):
        coach, _ = Coach.objects.get_or_create(
            user=user,
            defaults={
                'bio': bio_texts,
                'specialties': specialties,
                'experience_years': 8 + i,
                'is_featured': i == 1
            }
        )
        coaches.append(coach)
    print(f"✅ Created {len(coaches)} coaches")
    return coaches

def create_exercises():
    print("🌱 Creating 50+ exercises...")
    exercises_data = [
        (
            {"en": "Bench Press", "ar": "بنش برس", "fr": "Développé couché"},
            {"en": "Chest", "ar": "الصدر", "fr": "Pectoraux"},
            ["chest", "triceps"],
            "beginner",
            "https://www.youtube.com/watch?v=QGQ6BkX8KqU"
        ),
        (
            {"en": "Pull-up", "ar": "سحب عكسي", "fr": "Traction"},
            {"en": "Back", "ar": "الظهر", "fr": "Dos"},
            ["back", "biceps"],
            "intermediate",
            "https://www.youtube.com/watch?v=eGo4IYlbE5g"
        ),
        (
            {"en": "Barbell Squat", "ar": "سكوات بالبار", "fr": "Squat à la barre"},
            {"en": "Legs", "ar": "الساقين", "fr": "Jambes"},
            ["quads", "glutes"],
            "beginner",
            "https://www.youtube.com/watch?v=aclHkVaku9U"
        ),
        (
            {"en": "Overhead Press", "ar": "ضغط الكتف", "fr": "Développé militaire"},
            {"en": "Shoulders", "ar": "الكتفين", "fr": "Épaules"},
            ["shoulders", "triceps"],
            "beginner",
            "https://www.youtube.com/watch?v=2yjwXTZQDDI"
        ),
        (
            {"en": "Bicep Curl", "ar": "تمرين العضلة ذات الرأسين", "fr": "Curl biceps"},
            {"en": "Arms", "ar": "الذراعين", "fr": "Bras"},
            ["biceps"],
            "beginner",
            "https://www.youtube.com/watch?v=ykJmrZ5v0Oo"
        ),
        (
            {"en": "Tricep Dip", "ar": "تمرين ثلاثية الرؤوس", "fr": "Dips triceps"},
            {"en": "Arms", "ar": "الذراعين", "fr": "Bras"},
            ["triceps"],
            "beginner",
            "https://www.youtube.com/watch?v=0326dy_-CzM"
        ),
        (
            {"en": "Plank", "ar": "البلانك", "fr": "Gainage"},
            {"en": "Core", "ar": "العضلات الأساسية", "fr": "Gainage"},
            ["core", "abs"],
            "beginner",
            "https://www.youtube.com/watch?v=pSHjTRCQxIw"
        ),
        (
            {"en": "Deadlift", "ar": "رفع ميت", "fr": "Soulevé de terre"},
            {"en": "Back", "ar": "الظهر", "fr": "Dos"},
            ["back", "hamstrings", "glutes"],
            "intermediate",
            "https://www.youtube.com/watch?v=1ZXobT27o5k"
        ),
        (
            {"en": "Lunges", "ar": "الاندفاعات", "fr": "Fentes"},
            {"en": "Legs", "ar": "الساقين", "fr": "Jambes"},
            ["quads", "glutes"],
            "beginner",
            "https://www.youtube.com/watch?v=QXvXQ8X4cFk"
        ),
        (
            {"en": "Push-up", "ar": "ضغط", "fr": "Pompes"},
            {"en": "Chest", "ar": "الصدر", "fr": "Pectoraux"},
            ["chest", "triceps", "core"],
            "beginner",
            "https://www.youtube.com/watch?v=IODxDxX7oi4"
        ),
        # Add 40+ more as needed
    ]

    exercises = []
    for name, category, muscles, level, video in exercises_data:
        description = {
            "en": f"{name['en']} exercise for {category['en'].lower()}",
            "ar": f"تمرين {name['ar']} لل{category['ar'].lower()}",
            "fr": f"Exercice de {name['fr']} pour les {category['fr'].lower()}"
        }
        instructions = {
            "en": [f"Step 1: Set up for {name['en']}", "Step 2: Perform reps", "Step 3: Rest"],
            "ar": [f"الخطوة 1: الإعداد لـ {name['ar']}", "الخطوة 2: نفّذ التكرارات", "الخطوة 3: استرح"],
            "fr": [f"Étape 1: Préparez-vous pour {name['fr']}", "Étape 2: Effectuez les répétitions", "Étape 3: Reposez-vous"]
        }

        ex, created = Exercise.objects.get_or_create(
            name=name,
            defaults={
                'description': description,
                'instructions': instructions,
                'category': category,
                'difficulty': level,
                'demo_video_url': video,
                'target_muscles': muscles,
                'main_muscle': category['en'],
                'equipment': 'barbell' if 'Barbell' in name['en'] else 'dumbbell' if 'Dumbbell' in name['en'] else 'bodyweight',
                'mechanics': 'compound'
            }
        )
        exercises.append(ex)
    print(f"✅ Created {len(exercises)} exercises")
    return exercises

def create_programs(coaches, exercises):
    print("🌱 Creating 20+ programs...")
    programs_data = [
        {
            'name': {"en": "Complete Fat Destroyer Program", "ar": "برنامج تدمير الدهون الكامل", "fr": "Programme Complet de Destruction des Graisses"},
            'desc': {"en": "12-week fat loss program for beginners.", "ar": "برنامج فقدان الدهون لمدة 12 أسبوعًا للمبتدئين.", "fr": "Programme de perte de graisse de 12 semaines pour débutants."},
            'difficulty': 'beginner',
            'weeks': 12,
            'category_name': 'Fat Loss'
        },
        {
            'name': {"en": "Strength And Bulk Beginner Workout", "ar": "تمرين القوة والكتلة للمبتدئين", "fr": "Entraînement Force et Masse pour Débutants"},
            'desc': {"en": "10-week strength program for beginners.", "ar": "برنامج القوة لمدة 10 أسابيع للمبتدئين.", "fr": "Programme de force de 10 semaines pour débutants."},
            'difficulty': 'beginner',
            'weeks': 10,
            'category_name': 'Strength'
        },
        {
            'name': {"en": "Complete Beginner Program", "ar": "البرنامج الكامل للمبتدئين", "fr": "Programme Complet pour Débutants"},
            'desc': {"en": "6-week muscle building for beginners.", "ar": "بناء العضلات لمدة 6 أسابيع للمبتدئين.", "fr": "Développement musculaire de 6 semaines pour débutants."},
            'difficulty': 'beginner',
            'weeks': 6,
            'category_name': 'Muscle Building'
        },
        {
            'name': {"en": "Home Based Abs Workout", "ar": "تمارين البطن المنزلية", "fr": "Programme d’Abdos à Domicile"},
            'desc': {"en": "6-week core program for beginners.", "ar": "برنامج العضلات الأساسية لمدة 6 أسابيع للمبتدئين.", "fr": "Programme de gainage de 6 semaines pour débutants."},
            'difficulty': 'beginner',
            'weeks': 6,
            'category_name': 'Abs'
        },
        {
            'name': {"en": "Big Arms Fast", "ar": "ذراعان كبيرتان بسرعة", "fr": "Gros Bras Rapidement"},
            'desc': {"en": "4-week arm specialization for beginners.", "ar": "برنامج تخصص الذراعين لمدة 4 أسابيع للمبتدئين.", "fr": "Spécialisation bras de 4 semaines pour débutants."},
            'difficulty': 'beginner',
            'weeks': 4,
            'category_name': 'Arms'
        },
        # Add more programs here (up to 20+)
    ]

    # Create ProgramCategory objects
    category_map = {}
    for cat_name in set(p['category_name'] for p in programs_data):
        cat, _ = ProgramCategory.objects.get_or_create(
            name={"en": cat_name, "ar": cat_name, "fr": cat_name}
        )
        category_map[cat_name] = cat

    programs = []
    coach_list = list(coaches)
    exercise_list = list(exercises)

    for i, data in enumerate(programs_data, 1):
        coach = coach_list[(i - 1) % len(coach_list)]
        category = category_map[data['category_name']]

        program, created = Program.objects.get_or_create(
            name=data['name'],
            defaults={
                'description': data['desc'],
                'difficulty': data['difficulty'],
                'duration_weeks': data['weeks'],
                'category': category,
                'coach': coach,
                'created_by': coach.user,
                'is_custom': False
            }
        )

        # Create 3 sessions
        for day in range(1, 4):
            session = ProgramSession.objects.create(
                program=program,
                day_number=day,
                name={
                    'en': f'Day {day}: Full Body',
                    'ar': f'اليوم {day}: الجسم بالكامل',
                    'fr': f'Jour {day}: Corps Entier'
                }
            )
            # Add 5 exercises per session (wrap around if needed)
            for j in range(5):
                ex = exercise_list[(i + j) % len(exercise_list)]
                SessionExercise.objects.create(
                    session=session,
                    exercise=ex,
                    sets=5,
                    reps=5,
                    order=j + 1
                )
        programs.append(program)
    print(f"✅ Created {len(programs)} programs")
    return programs

def create_user_plans(users, programs):
    print("🌱 Assigning programs to users...")
    client_users = [u for u in users if u.role == 'client']
    for i, user in enumerate(client_users[:10]):  # Assign to first 10 clients
        program = programs[i % len(programs)]
        UserPlan.objects.get_or_create(
            user=user,
            program=program
        )
    print("✅ Assigned programs to users")

def main():
    print("🚀 Starting full data seeding...")
    users = create_users()
    coaches = create_coaches(users)
    exercises = create_exercises()
    programs = create_programs(coaches, exercises)
    create_user_plans(users, programs)
    print("🎉 All data seeded successfully!")

if __name__ == '__main__':
    main()