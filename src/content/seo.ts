/** Redacción basada en src/content/*.ts; sin cifras ni datos pendientes de confirmar. */
export const seoPages = {
  '/': {
    title: 'CRM para agencias de seguros: vende con contexto',
    description:
      'Atrae, precalifica y organiza las oportunidades de tu agencia de seguros con Tinto. Reúne tus canales y llega a cada conversación con contexto para tu equipo.',
    label: 'Inicio',
    priority: 1,
  },
  '/producto': {
    title: 'Captación, precalificación y pipeline',
    description:
      'Conoce los módulos de Tinto: captación, precalificación, pipeline y reportes. Organiza contactos, citas y próximos pasos para tu equipo de asesores de seguros.',
    label: 'Producto',
    priority: 0.9,
  },
  '/soluciones': {
    title: 'CRM para agencias, corredoras y redes',
    description:
      'Explora cómo Tinto se adapta a agencias, corredoras y redes comerciales. Reparte oportunidades, organiza el seguimiento y consulta reportes de todo tu equipo.',
    label: 'Soluciones',
    priority: 0.8,
  },
  '/nosotros': {
    title: 'Nuestro equipo, valores e historia',
    description:
      'Conoce al equipo detrás de Tinto y los valores que guían el producto. Trabajamos para convertir conversaciones dispersas en oportunidades claras para tu agencia.',
    label: 'Nosotros',
    priority: 0.6,
  },
  '/dudas': {
    title: 'Preguntas frecuentes sobre el CRM',
    description:
      'Resuelve tus dudas sobre cómo funciona Tinto, sus módulos y cómo empezar. Lee las preguntas frecuentes o conversa con el equipo sobre tu agencia de seguros.',
    label: 'Dudas',
    priority: 0.7,
  },
  '/contacto': {
    title: 'Conversemos sobre el CRM de tu agencia',
    description:
      'Cuéntanos cómo vende tu agencia de seguros y qué necesita tu equipo. Conoce las formas de conversar con Tinto y da el primer paso para organizar oportunidades.',
    label: 'Contacto',
    priority: 0.7,
  },
  '/agendar': {
    title: 'Agenda una demo para tu agencia',
    description:
      '¿Agendamos un tinto? Elige cómo quieres conversar, consulta los horarios y déjanos tus datos para conocer el CRM según la forma de trabajar de tu agencia.',
    label: 'Agendar',
    priority: 0.3,
  },
} as const;
export type SeoPath = keyof typeof seoPages;
export const seoPaths = Object.keys(seoPages) as SeoPath[];
// Actualizar solo al cambiar contenido público; no usar la fecha de cada visita/build.
export const seoLastModified = '2026-10-25';
