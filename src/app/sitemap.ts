import type { MetadataRoute } from 'next';
import { seoLastModified, seoPages, seoPaths } from '@/content/seo';
import { absoluteUrl } from '@/lib/site-url';

export default function sitemap(): MetadataRoute.Sitemap {
  return seoPaths
    .filter((path) => path !== '/agendar')
    .map((path) => ({
      url: absoluteUrl(path),
      lastModified: seoLastModified,
      priority: seoPages[path].priority,
    }));
}
