/**
 * PUNTO DE CONEXIÓN DEL AGENTE DE IA (único lugar a reemplazar).
 * Hoy responde con reglas por palabra clave tomadas del diseño. Para usar una IA real,
 * reemplaza el cuerpo de answer() por la llamada a tu agente (debe devolver texto).
 * No se llama a ningún servicio externo.
 */
export const FALLBACK_ERROR =
  'No pude responder en este momento, pero un asesor puede ayudarte por WhatsApp o correo en menos de 24 horas.';

const RULES: Array<[RegExp, string]> = [
  [
    /precio|plan|cuesta|cobr|pago/,
    'Tenemos tres planes mensuales: Esencial ($49.000), Profesional ($129.000) y Equipo ($399.000). Todos incluyen 14 días de prueba gratis y no pedimos tarjeta.',
  ],
  [
    /demo|agendar|cita|reuni/,
    'Puedes agendar una demo de 20 minutos por videollamada o visitarnos en la oficina de Bogotá. Entra a "¿Agendamos un tinto?" y elige día y hora.',
  ],
  [
    /whatsapp|integra|correo|calendario|excel|importar/,
    'Tinto se conecta con WhatsApp Business, correo y calendario (Google u Outlook), y puedes importar tus contactos desde Excel en minutos.',
  ],
  [
    /segur|dato|privacidad|cifr/,
    'Tus datos son tuyos: van cifrados, con roles por asesor, respaldo diario y siempre puedes exportarlos.',
  ],
  [
    /precalific|calific|lead|oportunidad/,
    'La precalificación hace unas preguntas clave a cada persona (por ejemplo, cuándo vence su póliza) y le da un puntaje para que sepas a quién llamar primero.',
  ],
  [
    /equipo|asesores|agencia|corredora/,
    'Con el plan Equipo puedes tener hasta 25 asesores y sumar más agencias, repartir oportunidades automáticamente y ver reportes por persona.',
  ],
  [
    /prueba|gratis/,
    'Pruebas Tinto 14 días gratis, sin tarjeta de crédito y con soporte en español.',
  ],
  [/hola|buenas|hey/, '¡Hola! ¿Qué te gustaría saber de Tinto?'],
];

const NO_MATCH =
  'Buena pregunta. Todavía no tengo una respuesta exacta, pero un asesor puede ayudarte por WhatsApp o correo en menos de 24 horas desde la página de Contacto.';

export async function answer(q: string): Promise<string> {
  const t = q.toLowerCase();
  for (const [re, text] of RULES) if (re.test(t)) return text;
  return NO_MATCH;
}
