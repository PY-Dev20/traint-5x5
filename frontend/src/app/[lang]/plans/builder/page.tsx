// src/app/[lang]/plans/builder/page.tsx
import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ExerciseImage } from '@/components/ExerciseImage';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return {
    title: lang === 'ar' ? 'أنشئ خطتك المخصصة | TRAINT' : 'Build Your Plan | TRAINT',
  };
}

const getExercises = (lang: string) => {
  const isArabic = lang === 'ar';
  return [
    {
      id: 'bench-press',
      name: isArabic ? 'الضغط على المقعد' : 'Bench Press',
      group: 'chest',
      image: 'https://source.unsplash.com/400x300/?bench,press,chest',
    },
    {
      id: 'squats',
      name: isArabic ? 'القرفصاء' : 'Barbell Squats',
      group: 'legs',
      image: 'https://source.unsplash.com/400x300/?squat,legs,gym',
    },
    {
      id: 'deadlift',
      name: isArabic ? 'الرفع المميت' : 'Deadlift',
      group: 'back',
      image: 'https://source.unsplash.com/400x300/?deadlift,back,strength',
    },
    {
      id: 'pull-ups',
      name: isArabic ? 'الشد لأعلى' : 'Pull-ups',
      group: 'back',
      image: 'https://source.unsplash.com/400x300/?pullup,back,calisthenics',
    },
    {
      id: 'overhead-press',
      name: isArabic ? 'الضغط فوق الرأس' : 'Overhead Press',
      group: 'shoulders',
      image: 'https://source.unsplash.com/400x300/?shoulder,press,gym',
    },
    {
      id: 'plank',
      name: isArabic ? 'البلانك' : 'Plank',
      group: 'abs',
      image: 'https://source.unsplash.com/400x300/?plank,core,abs',
    },
    {
      id: 'bicep-curls',
      name: isArabic ? 'تمارين العضلة ذات الرأسين' : 'Bicep Curls',
      group: 'arms',
      image: 'https://source.unsplash.com/400x300/?bicep,curl,arm',
    },
    {
      id: 'tricep-dips',
      name: isArabic ? 'تمارين الثلاثية' : 'Tricep Dips',
      group: 'arms',
      image: 'https://source.unsplash.com/400x300/?tricep,dip,arm',
    },
    {
      id: 'glute-bridge',
      name: isArabic ? 'جسر الألوية' : 'Glute Bridge',
      group: 'buttocks',
      image: 'https://source.unsplash.com/400x300/?glute,bridge,hip',
    },
    {
      id: 'jumping-jacks',
      name: isArabic ? 'قفز الجاك' : 'Jumping Jacks',
      group: 'cardio',
      image: 'https://source.unsplash.com/400x300/?jumping,jack,cardio',
    },
    {
      id: 'hamstring-stretch',
      name: isArabic ? 'تمديد أوتار الركبة' : 'Hamstring Stretch',
      group: 'stretches',
      image: 'https://source.unsplash.com/400x300/?stretch,hamstring,yoga',
    },
  ];
};

const getMuscleGroups = (lang: string) => {
  const isArabic = lang === 'ar';
  return [
    { value: 'chest', label: isArabic ? 'الصدر' : 'Chest' },
    { value: 'back', label: isArabic ? 'الظهر' : 'Back' },
    { value: 'legs', label: isArabic ? 'الفخذين' : 'Legs' },
    { value: 'shoulders', label: isArabic ? 'الكتفين' : 'Shoulders' },
    { value: 'abs', label: isArabic ? 'البطن' : 'Abs' },
    { value: 'arms', label: isArabic ? 'الذراعين' : 'Arms' },
    { value: 'buttocks', label: isArabic ? 'الألوية' : 'Buttocks' },
    { value: 'cardio', label: isArabic ? 'الكارديو' : 'Cardio' },
    { value: 'stretches', label: isArabic ? 'التمديدات' : 'Stretches' },
  ];
};

export default async function PlanBuilderPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const isArabic = lang === 'ar';
  const exercises = getExercises(lang);
  const groups = getMuscleGroups(lang);

  return (
    <div className="container mx-auto py-8 max-w-6xl">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          {isArabic ? 'أنشئ خطتك المخصصة 5×5' : 'Build Your Custom 5×5 Plan'}
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {isArabic
            ? 'اختر التمارين التي تناسب أهدافك. سنساعدك في بناء برنامج متوازن للقوة، التغذية، والروح.'
            : 'Select exercises that match your goals. We’ll help you build a balanced program for strength, nutrition, and spirit.'}
        </p>
      </div>

      {/* Muscle Group Filter Badges */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        <Badge variant="secondary" className="px-3 py-1">
          {isArabic ? 'الكل' : 'All'}
        </Badge>
        {groups.map((group) => (
          <Badge key={group.value} variant="outline" className="px-3 py-1 cursor-pointer hover:bg-accent">
            {group.label}
          </Badge>
        ))}
      </div>

      {/* Exercise Grid */}
      <form>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {exercises.map((ex) => (
            <Card key={ex.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 overflow-hidden">
                <ExerciseImage
                  src={ex.image}
                  alt={ex.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader className="pb-2">
                <CardTitle className={isArabic ? 'text-right' : 'text-left'}>{ex.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start space-x-2 rtl:space-x-reverse">
                  <Checkbox id={ex.id} />
                  <Label htmlFor={ex.id} className="text-sm text-muted-foreground">
                    {isArabic ? 'أضف إلى خطتي' : 'Add to my plan'}
                  </Label>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  {isArabic ? 'عرض التعليمات' : 'View Instructions'}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button size="lg" className="px-8 py-6 text-lg">
            {isArabic ? 'حفظ الخطّة وبدء التدريب' : 'Save Plan & Start Training'}
          </Button>
        </div>
      </form>
    </div>
  );
}