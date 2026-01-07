// frontend/src/lib/useAuth.ts
'use client';

import { useEffect, useState } from 'react';

export type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  preferred_language: string;
  role: string;
};

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch('http://localhost:8000/api/profile/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const userData = await res.json();
          setUser(userData);
        } else {
          localStorage.removeItem('access_token');
        }
      } catch (err) {
        console.error('Failed to fetch profile', err);
        localStorage.removeItem('access_token');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return { user, loading };
}