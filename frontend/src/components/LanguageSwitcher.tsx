// src/components/LanguageSwitcher.tsx
'use client';

import { useState, useEffect } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface LanguageSwitcherProps {
  currentLang: string;
}

export function LanguageSwitcher({ currentLang }: LanguageSwitcherProps) {
  const [lang, setLang] = useState(currentLang);

  useEffect(() => {
    setLang(currentLang);
  }, [currentLang]);

  const handleLanguageChange = (value: string) => {
    setLang(value);
    window.location.href = `/${value}`;
  };

  return (
    <Select value={lang} onValueChange={handleLanguageChange}>
      <SelectTrigger className="w-[80px] text-xs bg-background border">
        <SelectValue placeholder={lang.toUpperCase()} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en">EN</SelectItem>
        <SelectItem value="fr">FR</SelectItem>
        <SelectItem value="ar">AR</SelectItem>
      </SelectContent>
    </Select>
  );
}