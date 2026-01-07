// frontend/src/components/AddToPlanButton.tsx
'use client';

import { Button } from '@/components/ui/button';
import { useState } from 'react';

export function AddToPlanButton({
  programId,
  lang,
}: {
  programId: number;
  lang: string;
}) {
  const [loading, setLoading] = useState(false);

  const handleAddToPlan = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        window.location.href = `/${lang}/login?next=/${lang}/programs/library/${programId}`;
        return;
      }

      const res = await fetch('http://localhost:8000/api/user-plans/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ program_id: programId }),
      });

      if (res.ok) {
        alert(lang === 'ar' ? 'تمت إضافة الخطة إلى حسابك!' : 'Plan added to your account!');
      } else {
        const error = await res.json();
        alert(
          lang === 'ar'
            ? `فشل في الإضافة: ${JSON.stringify(error)}`
            : `Failed to add plan: ${JSON.stringify(error)}`
        );
      }
    } catch (error) {
      console.error('Error adding plan:', error);
      alert(
        lang === 'ar'
          ? 'حدث خطأ. تحقق من الاتصال.'
          : 'An error occurred. Please check your connection.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      size="lg"
      onClick={handleAddToPlan}
      disabled={loading}
      className="px-8 py-6 text-lg"
    >
      {loading
        ? lang === 'ar'
          ? 'جاري التحميل...'
          : 'Loading...'
        : lang === 'ar'
        ? 'أضف إلى خطتي'
        : 'Add to My Plan'}
    </Button>
  );
}