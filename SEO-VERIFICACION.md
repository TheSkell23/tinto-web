# Verificación SEO en producción local

Origen de prueba: `http://localhost:3127`. Sustituir por NEXT_PUBLIC_SITE_URL real al compilar.

| Ruta | title | description | canonical | robots | JSON-LD |
|---|---|---|---|---|---|
| / | CRM para agencias de seguros: vende con contexto \| Tinto | Atrae, precalifica y organiza las oportunidades de tu agencia de seguros con Tinto. Reúne tus canales y llega a cada conversación con contexto para tu equipo. | http://localhost:3127/ | index, follow | Organization, WebSite |
| /producto | Captación, precalificación y pipeline \| Tinto | Conoce los módulos de Tinto: captación, precalificación, pipeline y reportes. Organiza contactos, citas y próximos pasos para tu equipo de asesores de seguros. | http://localhost:3127/producto | index, follow | Organization, WebSite, BreadcrumbList, SoftwareApplication |
| /soluciones | CRM para agencias, corredoras y redes \| Tinto | Explora cómo Tinto se adapta a agencias, corredoras y redes comerciales. Reparte oportunidades, organiza el seguimiento y consulta reportes de todo tu equipo. | http://localhost:3127/soluciones | index, follow | Organization, WebSite, BreadcrumbList |
| /nosotros | Nuestro equipo, valores e historia \| Tinto | Conoce al equipo detrás de Tinto y los valores que guían el producto. Trabajamos para convertir conversaciones dispersas en oportunidades claras para tu agencia. | http://localhost:3127/nosotros | index, follow | Organization, WebSite, BreadcrumbList |
| /dudas | Preguntas frecuentes sobre el CRM \| Tinto | Resuelve tus dudas sobre cómo funciona Tinto, sus módulos y cómo empezar. Lee las preguntas frecuentes o conversa con el equipo sobre tu agencia de seguros. | http://localhost:3127/dudas | index, follow | Organization, WebSite, BreadcrumbList, FAQPage |
| /contacto | Conversemos sobre el CRM de tu agencia \| Tinto | Cuéntanos cómo vende tu agencia de seguros y qué necesita tu equipo. Conoce las formas de conversar con Tinto y da el primer paso para organizar oportunidades. | http://localhost:3127/contacto | index, follow | Organization, WebSite, BreadcrumbList, ContactPage |
| /agendar | Agenda una demo para tu agencia \| Tinto | ¿Agendamos un tinto? Elige cómo quieres conversar, consulta los horarios y déjanos tus datos para conocer el CRM según la forma de trabajar de tu agencia. | http://localhost:3127/agendar | noindex, follow | Organization, WebSite, BreadcrumbList |

| Ruta | og:type / locale / site_name | og:url | og:title = twitter:title | og:description = twitter:description | og:image | twitter:image | twitter:card |
|---|---|---|---|---|---|---|---|
| / | website / es_CO / Tinto | http://localhost:3127 | CRM para agencias de seguros: vende con contexto \| Tinto | Atrae, precalifica y organiza las oportunidades de tu agencia de seguros con Tinto. Reúne tus canales y llega a cada conversación con contexto para tu equipo. | http://localhost:3127/opengraph-image | http://localhost:3127/twitter-image | summary_large_image |
| /producto | website / es_CO / Tinto | http://localhost:3127/producto | Captación, precalificación y pipeline \| Tinto | Conoce los módulos de Tinto: captación, precalificación, pipeline y reportes. Organiza contactos, citas y próximos pasos para tu equipo de asesores de seguros. | http://localhost:3127/opengraph-image | http://localhost:3127/twitter-image | summary_large_image |
| /soluciones | website / es_CO / Tinto | http://localhost:3127/soluciones | CRM para agencias, corredoras y redes \| Tinto | Explora cómo Tinto se adapta a agencias, corredoras y redes comerciales. Reparte oportunidades, organiza el seguimiento y consulta reportes de todo tu equipo. | http://localhost:3127/opengraph-image | http://localhost:3127/twitter-image | summary_large_image |
| /nosotros | website / es_CO / Tinto | http://localhost:3127/nosotros | Nuestro equipo, valores e historia \| Tinto | Conoce al equipo detrás de Tinto y los valores que guían el producto. Trabajamos para convertir conversaciones dispersas en oportunidades claras para tu agencia. | http://localhost:3127/opengraph-image | http://localhost:3127/twitter-image | summary_large_image |
| /dudas | website / es_CO / Tinto | http://localhost:3127/dudas | Preguntas frecuentes sobre el CRM \| Tinto | Resuelve tus dudas sobre cómo funciona Tinto, sus módulos y cómo empezar. Lee las preguntas frecuentes o conversa con el equipo sobre tu agencia de seguros. | http://localhost:3127/opengraph-image | http://localhost:3127/twitter-image | summary_large_image |
| /contacto | website / es_CO / Tinto | http://localhost:3127/contacto | Conversemos sobre el CRM de tu agencia \| Tinto | Cuéntanos cómo vende tu agencia de seguros y qué necesita tu equipo. Conoce las formas de conversar con Tinto y da el primer paso para organizar oportunidades. | http://localhost:3127/opengraph-image | http://localhost:3127/twitter-image | summary_large_image |
| /agendar | website / es_CO / Tinto | http://localhost:3127/agendar | Agenda una demo para tu agencia \| Tinto | ¿Agendamos un tinto? Elige cómo quieres conversar, consulta los horarios y déjanos tus datos para conocer el CRM según la forma de trabajar de tu agencia. | http://localhost:3127/opengraph-image | http://localhost:3127/twitter-image | summary_large_image |

Ambas imágenes sociales: 1200 × 630, PNG. `og:image:alt` y `twitter:image:alt`: Tinto: atrae, precalifica y organiza tus oportunidades.

| Recurso | HTTP | Dimensiones |
|---|---|---|
| /opengraph-image | 200 | 1200 × 630 |
| /twitter-image | 200 | 1200 × 630 |
| /icon.png | 200 | 32 × 32 |
| /apple-icon.png | 200 | 180 × 180 |
| /icons/icon-192.png | 200 | 192 × 192 |
| /icons/icon-512.png | 200 | 512 × 512 |

Sitemap, robots y manifest: HTTP 200. Sitemap: seis rutas indexables. API: GET 405 y POST inválido 422, ambos con X-Robots-Tag. Sin envío de correos.
