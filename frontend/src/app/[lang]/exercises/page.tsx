// src/app/[lang]/exercises/page.tsx
import { Metadata } from 'next';
import { ExerciseList } from './ExerciseList';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: lang === 'ar' ? 'مكتبة التمارين' : 'Exercise Library',
  };
}

export default async function ExercisesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  return <ExerciseList lang={lang} />;
}