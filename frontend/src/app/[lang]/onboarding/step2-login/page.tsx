// src/app/[lang]/onboarding/step2-login/page.tsx
import { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Link from 'next/link';

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
    <div className="container mx-auto py-12 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle className={isArabic ? 'text-right' : 'text-left'}>
            {isArabic ? 'أنشئ حسابك' : lang === 'fr' ? 'Créez votre compte' : 'Create Your Account'}
          </CardTitle>
          <p className="text-muted-foreground">
            {isArabic
              ? 'أجب عن بضع أسئلة وابدأ رحلتك'
              : lang === 'fr'
              ? 'Répondez à quelques questions et commencez votre parcours'
              : 'Answer a few questions and start your journey'}
          </p>
        </CardHeader>
        <CardContent>
          <form className={isArabic ? 'text-right space-y-4' : 'text-left space-y-4'}>
            <div>
              <Label htmlFor="name">
                {isArabic ? 'الاسم الكامل' : lang === 'fr' ? 'Nom complet' : 'Full Name'}
              </Label>
              <Input id="name" placeholder={isArabic ? 'أدخل اسمك' : lang === 'fr' ? 'Entrez votre nom' : 'Enter your name'} />
            </div>

            <div>
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

            <div>
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

            <Button asChild className="w-full mt-6">
              <Link href={`/${lang}/onboarding/step3-plan`}>
                {isArabic ? 'تلقى خطتك' : lang === 'fr' ? 'Recevoir mon plan' : 'Get My Plan'}
              </Link>
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}