# Historial de los heros

La portada actual usa `src/components/HomeHero.tsx` y `HomeHero.css`: composici?n central, fichas laterales, recorrido de oportunidades y carrusel al pie. Los heros interiores usan `PageHero` / `SectionHero`, con sus visuales propios. Los ajustes m?viles viven en `src/app/mobile.css`.

`HomeHeroPreview` y `HomeHeroClassic` son experimentos conservados como referencia y no est?n montados en ninguna ruta. `homeHeroVariant` y `homeHeroPreview` en contenido son datos del experimento; cambiar esa constante no cambia la portada actual. No se deben desplegar como una segunda portada sin revisi?n.

## Notas hist?ricas de la prueba original

# Prueba de hero del inicio

Versión inspirada en la referencia de Sprrrint: marco redondeado, fondo azul/lila suave, titular centrado, dos CTA, retratos laterales con etiquetas y franja inferior. Se mantienen Plus Jakarta Sans, el logo y los acentos naranja/tierra de Tinto. Se conservan el header y el resto de secciones.

No se copian marcas, reseñas, nombres de personas ni logos de clientes. La franja usa los cuatro módulos reales del contenido. Las fotos ya existían y no representan testimonios ni identidades verificadas. Se conservan los pendientes sobre fotos y contenido de CONTENIDO_A_CONFIRMAR.md.

El hero anterior, incluida su foto y franja, se conserva en HomeHeroClassic.tsx. Para volver a él, cambiar homeHeroVariant a 'classic' en src/content/home.ts. La prueba activa usa HomeHeroPreview.tsx y su CSS Module, sin alterar estilos globales, metadata, JSON-LD, rutas o formularios. La nueva h1 es visible.

En teléfono los retratos pasan a una fila debajo de los botones y los módulos a dos columnas. Con movimiento reducido no hay entradas de retratos. No se añadieron librerías ni imágenes descargadas de terceros.

## Verificaci?n de la prueba

- `npm run typecheck`, `npm run lint` y `npm run build`: correctos. El build conserva el aviso existente de URL no configurada, localhost y noindex.
- Playwright Chromium: 320, 375, 768, 900, 1024 y 1440 px, sin scroll horizontal, sin errores de JavaScript y con una sola h1. Capturas locales fuera del repositorio; revisadas visualmente a 375, 900 y 1440 px.
- A 375 px: men? abre y cierra con Escape; Explorar el CRM navega a Producto; el CTA del hero navega a Agendar. No se enviaron formularios.
- No se verific? en Safari ni en dispositivos f?sicos.
