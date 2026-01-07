import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button'; // Add this import
import Link from 'next/link';

export default async function ProgramsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const isArabic = lang === 'ar';

  // Fetch from Django API
  const res = await fetch(`http://localhost:8000/api/programs/?lang=${lang}`);
  const programs = await res.json();

  return (
    <>
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
          {isArabic ? 'خطط التمرين' : 'Workout Plans'}
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {isArabic
            ? 'اختر من خطط التدريب المصممة خصيصًا لتحقيق أهدافك في اللياقة'
            : 'Choose from expertly crafted workout programs designed to help you reach your fitness goals'}
        </p>
      </div>
      
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {programs.map((program: any) => (
          <Card
            key={program.id}
            className="overflow-hidden hover:shadow-xl transition-all duration-300 border-0 hover:-translate-y-1"
          >
            {program.thumbnail && (
              <div className="h-48 overflow-hidden">
                <img
                  src={`http://localhost:8000${program.thumbnail}`}
                  alt={program.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
            )}
            <CardHeader className="pb-4">
              <CardTitle className={isArabic ? 'text-right text-2xl' : 'text-left text-2xl'}>
                {program.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className={`mb-4 ${isArabic ? 'text-right text-muted-foreground' : 'text-left text-muted-foreground'}`}>
                {program.description}
              </p>
              <div className="flex justify-between items-center pt-4 border-t">
                <span className="text-sm text-muted-foreground">
                  {isArabic ? 'المدة:' : 'Duration:'} {program.duration_weeks} {isArabic ? 'أسابيع' : 'weeks'}
                </span>
                <Button variant="ghost" className="hover:bg-primary/10">
                  <Link
                    href={`/${lang}/programs/library/${program.id}`}
                    className="text-primary font-medium flex items-center gap-1 hover:underline"
                  >
                    {isArabic ? 'عرض الخطة' : 'View Plan'}
                    <span className={isArabic ? 'mr-1' : 'ml-1'}>→</span>
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}