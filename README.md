# Tinto — plantilla web (7 páginas)

Next.js (App Router) · React · TypeScript strict · Tailwind CSS v4 · Plus Jakarta Sans.
Sitio de marketing con SEO t?cnico, navegaci?n responsive y respaldo sin conexi?n. El CRM real corre por separado.

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


## Carpeta correcta y verificaci?n local

Ejecuta npm dentro de `tinto-web`, donde existe `package.json`, no desde la carpeta `WEB PARA TINTO`. En este equipo se usa `C:\Users\LENOVO\tinto-web` para ejecutar; la copia de Google Drive conserva el repositorio principal. No copies `node_modules`, `.next`, `.playwright-browsers` ni reemplaces `.git` entre copias.

```powershell
cd C:\Users\LENOVO\tinto-web
npm run lint
npm run typecheck
npm run build
npm start
```

Sin `NEXT_PUBLIC_SITE_URL`, el build usa localhost y noindex; configura el dominio real antes de publicar. `.env.example` es una plantilla; las variables privadas no se versionan.

Las pruebas de navegador necesitan Chromium ya instalado para Playwright. `tests/func.mjs` y `tests/motion.mjs` aceptan `TEST_BASE_URL` (por defecto `http://localhost:3000`); `tests/offline.mjs` acepta tambi?n la URL como argumento. Si el navegador est? fuera de la ubicaci?n predeterminada, configura `PLAYWRIGHT_BROWSERS_PATH` en el entorno de la terminal. Los formularios de las pruebas funcionales se interceptan. La prueba que requiere un proveedor de correo ausente solo se ejecuta si se activa expl?citamente `TEST_UNCONFIGURED_PROVIDER=1` en un servidor local sin credenciales. No usar esa opci?n contra producci?n.
