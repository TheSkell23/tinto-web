'use client';

import { useEffect } from 'react';

/** Registra el service worker que sirve /offline cuando no hay conexión (solo en producción). */
export function RegisterSW() {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production' || !('serviceWorker' in navigator)) return;
    const register = () => {
      navigator.serviceWorker.register('/sw.js', { scope: '/' }).catch(() => {
        /* sin service worker el sitio funciona igual; solo no habrá página sin conexión */
      });
    };
    if (document.readyState === 'complete') register();
    else window.addEventListener('load', register, { once: true });
    return () => window.removeEventListener('load', register);
  }, []);
  return null;
}
