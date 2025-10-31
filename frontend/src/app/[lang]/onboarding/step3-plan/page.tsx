// src/app/[lang]/onboarding/step3-plan/page.tsx
import { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Calendar, Dumbbell, Users } from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: lang === 'ar' ? 'خطتك المخصصة' : lang === 'fr' ? 'Votre plan personnalisé' : 'Your Personalized Plan',
  };
}

export default async function Step3Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const isArabic = lang === 'ar';

  return (
    <div className="container mx-auto py-12 max-w-3xl">
      <Card className="text-center">
        <CardHeader>
          <CardTitle className="text-2xl">
            {isArabic ? 'تهانينا! خطتك جاهزة' : lang === 'fr' ? 'Félicitations ! Votre plan est prêt' : 'Congratulations! Your Plan Is Ready'}
          </CardTitle>
          <p className="text-muted-foreground">
            {isArabic
              ? 'تم تصميمها خصيصاً لك من قبل المدرب محمد'
              : lang === 'fr'
              ? 'Conçu spécialement pour vous par Coach Mohammed'
              : 'Custom-built for you by Coach Mohammed'}
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex justify-center gap-6 text-muted-foreground">
              <div className="flex flex-col items-center">
                <Dumbbell className="h-8 w-8 mb-2" />
                <span>{isArabic ? '٥ أيام تدريب' : lang === 'fr' ? '5 Jours' : '5 Days'}</span>
              </div>
              <div className="flex flex-col items-center">
                <Calendar className="h-8 w-8 mb-2" />
                <span>{isArabic ? 'تغذية متوازنة' : lang === 'fr' ? 'Nutrition' : 'Balanced Meals'}</span>
              </div>
              <div className="flex flex-col items-center">
                <Users className="h-8 w-8 mb-2" />
                <span>{isArabic ? 'دعم روحي' : lang === 'fr' ? 'Spirituel' : 'Spiritual Support'}</span>
              </div>
            </div>

            <Badge variant="secondary" className="text-lg px-4 py-1">
              {isArabic ? 'خطة 5×5 الكاملة' : lang === 'fr' ? 'Programme 5×5 Complet' : 'Full 5×5 Program'}
            </Badge>

            <p className={isArabic ? 'text-right' : 'text-left'}>
              {isArabic
                ? 'ستتلقى بريداً إلكترونياً يحتوي على خطة التدريب، جدول الصلوات، ونصائح التغذية خلال 24 ساعة.'
                : lang === 'fr'
                ? 'Vous recevrez un e-mail avec votre plan d’entraînement, horaires de prière et conseils nutritionnels sous 24h.'
                : 'You’ll receive an email with your training plan, prayer schedule, and nutrition tips within 24 hours.'}
            </p>

            <Button asChild size="lg" className="mt-4">
              <Link href={`/${lang}/dashboard`}>
                {isArabic ? 'الذهاب إلى لوحة التحكم' : lang === 'fr' ? 'Aller au tableau de bord' : 'Go to Dashboard'}
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}