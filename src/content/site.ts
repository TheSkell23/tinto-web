export const site = {
  name: 'tinto',
  email: 'hola@tinto.co',
  emailCitas: 'citas@tinto.co',
  address: 'Cra. 15 #93-60, Bogotá',
  hours: 'Lun – Vie · 9:00 – 18:00',
  hoursShort: 'Lun – Vie 9:00 – 18:00',
  phone: '+57 300 000 0000',
  phone2: '+57 301 111 2233',
  advisor: 'Valentina',
  copyright: '© 2026 tinto. Todos los derechos reservados',
} as const;

export type NavLink = { label: string; sub: string; page: string; find: string };
export type NavGroup = { label: string; page: string; links: NavLink[] };

/** Menú del header: cada enlace navega a `page?go=<find>` y hace scroll a esa sección. */
export const navGroups: NavGroup[] = [
  {
    label: 'Producto',
    page: '/producto',
    links: [
      {
        label: 'Módulos',
        sub: 'Captar, calificar y organizar',
        page: '/producto',
        find: 'Elige tu módulo',
      },
      {
        label: 'Planes y precios',
        sub: 'Claros y simples',
        page: '/producto',
        find: 'Planes claros',
      },
      { label: 'Tu panel', sub: 'Todo tu progreso', page: '/producto', find: 'Todo tu progreso' },
    ],
  },
  {
    label: 'Soluciones',
    page: '/soluciones',
    links: [
      {
        label: 'Tipos de equipo',
        sub: 'Agencias, corredoras y redes',
        page: '/soluciones',
        find: '¿Cómo vendes',
      },
      {
        label: '¿Quién se beneficia?',
        sub: 'Perfiles y equipos',
        page: '/soluciones',
        find: '¿Quién se beneficia',
      },
      {
        label: 'Cómo lo hacemos',
        sub: 'De tu equipo a tu primera semana',
        page: '/soluciones',
        find: 'De tu equipo',
      },
    ],
  },
  {
    label: 'Nosotros',
    page: '/nosotros',
    links: [
      {
        label: 'Quiénes somos',
        sub: 'Donde el trabajo duro encuentra su tinto',
        page: '/nosotros',
        find: 'Donde el trabajo duro',
      },
      { label: 'Valores', sub: 'Lo que nos guía', page: '/nosotros', find: 'Cuatro valores' },
      {
        label: 'Reseñas',
        sub: 'Equipos que confían en tinto',
        page: '/nosotros',
        find: 'Confiado por equipos',
      },
    ],
  },
  {
    label: 'Dudas',
    page: '/dudas',
    links: [
      { label: 'Pregúntale al asistente', sub: 'Respuestas al instante', page: '/dudas', find: '' },
      {
        label: 'Preguntas frecuentes',
        sub: 'Lo básico antes de empezar',
        page: '/dudas',
        find: 'Preguntas frecuentes',
      },
      {
        label: 'Hablar con una persona',
        sub: 'Te escribimos en 24 h',
        page: '/contacto',
        find: '',
      },
    ],
  },
  {
    label: 'Contacto',
    page: '/contacto',
    links: [
      { label: 'Conversemos', sub: 'Escríbenos tu idea', page: '/contacto', find: 'Conversemos' },
      {
        label: 'Canales',
        sub: 'WhatsApp, email y horarios',
        page: '/contacto',
        find: 'Elige cómo',
      },
      { label: 'Agendar', sub: 'Reserva tu demo', page: '/agendar', find: '' },
    ],
  },
];

/** Barra compacta del header (aparece al hacer scroll). */
export const headerBar = [
  { icon: 'target', title: 'Módulo', sub: '¿Qué necesitas?', chevron: false },
  { icon: 'grid', title: 'Equipo', sub: 'Agencia o red comercial', chevron: false },
  { icon: 'mail', title: 'Canal', sub: 'WhatsApp o correo', chevron: true },
  { icon: 'dollar', title: 'Plan', sub: 'Cualquiera', chevron: true },
] as const;

export const footerCols = {
  producto: {
    title: 'Producto',
    href: '/producto',
    links: [
      { label: 'Captación', href: '/producto?go=Elige%20tu%20m%C3%B3dulo' },
      { label: 'Precalificación', href: '/producto?go=Elige%20tu%20m%C3%B3dulo' },
      { label: 'Pipeline', href: '/producto?go=Elige%20tu%20m%C3%B3dulo' },
      { label: 'Reportes', href: '/producto?go=Elige%20tu%20m%C3%B3dulo' },
    ],
  },
  explorar: {
    title: 'Explorar',
    href: '/soluciones',
    links: [
      { label: 'Todas las funciones', href: '/producto?go=Todo%20para%20vender' },
      { label: 'Boletín', href: '/contacto?go=Conversemos' },
      { label: 'Oficina', href: '/contacto?go=Elige%20c%C3%B3mo' },
    ],
  },
  conocenos: { title: 'Conócenos', href: '/nosotros' },
} as const;
