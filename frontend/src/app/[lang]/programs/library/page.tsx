// frontend/src/app/[lang]/programs/library/page.tsx
import { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return { title: lang === 'ar' ? 'خطط التمرين' : 'Workout Plans' };
}

export default async function ProgramsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const isArabic = lang === 'ar';

  // Fetch from Django API
  const res = await fetch(`http://localhost:8000/api/programs/?lang=${lang}`);
  const programs = await res.json();

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        {isArabic ? 'خطط التمرين الجاهزة' : 'Pre-Built Workout Plans'}
      </h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {programs.map((program: any) => (
          <Card key={program.id} className="hover:shadow-md">
            <CardHeader>
              <CardTitle className={isArabic ? 'text-right' : 'text-left'}>
                {program.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className={isArabic ? 'text-right' : 'text-left'}>{program.description}</p>
              <Link
                href={`/${lang}/programs/library/${program.id}`}
                className="text-primary hover:underline mt-2 inline-block"
              >
                {isArabic ? 'عرض الخطة' : 'View Plan'}
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}