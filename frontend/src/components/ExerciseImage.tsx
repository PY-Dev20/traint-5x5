// src/components/ExerciseImage.tsx
'use client';
import { useState } from 'react';

export function ExerciseImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const [imgSrc, setImgSrc] = useState(src);
  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      onError={() => setImgSrc('https://placehold.co/600x400/000/white?text=Exercise')}
    />
  );
}