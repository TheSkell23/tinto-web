export const solHero = {
  ghost: 'Para cada equipo',
  title: 'Una solución para',
  accent: 'cada forma de vender.',
  text: 'Para agencias que ya venden: desde un equipo de 5 asesores hasta una red de varias agencias. Configuramos Tinto según cómo trabajas.',
  board: {
    title: 'Equipo comercial',
    period: 'Reparto por asesor',
    columns: [
      {
        label: 'ANA M.',
        count: 9,
        items: [
          ['M', 'Marta Rojas', 'Salud', 72, false],
          ['P', 'Paula Ríos', 'Auto', 84, true],
          ['L', 'Luisa Vega', 'Hogar', 64, false],
          ['J', 'Jorge Peña', 'Pyme', 61, false],
        ],
      },
      {
        label: 'LUIS G.',
        count: 6,
        items: [
          ['C', 'Camilo Díaz', 'Salud', 91, true],
          ['J', 'Jorge Peña', 'Pyme', 61, false],
          ['E', 'Elena Mora', 'Vida', 88, true],
        ],
      },
      {
        label: 'CARLA R.',
        count: 11,
        items: [
          ['T', 'Tomás León', 'Pyme', 95, true],
          ['S', 'Sofía Cano', 'Salud', 93, true],
          ['I', 'Iván Ruiz', 'Auto', 90, true],
        ],
      },
    ],
    card: {
      label: 'ASIGNACIÓN AUTOMÁTICA',
      badge: 'Nueva',
      title: 'Elena Mora → Luis G.',
      rows: [
        ['Motivo', 'Menor carga'],
        ['Meta semanal', '6 / 10'],
      ],
    },
  },
} as const;

export const solFor = {
  ghost: 'Para quién es',
  title: 'Agencias que ya venden y quieren',
  accent: 'crecer con orden',
  alt: 'Equipo de asesores trabajando en una oficina abierta',
  live: 'Equipo en vivo · 12 asesores',
  today: {
    label: 'OPORTUNIDADES HOY',
    value: '+24',
    rows: [
      ['M', 'Marta Rojas', 'Salud colectiva · Ana M.', 'Nueva', true],
      ['C', 'Camilo Díaz', 'Vida · Luis G.', 'En curso', false],
    ],
    progress: 72,
    goal: 'Meta semanal',
  },
  citas: { label: 'CITAS AGENDADAS', value: '38', delta: '↑ 18%' },
  card: {
    label: '¿ES PARA TU AGENCIA?',
    badge: 'Punto de partida',
    big: 'USD 25.000',
    text: 'de facturación mensual es el punto desde el que Tinto tiene más sentido para una agencia.',
    scale: ['Hoy', 'USD 25.000', 'Crecimiento'],
    checks: [
      ['Ya tienen un equipo de asesores en operación.', '5+ asesores'],
      ['Quieren más oportunidades calificadas, no más contactos.', 'Calidad > volumen'],
      ['Buscan saber de dónde viene cada venta.', 'Origen trazado'],
    ],
    stats: [
      ['5+', 'asesores vendiendo'],
      ['100%', 'de leads con origen'],
      ['1 vista', 'para todo el equipo'],
    ],
  },
};

export const solTypes = {
  ghost: 'Tu equipo',
  title: '¿Cómo vendes?',
  sub: 'Tres perfiles, tres formas de configurarlo.',
  items: [
    {
      image: '/images/foto-equipo.png',
      alt: 'Equipo de asesores riendo con un tinto en la mano',
      chip: 'Tu equipo en sincronía',
      chipColor: '#2fbf71',
      glass: ['HOY', '8 seguimientos del equipo', 'Ana, Luis y Carla', '+12'],
      range: 'De 5 a 15 asesores',
      title: 'Agencia con equipo comercial',
      text: 'Deja las hojas de cálculo: las oportunidades, citas y renovaciones de todo tu equipo en un solo lugar.',
      checks: ['Pipeline compartido', 'Reparto de oportunidades', 'WhatsApp integrado'],
    },
    {
      image: '/images/foto-corredora.png',
      alt: 'Equipo de una agencia revisando oportunidades en un portátil',
      chip: 'Asignación automática',
      chipColor: '#e8782a',
      glass: ['NUEVA OPORTUNIDAD', 'Elena Mora → Luis G.', 'Menor carga del equipo', '6/10'],
      range: 'De 15 a 50 asesores',
      title: 'Agencia o corredora',
      text: 'Reparte oportunidades, mide a cada asesor y no pierdas ningún lead.',
      checks: ['Asignación automática', 'Metas por asesor', 'Reportes de equipo'],
    },
    {
      image: '/images/foto-oficina.png',
      // Misma foto que la portada de esta página: decorativa aquí para no repetir la descripción.
      alt: '',
      chip: '3 agencias conectadas',
      chipColor: '#2fbf71',
      glass: ['REPORTE CONSOLIDADO', '128 asesores activos', 'Permisos por agencia', '+38%'],
      range: 'Varias agencias',
      title: 'Red comercial',
      text: 'Gestiona múltiples agencias con permisos y reportes consolidados.',
      checks: ['Roles y permisos', 'Marca por agencia', 'API e integraciones'],
    },
  ],
};

export const solSteps = {
  ghost: 'Paso a paso',
  title: 'De tu equipo a tu primera semana',
  sub: 'Cuatro pasos, sin consultores ni semanas de espera.',
  items: [
    ['Nos cuentas cómo vendes', 'Canales, etapas y cuántos asesores usarán Tinto.'],
    ['Configuramos contigo', 'Importamos contactos y dejamos tu pipeline listo.'],
    ['Capacitamos al equipo', 'Sesión corta con casos reales de tu operación.'],
    ['Acompañamos el primer mes', 'Seguimiento semanal durante el primer mes.'],
  ],
};

export const solTable = {
  ghost: 'Qué incluye',
  title: 'Cada equipo, en una tabla',
  sub: 'Qué cambia según cómo vendes.',
  cols: ['Agencia con equipo comercial', 'Agencia o corredora', 'Red comercial'],
  rows: [
    ['Asesores', '5 a 15', '15 a 50', 'Más de 50 y varias agencias'],
    ['Implementación', 'Guiada', 'Acompañada', 'A medida'],
    ['Integraciones', 'WhatsApp + correo', 'WhatsApp + correo', 'API y CRM propio'],
    ['Reportes', 'Del equipo', 'Por asesor y agencia', 'Consolidados'],
    ['Desde', 'Desde $129.000 / mes', 'Desde $399.000 / mes', 'A cotizar'],
  ],
};

export const solBenefit = {
  ghost: 'Para quién es',
  title: '¿Quién se beneficia más?',
  items: [
    {
      chips: [
        ['Lead', 'a'],
        ['Cita', 'b'],
      ],
      bars: [90, 70, 55],
      title: 'Agencia con equipo comercial',
      text: 'Agencias que ya venden y quieren ordenar su equipo sin complicarse.',
    },
    {
      chips: [['5 asesores', 'a']],
      bars: [80, 95, 60],
      title: 'Agencias y corredoras',
      text: 'Equipos que buscan repartir y medir sus oportunidades con una configuración a medida.',
    },
    {
      chips: [['Seguimiento', 'b']],
      bars: [65, 85, 50],
      title: 'Equipos de alto volumen',
      text: 'Quienes reciben decenas de leads al día y no quieren perder ninguno.',
    },
  ] as Array<{ chips: Array<[string, 'a' | 'b']>; bars: number[]; title: string; text: string }>,
};

export const solClosing = {
  title: 'Cuéntanos cómo vendes.',
  accent: 'Nosotros lo configuramos.',
  text: 'Agenda una demo y recibe tu propuesta en 48 h.',
};
