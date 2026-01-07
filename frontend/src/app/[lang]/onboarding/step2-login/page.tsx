// src/app/[lang]/onboarding/step2-login/page.tsx
import { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Link from 'next/link';
import { UserPlus } from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: lang === 'ar' ? 'الإعداد السريع' : lang === 'fr' ? 'Configuration rapide' : 'Quick Setup',
  };
}

export default async function Step2Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const isArabic = lang === 'ar';

  return (
    <>
      <div className="text-center mb-10">
        <div className="flex justify-center mb-4">
          <div className="bg-gradient-to-r from-primary to-purple-600 rounded-full p-3">
            <div className="bg-white rounded-full p-3">
              <UserPlus className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
          {isArabic ? 'أنشئ حسابك' : lang === 'fr' ? 'Créez votre compte' : 'Create Your Account'}
        </h1>
        <p className="text-muted-foreground max-w-lg mx-auto">
          {isArabic
            ? 'أجب عن بضع أسئلة وابدأ رحلتك'
            : lang === 'fr'
            ? 'Répondez à quelques questions et commencez votre parcours'
            : 'Answer a few questions and start your journey'}
        </p>
      </div>

      <Card className="max-w-2xl mx-auto overflow-hidden shadow-xl">
        <div className="bg-gradient-to-r from-primary to-purple-600 h-2" />
        <CardHeader className="pt-6">
          <CardTitle className={isArabic ? 'text-right' : 'text-left'}>
            {isArabic ? 'املأ معلوماتك' : lang === 'fr' ? 'Remplissez vos informations' : 'Fill in your details'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className={isArabic ? 'text-right space-y-6' : 'text-left space-y-6'}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName">
                  {isArabic ? 'الاسم الأول' : lang === 'fr' ? 'Prénom' : 'First Name'}
                </Label>
                <Input id="firstName" placeholder={isArabic ? 'الاسم الأول' : lang === 'fr' ? 'Votre prénom' : 'Your first name'} />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="lastName">
                  {isArabic ? 'اسم العائلة' : lang === 'fr' ? 'Nom de famille' : 'Last Name'}
                </Label>
                <Input id="lastName" placeholder={isArabic ? 'اسم العائلة' : lang === 'fr' ? 'Votre nom de famille' : 'Your last name'} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">
                {isArabic ? 'البريد الإلكتروني' : lang === 'fr' ? 'Adresse email' : 'Email Address'}
              </Label>
              <Input 
                id="email" 
                type="email" 
                placeholder={isArabic ? 'example@email.com' : lang === 'fr' ? 'exemple@email.com' : 'example@email.com'} 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="goal">
                {isArabic ? 'هدفك الرئيسي' : lang === 'fr' ? 'Objectif principal' : 'Primary Goal'}
              </Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder={isArabic ? 'اختر الهدف' : lang === 'fr' ? 'Choisir' : 'Select goal'} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="strength">
                    {isArabic ? 'بناء القوة' : lang === 'fr' ? 'Développer la force' : 'Build Strength'}
                  </SelectItem>
                  <SelectItem value="balance">
                    {isArabic ? 'التوازن الشامل' : lang === 'fr' ? 'Équilibre global' : 'Holistic Balance'}
                  </SelectItem>
                  <SelectItem value="spiritual">
                    {isArabic ? 'النمو الروحي' : lang === 'fr' ? 'Croissance spirituelle' : 'Spiritual Growth'}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">
                {isArabic ? 'الموقع' : lang === 'fr' ? 'Localisation' : 'Location'}
              </Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder={isArabic ? 'اختر المدينة' : lang === 'fr' ? 'Choisir' : 'Select city'} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="melbourne">Melbourne, Australia</SelectItem>
                  <SelectItem value="dubai">Dubai, UAE</SelectItem>
                  <SelectItem value="other">
                    {isArabic ? 'أخرى' : lang === 'fr' ? 'Autre' : 'Other'}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">
                {isArabic ? 'كلمة المرور' : lang === 'fr' ? 'Mot de passe' : 'Password'}
              </Label>
              <Input id="password" type="password" />
            </div>

            <Button asChild className="w-full mt-4 bg-gradient-to-r from-primary to-purple-600 hover:from-purple-600 hover:to-primary">
              <Link href={`/${lang}/onboarding/step3-plan`}>
                {isArabic ? 'تلقى خطتك' : lang === 'fr' ? 'Recevoir mon plan' : 'Get My Plan'}
              </Link>
            </Button>
            
            <p className="text-center text-sm text-muted-foreground">
              {isArabic
                ? 'بالتسجيل، أنت توافق على الشروط والخصوصية'
                : lang === 'fr'
                ? 'En vous inscrivant, vous acceptez les termes et la confidentialité'
                : 'By signing up, you agree to our terms and privacy policy'}
            </p>
          </form>
        </CardContent>
      </Card>
    </>
  );
}