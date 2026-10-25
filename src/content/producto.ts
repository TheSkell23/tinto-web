export type ModuleCard = {
  name: string;
  cat: 'Captar' | 'Calificar' | 'Organizar' | 'Medir';
  desc: string;
  price: string;
  tag: string;
  gradient: string;
  chips: string[];
  visual: 'channels' | 'score' | 'kanban' | 'bars';
};

export const categories = ['Todos', 'Captar', 'Calificar', 'Organizar', 'Medir'] as const;
export type Category = (typeof categories)[number];

export const moduleCards: ModuleCard[] = [
  {
    name: 'Captación',
    cat: 'Captar',
    desc: 'Formularios, WhatsApp y redes llegan a un solo buzón, sin copiar y pegar.',
    price: 'Todos los planes',
    tag: 'Más usado',
    gradient: 'linear-gradient(135deg,#ffe8d2,#ffbf99)',
    chips: ['WhatsApp', 'Formularios', 'Redes'],
    visual: 'channels',
  },
  {
    name: 'Precalificación',
    cat: 'Calificar',
    desc: 'Preguntas clave que filtran a cada persona antes de la primera llamada.',
    price: 'Desde Profesional',
    tag: 'Inteligente',
    gradient: 'linear-gradient(135deg,#fff4e6,#ffd2b0)',
    chips: ['Puntaje', 'Preguntas clave', 'Alertas'],
    visual: 'score',
  },
  {
    name: 'Pipeline',
    cat: 'Organizar',
    desc: 'Cada oportunidad en su etapa, con notas, citas y próximos pasos.',
    price: 'Todos los planes',
    tag: 'Visual',
    gradient: 'linear-gradient(135deg,#ffeedd,#ffc9a8)',
    chips: ['Etapas', 'Tareas', 'Citas'],
    visual: 'kanban',
  },
  {
    name: 'Reportes',
    cat: 'Medir',
    desc: 'Citas, cierres y conversión por asesor, semana a semana.',
    price: 'Desde Profesional',
    tag: 'Semanal',
    gradient: 'linear-gradient(135deg,#ffe4cc,#ffb98a)',
    chips: ['Conversión', 'Por asesor', 'Exportar'],
    visual: 'bars',
  },
];

export const crmBoard = {
  title: 'Oportunidades',
  period: 'Esta semana',
  columns: [
    {
      label: 'ATRAÍDA',
      count: 24,
      hot: false,
      items: [
        ['M', 'Marta Rojas', 'Salud colectiva', 72],
        ['A', 'Andrés Gil', 'Vida', 58],
        ['L', 'Luisa Vega', 'Hogar', 64],
        ['J', 'Jorge Peña', 'Pyme', 61],
      ],
    },
    {
      label: 'CALIFICADA',
      count: 12,
      hot: true,
      items: [
        ['C', 'Camilo Díaz', 'Salud', 91],
        ['P', 'Paula Ríos', 'Auto', 84],
        ['E', 'Elena Mora', 'Vida', 88],
      ],
    },
    {
      label: 'ORGANIZADA',
      count: 8,
      hot: true,
      items: [
        ['T', 'Tomás León', 'Pyme', 95],
        ['S', 'Sofía Cano', 'Salud', 93],
        ['I', 'Iván Ruiz', 'Auto', 90],
      ],
    },
  ],
  card: {
    label: 'FICHA DE OPORTUNIDAD',
    badge: 'Precalificada',
    title: 'Camilo Díaz · Salud colectiva',
    rows: [
      ['Pregunta clave', '¿Cuándo vence su póliza?'],
      ['Presupuesto', '$180.000 / mes'],
    ],
  },
} as const;

export const productoHero = {
  ghost: 'Nuestro producto',
  title: 'Un CRM que',
  accent: 'atrae, precalifica',
  titleEnd: 'y organiza tus oportunidades.',
  text: 'Llega a cada conversación con contexto. Tinto reúne tus canales, filtra a quien sí te interesa y te dice cuál es el siguiente paso.',
  stats: [
    ['4.9★', '1.2K reseñas'],
    ['14 días', 'de prueba gratis'],
    ['1 semana', 'de implementación'],
  ] as const,
};

export const problems = {
  ghost: 'El punto de partida',
  title: 'Menos siembra a ciegas,',
  accent: 'más cosecha medible.',
  items: [
    ['Contactos sin contexto', 'Cada llamada empieza de cero: quién es, qué busca, qué ya tiene.'],
    ['Seguimiento que se pierde', 'La oportunidad estaba ahí, pero nadie sabía en qué paso iba.'],
    [
      'Campañas sin dueño',
      'Se invierte en atraer, pero nadie conecta lo que entra con lo que se vende.',
    ],
  ],
};

export const principles = {
  ghost: 'Pensado para vender',
  title: 'Cuatro ideas guían cada módulo',
  sub: 'Así decidimos qué construir y qué dejar fuera.',
  items: [
    ['Contexto primero', 'Llegas a cada reunión sabiendo qué necesita la persona.'],
    ['Todo en un lugar', 'Canales, notas, citas y pólizas sin saltar entre apps.'],
    ['Se adapta a tu proceso', 'Etapas, campos y alertas configurables para tu equipo.'],
    ['Listo en minutos', 'Importa tus contactos y empieza hoy, sin consultores.'],
  ],
};

export const connections = {
  ghost: 'Conexiones',
  title: 'Se conecta con lo que ya usas',
  sub: 'Sin migraciones dolorosas ni herramientas nuevas que aprender.',
  items: [
    {
      icon: 'chat',
      title: 'WhatsApp Business',
      text: 'Conversa y registra cada mensaje en la ficha del cliente.',
    },
    {
      icon: 'calendar',
      title: 'Correo y calendario',
      text: 'Sincroniza citas y recordatorios con Google u Outlook.',
    },
    {
      icon: 'table',
      title: 'Importa desde Excel',
      text: 'Sube tu base de contactos en minutos, con validación.',
    },
    {
      icon: 'shield',
      title: 'Datos protegidos',
      text: 'Cifrado, roles por asesor y respaldo diario.',
    },
  ],
};

export const features = {
  ghost: 'Funciones',
  title: 'Todo para vender con contexto',
  sub: 'Cada módulo está pensado para que no pierdas ninguna oportunidad.',
  rows: [
    {
      tag: 'Seguimiento medible',
      title: 'Mide cómo avanza tu pipeline semana a semana',
      text: 'Indicadores simples que muestran el avance real de tus oportunidades.',
      checks: [
        'Seguimiento semanal por etapa',
        'Recomendaciones de próximo paso',
        'Resultados visibles en 30 días',
      ],
    },
    {
      tag: 'Todo en su lugar',
      title: 'Listo para usar desde el primer día',
      text: 'Etapas, campos y recordatorios configurados, sin manuales ni consultores.',
      checks: [
        'Configuración guiada paso a paso',
        'Recordatorios de seguimiento',
        'Implementación incluida en planes Equipo',
      ],
    },
    {
      tag: 'Crece con tu equipo',
      title: 'Más citas, más cierres',
      text: 'Cuando cada oportunidad tiene contexto, el equipo cierra más. Mira el cambio en citas útiles.',
      checks: [
        'Más citas efectivas por semana',
        'Menos oportunidades perdidas',
        'Equipos más contentos',
      ],
    },
  ],
};

export const whyTinto = {
  ghost: 'Por qué Tinto',
  title: 'Orden de verdad, sin pagar de',
  accent: 'más.',
  text: 'Otros CRM son caros y complicados. Tinto es accesible, fácil de usar y se adapta a tu forma de vender.',
  cta: 'Ver planes',
  boxTitle: 'Reemplaza varias herramientas con una sola',
  checks: [
    'Seguimiento medible',
    'Configuración lista desde el día uno',
    'Recordatorios y tareas',
    'Soporte y acompañamiento',
  ],
};

export const dashboard = {
  ghost: 'Tu panel',
  title: 'Todo tu progreso en un solo lugar',
  sub: 'Un panel simple para ver cómo rinde tu semana y cuidar tus oportunidades.',
};

export const plans = {
  ghost: 'Precios',
  title: 'Planes claros y simples',
  sub: 'Elige el que mejor se adapta a tu forma de vender.',
  items: [
    {
      name: 'Esencial',
      desc: 'Para equipos comerciales de hasta 5 asesores',
      price: '$49.000',
      featured: false,
      includes: ['Hasta 5 asesores', 'Pipeline y fichas', 'Soporte por correo'],
    },
    {
      name: 'Profesional',
      desc: 'Para asesores con volumen constante',
      price: '$129.000',
      featured: true,
      includes: [
        'Automatización de seguimiento',
        'Precalificación inteligente',
        'Reportes semanales',
        '30 días de prueba',
      ],
    },
    {
      name: 'Equipo',
      desc: 'Para agencias y corredoras',
      price: '$399.000',
      featured: false,
      includes: [
        'Hasta 25 asesores',
        'Asesoría de implementación',
        'Integraciones incluidas',
        'Soporte prioritario',
      ],
    },
  ],
};

export const compare = {
  ghost: 'Comparar planes',
  title: 'Descubre el mejor plan para tu equipo',
  sub: 'La eficiencia empieza por tener todo en orden.',
  head: ['Esencial', 'Profesional', 'Equipo'],
  prices: ['$49.000', '$129.000', '$399.000'],
  rows: [
    ['Pipeline y fichas', true, true, true],
    ['Precalificación', true, true, true],
    ['Automatizaciones', false, true, true],
    ['Integraciones', false, true, true],
    ['Reportes', false, true, true],
    ['Asesoría de implementación', false, false, true],
  ] as Array<[string, boolean, boolean, boolean]>,
};

export const productoClosing = {
  title: '¿Listo para tu tinto de las cinco?',
  accent: 'Agenda una demo.',
  text: 'Te mostramos Tinto con tus propios datos en 20 minutos, sin compromiso.',
};
