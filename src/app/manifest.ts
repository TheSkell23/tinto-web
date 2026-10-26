import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@/lib/site-url';
export default function manifest(): MetadataRoute.Manifest {
  return {
    id: absoluteUrl('/'), name: 'Tinto', short_name: 'Tinto', lang: 'es-CO',
    description: 'CRM para agencias de seguros.', start_url: absoluteUrl('/'), scope: absoluteUrl('/'),
    display: 'browser', background_color: '#fff4e6', theme_color: '#fff4e6',
    icons: [192, 512].map((size) => ({ src: absoluteUrl(`/icons/icon-${size}.png`),
      sizes: `${size}x${size}`, type: 'image/png', purpose: 'any' })),
  };
}
