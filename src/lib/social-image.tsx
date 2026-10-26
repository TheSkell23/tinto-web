import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { homeHero } from '@/content/home';

export const socialImageSize = { width: 1200, height: 630 };
export const socialImageAlt = 'Tinto: atrae, precalifica y organiza tus oportunidades';

/** Imagen global: misma promesa de marca para todas las páginas, sin cifras de ejemplo. */
export async function socialImage() {
  const [font, logo] = await Promise.all([
    readFile(path.join(process.cwd(), 'assets/fonts/PlusJakartaSans-Bold.ttf')),
    readFile(path.join(process.cwd(), 'public/images/tinto-logo.png')),
  ]);
  return new ImageResponse(
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
      background: '#fff4e6', color: '#2a1d12', padding: '68px 80px',
      fontFamily: 'Plus Jakarta Sans', borderBottom: '24px solid #e8782a' }}>
      {/* ImageResponse usa imágenes embebidas, no next/image. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img alt="Tinto" src={`data:image/png;base64,${logo.toString('base64')}`} width="236" height="68" style={{objectFit:'contain'}} />
      <div style={{display:'flex', fontSize: 30, marginTop: 36, color: '#e8782a'}}>CRM para agencias de seguros</div>
      <div style={{display:'flex', fontSize: 62, lineHeight: 1.12, marginTop: 20, letterSpacing: '-2px'}}>{homeHero.tagline}</div>
      <div style={{display:'flex', fontSize: 28, marginTop: 30}}>{homeHero.cta}</div>
    </div>,
    { ...socialImageSize, fonts: [{name:'Plus Jakarta Sans', data:font, weight:700, style:'normal'}] },
  );
}
