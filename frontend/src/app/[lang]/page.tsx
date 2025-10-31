// src/app/[lang]/page.tsx
import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return {
    title:
      lang === 'ar'
        ? 'تدريب 5×5 الحقيقي | TRAINT'
        : lang === 'fr'
        ? 'Entraînement Réel 5x5 | TRAINT'
        : '5x5 Real Training | TRAINT',
    description:
      lang === 'ar'
        ? 'نظام تدريب متكامل للقوة، التغذية، والروح'
        : lang === 'fr'
        ? 'Système holistique de force, nutrition et spiritualité'
        : 'Holistic system for strength, nutrition, and spirit',
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const isArabic = lang === 'ar';

  const navItems = [
    { href: `/${lang}/methodology`, label: isArabic ? 'مهمتنا' : lang === 'fr' ? 'Notre Mission' : 'Our Mission' },
    { href: `/${lang}/programs/library`, label: isArabic ? 'خطط التمرين' : lang === 'fr' ? 'Programmes' : 'Workout Plans' },
    { href: `/${lang}/exercises`, label: isArabic ? 'التمارين' : lang === 'fr' ? 'Exercices' : 'Exercises' },
    { href: `/${lang}/coach`, label: isArabic ? 'المدرب' : lang === 'fr' ? 'Coach' : 'Coach' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href={`/${lang}`} className="flex items-center gap-2">
            <img
              src="/logo.jpeg"
              alt="TRAINT Logo"
              className="h-10 w-auto rounded-md"
            />
            <span className="text-xl font-bold">
              TRAINT<span className="text-sm font-normal ml-1">5×5</span>
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium hover:underline underline-offset-4"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Language Switcher */}
          <div className="flex gap-2">
            {['en', 'fr', 'ar'].map((lng) => (
              <Link
                key={lng}
                href={`/${lng}`}
                className={`px-2 py-1 text-xs rounded ${
                  lng === lang
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}
                aria-label={lng === 'ar' ? 'العربية' : lng === 'fr' ? 'Français' : 'English'}
              >
                {lng.toUpperCase()}
              </Link>
            ))}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-grow">
        <section className="container mx-auto px-4 py-16 md:py-24 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 max-w-3xl mx-auto">
            {isArabic
              ? 'مرحباً بك في تدريب 5×5 الحقيقي'
              : lang === 'fr'
              ? 'Bienvenue sur l’Entraînement Réel 5x5'
              : 'Welcome to 5x5 Real Training'}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            {isArabic
              ? 'نظام متكامل يدمج اللياقة المنضبطة، التغذية الواعية، والممارسة الروحية'
              : lang === 'fr'
              ? 'Un système intégré alliant condition physique disciplinée, nutrition consciente et pratique spirituelle'
              : 'An integrated system combining disciplined fitness, mindful nutrition, and spiritual practice'}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" asChild>
              <Link href={`/${lang}/onboarding/step1-plan`}>
                {isArabic ? 'ابدأ رحلتك' : lang === 'fr' ? 'Commencez votre parcours' : 'Start Your Journey'}
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href={`/${lang}/methodology`}>
                {isArabic ? 'تعرف على منهجنا' : lang === 'fr' ? 'Découvrez notre méthode' : 'Learn Our Methodology'}
              </Link>
            </Button>
          </div>
        </section>

        {/* Mission Highlights */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              {isArabic ? 'الركائز الخمس' : lang === 'fr' ? 'Les 5 Piliers' : 'The 5 Pillars'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 max-w-6xl mx-auto">
              {[
                { en: '5 Days Training', fr: '5 Jours d’Entraînement', ar: '٥ أيام تدريب' },
                { en: '5 Balanced Meals', fr: '5 Repas Équilibrés', ar: '٥ وجبات متوازنة' },
                { en: '5 Daily Prayers', fr: '5 Prières Quotidiennes', ar: '٥ صلوات يومية' },
                { en: 'Work Discipline', fr: 'Discipline Professionnelle', ar: 'انضباط العمل' },
                { en: 'Family Time', fr: 'Temps en Famille', ar: 'وقت العائلة' },
              ].map((pillar, i) => (
                <div
                  key={i}
                  className="bg-card p-6 rounded-lg text-center border"
                  dir={isArabic ? 'rtl' : 'ltr'}
                >
                  <div className="text-2xl font-bold mb-2">
                    {lang === 'ar' ? pillar.ar : lang === 'fr' ? pillar.fr : pillar.en}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>
            {isArabic
              ? '© 2025 تدريب 5×5 الحقيقي. جميع الحقوق محفوظة.'
              : lang === 'fr'
              ? '© 2025 Entraînement Réel 5x5. Tous droits réservés.'
              : '© 2025 5x5 Real Training. All rights reserved.'}
          </p>
        </div>
      </footer>
    </div>
  );
}