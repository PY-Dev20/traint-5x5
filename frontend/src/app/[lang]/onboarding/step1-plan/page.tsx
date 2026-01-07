// src/app/[lang]/onboarding/step1-plan/page.tsx
import { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Crown, Star, Zap } from 'lucide-react';

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
        isArabic ? 'خطط تدريب غير محدودة' : lang === 'fr' ? 'Plans d\'entraînement illimités' : 'Unlimited training plans',
        isArabic ? 'وصول إلى التمارين' : lang === 'fr' ? 'Accès aux exercices' : 'Exercise library access',
        isArabic ? 'تتبع التقدم' : lang === 'fr' ? 'Suivi des progrès' : 'Progress tracking',
      ],
      icon: <Zap className="h-6 w-6" />,
      gradient: "from-blue-500 to-cyan-500",
      delay: "0",
    },
    {
      name: isArabic ? 'صانع التغيير' : lang === 'fr' ? 'Game Changer' : 'Game Changer',
      price: isArabic ? '١٣٫٣٠$ / شهر' : lang === 'fr' ? '13,30 $/mois' : '$13.30/month',
      features: [
        isArabic ? 'كل ميزات الزخم' : lang === 'fr' ? 'Toutes les fonctionnalités de Momentum' : 'All Momentum features',
        isArabic ? 'نصائح تغذية مخصصة' : lang === 'fr' ? 'Conseils nutritionnels personnalisés' : 'Personalized nutrition tips',
        isArabic ? 'دعم المدرب' : lang === 'fr' ? 'Support du coach' : 'Coach support',
      ],
      icon: <Star className="h-6 w-6" />,
      gradient: "from-emerald-500 to-teal-500",
      popular: true,
      delay: "100",
    },
    {
      name: isArabic ? 'مغير الحياة' : lang === 'fr' ? 'Lifechanger' : 'Lifechanger',
      price: isArabic ? '١٠٫٨٠$ / شهر' : lang === 'fr' ? '10,80 $/mois' : '$10.80/month',
      features: [
        isArabic ? 'كل الميزات' : lang === 'fr' ? 'Toutes les fonctionnalités' : 'All features',
        isArabic ? 'جلسات شهرية مع المدرب محمد' : lang === 'fr' ? 'Sessions mensuelles avec Coach Mohammed' : 'Monthly sessions with Coach Mohammed',
        isArabic ? 'خطة روحية مخصصة' : lang === 'fr' ? 'Plan spirituel personnalisé' : 'Personalized spiritual plan',
      ],
      icon: <Crown className="h-6 w-6" />,
      gradient: "from-purple-500 to-pink-500",
      delay: "200",
    },
  ];

  return (
    <>
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
          {isArabic ? 'اختر خطتك' : lang === 'fr' ? 'Choisissez votre plan' : 'Choose Your Plan'}
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {isArabic
            ? 'خطط مصممة لتناسب أهدافك ونمط حياتك'
            : lang === 'fr'
            ? 'Des plans conçus pour vos objectifs et votre mode de vie'
            : 'Plans designed to fit your goals and lifestyle'}
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {plans.map((plan, i) => (
          <Card 
            key={i} 
            className={`flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl ${
              plan.popular 
                ? 'ring-2 ring-primary scale-[1.02] transform' 
                : 'hover:-translate-y-1'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 right-4 bg-gradient-to-r from-primary to-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium z-10">
                {isArabic ? 'الأكثر شيوعًا' : lang === 'fr' ? 'Le plus populaire' : 'Most Popular'}
              </div>
            )}
            
            <div className={`h-2 ${plan.gradient}`} />
            
            <CardHeader className="pb-4 pt-6 text-center">
              <div className={`w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center bg-gradient-to-br ${plan.gradient} bg-opacity-20`}>
                {plan.icon}
              </div>
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <CardDescription className="text-3xl font-bold mt-1">
                {plan.price}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="flex flex-col flex-grow">
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-auto pt-4 border-t">
                <Button 
                  asChild 
                  className={`w-full py-6 text-lg font-medium ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-primary to-purple-600 hover:from-purple-600 hover:to-primary' 
                      : 'bg-muted hover:bg-muted/80'
                  }`}
                >
                  <Link href={`/${lang}/onboarding/step2-login?plan=${encodeURIComponent(plan.name)}`}>
                    {isArabic ? 'ابدأ الآن' : lang === 'fr' ? 'Commencer' : 'Get Started'}
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