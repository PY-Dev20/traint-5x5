// src/app/[lang]/plans/library/page.tsx
import { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return { title: lang === 'ar' ? 'خطط التمرين الجاهزة' : 'Pre-Built Plans' };
}

const getPlans = (lang: string) => {
  const isArabic = lang === 'ar';
  return {
    beginner: [
      { id: 'full-body', name: isArabic ? 'تمرين الجسم بالكامل | مبتدئ | 4 أسابيع' : 'Full Body Workout | Beginner | 4 weeks' },
      { id: 'fat-loss', name: isArabic ? 'تمرين إنقاص الوزن | مبتدئ | 4 أسابيع' : 'Lose Weight Workout | Beginner | 4 weeks' },
    ],
    fatLoss: [
      { id: 'fat-destroyer', name: isArabic ? 'برنامج تدمير الدهون الكامل | مبتدئ | 12 أسبوع' : 'Complete Fat Destroyer Program | Beginner | 12 weeks' },
    ],
    muscleBuilding: [
      { id: 'beginner-program', name: isArabic ? 'البرنامج الكامل للمبتدئين | مبتدئ | 6 أسابيع' : 'Complete Beginner Program | Beginner | 6 weeks' },
    ],
    // Add more categories as needed
  };
};

export default async function PlansLibraryPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const isArabic = lang === 'ar';
  const plans = getPlans(lang);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        {isArabic ? 'خطط التمرين الجاهزة' : 'Pre-Built Workout Plans'}
      </h1>

      <Tabs defaultValue="beginner" className="max-w-4xl mx-auto">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="beginner">
            {isArabic ? 'مبتدئ' : 'Beginner'}
          </TabsTrigger>
          <TabsTrigger value="fatLoss">
            {isArabic ? 'حرق الدهون' : 'Fat Loss'}
          </TabsTrigger>
          <TabsTrigger value="muscleBuilding">
            {isArabic ? 'بناء العضلات' : 'Muscle Building'}
          </TabsTrigger>
          <TabsTrigger value="strength">
            {isArabic ? 'القوة' : 'Strength'}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="beginner" className="mt-6">
          <div className="grid gap-4 md:grid-cols-2">
            {plans.beginner.map(plan => (
              <Card key={plan.id}>
                <CardHeader>
                  <CardTitle className={isArabic ? 'text-right' : 'text-left'}>{plan.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <button className="text-primary hover:underline">
                    {isArabic ? 'ابدأ الآن' : 'Start Now'}
                  </button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="fatLoss" className="mt-6">
          <div className="grid gap-4">
            {plans.fatLoss.map(plan => (
              <Card key={plan.id}>
                <CardHeader>
                  <CardTitle className={isArabic ? 'text-right' : 'text-left'}>{plan.name}</CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="muscleBuilding" className="mt-6">
          <div className="grid gap-4">
            {plans.muscleBuilding.map(plan => (
              <Card key={plan.id}>
                <CardHeader>
                  <CardTitle className={isArabic ? 'text-right' : 'text-left'}>{plan.name}</CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}