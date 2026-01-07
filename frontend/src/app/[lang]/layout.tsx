// src/app/[lang]/layout.tsx
import { Inter, Amiri } from 'next/font/google';
import '../globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const amiri = Amiri({
  subsets: ['arabic'],
  variable: '--font-amiri',
  weight: ['400', '700']
});

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const isArabic = lang === 'ar';

  return (
    <html lang={lang} dir={isArabic ? 'rtl' : 'ltr'}>
      <body className={`${inter.variable} ${amiri.variable} bg-gradient-to-br from-slate-50 to-slate-100 antialiased`}>
        <div className="min-h-screen flex flex-col">
          <Header params={params} />
          <main className="flex-grow container mx-auto px-4 py-8">
            {children}
          </main>
          <Footer params={params} />
        </div>
      </body>
    </html>
  );
}