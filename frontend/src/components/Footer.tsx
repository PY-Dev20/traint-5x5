// src/components/Footer.tsx
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Instagram, Facebook, Twitter, Youtube, Mail, MapPin, Phone } from 'lucide-react';
import { useState, useEffect } from 'react';

export function Footer({ params }: { params: Promise<{ lang: string }> }) {
  const [lang, setLang] = useState('en');
  
  useEffect(() => {
    params.then((p) => setLang(p.lang));
  }, [params]);

  const isArabic = lang === 'ar';

  const footerSections = [
    {
      title: isArabic ? 'روابط سريعة' : 'Quick Links',
      links: [
        { href: `/${lang}/methodology`, label: isArabic ? 'مهمتنا' : 'Our Mission' },
        { href: `/${lang}/programs/library`, label: isArabic ? 'خطط التمرين' : 'Workout Plans' },
        { href: `/${lang}/exercises`, label: isArabic ? 'التمارين' : 'Exercises' },
        { href: `/${lang}/coach`, label: isArabic ? 'المدرب' : 'Coach' },
      ],
    },
    {
      title: isArabic ? 'الدعم' : 'Support',
      links: [
        { href: `/${lang}/contact`, label: isArabic ? 'اتصل بنا' : 'Contact Us' },
        { href: `/${lang}/faq`, label: isArabic ? 'الأسئلة الشائعة' : 'FAQ' },
        { href: `/${lang}/privacy`, label: isArabic ? 'الخصوصية' : 'Privacy Policy' },
        { href: `/${lang}/terms`, label: isArabic ? 'الشروط' : 'Terms of Service' },
      ],
    },
    {
      title: isArabic ? 'عن الشركة' : 'Company',
      links: [
        { href: `/${lang}/about`, label: isArabic ? 'من نحن' : 'About Us' },
        { href: `/${lang}/blog`, label: isArabic ? 'المدونة' : 'Blog' },
        { href: `/${lang}/careers`, label: isArabic ? 'الوظائف' : 'Careers' },
        { href: `/${lang}/partners`, label: isArabic ? 'الشركاء' : 'Partners' },
      ],
    },
  ];

  return (
    <footer className="bg-gradient-to-t from-slate-900 to-slate-800 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-r from-primary to-purple-600 rounded-xl p-1.5">
                <div className="bg-white rounded-lg w-10 h-10 flex items-center justify-center">
                  <span className="font-bold text-primary text-lg">5×5</span>
                </div>
              </div>
              <span className="font-bold text-xl">
                TRAINT<span className="text-sm font-normal ml-1">5×5</span>
              </span>
            </div>
            <p className={`max-w-xs ${isArabic ? 'text-right' : 'text-left'}`}>
              {isArabic
                ? 'نظام متكامل للقوة، التغذية، والروح'
                : 'An integrated system for strength, nutrition, and spiritual peace'}
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-primary" />
                <span className="text-slate-300">Dubai, UAE</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary" />
                <span className="text-slate-300">+971 4 XXX XXXX</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                <span className="text-slate-300">hello@traint5x5.com</span>
              </div>
            </div>
            <div className="flex space-x-4 space-x-reverse">
              <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white hover:bg-white/10">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white hover:bg-white/10">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white hover:bg-white/10">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white hover:bg-white/10">
                <Youtube className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          {/* Footer Sections */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className={`font-semibold mb-4 text-lg ${isArabic ? 'text-right' : 'text-left'}`}>
                {section.title}
              </h3>
              <ul className={`space-y-3 ${isArabic ? 'text-right' : 'text-left'}`}>
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link 
                      href={link.href} 
                      className="text-slate-300 hover:text-white transition-colors hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Newsletter Section */}
        <div className="mt-12 pt-8 border-t border-slate-700">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-lg font-semibold mb-3">
              {isArabic ? 'اشترك في النشرة الإخبارية' : 'Subscribe to our newsletter'}
            </h3>
            <p className="text-slate-300 mb-4 max-w-lg mx-auto">
              {isArabic
                ? 'احصل على نصائح التدريب والتغذية والتحفيز مباشرة إلى صندوق الوارد الخاص بك'
                : 'Get training tips, nutrition advice, and motivation straight to your inbox'}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder={isArabic ? 'بريدك الإلكتروني' : 'Your email'}
                className="flex-1 px-4 py-3 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <Button className="bg-gradient-to-r from-primary to-purple-600 hover:from-purple-600 hover:to-primary px-6">
                {isArabic ? 'اشتراك' : 'Subscribe'}
              </Button>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="mt-12 pt-6 border-t border-slate-700 text-center text-slate-400 text-sm">
          <p>
            © {new Date().getFullYear()} TRAINT 5×5. {isArabic ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}
          </p>
        </div>
      </div>
    </footer>
  );
}