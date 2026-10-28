import type { Metadata } from 'next';
import { OfflineActions } from '@/components/OfflineActions';
import { StatusPage } from '@/components/StatusPage';
import { offlinePage } from '@/content/estado';

export const metadata: Metadata = {
  title: 'Sin conexión',
  robots: { index: false, follow: false },
};

/** Página que el service worker (public/sw.js) muestra cuando no hay conexión. */
export default function OfflinePage() {
  return (
    <StatusPage
      ghost={offlinePage.ghost}
      title={offlinePage.title}
      accent={offlinePage.accent}
      text={offlinePage.text}
    >
      <OfflineActions />
    </StatusPage>
  );
}
