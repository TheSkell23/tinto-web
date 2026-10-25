export const contactoHero = {
  ghost: 'Agenda tu cita',
  title: 'Conversemos con nuestro',
  accent: 'equipo',
  text: 'Cuéntanos cómo vendes y te confirmamos tu demo en menos de 24 horas.',
  info: [
    { icon: 'mail', label: 'Escríbenos', value: 'hola@tinto.co' },
    { icon: 'pin', label: 'Oficina', value: 'Cra. 15 #93-60, Bogotá' },
    { icon: 'phone', label: 'Llámanos', value: '+57 300 000 0000' },
    { icon: 'clock', label: 'Horarios', value: 'Lun – Vie · 9:00 – 18:00' },
  ],
};

export const wants = ['Captar leads', 'Precalificar', 'Pipeline', 'Reportes'] as const;

export const contactoWays = {
  ghost: 'Tres formas',
  title: 'Elige cómo quieres',
  accent: 'tomarte el tinto.',
  text: 'Tres formas de conversar con nosotros. Todas terminan en un CRM que trabaja para ti.',
  items: [
    {
      icon: 'video',
      tag: '20 min',
      title: 'Videollamada',
      text: 'Cuéntanos cómo vendes y te mostramos Tinto con tus datos.',
      cta: 'Reservar →',
    },
    {
      icon: 'pin',
      tag: 'Bogotá',
      title: 'Visita a la oficina',
      text: 'Conoce al equipo y prueba Tinto con un tinto en la mano.',
      cta: 'Agendar →',
    },
    {
      icon: 'chat2',
      tag: '24 h',
      title: 'WhatsApp',
      text: 'Escríbenos y te respondemos en menos de un día hábil.',
      cta: 'Escribir →',
    },
  ],
  alt: 'Jinetes cruzando el desierto',
};

export const contactoChannels = [
  {
    icon: 'phone',
    tag: 'Rápido',
    title: 'Llama o escribe por WhatsApp',
    rows: [
      ['Línea 1', '+57 300 000 0000'],
      ['Línea 2', '+57 301 111 2233'],
    ],
    cta: 'Escribir ahora →',
  },
  {
    icon: 'clock',
    tag: 'Abierto',
    title: 'Horarios',
    rows: [
      ['Lun – Vie', '9:00 – 18:00'],
      ['Sábado', '10:00 – 15:00'],
      ['Domingo', 'Cerrado'],
    ],
    cta: 'Agendar visita →',
  },
  {
    icon: 'mail',
    tag: '24 h',
    title: 'Escríbenos',
    rows: [
      ['General', 'hola@tinto.co'],
      ['Citas', 'citas@tinto.co'],
    ],
    cta: 'Enviar correo →',
  },
];

export const contactoCta = {
  title: 'Empieza a ordenar',
  accent: 'tus oportunidades',
  text: 'Importa tus contactos en minutos y empieza a vender con contexto.',
  checks: ['Prueba gratis por 14 días', 'Sin tarjeta de crédito', 'Soporte en español'],
  stats: [
    ['50K+', 'Oportunidades gestionadas'],
    ['4.9★', 'Reseñas'],
    ['14 días', 'Prueba gratis'],
  ],
  mock: {
    header: '★ 4.9 · 1.2K reseñas',
    card: {
      label: 'FICHA DE OPORTUNIDAD',
      badge: 'Precalificada',
      title: 'Camilo Díaz · Salud colectiva',
      rows: [
        ['Pregunta clave', '¿Cuándo vence su póliza?'],
        ['Presupuesto', '$180.000 / mes'],
      ],
    },
    counters: [
      ['Atraídas', '24', false],
      ['Precalificadas', '12', false],
      ['Organizadas', '8', true],
    ],
    alerts: [
      ['ALERTA', 'Vence en 12 días'],
      ['PRÓXIMO PASO', 'Llamar mañana'],
    ],
  },
};
