// src/app/[lang]/layout.tsx
import { Inter, Amiri } from 'next/font/google';
import '../globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const amiri = Amiri({
  subsets: ['arabic'],
  variable: '--font-amiri',
  weight: ['400', '700'],
});

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const isArabic = lang === 'ar';

  return (
    <html lang={lang} dir={isArabic ? 'rtl' : 'ltr'}>
      <body className={`${inter.variable} ${amiri.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}