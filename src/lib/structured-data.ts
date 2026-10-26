import { faqSection } from '@/content/dudas';
import { productoHero } from '@/content/producto';
import { seoPages, type SeoPath } from '@/content/seo';
import { absoluteUrl } from '@/lib/site-url';

const organizationId = absoluteUrl('/#organization');
const websiteId = absoluteUrl('/#website');
// Redes sociales reales pendientes. No exportar href="#" como identidad de la marca.
const sameAs: string[] = [];
export const globalStructuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': organizationId,
      name: 'Tinto',
      url: absoluteUrl('/'),
      logo: absoluteUrl('/images/tinto-logo.png'),
      sameAs,
    },
    {
      '@type': 'WebSite',
      '@id': websiteId,
      name: 'Tinto',
      url: absoluteUrl('/'),
      inLanguage: 'es-CO',
      publisher: { '@id': organizationId },
    },
  ],
};

export function pageStructuredData(path: Exclude<SeoPath, '/'>): Record<string, unknown> {
  const graph: Record<string, unknown>[] = [
    {
      '@type': 'BreadcrumbList',
      '@id': absoluteUrl(`${path}#breadcrumb`),
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: absoluteUrl('/') },
        { '@type': 'ListItem', position: 2, name: seoPages[path].label, item: absoluteUrl(path) },
      ],
    },
  ];
  if (path === '/producto')
    graph.push({
      '@type': 'SoftwareApplication',
      '@id': absoluteUrl('/producto#software'),
      name: 'Tinto',
      applicationCategory: 'BusinessApplication',
      url: absoluteUrl('/producto'),
      description: productoHero.text,
      publisher: { '@id': organizationId },
      inLanguage: 'es-CO',
    });
  if (path === '/dudas')
    graph.push({
      '@type': 'FAQPage',
      '@id': absoluteUrl('/dudas#faq'),
      url: absoluteUrl('/dudas'),
      inLanguage: 'es-CO',
      isPartOf: { '@id': websiteId },
      // El umbral de facturación está marcado como provisional en CONTENIDO_A_CONFIRMAR.md.
      // Las respuestas publicadas aquí siguen siendo exactamente las que muestra la UI.
      mainEntity: faqSection.items
        .filter(([question]) => question !== '¿Para qué tamaño de agencia es?')
        .map(([name, text]) => ({
          '@type': 'Question',
          name,
          acceptedAnswer: { '@type': 'Answer', text },
        })),
    });
  if (path === '/contacto')
    graph.push({
      '@type': 'ContactPage',
      '@id': absoluteUrl('/contacto#page'),
      url: absoluteUrl('/contacto'),
      name: seoPages[path].title,
      inLanguage: 'es-CO',
      about: { '@id': organizationId },
      isPartOf: { '@id': websiteId },
    });
  return { '@context': 'https://schema.org', '@graph': graph };
}
