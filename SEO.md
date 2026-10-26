# SEO técnico de Tinto

Implementado y verificado el 25 de octubre de 2026. Trabajo realizado en una copia local, con Node 24 y las dependencias existentes. Sin despliegue, claves reales ni push.

## URL pública y metadatos

La única configuración del origen público es `NEXT_PUBLIC_SITE_URL`, añadida a `.env.example` con un dominio reservado de ejemplo. `src/lib/site-url.ts` valida el origen y genera las URLs de metadataBase, canonicals, Open Graph/Twitter, JSON-LD, sitemap, robots y manifest. Acepta una barra final en la configuración y la normaliza; rechaza rutas, parámetros, fragmentos y credenciales. En desarrollo, sin variable, usa localhost:3000. Si falta la variable el build NO falla (regla del proyecto): se usa http://localhost:3000, se avisa por consola y el sitio se publica con robots noindex y `Disallow: /` para no indexar canonicals falsos. Configurar antes de publicar y recompilar al cambiar el dominio.

Todos los metadatos son estáticos; no hay motivo para usar generateMetadata. El layout define applicationName, title.default/template y viewport con themeColor crema y colorScheme light. Cada página define título, descripción, canonical, OG completo y Twitter summary_large_image. El inicio usa title.absolute para conservar el sufijo de marca en ese segmento de Next. Los títulos finales (con el sufijo " | Tinto") miden como máximo 60 caracteres y las descripciones 154–161.

Los canonicals y og:url apuntan siempre a la ruta limpia, sin parámetros ni barras duplicadas. Se verificaron las siete rutas con `?go=Planes%20claros&utm_source=seo`. Next puede representar el origen raíz sin barra en el HTML; equivale al origen con / que devuelve URL.href. No hay páginas distintas para cada navegación ?go=. Se conservó html lang="es". OG usa es_CO y JSON-LD/manifest es-CO. Se omite hreflang: solo existe una versión en español, sin traducciones ni variantes regionales alternativas.

## Títulos y descripciones

| Ruta | title final | description |
|---|---|---|
| / | CRM para agencias de seguros: vende con contexto | Tinto | Atrae, precalifica y organiza las oportunidades de tu agencia de seguros con Tinto. Reúne tus canales y llega a cada conversación con contexto para tu equipo. |
| /producto | Captación, precalificación y pipeline | Tinto | Conoce los módulos de Tinto: captación, precalificación, pipeline y reportes. Organiza contactos, citas y próximos pasos para tu equipo de asesores de seguros. |
| /soluciones | CRM para agencias, corredoras y redes | Tinto | Explora cómo Tinto se adapta a agencias, corredoras y redes comerciales. Reparte oportunidades, organiza el seguimiento y consulta reportes de todo tu equipo. |
| /nosotros | Nuestro equipo, valores e historia | Tinto | Conoce al equipo detrás de Tinto y los valores que guían el producto. Trabajamos para convertir conversaciones dispersas en oportunidades claras para tu agencia. |
| /dudas | Preguntas frecuentes sobre el CRM | Tinto | Resuelve tus dudas sobre cómo funciona Tinto, sus módulos y cómo empezar. Lee las preguntas frecuentes o conversa con el equipo sobre tu agencia de seguros. |
| /contacto | Conversemos sobre el CRM de tu agencia | Tinto | Cuéntanos cómo vende tu agencia de seguros y qué necesita tu equipo. Conoce las formas de conversar con Tinto y da el primer paso para organizar oportunidades. |
| /agendar | Agenda una demo para tu agencia | Tinto | ¿Agendamos un tinto? Elige cómo quieres conversar, consulta los horarios y déjanos tus datos para conocer el CRM según la forma de trabajar de tu agencia. |

## Indexación, sitemap y robots

- Indexables: /, /producto, /soluciones, /nosotros, /dudas y /contacto. Aportan información del producto, del equipo, respuestas y formas de contacto.
- /agendar: noindex, follow. Es un flujo de conversión y reserva, sin una intención informativa propia suficiente. Se permite su rastreo para que pueda leerse el noindex.
- /api/*: X-Robots-Tag: noindex, nofollow en respuestas, incluidas 405 y errores de validación. Robots bloquea /api/ porque son endpoints operativos. El bloqueo impide a rastreadores obedientes leer sus cabeceras; el X-Robots-Tag es una segunda indicación para accesos permitidos, no una garantía de retirada de URLs ya conocidas.
- Sitemap: seis URLs. La petición menciona siete rutas pero también pide excluir noindex; por eso /agendar no se incluye. Prioridades: inicio 1; producto 0.9; soluciones 0.8; dudas y contacto 0.7; nosotros 0.6. lastModified: 2026-10-25, fecha de revisión editorial, constante en src/content/seo.ts. Actualizarla al cambiar el contenido, no en cada solicitud o build.

## Imágenes sociales e iconos

Una imagen global basta: la promesa de marca es compartida y cada página ya aporta título y descripción propios. /opengraph-image y /twitter-image son PNG de 1200 × 630 generados con ImageResponse. Usan #e8782a, #2a1d12, #fff4e6, el logo existente y Plus Jakarta Sans Bold local. Los textos vienen de homeHero; no incluyen precios, reseñas o cifras. La fuente y su licencia OFL están en assets/fonts; no hay fetch externo al generar estas imágenes.

Iconos PNG derivados del wordmark existente, centrado y sin recortes sobre crema: src/app/icon.png (32), src/app/apple-icon.png (180), public/icons/icon-192.png y icon-512.png. Manifest en app/manifest.ts, en español colombiano, display browser porque es un sitio de marketing sin funcionalidad offline. No se declara maskable: el logo no fue diseñado como icono adaptable. Regeneración: `node scripts/build-seo-icons.mjs`.

## JSON-LD

JsonLd es un componente servidor reutilizable. Serializa con JSON.stringify y escapa < como \u003c para evitar cierres de script. Validado también con un texto de prueba que incluye </script>.

| Alcance | Tipos implementados |
|---|---|
| Global | Organization con @id estable, name, url, logo y sameAs vacío; WebSite con idioma y publisher |
| Todas las internas, incluida /agendar | BreadcrumbList con Inicio y la página actual, sin navegación visible nueva |
| /producto | SoftwareApplication, BusinessApplication, descripción de producto y publisher |
| /dudas | FAQPage, tres Question/Answer generadas directamente desde faqSection.items |
| /contacto | ContactPage con referencia a la Organization global |

Se omiten deliberadamente contactPoint, address, telephone y email: todos los datos de site.ts están pendientes y Schema.org no ofrece una marca estándar para convertir un teléfono o dirección de ejemplo en un contacto real pendiente. No se duplicó Organization en contacto. No se incluyen Offer/offers, AggregateRating/Review, precios, pruebas gratuitas, hitos históricos ni cifras de resultados. Tampoco se inventa operatingSystem, dirección legal o redes sociales.

La pregunta “¿Para qué tamaño de agencia es?” se excluye del JSON-LD porque su respuesta contiene USD 25.000, marcado provisional en CONTENIDO_A_CONFIRMAR.md. Las otras tres preguntas y respuestas se toman literalmente de la misma fuente que usa la UI; la respuesta provisional continúa visible, sin cambios visuales. Al confirmar ese umbral, quitar el filtro en src/lib/structured-data.ts y ajustar la expectativa del test.

La validación local cubrió sintaxis JSON, tipos, propiedades, dominios heredados y rangos contra el vocabulario oficial de [Schema.org](https://schema.org/version/latest/schemaorg-current-https.jsonld), más forma de breadcrumbs, preguntas/respuestas, referencias URL y ausencia de campos provisionales. Evidencia y hash de vocabulario: screenshots/seo/schema-validation.json. No se subió contenido a validadores externos.

Validez Schema.org no equivale a elegibilidad de resultados enriquecidos: SoftwareApplication se conserva como descripción semántica, sin los precios/reseñas que [Google exige para su resultado enriquecido](https://developers.google.com/search/docs/appearance/structured-data/software-app). FAQPage describe la FAQ, aunque [Google retiró los resultados enriquecidos de FAQ en mayo de 2026](https://developers.google.com/search/updates).

## Semántica y rendimiento

Una sola h1 por ruta, comprobada sobre el HTML servido. Se conserva la h1 sr-only del inicio: el hero usa el logo y un párrafo; convertir esa frase en un nuevo título visible alteraría el diseño. Títulos de sección pasan a h2; tarjetas y funciones subordinadas a h3. El CSS existente ya da el mismo tratamiento a h2/h3/h4, por lo que no se editaron estilos. Los fantasmas mantienen aria-hidden. Regiones existentes reciben nombres accesibles y los pasos de reserva aria-labelledby asociado a su h2.

Header, footer, animaciones y globals.css no tienen modificaciones. Se conservan header/nav etiquetado/main/footer, enlace de salto, controles de menú con nombre y enlaces sociales con aria-label. La revisión detectó un header, un main y un footer por página, enlaces sin nombre: cero, imágenes sin alt: cero, y sin saltos de nivel en los encabezados del main. Las imágenes decorativas (hero y pájaros) conservan alt vacío; las informativas conservan sus descripciones. No cambia el orden del DOM.

Menú, botones de navegación y enlaces ?go= ya generan a href reales mediante Link, rastreables aun sin JavaScript. Se conservaron. No hay enlaces con target=_blank que requieran corrección de rel. Los href="#" de redes y textos legales siguen pendientes: no se inventaron destinos ni se modificó el footer.

Sin preconnect externos ni precargas manuales redundantes. next/font sirve la fuente localmente; Next precarga la fuente usada, el logo de cabecera, la imagen hero y un script de aplicación. Se mantienen: son recursos usados en la primera vista. hero-inicio.jpg ya usa priority y sizes=100vw; aparece su preload responsive en el HTML. El contenedor tiene altura/minHeight explícitos. El resto de imágenes tiene width/height o fill en contenedores con espacio reservado. No se añadieron cambios de diseño ni se afirma una medición de Core Web Vitals de usuarios reales.

Cabeceras aplicadas en next.config.ts: X-Content-Type-Options: nosniff; Referrer-Policy: strict-origin-when-cross-origin; Permissions-Policy: camera=(), microphone=(), geolocation=(). El sitio reserva citas y no usa esos dispositivos. poweredByHeader:false ya existía. Se evita añadir CSP restrictiva o HSTS sin conocer el dominio, HTTPS e integraciones definitivas.

## Verificación y evidencia

- `npx tsc --noEmit`: pasó.
- `npx eslint .`: pasó, sin warnings nuevos.
- `npm run build`: pasó, sin errores ni warnings; con NEXT_PUBLIC_SITE_URL=http://localhost:3127 solo para esta prueba local. Sin nuevas dependencias ni cambios de lockfile. npm install avisó de la deprecación de eslint 9 ya presente; no es un aviso nuevo del código o build.
- `npm start -- --port 3127`: prueba del build de producción. Las siete rutas: 200, un title/description/canonical, tags OG/Twitter y robots esperados. Revisión sin JavaScript para comprobar el HTML SSR y con JavaScript para consola, landmarks, navegación e imágenes.
- JSON-LD válido en las siete rutas. 122 propiedades contrastadas con el vocabulario oficial. API probada solo con GET y POST vacío: sin enviar correos.
- sitemap.xml, robots.txt, manifest.webmanifest, dos imágenes sociales y cuatro iconos: 200. Ambas imágenes sociales: 1200 × 630.
- Capturas completas antes/después a 1440 × 900, mismo Chrome y prefers-reduced-motion para estabilizar animaciones. Inicio: 1440 × 7628; producto: 1440 × 10278. Sin cambios apreciables de composición ni dimensiones. No son idénticas píxel a píxel: variación máxima de canal 7/255 en inicio y 6/255 en producto; cero píxeles exceden tolerancia 8/255. Revisión visual adicional de páginas e imagen OG. Estos resultados no prueban todos los tamaños de pantalla o estados de animación.
- Servidores levantados para esta tarea detenidos al finalizar.

Tabla completa de valores observados por ruta (incluye OG/Twitter): [SEO-VERIFICACION.md](SEO-VERIFICACION.md). Evidencia JSON y PNG en screenshots/seo. Scripts de reproducción en tests/seo*.mjs; usan Chrome instalado y las dependencias ya presentes. Ejecutar contra un build nuevo si se cambia contenido, URL o metadata. Para schema: descargar el vocabulario oficial y pasar su ruta a `node tests/seo-schema.mjs <archivo.jsonld>`. Para capturas, seo-shots.mjs before/after; comparación: seo-compare.mjs.

## Pendientes del propietario

1. Confirmar dominio real, configurar NEXT_PUBLIC_SITE_URL en cada entorno antes de compilar y volver a comprobar URLs de producción. El valor example.com es solo ejemplo; no se desplegó nada.
2. Confirmar las redes oficiales y sus destinos, completar sameAs y sustituir href="#" del footer por redes y documentos legales reales.
3. Confirmar nombre legal si difiere de Tinto y todos los contactos de site.ts (correo, teléfono, dirección y horarios). Solo después añadir contactPoint y, si corresponde, dirección a Organization.
4. Aprobar el logo final y entregar un isotipo legible a 32 px. Reemplazar public/images/tinto-logo.png si cambia el logo y regenerar src/app/icon.png, src/app/apple-icon.png, public/icons/icon-192.png e icon-512.png. Los actuales derivan del wordmark existente, no de un diseño de favicon final.
5. Aprobar la imagen social global o entregar arte final 1200 × 630. Para cambiarlo, editar src/lib/social-image.tsx (compartido por opengraph-image.tsx/twitter-image.tsx) o sustituir las convenciones por imágenes estáticas finales y actualizar sus URLs.
6. Confirmar precios, moneda, periodos, pruebas gratuitas, reseñas, clientes, cifras, hitos y umbrales de agencia de CONTENIDO_A_CONFIRMAR.md. Los ejemplos visibles del proyecto siguen pendientes; esta tarea no los convierte en afirmaciones verificadas. Activar offers/reseñas únicamente con datos reales y aprobación explícita.
7. Crear/verificar Search Console con el dominio real y enviar sitemap.xml; comprobar indexación y resultados reales después de publicar. Decidir proveedor e identificadores de Analytics y requisitos de consentimiento. No se añadieron trackers, claves ni verificaciones inventadas.
