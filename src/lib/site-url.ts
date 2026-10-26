/** Única fuente de verdad. En producción se exige configurar el origen real. */
const configured = process.env.NEXT_PUBLIC_SITE_URL;
if (!configured && process.env.NODE_ENV === 'production') {
  throw new Error('Configura NEXT_PUBLIC_SITE_URL antes de compilar para producción.');
}
const parsed = new URL(configured || 'http://localhost:3000');
if (!['http:', 'https:'].includes(parsed.protocol) || parsed.username || parsed.password ||
    parsed.pathname !== '/' || parsed.search || parsed.hash) {
  throw new Error('NEXT_PUBLIC_SITE_URL debe ser un origen http(s), sin ruta, credenciales ni parámetros.');
}
export const siteUrl = parsed.origin;
export const absoluteUrl = (path: string) => new URL(path, `${siteUrl}/`).toString();
