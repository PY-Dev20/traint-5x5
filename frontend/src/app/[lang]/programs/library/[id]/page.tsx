// frontend/src/app/[lang]/programs/library/[id]/page.tsx
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, Clock, Dumbbell, Target, Users } from 'lucide-react';
import Link from 'next/link';

export default async function ProgramDetailPage({
  params,
}: {
  params: Promise<{ lang: string; id: string }>;
}) {
  const { lang, id } = await params;
  const isArabic = lang === 'ar';

  // Fetch program with full structure
  const res = await fetch(
    `http://localhost:8000/api/programs/${id}/?lang=${lang}`,
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) return notFound();
  const program = await res.json();

  const goalMap: Record<string, string> = {
    muscle_gain: isArabic ? 'بناء العضلات' : 'Muscle Gain',
    fat_loss: isArabic ? 'حرق الدهون' : 'Fat Loss',
    strength: isArabic ? 'زيادة القوة' : 'Strength',
    full_body: isArabic ? 'تمارين الجسم كله' : 'Full Body',
  };

  return (
    <div className="container mx-auto py-8">
      {/* Hero Banner */}
      <div className="mb-8 p-6 bg-muted/30 rounded-xl">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="secondary">{goalMap[program.goal]}</Badge>
            <Badge>{program.training_level}</Badge>
            <Badge>
              <Clock className="h-3 w-3 mr-1 inline" />
              {program.estimated_duration}
            </Badge>
            <Badge>
              <Target className="h-3 w-3 mr-1 inline" />
              {program.days_per_week}x {isArabic ? 'أسبوعياً' : 'Weekly'}
            </Badge>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">{program.name}</h1>
          <p className={isArabic ? 'text-right' : 'text-left'}>
            {program.description}
          </p>
          <div className="mt-4 flex gap-3 flex-wrap">
            <Button size="lg">
              {isArabic ? 'أضف إلى خطتي' : 'Add to My Plan'}
            </Button>
            <Button variant="outline" size="lg">
              {isArabic ? 'تصدير كـ PDF' : 'Export as PDF'}
            </Button>
          </div>
        </div>
      </div>

      {/* Program Overview */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              <Target className="h-4 w-4" />
              {isArabic ? 'الهدف' : 'Goal'}
            </CardTitle>
          </CardHeader>
          <CardContent>{goalMap[program.goal]}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              <Users className="h-4 w-4" />
              {isArabic ? 'المستوى' : 'Level'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {program.training_level === 'beginner'
              ? isArabic
                ? 'مبتدئ'
                : 'Beginner'
              : program.training_level}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              <Clock className="h-4 w-4" />
              {isArabic ? 'المدة' : 'Duration'}
            </CardTitle>
          </CardHeader>
          <CardContent>{program.estimated_duration}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              <Dumbbell className="h-4 w-4" />
              {isArabic ? 'الأسبوع' : 'Per Week'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {program.days_per_week} {isArabic ? 'أيام' : 'Days'}
          </CardContent>
        </Card>
      </div>

      {/* Sessions (Days) */}
      <div className="space-y-10">
        {program.sessions?.map((session: any) => (
          <div key={session.id} className="border rounded-lg overflow-hidden">
            <div className="bg-muted/50 px-6 py-4">
              <h2 className="text-xl font-bold">
                {session.name}
              </h2>
            </div>
            <div className="p-6">
              <div className="grid gap-4">
                {session.exercises?.map((ex: any) => (
                  <div
                    key={ex.id}
                    className="flex items-center gap-4 p-4 border rounded-lg"
                  >
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <div className="flex-1">
                      <div className="font-medium">{ex.exercise_name}</div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {ex.sets} × {ex.reps} • {ex.exercise.main_muscle}
                      </div>
                    </div>
                    <Badge variant="outline">{ex.exercise.equipment}</Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Back to Library */}
      <div className="mt-12 text-center">
        <Button variant="outline" asChild>
          <Link href={`/${lang}/programs/library`}>
            {isArabic ? 'العودة إلى خطط التمرين' : 'Back to Programs'}
          </Link>
        </Button>
      </div>
    </div>
  );
}