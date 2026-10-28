# Páginas 404 y sin conexión

- Cualquier ruta inexistente usa `src/app/not-found.tsx`: HTTP 404, robots noindex automático de Next, enlaces reales al inicio y al producto.
- La primera visita online en producción registra `public/sw.js` y descarga solo la vista offline, su CSS, script, fuente, logo e icono. No descarga todo el sitio ni guarda formularios, datos personales, API o respuestas POST.
- Al perder la conexión con una página abierta aparece un aviso accesible, conservando el estado del formulario en memoria. Al volver la conexión se retira el aviso y se restaura el foco.
- Recargar o abrir una URL del sitio sin red muestra el HTML offline previamente guardado; se conserva la URL pedida. El botón vuelve a intentarla y el evento online permite recuperarla.
- Prueba visual directa: `/offline.html`. Prueba 404: `/esta-pagina-no-existe`.
- Service workers requieren HTTPS o localhost. En desarrollo no se registra un worker nuevo. Una primera visita sin internet, almacenamiento bloqueado o una caché borrada no puede descargar el respaldo. No es una PWA completa ni permite enviar formularios sin internet.
- Cambiar la versión `tinto-offline-v1` en sw.js al modificar sus recursos para renovar el respaldo. Solo se eliminan versiones de esta caché; se respetan otras cachés del origen.
- Se usan APIs nativas, sin dependencias nuevas. Diseño adaptado a móvil y escritorio, con la paleta y fuente existentes.

Referencias de implementación: [guía de Next](https://nextjs.org/docs/app/guides/progressive-web-apps), [ciclo de los service workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers).
