// src/app/[lang]/coach/page.tsx
import { Metadata } from 'next';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

type Language = 'en' | 'ar' | 'fr';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return {
    title:
      lang === 'ar'
        ? 'المدرب محمد | تدريب 5×5 الحقيقي'
        : lang === 'fr'
        ? 'Coach Mohammed | Entraînement Réel 5x5'
        : 'Coach Mohammed | 5x5 Real Training',
    description:
      lang === 'ar'
        ? 'مؤسس ومدرب رئيسي — أب لـ 4، حاصل على ماجستير في التدريب الرياضي واللغة العربية'
        : lang === 'fr'
        ? 'Fondateur et entraîneur principal — Père de 4, diplômé en coaching sportif et en arabe classique'
        : 'Founder & Head Coach — Father of 4, holds Master\'s in Sports Coaching and Classical Arabic',
  };
}

export default async function CoachPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const currentLang = (lang as Language) || 'en';
  const isArabic = currentLang === 'ar';

  // Bio content per language
  const bio = {
    en: "Father of 4 – Dedicated to family values and personal growth. Holds a Master's in Sports Coaching and Classical Arabic. Served as an Imam for 5 years, guiding young Muslims in faith practice.",
    fr: "Père de 4 – Dévoué aux valeurs familiales et à la croissance personnelle. Titulaire d'une maîtrise en coaching sportif et en arabe classique. A été imam pendant 5 ans, guidant les jeunes musulmans dans la pratique de leur foi.",
    ar: "أب لـ 4 أطفال – مكرس للقيم العائلية والنمو الشخصي. حاصل على ماجستير في التدريب الرياضي واللغة العربية الفصحى. عمل إماماً لمدة 5 سنوات، يوجه الشباب المسلم في ممارسة دينهم.",
  };

  const certifications = {
    en: [
      "Bachelor's in Health & Physical Education",
      "Cert III & IV in Personal Training",
      "Master's in Sports Coaching (Griffith University)",
      "Level 2 Strength & Conditioning Coach (Rugby World Federation)",
      "Master's in Classical Arabic (Charles Sturt University)",
    ],
    fr: [
      "Licence en Éducation Physique",
      "Certificats III & IV en Entraînement Personnel",
      "Master en Coaching Sportif (Université Griffith)",
      "Entraîneur Niveau 2 en Préparation Physique (Fédération Mondiale de Rugby)",
      "Master en Arabe Classique (Université Charles Sturt)",
    ],
    ar: [
      "بكالوريوس في التربية البدنية والصحة",
      "شهادات المستوى الثالث والرابع في التدريب الشخصي",
      "ماجستير في التدريب الرياضي (جامعة غريفيث)",
      "مدرب قوة وتحمل من المستوى الثاني (الاتحاد العالمي للرجبي)",
      "ماجستير في اللغة العربية الفصحى (جامعة تشارلز ستورت)",
    ],
  };

  // Safe access to certifications array
  const getCertifications = (): string[] => {
    const certs = certifications[currentLang as keyof typeof certifications];
    return Array.isArray(certs) ? certs : certifications.en;
  };

  const certs = getCertifications();

  return (
    <div className="container mx-auto py-12">
      <Card className="max-w-3xl mx-auto">
        <CardHeader className="flex flex-col md:flex-row items-center gap-6 text-center md:text-right">
          <Avatar className="w-32 h-32">
            <AvatarImage src="/images/coach.jpg" alt="Coach Mohammed" />
            <AvatarFallback>CM</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className={isArabic ? 'text-right' : 'text-left'}>
              {isArabic ? 'المدرب محمد' : currentLang === 'fr' ? 'Coach Mohammed' : 'Coach Mohammed'}
            </CardTitle>
            <Badge variant="secondary" className="mt-2">
              {isArabic
                ? 'مؤسس ومدرب رئيسي'
                : currentLang === 'fr'
                ? 'Fondateur & Entraîneur Principal'
                : 'Founder & Head Coach'}
            </Badge>
            <p className="mt-3 text-muted-foreground">
              {currentLang === 'ar' ? 'وُلد: 24 يوليو 1979' : currentLang === 'fr' ? 'Né : 24 juillet 1979' : 'Born: July 24, 1979'}
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <p className={isArabic ? 'text-right' : 'text-left'}>
            {bio[currentLang as keyof typeof bio] || bio.en}
          </p>

          <h3 className="font-semibold mt-6 mb-3">
            {isArabic ? 'الشهادات والمؤهلات' : currentLang === 'fr' ? 'Certifications' : 'Certifications & Education'}
          </h3>
          
          {certs.length > 0 ? (
            <ul className={isArabic ? 'text-right list-disc pr-5 space-y-1' : 'text-left list-disc pl-5 space-y-1'}>
              {certs.map((cert, i) => (
                <li key={i} className="text-muted-foreground">{cert}</li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground">
              {isArabic ? 'جاري تحميل الشهادات...' : 'Loading certifications...'}
            </p>
          )}

          <div className="mt-8 flex justify-center">
            <Button size="lg">
              {isArabic ? 'اتصل بالمدرّب' : currentLang === 'fr' ? 'Contacter le Coach' : 'Contact Coach'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}