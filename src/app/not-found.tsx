import type { Metadata } from 'next';
import { Button } from '@/components/ui';
import { StatusPage } from '@/components/StatusPage';
import { notFoundPage } from '@/content/estado';

export const metadata: Metadata = {
  title: 'Página no encontrada',
  robots: { index: false, follow: false },
};

/** Se muestra al entrar a una ruta que no existe (responde con estado 404). */
export default function NotFound() {
  return (
    <StatusPage
      ghost={notFoundPage.ghost}
      title={notFoundPage.title}
      accent={notFoundPage.accent}
      text={notFoundPage.text}
    >
      <Button href={notFoundPage.primary.href}>{notFoundPage.primary.label}</Button>
      <Button href={notFoundPage.secondary.href} variant="link">
        {notFoundPage.secondary.label}
      </Button>
    </StatusPage>
  );
}
