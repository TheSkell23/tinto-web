export const agendarHero = {
  ghost: 'Reserva tu cita',
  title: '¿Agendamos un',
  accent: 'tinto?',
  text: 'Elige cómo, cuándo y déjanos tus datos. Te confirmamos por correo en menos de 24 horas.',
};

export const bookingChannels = [
  {
    name: 'Demo por videollamada',
    meta: '20 min',
    desc: 'Te mostramos Tinto con tus propios datos, sin salir de la oficina.',
  },
] as const;

export const weekdays = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'] as const;
export const months = [
  'ene',
  'feb',
  'mar',
  'abr',
  'may',
  'jun',
  'jul',
  'ago',
  'sep',
  'oct',
  'nov',
  'dic',
] as const;
export const timeSlots = ['9:00', '10:00', '11:00', '14:00', '15:00', '16:00'] as const;
export const bookingWants = ['Captar leads', 'Precalificar', 'Pipeline', 'Reportes'] as const;
