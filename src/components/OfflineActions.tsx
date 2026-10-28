'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { offlinePage } from '@/content/estado';

/** Botones de la página sin conexión: reintentar y, apenas vuelve internet, recargar sola. */
export function OfflineActions() {
  useEffect(() => {
    const back = () => window.location.reload();
    window.addEventListener('online', back);
    return () => window.removeEventListener('online', back);
  }, []);

  return (
    <>
      <button type="button" className="btn btn-primary" onClick={() => window.location.reload()}>
        {offlinePage.retry}
      </button>
      <Link href="/" className="link-ink">
        {offlinePage.home}
      </Link>
    </>
  );
}
