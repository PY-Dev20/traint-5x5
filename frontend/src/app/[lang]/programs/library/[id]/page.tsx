// frontend/src/app/[lang]/programs/library/[id]/page.tsx
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, User } from 'lucide-react';
import Link from 'next/link';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; id: string }>;
}): Promise<Metadata> {
  const { lang, id } = await params;
  // In real app, fetch program title from API
  const title = lang === 'ar' ? `خطة التمرين #${id}` : `Workout Plan #${id}`;
  return { title };
}

export default async function ProgramDetailPage({
  params,
}: {
  params: Promise<{ lang: string; id: string }>;
}) {
  const { lang, id } = await params;
  const isArabic = lang === 'ar';

  // Fetch program from Django API
  const res = await fetch(`http://localhost:8000/api/programs/${id}/?lang=${lang}`, {
    next: { revalidate: 3600 }, // ISR: revalidate every hour
  });

  if (!res.ok) {
    notFound(); // 404 if program not found
  }

  const program = await res.json();

  // Mock user plan creation (replace with real API call)
  const handleAddToPlan = async () => {
  const token = typeof window !== 'undefined' 
    ? localStorage.getItem('access_token') 
    : null;

  if (!token) {
    // Redirect to login if not authenticated
    window.location.href = `/${lang}/login`;
    return;
  }

  try {
    const response = await fetch('http://localhost:8000/api/user-plans/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        program_id: program.id,
      }),
    });

    if (response.ok) {
      alert(lang === 'ar' ? 'تمت إضافة الخطة إلى حسابك!' : 'Plan added to your account!');
    } else {
      const error = await response.json();
      alert(lang === 'ar' ? 'فشل في الإضافة: ' + JSON.stringify(error) : 'Failed to add plan: ' + JSON.stringify(error));
    }
  } catch (error) {
    console.error('Error adding plan:', error);
    alert(lang === 'ar' ? 'حدث خطأ. تحقق من الاتصال.' : 'An error occurred. Please check your connection.');
  }
};

  return (
    <div className="container mx-auto py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">{program.name}</h1>
        <p className={isArabic ? 'text-right' : 'text-left'}>{program.description}</p>
        
        <div className="flex flex-wrap justify-center gap-2 mt-4">
          <Badge variant="secondary">
            {isArabic ? 'المدة' : 'Duration'}: {program.duration_weeks} {isArabic ? 'أسابيع' : 'weeks'}
          </Badge>
          <Badge variant="outline">
            {isArabic ? 'المستوى' : 'Level'}: {program.difficulty === 'beginner' ? (isArabic ? 'مبتدئ' : 'Beginner') : program.difficulty}
          </Badge>
          {program.coach && (
            <Badge variant="default" className="flex items-center gap-1">
              <User className="h-3 w-3" />
              {program.coach.user?.first_name || 'Coach'}
            </Badge>
          )}
        </div>
      </div>

      {/* Add to Plan Button */}
      <div className="text-center mb-10">
        <Button size="lg" onClick={handleAddToPlan} className="px-8 py-6 text-lg">
          {isArabic ? 'أضف إلى خطتي' : 'Add to My Plan'}
        </Button>
      </div>

      {/* Sessions */}
      <div className="space-y-8">
        {program.sessions?.map((session: any) => (
          <Card key={session.id} className="overflow-hidden">
            <CardHeader className="bg-muted/50">
              <CardTitle className={isArabic ? 'text-right' : 'text-left'}>
                {session.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid gap-4">
                {session.exercises?.map((ex: any) => (
                  <div
                    key={ex.id}
                    className="flex items-start gap-4 p-4 border rounded-lg hover:bg-muted/30"
                  >
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className={isArabic ? 'text-right font-medium' : 'text-left font-medium'}>
                        {ex.exercise_name}
                      </h3>
                      <p className={isArabic ? 'text-right text-sm text-muted-foreground mt-1' : 'text-left text-sm text-muted-foreground mt-1'}>
                        {ex.sets} × {ex.reps} {isArabic ? 'تكرارات' : 'reps'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Back to Library */}
      <div className="mt-10 text-center">
        <Button variant="outline" asChild>
          <Link href={`/${lang}/programs/library`}>
            {isArabic ? 'العودة إلى خطط التمرين' : 'Back to Programs'}
          </Link>
        </Button>
      </div>
    </div>
  );
}