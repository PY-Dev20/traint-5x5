// frontend/src/app/[lang]/login/page.tsx
'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import * as React from 'react';

export default function LoginPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = React.use(params);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true); // Toggle between login/signup
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const isArabic = lang === 'ar';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const url = isLogin
      ? 'http://localhost:8000/api/token/'
      : 'http://localhost:8000/api/register/'; // We'll create this endpoint

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('access_token', data.access || data.token);
        localStorage.setItem('refresh_token', data.refresh || '');
        localStorage.setItem('user_email', email);

        const next = searchParams.get('next') || `/${lang}/dashboard`;
        router.push(next);
      } else {
        const err = await res.json();
        setError(err.detail || err.email?.[0] || err.password?.[0] || 'Invalid credentials');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-12 max-w-md">
      <Card>
        <CardHeader>
          <CardTitle className={isArabic ? 'text-right' : 'text-left'}>
            {isLogin
              ? isArabic ? 'تسجيل الدخول' : 'Login'
              : isArabic ? 'إنشاء حساب' : 'Sign Up'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className={isArabic ? 'text-right' : 'text-left'}>
            {error && (
              <div className="mb-4 p-2 text-sm text-red-600 bg-red-50 rounded">
                {error}
              </div>
            )}
            <div className="space-y-4">
              <div>
                <Label htmlFor="email">
                  {isArabic ? 'البريد الإلكتروني' : 'Email'}
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="password">
                  {isArabic ? 'كلمة المرور' : 'Password'}
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading
                  ? isArabic ? 'جاري التحميل...' : 'Loading...'
                  : isLogin
                  ? isArabic ? 'تسجيل الدخول' : 'Login'
                  : isArabic ? 'إنشاء حساب' : 'Sign Up'}
              </Button>
            </div>
          </form>

          <div className="mt-4 text-center">
            <Button
              variant="link"
              onClick={() => setIsLogin(!isLogin)}
              className="p-0 h-auto text-sm"
            >
              {isLogin
                ? isArabic
                  ? 'ليس لديك حساب؟ سجل الآن'
                  : 'Don’t have an account? Sign up'
                : isArabic
                ? 'لديك حساب؟ سجل الدخول'
                : 'Already have an account? Login'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}