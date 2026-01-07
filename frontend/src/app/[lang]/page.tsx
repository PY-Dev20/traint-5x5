// src/app/[lang]/page.tsx
import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Calendar, Dumbbell, Users } from 'lucide-react';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

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

// Helper: get user from cookies (server-side)
function getUserEmailFromCookies(cookies: string): string | null {
  if (!cookies) return null;
  const match = cookies.match(/access_token=([^;]+)/);
  if (!match) return null;
  try {
    const tokenParts = match[1].split('.');
    if (tokenParts.length < 2) return null;
    const payload = JSON.parse(atob(tokenParts[1]));
    return payload.email || null;
  } catch (e) {
    return null;
  }
}

export default async function HomePage({
  params,
  cookies,
}: {
  params: Promise<{ lang: string }>;
  cookies: Promise<string>;
}) {
  const { lang } = await params;
  const cookieString = await cookies;
  const isArabic = lang === 'ar';
  const userEmail = getUserEmailFromCookies(cookieString);
  const userName = userEmail ? userEmail.split('@')[0] : null;

  // Featured programs (you can later fetch from API)
  const featuredPrograms = [
    { id: 'fat-destroyer', name: isArabic ? 'برنامج تدمير الدهون الكامل' : 'Complete Fat Destroyer Program' },
    { id: 'strength-beginner', name: isArabic ? 'تمرين القوة والكتلة للمبتدئين' : 'Strength & Bulk Beginner Workout' },
    { id: '5x5-beginner', name: isArabic ? 'البرنامج الكامل للمبتدئين' : 'Complete Beginner Program' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero with Image Slider Background */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background Slider (Static for now) */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 z-0">
          <div 
            className="w-full h-full bg-cover bg-center"
            style={{ 
              backgroundImage: "url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1920&q=80')" 
            }}
          ></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10 text-black">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 max-w-3xl mx-auto">
            {isArabic
              ? 'مرحباً بك في تدريب 5×5 الحقيقي'
              : lang === 'fr'
              ? 'Bienvenue sur l’Entraînement Réel 5x5'
              : 'Welcome to 5x5 Real Training'}
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto opacity-90">
            {isArabic
              ? 'نظام متكامل يدمج اللياقة المنضبطة، التغذية الواعية، والممارسة الروحية'
              : lang === 'fr'
              ? 'Un système intégré alliant condition physique disciplinée, nutrition consciente et pratique spirituelle'
              : 'An integrated system for physical strength, balanced nutrition, and spiritual peace'}
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <Button asChild size="lg" className="px-8 py-6 text-lg">
              <Link href={`/${lang}/exercises`}>
                {isArabic ? 'استعراض المكتبة' : 'Browse Exercise Library'}
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="px-8 py-6 text-lg bg-white/10 hover:bg-white/20 text-white border-white">
              <Link href={`/${lang}/plans/builder`}>
                {isArabic ? 'إنشاء خطة مخصصة' : 'Build Custom Plan'}
              </Link>
            </Button>
          </div>

          {userName && (
            <p className="text-lg opacity-80">
              {isArabic ? `مرحباً بك مجدداً، ${userName}!` : lang === 'fr' ? `Bon retour, ${userName}!` : `Welcome back, ${userName}!`}
            </p>
          )}
        </div>
      </section>

      {/* Header (Now Below Hero) */}
      <header className="border-b bg-background">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link href={`/${lang}`} className="flex items-center gap-2">
            <img src="/logo.jpeg" alt="TRAINT Logo" className="h-10 w-auto rounded-md" />
            <span className="text-xl font-bold">
              TRAINT<span className="text-sm font-normal ml-1">5×5</span>
            </span>
          </Link>

          {/* Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {[
              { href: `/${lang}/methodology`, label: isArabic ? 'مهمتنا' : lang === 'fr' ? 'Notre Mission' : 'Our Mission' },
              { href: `/${lang}/programs/library`, label: isArabic ? 'خطط التمرين' : lang === 'fr' ? 'Programmes' : 'Workout Plans' },
              { href: `/${lang}/coach`, label: isArabic ? 'المدرب' : lang === 'fr' ? 'Coach' : 'Coach' },
              { href: `/${lang}/exercises`, label: isArabic ? 'التمارين' : lang === 'fr' ? 'Exercices' : 'Exercises' },
            ].map((item) => (
              <Link 
                key={item.href} 
                href={item.href} 
                className="text-sm font-medium hover:underline"
                dir={isArabic ? "rtl" : "ltr"}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Auth + Language */}
          <div className="flex items-center gap-3">
            {userName ? (
              <span className="text-sm font-medium hidden sm:inline">
                {isArabic ? `مرحباً، ${userName}` : `Hi, ${userName}`}
              </span>
            ) : (
              <Link href={`/${lang}/login`} className="text-sm font-medium">
                {isArabic ? 'تسجيل الدخول' : 'Login'}
              </Link>
            )}

            {/* Language Dropdown Switcher */}
            <LanguageSwitcher currentLang={lang} />
          </div>
        </div>
      </header>

      {/* Featured Programs */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            {isArabic ? 'خطط مميزة' : lang === 'fr' ? 'Programmes en Vedette' : 'Featured Programs'}
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {featuredPrograms.map((program) => (
              <Card key={program.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className={isArabic ? 'text-right' : 'text-left'}>{program.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-48 bg-muted rounded-lg mb-4 flex items-center justify-center">
                    <span className="text-muted-foreground">Preview image</span>
                  </div>
                  <p className={isArabic ? 'text-right text-muted-foreground' : 'text-left text-muted-foreground'}>
                    {isArabic 
                      ? 'خطة تدريبية شاملة لتحقيق أهدافك' 
                      : lang === 'fr' 
                      ? 'Programme d\'entraînement complet pour atteindre vos objectifs' 
                      : 'Comprehensive training plan to achieve your goals'}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href={`/${lang}/programs/library`}>
                      {isArabic ? 'عرض الخطة' : 'View Plan'}
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Coach Highlight */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card className="overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/3 bg-muted p-6 flex items-center justify-center">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-32 h-32 flex items-center justify-center text-muted-foreground">
                  Coach Photo
                </div>
              </div>
              <div className="md:w-2/3 p-6">
                <CardTitle className={isArabic ? 'text-right' : 'text-left'}>
                  {isArabic ? 'المدرب محمد' : lang === 'fr' ? 'Coach Mohammed' : 'Coach Mohammed'}
                </CardTitle>
                <CardContent className={isArabic ? 'text-right' : 'text-left'}>
                  {isArabic
                    ? 'مدرب معتمد في القوة والتحمل بخبرة أكثر من 10 سنوات. أب لـ 4 أطفال، حاصل على ماجستير في التدريب الرياضي واللغة العربية الفصحى.'
                    : lang === 'fr'
                    ? 'Entraîneur certifié en force et conditionnement avec plus de 10 ans d\'expérience. Père de 4 enfants, titulaire d\'une maîtrise en coaching sportif et en arabe classique.'
                    : 'Certified Strength & Conditioning Coach with 10+ years of experience. Father of 4, holds Master\'s in Sports Coaching and Classical Arabic.'}
                </CardContent>
                <CardFooter>
                  <Button asChild>
                    <Link href={`/${lang}/coach`}>
                      {isArabic ? 'تعرف على المدرب' : lang === 'fr' ? 'Rencontrer le coach' : 'Meet the Coach'}
                    </Link>
                  </Button>
                </CardFooter>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            {isArabic ? 'آراء العملاء' : lang === 'fr' ? 'Témoignages' : 'Testimonials'}
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="border">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3 mb-3">
                    {[...Array(5)].map((_, star) => (
                      <span key={star} className="text-yellow-400">★</span>
                    ))}
                  </div>
                  <p className={`"${isArabic ? 'text-right' : 'text-left'} italic"`}>
                    {isArabic 
                      ? 'غيرت حياتي تماماً! فقدت 15 كيلوغراماً في 3 أشهر وشعرت بالقوة لأول مرة منذ سنوات.' 
                      : lang === 'fr' 
                      ? 'Cela a complètement transformé ma vie ! J\'ai perdu 15 kg en 3 mois et je me sens plus fort que jamais.' 
                      : 'Completely transformed my life! I lost 15kg in 3 months and feel stronger than ever.'}
                  </p>
                </CardContent>
                <CardFooter>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                      <User className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <span className={isArabic ? 'text-right' : 'text-left'}>
                      {isArabic ? 'أحمد، 34 عاماً' : lang === 'fr' ? 'Ahmed, 34 ans' : 'Ahmed, 34 years'}
                    </span>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 5 Pillars */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            {isArabic ? 'الركائز الخمس' : lang === 'fr' ? 'Les 5 Piliers' : 'The 5 Pillars'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
            {[
              { icon: Dumbbell, title: isArabic ? '٥ أيام تدريب' : '5 Days Training', desc: isArabic ? 'تدريب القوة المنسقة' : 'Structured strength training' },
              { icon: Calendar, title: isArabic ? '٥ وجبات متوازنة' : '5 Balanced Meals', desc: isArabic ? 'تغذية واعية للمهام اليومية' : 'Mindful nutrition for daily tasks' },
              { icon: Users, title: isArabic ? '٥ صلوات يومية' : '5 Daily Prayers', desc: isArabic ? 'الوضوح الذهني والسلام الداخلي' : 'Mental clarity and inner peace' },
              { icon: User, title: isArabic ? 'انضباط العمل' : 'Work Discipline', desc: isArabic ? 'إنتاجية ذات هدف' : 'Purposeful productivity' },
              { icon: Users, title: isArabic ? 'وقت العائلة' : 'Family Time', desc: isArabic ? 'مرتكز على القيم' : 'Rooted in values' },
            ].map((pillar, i) => (
              <div
                key={i}
                className="bg-card p-4 rounded-lg text-center flex flex-col items-center border hover:shadow-md transition-shadow"
                dir={isArabic ? 'rtl' : 'ltr'}
              >
                <div className="p-3 rounded-full bg-primary/10 mb-3">
                  <pillar.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="font-semibold mb-1">{pillar.title}</div>
                <div className="text-sm text-muted-foreground">{pillar.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {isArabic 
              ? 'هل أنت مستعد لبدء رحلتك؟' 
              : lang === 'fr' 
              ? 'Prêt à commencer votre parcours ?' 
              : 'Ready to start your journey?'}
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            {isArabic 
              ? 'انضم إلى آلاف العملاء الذين حققوا نتائج مذهلة باستخدام برنامج 5×5 الحقيقي.' 
              : lang === 'fr' 
              ? 'Rejoignez des milliers de clients qui ont obtenu des résultats incroyables avec l\'entraînement réel 5×5.' 
              : 'Join thousands of clients who have achieved amazing results with the 5×5 Real Training program.'}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="px-8 py-6 text-lg bg-primary-foreground text-primary hover:bg-primary-foreground/90">
              <Link href={`/${lang}/onboarding/step1-plan`}>
                {isArabic ? 'ابدأ الآن' : 'Get Started Now'}
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="px-8 py-6 text-lg bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
              <Link href={`/${lang}/methodology`}>
                {isArabic ? 'تعرف على المنهجية' : 'Learn the Methodology'}
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 mt-auto">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src="/logo.jpeg" alt="TRAINT Logo" className="h-8 w-auto rounded" />
                <span className="font-bold">TRAINT<span className="text-sm font-normal ml-1">5×5</span></span>
              </div>
              <p className={isArabic ? 'text-right text-muted-foreground' : 'text-left text-muted-foreground'}>
                {isArabic 
                  ? 'نظام متكامل للقوة، التغذية، والروح' 
                  : lang === 'fr' 
                  ? 'Système holistique de force, nutrition et spiritualité' 
                  : 'Holistic system for strength, nutrition, and spirit'}
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-3">{isArabic ? 'الروابط السريعة' : 'Quick Links'}</h3>
              <ul className={isArabic ? 'text-right space-y-2' : 'space-y-2'}>
                <li><Link href={`/${lang}/methodology`} className="text-muted-foreground hover:text-foreground">{isArabic ? 'مهمتنا' : 'Our Mission'}</Link></li>
                <li><Link href={`/${lang}/programs/library`} className="text-muted-foreground hover:text-foreground">{isArabic ? 'البرامج' : 'Programs'}</Link></li>
                <li><Link href={`/${lang}/exercises`} className="text-muted-foreground hover:text-foreground">{isArabic ? 'المكتبة' : 'Library'}</Link></li>
                <li><Link href={`/${lang}/coach`} className="text-muted-foreground hover:text-foreground">{isArabic ? 'المدرب' : 'Coach'}</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">{isArabic ? 'الدعم' : 'Support'}</h3>
              <ul className={isArabic ? 'text-right space-y-2' : 'space-y-2'}>
                <li><Link href={`/${lang}/contact`} className="text-muted-foreground hover:text-foreground">{isArabic ? 'الاتصال بنا' : 'Contact Us'}</Link></li>
                <li><Link href={`/${lang}/faq`} className="text-muted-foreground hover:text-foreground">{isArabic ? 'الأسئلة الشائعة' : 'FAQ'}</Link></li>
                <li><Link href={`/${lang}/privacy`} className="text-muted-foreground hover:text-foreground">{isArabic ? 'الخصوصية' : 'Privacy'}</Link></li>
                <li><Link href={`/${lang}/terms`} className="text-muted-foreground hover:text-foreground">{isArabic ? 'الشروط' : 'Terms'}</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">{isArabic ? 'الاشتراك في النشرة الإخبارية' : 'Newsletter'}</h3>
              <p className={isArabic ? 'text-right text-muted-foreground mb-3' : 'text-left text-muted-foreground mb-3'}>
                {isArabic ? 'اشترك لتلقي التحديثات والنصائح' : 'Subscribe for updates and tips'}
              </p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder={isArabic ? 'بريدك الإلكتروني' : 'Your email'} 
                  className={isArabic ? 'flex-1 py-2 px-3 rounded-l-md text-right' : 'flex-1 py-2 px-3 rounded-l-md'}
                />
                <Button type="submit" className="rounded-l-none px-4">
                  {isArabic ? 'اشتراك' : 'Subscribe'}
                </Button>
              </div>
            </div>
          </div>
          <div className="border-t pt-6 text-center text-sm text-muted-foreground">
            <p>
              {isArabic
                ? '© 2025 تدريب 5×5 الحقيقي. جميع الحقوق محفوظة.'
                : lang === 'fr'
                ? '© 2025 Entraînement Réel 5x5. Tous droits réservés.'
                : '© 2025 5x5 Real Training. All rights reserved.'}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}