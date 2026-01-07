'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/useAuth';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { LogIn, User, Menu, X } from 'lucide-react';

export function Header({ params }: { params: Promise<{ lang: string }> }) {
  const [lang, setLang] = useState('en');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, loading } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Handle scroll effect
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
   
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    params.then((p) => setLang(p.lang));
  }, [params]);

  const isArabic = lang === 'ar';
  const currentPath = pathname?.split('/').slice(0, 3).join('/');

  const navItems = [
    { href: `/${lang}/methodology`, label: isArabic ? 'مهمتنا' : 'Our Mission' },
    { href: `/${lang}/programs/library`, label: isArabic ? 'خطط التمرين' : 'Workout Plans', active: currentPath?.includes('/programs') },
    { href: `/${lang}/exercises`, label: isArabic ? 'التمارين' : 'Exercises', active: currentPath?.includes('/exercises') },
    { href: `/${lang}/coach`, label: isArabic ? 'المدرب' : 'Coach' },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-md shadow-md'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={`/${lang}`} className="flex items-center gap-2 group">
            <div className="bg-gradient-to-r from-primary to-purple-600 rounded-xl p-1.5 transition-transform group-hover:scale-105">
              <div className="bg-white rounded-lg w-8 h-8 flex items-center justify-center">
                <span className="font-bold text-primary">5×5</span>
              </div>
            </div>
            <span className="font-bold text-lg md:text-xl">
              TRAINT<span className="text-sm font-normal ml-1">5×5</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <NavigationMenu>
              <NavigationMenuList>
                {navItems.map((item) => (
                  <NavigationMenuItem key={item.href}>
                    {/* CORRECTED: Using NavigationMenuLink with asChild */}
                    <NavigationMenuLink asChild>
                      <Link
                        href={item.href}
                        className={`${navigationMenuTriggerStyle()} transition-colors ${
                          item.active
                            ? 'text-primary font-medium bg-primary/10'
                            : 'hover:text-primary hover:bg-slate-100'
                        }`}
                      >
                        {item.label}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>

            <div className="flex items-center gap-3">
              {!loading && (
                <>
                  {user ? (
                    <div className="flex items-center gap-3">
                      <div className="hidden sm:flex items-center gap-2 text-muted-foreground">
                        <User className="h-4 w-4" />
                        <span className="text-sm font-medium">{user.first_name}</span>
                      </div>
                      <Button size="sm" className="bg-gradient-to-r from-primary to-purple-600 hover:from-purple-600 hover:to-primary">
                        {isArabic ? 'لوحتي' : 'Dashboard'}
                        <span className={isArabic ? 'mr-1' : 'ml-1'}>→</span>
                      </Button>
                    </div>
                  ) : (
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/${lang}/login`}>
                        <LogIn className="h-4 w-4 mr-1" />
                        {isArabic ? 'تسجيل الدخول' : 'Login'}
                      </Link>
                    </Button>
                  )}
                 
                  {/* Language Switcher */}
                  <div className="relative">
                    <NavigationMenu>
                      <NavigationMenuList>
                        <NavigationMenuItem>
                          <NavigationMenuTrigger className="bg-white/80 backdrop-blur-sm px-3 py-1 hover:bg-white">
                            {lang.toUpperCase()}
                          </NavigationMenuTrigger>
                          <NavigationMenuContent>
                            <div className="grid w-[100px] p-2">
                              {['en', 'fr', 'ar'].map((lng) => (
                                <NavigationMenuLink asChild key={lng}>
                                  <Link 
                                    href={pathname?.replace(`/${lang}`, `/${lng}`) || `/${lng}`}
                                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                  >
                                    {lng.toUpperCase()}
                                  </Link>
                                </NavigationMenuLink>
                              ))}
                            </div>
                          </NavigationMenuContent>
                        </NavigationMenuItem>
                      </NavigationMenuList>
                    </NavigationMenu>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg py-4">
          <div className="container mx-auto px-4 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block py-2 px-4 rounded-lg ${
                  item.active
                    ? 'bg-primary/10 text-primary font-medium'
                    : 'text-muted-foreground hover:bg-slate-100'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
           
            <div className="pt-4 border-t border-slate-200 space-y-3">
              {!loading && (
                <>
                  {user ? (
                    <div>
                      <div className="flex items-center gap-2 text-muted-foreground mb-3 px-4">
                        <User className="h-4 w-4" />
                        <span className="text-sm font-medium">{user.first_name}</span>
                      </div>
                      <Button className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-purple-600 hover:to-primary">
                        {isArabic ? 'لوحتي' : 'Dashboard'}
                      </Button>
                    </div>
                  ) : (
                    <Button variant="outline" className="w-full" asChild>
                      <Link href={`/${lang}/login`} onClick={() => setIsMenuOpen(false)}>
                        <LogIn className="h-4 w-4 mr-2" />
                        {isArabic ? 'تسجيل الدخول' : 'Login'}
                      </Link>
                    </Button>
                  )}
                </>
              )}
             
              <div className="flex justify-center">
                <div className="bg-slate-100 rounded-lg p-1">
                  {['en', 'fr', 'ar'].map((lng) => (
                    <Button
                      key={lng}
                      variant={lng === lang ? "default" : "ghost"}
                      size="sm"
                      onClick={() => {
                        const newPath = pathname?.replace(`/${lang}`, `/${lng}`) || `/${lng}`;
                        window.location.href = newPath;
                        setIsMenuOpen(false);
                      }}
                      className={lng === lang ? "bg-primary text-white hover:bg-primary/90" : ""}
                    >
                      {lng.toUpperCase()}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}