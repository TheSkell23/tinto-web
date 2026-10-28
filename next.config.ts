import type { NextConfig } from 'next';
import path from 'node:path';

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      { source: '/offline.html', headers: [{ key: 'X-Robots-Tag', value: 'noindex, follow' }] },
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
      {
        source: '/sw.js',
        headers: [
          { key: 'Cache-Control', value: 'no-cache, no-store, must-revalidate' },
          { key: 'Content-Type', value: 'application/javascript; charset=utf-8' },
        ],
      },
      { source: '/api/:path*', headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }] },
    ];
  },
  images: { formats: ['image/avif', 'image/webp'] },
  turbopack: { root: path.resolve(__dirname) },
};

export default nextConfig;
