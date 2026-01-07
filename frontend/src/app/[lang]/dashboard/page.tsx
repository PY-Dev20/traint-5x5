// frontend/src/app/[lang]/dashboard/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function DashboardPage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  const { user, loading } = useAuth();
  const router = useRouter();
  const isArabic = lang === 'ar';

  useEffect(() => {
    if (!loading && !user) {
      router.push(`/${lang}/login?next=/${lang}/dashboard`);
    }
  }, [lang, loading, user, router]);

  if (loading) {
    return <div className="container py-12">Loading...</div>;
  }

  if (!user) {
    return null; // Redirect handled above
  }

  return (
    <div className="container mx-auto py-8">
      {/* Welcome Banner */}
      <div className="mb-8 p-6 bg-muted/30 rounded-lg">
        <h1 className="text-3xl font-bold mb-2">
          {isArabic ? 'مرحباً بك في لوحة التحكم!' : 'Welcome to Your Dashboard!'}
        </h1>
        <p>
          {isArabic
            ? `مرحباً، ${user.first_name || user.email.split('@')[0]}!`
            : `Hi, ${user.first_name || user.email.split('@')[0]}!`}
        </p>
      </div>

      {/* Navigation Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>{isArabic ? 'الرئيسية' : 'Home'}</CardTitle>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full" variant="outline">
              <Link href={`/${lang}`}>{isArabic ? 'الذهاب إلى الصفحة الرئيسية' : 'Go to Home'}</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{isArabic ? 'خطط التمرين' : 'Workout Plans'}</CardTitle>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full" variant="outline">
              <Link href={`/${lang}/programs/library`}>
                {isArabic ? 'عرض جميع الخطط' : 'View All Programs'}
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{isArabic ? 'المكتبة' : 'Exercise Library'}</CardTitle>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full" variant="outline">
              <Link href={`/${lang}/exercises`}>
                {isArabic ? 'استعراض التمارين' : 'Browse Exercises'}
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{isArabic ? 'المدرب' : 'Coach'}</CardTitle>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full" variant="outline">
              <Link href={`/${lang}/coach`}>{isArabic ? 'معرفة المدرب' : 'Meet the Coach'}</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{isArabic ? 'الملف الشخصي' : 'Profile'}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="font-medium">{user.email}</p>
              <p className="text-sm text-muted-foreground">
                {isArabic ? 'الدور:' : 'Role:'} {user.role}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}