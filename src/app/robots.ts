import type { MetadataRoute } from 'next';
import { absoluteUrl, siteUrlConfigured } from '@/lib/site-url';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: siteUrlConfigured
      ? { userAgent: '*', allow: '/', disallow: '/api/' }
      : { userAgent: '*', disallow: '/' },
    sitemap: absoluteUrl('/sitemap.xml'),
  };
}
