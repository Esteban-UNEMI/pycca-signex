'use client';

import { useEffect } from 'react';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export function ServiceWorkerRegister() {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production' || !('serviceWorker' in navigator)) return;

    navigator.serviceWorker.register(`${basePath}/sw.js`, { scope: `${basePath}/` })
      .catch((error: unknown) => {
        if (process.env.NODE_ENV === 'development') {
          console.warn('No se pudo habilitar el modo instalable:', error);
        }
      });
  }, []);

  return null;
}

