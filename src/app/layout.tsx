import type { Metadata, Viewport } from 'next';
import { pageMetadata } from '@/lib/metadata';
import { siteUrl } from '@/lib/site-url';
import fs from 'node:fs';
import path from 'node:path';
import { Plus_Jakarta_Sans } from 'next/font/google';
import type { ReactNode } from 'react';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import type { LogoSheet } from '@/components/HeaderLogo';
import { MotionController } from '@/components/MotionController';
import './globals.css';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-jakarta',
});

/** Lee la hoja de sprites del logo (generada por `npm run logo`). Si no existe, el header usa el logo estático. */
function readLogoSheet(): LogoSheet | null {
  try {
    const dir = path.join(process.cwd(), 'public', 'anim');
    const json = path.join(dir, 'logo-sheet.json');
    if (!fs.existsSync(json) || !fs.existsSync(path.join(dir, 'logo-sheet.webp'))) return null;
    return JSON.parse(fs.readFileSync(json, 'utf8')) as LogoSheet;
  } catch {
    return null;
  }
}

export const metadata: Metadata = {
  ...pageMetadata('/'),
  metadataBase: new URL(siteUrl),
  title: { default: 'CRM para agencias de seguros: vende con contexto | Tinto', template: '%s | Tinto' },
  applicationName: 'Tinto',
};

export const viewport: Viewport = { themeColor: '#fff4e6', colorScheme: 'light' };

export default function RootLayout({ children }: { children: ReactNode }) {
  const logoSheet = readLogoSheet();
  return (
    <html lang="es" className={jakarta.variable}>
      <body>
        <a
          href="#contenido"
          style={{
            position: 'fixed',
            left: 12,
            top: -60,
            zIndex: 100,
            background: '#2a1d12',
            color: '#fff',
            padding: '10px 16px',
            borderRadius: 99,
          }}
          className="skip-link"
        >
          Saltar al contenido
        </a>
        {/* El header fijo va FUERA de cualquier contenedor con container-type */}
        <Header logoSheet={logoSheet} />
        <MotionController />
        <main id="contenido">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
