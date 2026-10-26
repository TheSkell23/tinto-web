# Experiencia móvil de Tinto

Revisión del 26 de octubre de 2026. Alcance: teléfonos y tabletas de 320–899 px. Se preservan el contenido, los colores, Plus Jakarta Sans, fotos, orden de secciones, SEO, JSON-LD, endpoints y la lógica de animación/revelado. El sitio es marketing; las maquetas no son el CRM operativo.

## Estado de entrada y alcance de los commits

Al iniciar había cambios ajenos sin commit en 19 archivos y una imagen nueva, incluidos header, menú, logo, revelado, opciones de reserva y sus datos. Se guardó una referencia del árbol de trabajo y se probaron esos cambios como parte del estado de entrada. No se restauraron versiones antiguas ni se incluyeron esos cambios ajenos en los commits de esta tarea. Las capturas “antes” corresponden a ese estado, no únicamente al último commit. Las modificaciones propias se prepararon mediante una fusión de tres vías contra esa referencia para conservar el trabajo pendiente.

Durante la entrega se detectaron ajustes externos de espaciado en ocho archivos. Se fusionaron sin conflictos y se repitieron las 56 comprobaciones finales y las pruebas funcionales. Para escritorio se construyó una referencia limpia con esos ajustes externos, sin nuestros cambios móviles, conservando el diseño más reciente. Archivos afectados: reports/mobile/concurrent.json.

Trabajo y npm install en C:/Users/LENOVO/tinto-mobile, fuera de Drive. Sin dependencias nuevas, despliegue, claves ni push. No se copiaron node_modules, .next ni .playwright-browsers a Drive. El Chromium ya instalado se reutilizó desde C:/Users/LENOVO/tinto-build/tinto-web/.playwright-browsers.

## Auditoría inicial, antes de editar

Capturas completas de las siete rutas a 320, 360, 375, 390, 412, 430, 768 y 820 px, con altura 800 px en teléfonos y 900 px en tabletas. Referencias de escritorio de /, /producto y /agendar a 1440 × 900. Chromium con escala 1 y movimiento reducido para estabilizar comparaciones. La auditoría mide texto renderizado con nodos de texto directos y controles visibles; excluye inert, aria-hidden, sr-only y honeypots. Repeticiones entre rutas y anchos cuentan como observaciones independientes.

Hallazgos priorizados:

| Prioridad | Ruta / ancho demostrado | Hallazgo y responsable |
|---|---|---|
| P1 | /producto y /soluciones, 320–430 | Texto del CRM entre aproximadamente 5 y 7 px, nombres truncados en columnas. CrmMockup.tsx y unidades .mock-wrap de globals.css. |
| P1 | /producto, 320; maquetas y tablas en varios anchos | Columna Equipo/precio fuera del área visible aunque el documento no mostraba scroll. page.tsx de Producto, .cmp y .dash. |
| P1 | Todas, especialmente 320 | CTA Contactar del footer recortado; enlaces legales/sociales y hamburguesa pequeños. Footer.tsx y globals.css. |
| P1 | /dudas, 320–430 | Preguntas rápidas ocupaban mucho alto, reduciendo la conversación; input de menos de 16 px. DudasChat.tsx y .chat de globals.css. |
| P1 | /contacto, 320 | Contador Organizadas fuera del viewport en la maqueta anidada; formulario con poco ancho útil y chips pequeños. contacto/page.tsx y ContactForm.tsx. |
| P2 | /soluciones, 320 | Etiqueta Calidad > volumen fuera del área visible. soluciones/page.tsx. |
| P2 | /agendar, 320–390 | Espacio reducido dentro de las tarjetas; etiquetas menores de 12 px y chips menores de 44 px. BookingFlow.tsx. La cuadrícula de días ya apilaba correctamente. |
| P2 | Tarjetas a 768 y 820 | Listas de una sola columna demasiado largas donde cabían dos. .rg y rejillas repetidas de tarjetas. |

Los 56 casos iniciales ya tenían cero scroll horizontal de documento y cero errores de consola. Esa comprobación aislada no detectaba recortes: por eso también se midieron elementos fuera de pantalla y texto truncado. Evidencia original: reports/mobile/before.json.

## Cambios y motivo

- Se añade mobile.css, importado después de globals.css. Todas sus variaciones están bajo max-width:899px salvo display:contents del contenedor de tablas, que conserva la caja de escritorio. No se añaden !important; se reutilizan dos declaraciones existentes para aceptar variables de rejilla y altura del chat.
- Unidad de espaciado móvil contenida entre 12 y 14 px, sin alterar --ud ni el valor de escritorio. textSize() centraliza mínimos de 15 px para cuerpo y 12 px para etiquetas; fieldSize() garantiza 16 px en campos. Los valores de escritorio conservan su cálculo con un mínimo neutro de 0 px. No se cambió la familia tipográfica.
- Maquetas CRM en una columna en teléfonos y tres columnas a partir de 768 px; misma información, sin ocultar oportunidades. Unidad estable de 12 px para CRM, panel y comparativas. Dos columnas en rejillas de tarjetas marcadas tablet-cards a 768–899 px, sin imponerlo a las portadas ni a formularios completos.
- Comparativas dentro de MobileScroll: región accesible, desplazamiento interno y señal ↔ en teléfonos. La tabla de planes mantiene 720 px y la de equipos 680 px para que se lean. No desplazan horizontalmente la página. No se cambió el significado de las tablas.
- CTA del footer y filas de etiquetas pueden envolver; contadores y detalles de Contacto se apilan. Los offsets de Contacto existentes ya se anulaban correctamente: se conservaron. Se conserva la estructura en columna existente del hero de inicio y sus reglas importantes; no se añadió otro parche de posicionamiento.
- Mínimo táctil real de 44 × 44 px para enlaces, botones y campos; respuesta :active y efectos hover condicionados a hover:hover. Se conservan los estados y comportamientos existentes.
- Header y menú respetan env(safe-area-inset-*), con alto del panel en dvh. Se conserva el header fuera de contenedores con container-type. No se tocó HeaderLogo.tsx, MotionController.tsx ni la lógica de apertura/cierre del Header. El desplazamiento ?go= mide el borde inferior del header móvil y añade 16 px; en escritorio continúa usando 140 px.
- Formulario de Contacto y pasos de Agendar con relleno móvil de 18 px. Campos con inputMode y enterKeyHint apropiados, manteniendo type y autocomplete. Resumen Tu cita conservado después de los datos y confirmación a ancho completo: se prefiere el flujo natural a un panel fijo que tape el teclado o contenido. No cambia el orden de lectura ni de foco.
- Chat con altura dvh, mensajes en scroll interno y autoscroll limitado al contenedor existente. Preguntas rápidas en una fila que se desliza, sin esconder ninguna. Mayor ancho de burbujas en móvil. Se probó un viewport corto de 480 px como aproximación del espacio disponible, no como emulación del teclado de iOS.
- sizes del logo blanco del hero corregido a 150 px en móvil, conservando 20vw en escritorio. La imagen LCP hero-inicio.jpg mantiene priority y sizes=100vw. Las demás imágenes mantienen dimensiones/aspect-ratio y carga diferida, con la excepción prevista del logo prioritario del header. No se cambiaron fotos ni se recomprimieron originales.

Única adición visible de contenido: señal ↔ de desplazamiento en las comparativas. No se cambian textos, paleta ni orden de secciones. Las preguntas rápidas y tablas se desplazan sin perder contenido.

## Resultados por ancho y ruta

Cada celda muestra desborde horizontal del documento en px / errores de consola, antes → después. Es scrollWidth - innerWidth, con máximo 0 para resultados sin desborde.

| Ancho | / | /producto | /soluciones | /nosotros | /dudas | /contacto | /agendar |
|---|---|---|---|---|---|---|---|
| 320 | 0/0 → 0/0 | 0/0 → 0/0 | 0/0 → 0/0 | 0/0 → 0/0 | 0/0 → 0/0 | 0/0 → 0/0 | 0/0 → 0/0 |
| 360 | 0/0 → 0/0 | 0/0 → 0/0 | 0/0 → 0/0 | 0/0 → 0/0 | 0/0 → 0/0 | 0/0 → 0/0 | 0/0 → 0/0 |
| 375 | 0/0 → 0/0 | 0/0 → 0/0 | 0/0 → 0/0 | 0/0 → 0/0 | 0/0 → 0/0 | 0/0 → 0/0 | 0/0 → 0/0 |
| 390 | 0/0 → 0/0 | 0/0 → 0/0 | 0/0 → 0/0 | 0/0 → 0/0 | 0/0 → 0/0 | 0/0 → 0/0 | 0/0 → 0/0 |
| 412 | 0/0 → 0/0 | 0/0 → 0/0 | 0/0 → 0/0 | 0/0 → 0/0 | 0/0 → 0/0 | 0/0 → 0/0 | 0/0 → 0/0 |
| 430 | 0/0 → 0/0 | 0/0 → 0/0 | 0/0 → 0/0 | 0/0 → 0/0 | 0/0 → 0/0 | 0/0 → 0/0 | 0/0 → 0/0 |
| 768 | 0/0 → 0/0 | 0/0 → 0/0 | 0/0 → 0/0 | 0/0 → 0/0 | 0/0 → 0/0 | 0/0 → 0/0 | 0/0 → 0/0 |
| 820 | 0/0 → 0/0 | 0/0 → 0/0 | 0/0 → 0/0 | 0/0 → 0/0 | 0/0 → 0/0 | 0/0 → 0/0 | 0/0 → 0/0 |

Además: 105 comprobaciones en 15 anchos intermedios/límite por ruta (321, 359, 374, 411, 429, 519, 520, 521, 600, 767, 769, 819, 821, 898 y 899), sin desborde. No se afirma haber capturado cada ancho entero entre 320 y 899.

## Mediciones de lectura y tacto

| Ruta (sumadas sus ocho anchuras) | Objetivos <44 px antes | Después | Textos <12 px antes | Después |
|---|---:|---:|---:|---:|
| / | 170 | 0 | 82 | 0 |
| /producto | 184 | 0 | 755 | 0 |
| /soluciones | 194 | 0 | 707 | 0 |
| /nosotros | 154 | 0 | 30 | 0 |
| /dudas | 208 | 0 | 48 | 0 |
| /contacto | 234 | 0 | 140 | 0 |
| /agendar | 170 | 0 | 108 | 0 |
| Total de observaciones | 1314 | 0 | 1870 | 0 |

Después: cero párrafos/burbujas medidos por debajo de 15 px y todos los campos reales comprobados alcanzan 16 px. Texto cortado por overflow: 168 → 0; textos fuera de viewport: 32 → 0. El desplazamiento intencional dentro de tablas y preguntas rápidas se distingue del desborde de página. Se midieron las cajas reales; no son números de “elementos únicos” ni una certificación de todos los estados futuros.

## Pruebas funcionales y escritorio

23 comprobaciones a 375 px, hasTouch e isMobile: abrir/cerrar por tap, Escape y fuera; foco dentro de navegación; bloqueo de fondo; cierre al navegar; offset ?go=; filtro Medir; chat y autoscroll; FAQ; viewport corto; completar Agendar y Contacto; canvas pintado; header compacto y menú dentro de dvh. Las rutas /api/* se interceptaron antes de interactuar: una reserva y un contacto simulados, ningún envío o reserva real. Resultados: reports/mobile/functional.json.

Se sintetizaron deslizamientos táctiles con CDP de Chromium en las dos tablas y en las preguntas rápidas, además de comprobar su scroll interno. No son gestos realizados sobre hardware físico. Evidencia: reports/mobile/gestures.json.

| Referencia 1440 px | Alto antes / después | Píxeles cambiados | Resultado |
|---|---|---:|---|
| inicio | 7276 / 7276 | 0 | Idéntica píxel a píxel |
| producto | 10014 / 10014 | 0 | Idéntica píxel a píxel |
| agendar | 2007 / 2007 | 0 | Idéntica píxel a píxel |

La referencia de escritorio actualizada contiene los cambios externos de espaciado. Antes de recibirlos, la comparación inicial también dio cero píxeles distintos (reports/mobile/desktop-initial.json). Las capturas se estabilizaron con prefers-reduced-motion y las fuentes cargadas; no prueban cada estado de animación o interacción. La lógica del logo y del revelado permanece idéntica a la referencia de entrada.

## Rendimiento y accesibilidad: límites explícitos

La simulación en Chromium, 375 px y CPU ×4, registró 110 fotogramas en unos 1,8 s de scroll; p95 de intervalo 16.8 ms, máximo 16.8 ms. Hero servido por Next a 640 px, 15070 bytes de imagen codificada en esa navegación (DPR 1). Es una observación de laboratorio, no Core Web Vitals ni prueba en un teléfono de gama media. No se redujeron blurs/sombras sin una regresión demostrada respecto del estado de entrada, para conservar su aspecto. Debe revisarse el scroll en hardware real.

Viewport mantiene width=device-width, initial-scale=1, sin maximum-scale ni user-scalable=no. Movimiento reducido respetado por el sistema existente. Áreas seguras cubiertas por CSS; no se modificó viewport/SEO para forzar viewport-fit=cover. El navegador debe aplicar sus propias áreas seguras por defecto.

No se certifica conformidad AA de toda la paleta: conservar colores entra en conflicto con aumentar contraste en algunas combinaciones existentes. Por ejemplo, #e8782a sobre #fff4e6 da aproximadamente 2.70:1 y blanco sobre el extremo claro #ff9d86 del degradado, 2.02:1. Se conservaron esos colores según la regla estricta; se necesita autorización para una revisión de contraste que cambie la paleta o los colores del texto. No se presenta esta limitación como resuelta.

## Verificación y reproducción

- npm run lint, npm run typecheck y npm run build: pasan sin errores ni warnings nuevos del código. Se compiló con NEXT_PUBLIC_SITE_URL=http://localhost:3137 para verificar las URLs locales; no se tocó la regla de fallback a localhost/noindex si falta. El aviso de deprecación de la versión de ESLint durante npm install ya existía.
- npm start en puerto 3137, todas las rutas 200 y sin errores de consola. Servidores de esta tarea detenidos antes de entregar.
- Detector mecánico de Impeccable sobre los ajustes principales: sin hallazgos. No se instaló ni actualizó la habilidad.
- Scripts: tests/mobile-audit.mjs before/after, mobile-functional.mjs, mobile-gestures.mjs, mobile-desktop.mjs y mobile-extra.mjs; mobile-capture-desktop.mjs permite refrescar solo la referencia de escritorio. PLAYWRIGHT_BROWSERS_PATH debe apuntar al Chromium instalado. MOBILE_BASE_URL configura el origen del audit/funcional; MOBILE_EVIDENCE_DIR permite otra carpeta de capturas. Otros scripts usan el puerto local documentado 3137.
- Informes JSON ligeros versionados en reports/mobile. Las 118 capturas principales y tres referencias iniciales adicionales de escritorio se guardan fuera de Git, en C:/Users/LENOVO/tinto-mobile-evidence/before y after, para no introducir cientos de MB de PNG en el historial. Se mantienen accesibles localmente. No se entregan capturas como si fueran prueba de Safari real.

## Pendientes del propietario

1. Probar en iPhone con Safari, Android real y una tableta pequeña: notch, barras del navegador, teclado nativo, rotación, zoom y scroll con el pulgar. No dispongo de esos dispositivos físicos en esta sesión.
2. Revisar contraste con permiso para ajustar colores; permanecen las combinaciones de la paleta señaladas arriba.
3. Verificar reserva y contacto con contenido y datos reales, horarios, textos largos y errores reales de backend. Las pruebas actuales interceptan los envíos por seguridad y alcance.
4. Entregar imágenes definitivas optimizadas y comprobar calidad a DPR 2/3 sobre conexiones móviles; se conserva la selección responsive de Next y los recursos existentes.
5. Medir rendimiento/Core Web Vitals tras publicar en el alojamiento definitivo y probar en un móvil de gama media. No se desplegó nada.
