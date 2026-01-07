import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// src/lib/utils.ts
export const getLocalized = (field: any, lang: string): string => {
  if (typeof field === 'string') return field;
  if (field && typeof field === 'object') {
    return field[lang] || field.en || '';
  }
  return '';
};