// src/app/[lang]/onboarding/step3-plan/page.tsx
import { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Calendar, Dumbbell, Users, Heart, Trophy, Sparkle } from 'lucide-react';

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
    <>
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
          {isArabic ? 'تهانينا! خطتك جاهزة' : lang === 'fr' ? 'Félicitations ! Votre plan est prêt' : 'Congratulations! Your Plan Is Ready'}
        </h1>
        <p className="text-muted-foreground">
          {isArabic
            ? 'تم تصميمها خصيصاً لك من قبل المدرب محمد'
            : lang === 'fr'
            ? 'Conçu spécialement pour vous par Coach Mohammed'
            : 'Custom-built for you by Coach Mohammed'}
        </p>
      </div>

      <Card className="max-w-3xl mx-auto overflow-hidden shadow-xl">
        <div className="bg-gradient-to-br from-primary to-purple-600 h-2" />
        <CardHeader className="text-center">
          <div className="flex justify-center -mt-8 mb-2">
            <div className="bg-white border-4 border-primary rounded-full p-4">
              <Trophy className="h-12 w-12 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl mt-2">
            {isArabic ? 'برنامج 5×5 الكامل' : lang === 'fr' ? 'Programme 5×5 Complet' : 'Full 5×5 Program'}
          </CardTitle>
          <p className="text-muted-foreground">
            {isArabic
              ? 'تم إنشاء برنامجك المخصص بنجاح!'
              : lang === 'fr'
              ? 'Votre programme personnalisé a été créé avec succès !'
              : 'Your custom program has been successfully created!'}
          </p>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-8">
            {/* Program Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-muted/30 rounded-lg">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Dumbbell className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-1">
                  {isArabic ? '٥ أيام تدريب' : lang === 'fr' ? '5 Jours d\'entraînement' : '5 Days Training'}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {isArabic ? 'برنامج قوة منظم' : lang === 'fr' ? 'Programme de force structuré' : 'Structured strength program'}
                </p>
              </div>
              
              <div className="text-center p-4 bg-muted/30 rounded-lg">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-1">
                  {isArabic ? '٥ وجبات متوازنة' : lang === 'fr' ? '5 Repas équilibrés' : '5 Balanced Meals'}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {isArabic ? 'تغذية واعية' : lang === 'fr' ? 'Alimentation consciente' : 'Mindful nutrition'}
                </p>
              </div>
              
              <div className="text-center p-4 bg-muted/30 rounded-lg">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-1">
                  {isArabic ? 'دعم روحي' : lang === 'fr' ? 'Soutien spirituel' : 'Spiritual Support'}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {isArabic ? 'سلام داخلي' : lang === 'fr' ? 'Paix intérieure' : 'Inner peace'}
                </p>
              </div>
            </div>
            
            {/* Program Details */}
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800/40 dark:to-slate-900/40 rounded-lg p-6">
              <div className="flex items-start gap-3 mb-4">
                <Sparkle className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium mb-1">
                    {isArabic ? 'محتويات برنامجك' : lang === 'fr' ? 'Contenu de votre programme' : 'Your Program Includes'}
                  </h4>
                  <ul className={`text-sm space-y-1 ${isArabic ? 'text-right' : 'text-left'}`}>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500">✓</span>
                      <span>
                        {isArabic
                          ? 'جداول التمارين التفصيلية'
                          : lang === 'fr'
                          ? 'Calendriers d\'exercices détaillés'
                          : 'Detailed workout schedules'}
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500">✓</span>
                      <span>
                        {isArabic
                          ? 'خطة التغذية الأسبوعية'
                          : lang === 'fr'
                          ? 'Plan nutritionnel hebdomadaire'
                          : 'Weekly nutrition plan'}
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500">✓</span>
                      <span>
                        {isArabic
                          ? 'فيديوهات تعليمية للتمارين'
                          : lang === 'fr'
                          ? 'Vidéos explicatives des exercices'
                          : 'Exercise demonstration videos'}
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500">✓</span>
                      <span>
                        {isArabic
                          ? 'دليل الصلاة والممارسات الروحية'
                          : lang === 'fr'
                          ? 'Guide des prières et pratiques spirituelles'
                          : 'Prayer guide and spiritual practices'}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Email Notification */}
            <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="bg-blue-100 dark:bg-blue-800/50 p-2 rounded-lg">
                  <Heart className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">
                    {isArabic
                      ? 'ستتلقى بريداً إلكترونياً خلال 24 ساعة'
                      : lang === 'fr'
                      ? 'Vous recevrez un email sous 24h'
                      : 'You\'ll receive an email within 24 hours'}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {isArabic
                      ? 'سيحتوي على خطة التدريب الكاملة، جدول الصلوات، ونصائح التغذية المخصصة'
                      : lang === 'fr'
                      ? 'Contenant votre plan d\'entraînement complet, l\'horaire des prières et des conseils nutritionnels personnalisés'
                      : 'Containing your complete training plan, prayer schedule, and personalized nutrition tips'}
                  </p>
                </div>
              </div>
            </div>

            <Button asChild size="lg" className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-purple-600 hover:to-primary">
              <Link href={`/${lang}/dashboard`}>
                {isArabic ? 'الذهاب إلى لوحة التحكم' : lang === 'fr' ? 'Aller au tableau de bord' : 'Go to Dashboard'}
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
}