/**
 * Única fuente de verdad del origen público (NEXT_PUBLIC_SITE_URL).
 * Sin la variable NO se rompe el build: se usa localhost, se avisa por consola y el sitio
 * se publica como noindex (ver `siteUrlConfigured`) para no indexar canonicals falsos.
 */
const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
export const siteUrlConfigured = Boolean(configured);

if (!configured && process.env.NODE_ENV === 'production') {
  console.warn(
    '[tinto] NEXT_PUBLIC_SITE_URL no está definida: se usa http://localhost:3000 y el sitio queda en noindex. Configúrala antes de publicar.',
  );
}

const parsed = new URL(configured || 'http://localhost:3000');
if (
  !['http:', 'https:'].includes(parsed.protocol) ||
  parsed.username ||
  parsed.password ||
  parsed.pathname !== '/' ||
  parsed.search ||
  parsed.hash
) {
  throw new Error(
    'NEXT_PUBLIC_SITE_URL debe ser un origen http(s), sin ruta, credenciales ni parámetros.',
  );
}
export const siteUrl = parsed.origin;
export const absoluteUrl = (path: string) => new URL(path, `${siteUrl}/`).toString();
