# Revisi?n y organizaci?n del proyecto

Repositorio principal: la carpeta `tinto-web` en Google Drive. Copia de ejecuci?n: `C:/Users/LENOVO/tinto-web`. Los archivos de aplicaci?n, configuraci?n, assets y pruebas se compararon entre ambas antes de validar; no se detectaron diferencias. Sus historiales de Git son distintos: los commits se crean solo en el repositorio principal y no se reemplaza ni resetea `.git` de la copia local.

## Cambios preservados y organizados

- Marca: favicon t?, generadores y sprite del logo; men? m?vil con tarjetas, foco atrapado y cierre accesible.
- Recuperaci?n: 404, p?gina offline, aviso de desconexi?n y service worker limitado a seis recursos de respaldo. No cachea API ni formularios.
- Movimiento: revelado progresivo, contadores, progreso y preferencias de movimiento reducido.
- Marketing: portada diferenciada, visuales de Producto/Soluciones/Nosotros, ajustes m?viles, secciones centradas y eliminaci?n de la imagen entre planes y comparaci?n. Sin alterar precios o contenido en esta revisi?n.
- Agenda: se conserva solo videollamada y la validaci?n del canal deriva de la misma lista de contenido.
- Pruebas y documentaci?n: selectores vigentes, base configurable para servidor local, capturas offline en directorio temporal y documentaci?n del hero realmente activo. El experimento anterior se conserva sin montarlo en las rutas.

## Verificaci?n de esta revisi?n

- `npm run lint`, `npm run typecheck` y `npm run build`: correctos. Se conserva el aviso existente por NEXT_PUBLIC_SITE_URL ausente, con localhost y noindex.
- `tests/func.mjs`: 16 comprobaciones correctas, incluidos navegaci?n, filtro, chat/FAQ, validaci?n de API, confirmaci?n simulada, contacto simulado y men? m?vil. Los formularios v?lidos se interceptan; la solicitud de proveedor ausente queda desactivada salvo opt-in expl?cito en servidor sin credenciales.
- `tests/motion.mjs`: siete rutas a 375 y 1440px; contenido revelado, sin desbordes ni excepciones JavaScript, controles simulados y movimiento reducido. La pausa del mesh fuera de pantalla se comprueba en m?vil.
- `tests/offline.mjs`: 22 comprobaciones correctas; recuperaci?n de red, estado del formulario, 404, respaldo offline y vistas a 320/375/1440px. Se corrigi? una carrera del test al recargar antes de volver online.
- `tests/seo.mjs`: head SSR de las siete rutas, canonicals sin par?metros, JSON-LD, jerarqu?a, alt, cabeceras, sitemap, robots, manifest e im?genes sociales 1200x630. El test permite separar el servidor de pruebas del origen compilado y verificar el fallback noindex sin falsear la configuraci?n de producci?n.
- Revisi?n de patrones habituales de secretos en los archivos candidatos: sin hallazgos. Se ignoran archivos .env privados y se conserva .env.example. No se incorporan node_modules, .next, navegadores o el script temporal hero-check.cjs.

## Pendientes conocidos

Dominio real y NEXT_PUBLIC_SITE_URL; datos comerciales/de contacto, precios, rese?as y redes a confirmar seg?n CONTENIDO_A_CONFIRMAR.md; Safari y dispositivos f?sicos. Las evidencias m?viles hist?ricas son referencias de sus respectivas sesiones, no certifican dispositivos reales ni sustituyen pruebas nuevas tras cambios futuros.

No se hizo push ni despliegue. Los servidores levantados para la revisi?n se detienen al terminar.
