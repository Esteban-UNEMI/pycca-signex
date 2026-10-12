'use client';
import { useEffect } from 'react';
import { defaultTheme, keys, useLocalEntity } from '@/lib/local-repository';
export function useDemoTheme() {
  const { value: settings } = useLocalEntity(keys.theme, defaultTheme);
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--brand', settings.brand); root.style.setProperty('--accent', settings.accent); root.style.setProperty('--surface', settings.surface);
    root.style.setProperty('--radius', settings.radius === 'sharp' ? '3px' : settings.radius === 'soft' ? '8px' : '18px'); root.dataset.density = settings.density;
  }, [settings]);
}
