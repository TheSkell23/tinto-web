# Tinto — plantilla web (7 páginas)

Next.js (App Router) · React · TypeScript strict · Tailwind CSS v4 · Plus Jakarta Sans.
Solo plantilla (cuerpo HTML): sin SEO ni metadatos.

## Instalar, correr, construir

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
npm run lint && npm run typecheck
```

Rutas: `/`, `/producto`, `/soluciones`, `/nosotros`, `/dudas`, `/contacto`, `/agendar`.

## Variables (`.env.example` → `.env.local`)

`RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`. Sin clave: en desarrollo los formularios responden éxito y escriben en consola; en producción devuelven un error amable. Nunca rompe el build.

## Estructura

- `src/app/` páginas y Route Handlers (`api/contacto`, `api/agendar`).
- `src/components/` Header, HeaderLogo, MobileMenu, Footer, PageHero, ui (Reveal, SectionTitle, CreamCard, Button, GlassChip, ClosingCard), CrmMockup, DudasChat, Faq, BookingFlow, ContactForm…
- `src/content/*.ts` textos, cifras, planes, módulos, reseñas, FAQ, hitos y canales (tipados).
- `src/lib/ai.ts` `answer(q)` del chat: único punto a reemplazar por una IA real.
- `scripts/build-logo-frames.mjs` convierte el GIF en la hoja de sprites del logo.
- `tests/` capturas y pruebas Playwright (`PLAYWRIGHT_BROWSERS_PATH=./.playwright-browsers npx playwright install chromium`).

## Editar contenido

Cambia los archivos de `src/content/`. Los datos de ejemplo están listados en `CONTENIDO_A_CONFIRMAR.md`.

## Logo animado del header (GIF)

El GIF solo se usa en el header: se convierte en una hoja de sprites que se reproduce en un `<canvas>` hacia delante al compactarse la barra y hacia atrás al expandirse.

1. Copia tu GIF a `assets/logo-anim.gif`.
2. Ejecuta `npm run logo` (también corre solo en `predev` y `prebuild`).
3. Se generan `public/anim/logo-sheet.webp` y `.json`. Reinicia/reconstruye.

**Estado actual:** usa `tinto_logo.gif` (copiado del Escritorio a `assets/logo-anim.gif`). Es un GIF con fondo claro opaco: el script lo vuelve transparente automáticamente.
