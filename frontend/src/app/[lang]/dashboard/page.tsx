// src/app/[lang]/dashboard/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated } from '@/lib/auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ProtectedDashboard({ params }: { params: { lang: string } }) {
  const { lang } = params;
  const router = useRouter();
  const isArabic = lang === 'ar';

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push(`/${lang}/login?next=/${lang}/dashboard`);
    }
  }, [lang, router]);

  if (!isAuthenticated()) {
    return <div className="container py-12">Redirecting to login...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle className={isArabic ? 'text-right' : 'text-left'}>
            {isArabic ? 'لوحة تحكمي' : 'My Dashboard'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className={isArabic ? 'text-right' : 'text-left'}>
            {isArabic ? 'مرحباً بك! هنا يمكنك متابعة خططك.' : 'Welcome! Track your plans here.'}
          </p>
          {/* Future: Show user's saved plans */}
        </CardContent>
      </Card>
    </div>
  );
}