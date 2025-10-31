// src/app/[lang]/onboarding/step1-plan/page.tsx
import { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: lang === 'ar' ? 'اختر خطتك' : lang === 'fr' ? 'Choisissez votre plan' : 'Choose Your Plan',
  };
}

export default async function Step1Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const isArabic = lang === 'ar';

  const plans = [
    {
      name: isArabic ? 'الزخم' : lang === 'fr' ? 'Momentum' : 'Momentum',
      price: isArabic ? '١٩٫٩٩$ / شهر' : lang === 'fr' ? '19,99 $/mois' : '$19.99/month',
      features: [
        isArabic ? 'خطط تدريب غير محدودة' : lang === 'fr' ? 'Plans d’entraînement illimités' : 'Unlimited training plans',
        isArabic ? 'وصول إلى التمارين' : lang === 'fr' ? 'Accès aux exercices' : 'Exercise library access',
        isArabic ? 'تتبع التقدم' : lang === 'fr' ? 'Suivi des progrès' : 'Progress tracking',
      ],
    },
    {
      name: isArabic ? 'صانع التغيير' : lang === 'fr' ? 'Game Changer' : 'Game Changer',
      price: isArabic ? '١٣٫٣٠$ / شهر' : lang === 'fr' ? '13,30 $/mois' : '$13.30/month',
      features: [
        isArabic ? 'كل ميزات الزخم' : lang === 'fr' ? 'Toutes les fonctionnalités de Momentum' : 'All Momentum features',
        isArabic ? 'نصائح تغذية مخصصة' : lang === 'fr' ? 'Conseils nutritionnels personnalisés' : 'Personalized nutrition tips',
        isArabic ? 'دعم المدرب' : lang === 'fr' ? 'Support du coach' : 'Coach support',
      ],
    },
    {
      name: isArabic ? 'مغير الحياة' : lang === 'fr' ? 'Lifechanger' : 'Lifechanger',
      price: isArabic ? '١٠٫٨٠$ / شهر' : lang === 'fr' ? '10,80 $/mois' : '$10.80/month',
      features: [
        isArabic ? 'كل الميزات' : lang === 'fr' ? 'Toutes les fonctionnalités' : 'All features',
        isArabic ? 'جلسات شهرية مع المدرب محمد' : lang === 'fr' ? 'Sessions mensuelles avec Coach Mohammed' : 'Monthly sessions with Coach Mohammed',
        isArabic ? 'خطة روحية مخصصة' : lang === 'fr' ? 'Plan spirituel personnalisé' : 'Personalized spiritual plan',
      ],
    },
  ];

  return (
    <div className="container mx-auto py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-3">
          {isArabic ? 'اختر خطتك' : lang === 'fr' ? 'Choisissez votre plan' : 'Choose Your Plan'}
        </h1>
        <p className="text-muted-foreground">
          {isArabic
            ? 'خطط مصممة لتناسب أهدافك ونمط حياتك'
            : lang === 'fr'
            ? 'Des plans conçus pour vos objectifs et votre mode de vie'
            : 'Plans designed to fit your goals and lifestyle'}
        </p>
      </div>

      <div className={`grid gap-6 ${isArabic ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-1 md:grid-cols-3'}`}>
        {plans.map((plan, i) => (
          <Card key={i} className="flex flex-col">
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription className="text-2xl font-bold">{plan.price}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col flex-grow">
              <ul className="space-y-2 mb-6">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span> {feature}
                  </li>
                ))}
              </ul>
              <Button asChild className="mt-auto">
                <Link href={`/${lang}/onboarding/step2-login?plan=${encodeURIComponent(plan.name)}`}>
                  {isArabic ? 'ابدأ الآن' : lang === 'fr' ? 'Commencer' : 'Get Started'}
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}