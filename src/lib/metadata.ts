import type { Metadata } from 'next';
import { seoPages, type SeoPath } from '@/content/seo';
import { absoluteUrl } from '@/lib/site-url';

export function pageMetadata(path: SeoPath): Metadata {
  const { title, description } = seoPages[path];
  const fullTitle = `${title} | Tinto`;
  const images = [
    {
      url: absoluteUrl('/opengraph-image'),
      width: 1200,
      height: 630,
      alt: 'Tinto: atrae, precalifica y organiza tus oportunidades',
    },
  ];
  return {
    title: path === '/' ? { absolute: fullTitle } : title,
    description,
    alternates: { canonical: absoluteUrl(path) },
    openGraph: {
      type: 'website',
      locale: 'es_CO',
      siteName: 'Tinto',
      url: absoluteUrl(path),
      title: fullTitle,
      description,
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [{ ...images[0], url: absoluteUrl('/twitter-image') }],
    },
    robots: { index: path !== '/agendar', follow: true },
  };
}
