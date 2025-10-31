// src/app/[lang]/methodology/page.tsx
import { Metadata } from 'next';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Dumbbell,
  Utensils,
  Briefcase,
  Users,
} from 'lucide-react';

import { MosqueIcon } from '@/components/icons/MosqueIcon';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return {
    title:
      lang === 'ar'
        ? 'لوحة تحكم 5×5 | تدريب 5×5 الحقيقي'
        : lang === 'fr'
        ? 'Tableau de Bord 5x5 | Entraînement Réel 5x5'
        : '5x5 Dashboard | 5x5 Real Training',
    description:
      lang === 'ar'
        ? 'نظام متكامل لبناء القوة الجسدية، التغذية المتوازنة، والسلام الروحي'
        : lang === 'fr'
        ? 'Un système intégré pour la force physique, la nutrition équilibrée et la paix spirituelle'
        : 'An integrated system for physical strength, balanced nutrition, and spiritual peace',
  };
}

// Pillar data per language
const getPillarData = (lang: string) => {
  const isArabic = lang === 'ar';

  return [
    {
      id: 'training',
      title: isArabic ? '٥ أيام تدريب' : lang === 'fr' ? '5 Jours d’Entraînement' : '5 Days Training',
      desc: isArabic
        ? 'برنامج قوة منظم مع تحميل تدريجي'
        : lang === 'fr'
        ? 'Programme de force structuré avec surcharge progressive'
        : 'Structured strength program with progressive overload',
      icon: Dumbbell,
      progress: 75,
      color: 'bg-blue-500',
    },
    {
      id: 'nutrition',
      title: isArabic ? '٥ وجبات متوازنة' : lang === 'fr' ? '5 Repas Équilibrés' : '5 Balanced Meals',
      desc: isArabic
        ? 'لإمداد الجسد والعقل بالطاقة المستدامة'
        : lang === 'fr'
        ? 'Pour alimenter le corps et l’esprit avec une énergie durable'
        : 'Fuel your body and mind with sustainable energy',
      icon: Utensils,
      progress: 60,
      color: 'bg-green-500',
    },
    {
      id: 'spirituality',
      title: isArabic ? '٥ صلوات يومية' : lang === 'fr' ? '5 Prières Quotidiennes' : '5 Daily Prayers',
      desc: isArabic
        ? 'للوصول إلى الوضوح الذهني والسلام الداخلي'
        : lang === 'fr'
        ? 'Pour atteindre la clarté mentale et la paix intérieure'
        : 'For mental clarity and inner peace',
      icon: MosqueIcon,
      progress: 90,
      color: 'bg-purple-500',
    },
    {
      id: 'work',
      title: isArabic ? 'انضباط العمل' : lang === 'fr' ? 'Discipline Professionnelle' : 'Work Discipline',
      desc: isArabic
        ? 'إنتاجية ذات هدف وتركيز عالي'
        : lang === 'fr'
        ? 'Productivité ciblée avec une concentration élevée'
        : 'Purposeful productivity with high focus',
      icon: Briefcase,
      progress: 50,
      color: 'bg-yellow-500',
    },
    {
      id: 'family',
      title: isArabic ? 'وقت العائلة' : lang === 'fr' ? 'Temps en Famille' : 'Family Time',
      desc: isArabic
        ? 'مرتكز على القيم والعلاقات الحقيقية'
        : lang === 'fr'
        ? 'Ancré dans les valeurs et les relations authentiques'
        : 'Rooted in values and authentic relationships',
      icon: Users,
      progress: 80,
      color: 'bg-pink-500',
    },
  ];
};

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const isArabic = lang === 'ar';
  const pillars = getPillarData(lang);

  const mission = {
    en: 'Empower individuals to transform their lives by integrating disciplined fitness, mindful nutrition, and spiritual practice into a sustainable lifestyle.',
    fr: 'Autonomiser les individus à transformer leur vie en intégrant la condition physique disciplinée, la nutrition consciente et la pratique spirituelle dans un mode de vie durable.',
    ar: 'تمكين الأفراد من تحويل حياتهم من خلال دمج اللياقة المنضبطة، التغذية الواعية، والممارسة الروحية في نمط حياة مستدام.',
  };

  return (
    <div className="container mx-auto py-8">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">
          {isArabic ? 'لوحة تحكم 5×5' : lang === 'fr' ? 'Tableau de Bord 5×5' : '5x5 Dashboard'}
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {isArabic
            ? 'نظام متكامل لبناء القوة الجسدية، التغذية المتوازنة، والسلام الروحي'
            : lang === 'fr'
            ? 'Un système intégré pour la force physique, la nutrition équilibrée et la paix spirituelle'
            : 'An integrated system for physical strength, balanced nutrition, and spiritual peace'}
        </p>
      </div>

      {/* Pillars Grid */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
        {pillars.map((pillar) => {
          const Icon = pillar.icon;
          return (
            <Card key={pillar.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3 mb-2">
                  <div className={`p-2 rounded-lg ${pillar.color} text-white`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <CardTitle className={isArabic ? 'text-right' : 'text-left'}>
                    {pillar.title}
                  </CardTitle>
                </div>
                <CardDescription className={isArabic ? 'text-right' : 'text-left'}>
                  {pillar.desc}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Progress value={pillar.progress} className="h-2" />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{pillar.progress}%</span>
                    <Badge variant="secondary">
                      {isArabic ? 'نشط' : lang === 'fr' ? 'Actif' : 'Active'}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Mission Statement */}
      <div className="mt-16 p-6 bg-muted/30 rounded-xl max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          {isArabic ? 'مهمتنا' : lang === 'fr' ? 'Notre Mission' : 'Our Mission'}
        </h2>
        <p className={isArabic ? 'text-right text-lg' : 'text-left text-lg'}>
          {mission[lang as keyof typeof mission]}
        </p>
      </div>
    </div>
  );
}