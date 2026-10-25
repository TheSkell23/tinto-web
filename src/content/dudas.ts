export const dudasHero = {
  ghost: 'Pregunta lo que quieras',
  title: 'Resolvemos',
  accent: 'tus dudas.',
  text: 'Pregúntale al asistente de Tinto cómo funciona el CRM, los planes o la implementación. Si prefieres hablar con una persona, también estamos.',
};

export const chatWelcome =
  '¡Hola! Soy el asistente de Tinto. Puedo contarte cómo funciona el CRM, los planes o cómo empezar. ¿Qué quieres saber?';

export const quickQuestions = [
  '¿Cuánto cuesta?',
  '¿Cómo agendo una demo?',
  '¿Se integra con WhatsApp?',
  '¿Mis datos están seguros?',
];

export const ideaQuestions = [
  '¿Qué es la precalificación?',
  '¿Puedo importar mis contactos desde Excel?',
  '¿Cuántos asesores caben en mi plan?',
  '¿Hay prueba gratis?',
];

export const faqSection = {
  ghost: 'Lo básico',
  title: 'Preguntas frecuentes',
  sub: 'Lo que más nos preguntan antes de empezar.',
  items: [
    [
      '¿Qué hace Tinto exactamente?',
      'Trabaja la parte previa a la venta: atrae personas interesadas, las precalifica y deja cada oportunidad organizada para que tu equipo converse con contexto.',
    ],
    [
      '¿Reemplaza a mi equipo comercial?',
      'No. La conversación sigue siendo de tus asesores. Tinto se encarga de que lleguen a ella con más información y menos trabajo previo.',
    ],
    [
      '¿Para qué tamaño de agencia es?',
      'Para agencias que facturan desde USD 25.000 al mes y ya tienen un equipo vendiendo.',
    ],
    [
      '¿Cómo empezamos?',
      'Con una conversación para entender tu agencia, tus ramos y cómo vendes hoy. De ahí sale un plan claro de qué hacer primero.',
    ],
  ] as Array<[string, string]>,
};

export const humanCard = {
  alt: 'Asesora de Tinto con audífonos sonriendo',
  title: '¿Prefieres hablar con una persona?',
  text: 'Elige el canal que te quede mejor. Te respondemos en menos de 24 horas.',
  channels: [
    ['W', 'WhatsApp', 'Chat con un asesor', '~15 min'],
    ['@', 'Correo', 'hola@tinto.co', '< 24 h'],
    ['☎', 'Llamada', 'Lun – Vie · 9:00 – 18:00', 'Agendar'],
  ],
};

export const dudasClosing = {
  title: '¿Todavía con dudas?',
  accent: 'Conversemos.',
  text: 'Agenda una demo de 20 minutos y te lo mostramos con tus propios datos.',
};
