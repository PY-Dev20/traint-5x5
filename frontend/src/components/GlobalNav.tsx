// frontend/src/components/GlobalNav.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/useAuth'; // ✅ Use the auth hook

export function GlobalNav({ lang }: { lang: string }) {
  const pathname = usePathname();
  const isArabic = lang === 'ar';
  const { user, loading } = useAuth(); // ✅ Get user from API

  const navItems = [
    { href: `/${lang}`, label: isArabic ? 'الرئيسية' : 'Home' },
    { href: `/${lang}/methodology`, label: isArabic ? 'مهمتنا' : 'Mission' },
    { href: `/${lang}/programs/library`, label: isArabic ? 'خطط التمرين' : 'Programs' },
    { href: `/${lang}/exercises`, label: isArabic ? 'التمارين' : 'Exercises' },
    { href: `/${lang}/coach`, label: isArabic ? 'المدرب' : 'Coach' },
  ];

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href={`/${lang}`} className="flex items-center gap-2">
          <img src="/logo.jpeg" alt="TRAINT" className="h-8 w-auto rounded" />
          <span className="font-bold">
            TRAINT<span className="text-sm font-normal ml-1">5×5</span>
          </span>
        </Link>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-5">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm hover:underline ${
                pathname === item.href ? 'font-bold' : ''
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Auth & User Profile */}
        <div className="flex items-center gap-3">
          {loading ? (
            <span className="text-sm">…</span>
          ) : user ? (
            <span className="text-sm hidden sm:inline">
              {isArabic ? 'مرحباً،' : 'Hi,'}{' '}
              {user.first_name || user.email?.split('@')[0]}
            </span>
          ) : (
            <Link href={`/${lang}/login`} className="text-sm font-medium">
              {isArabic ? 'تسجيل الدخول' : 'Login'}
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}