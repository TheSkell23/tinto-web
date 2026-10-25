import { z } from 'zod';
import { bookingWants, months, weekdays } from '@/content/agendar';

// El diseño valida el correo con /.+@.+/; se mantiene esa regla (más estricta que nada, sin falsos rechazos).
const emailRule = /.+@.+/;

const honeypot = z.string().max(200).optional();

export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Escribe tu nombre completo'),
  email: z.string().trim().regex(emailRule, 'Escribe un correo válido'),
  phone: z.string().trim().max(40).optional().default(''),
  want: z.array(z.string().max(40)).max(8).default([]),
  message: z.string().trim().max(2000).optional().default(''),
  website: honeypot,
});
export type ContactInput = z.input<typeof contactSchema>;

export const bookingSchema = z.object({
  channel: z.number().int().min(0).max(2),
  day: z.string().min(3).max(40),
  slot: z.enum(['9:00', '10:00', '11:00', '14:00', '15:00', '16:00']),
  name: z.string().trim().min(2, 'Escribe tu nombre completo'),
  email: z.string().trim().regex(emailRule, 'Escribe un correo válido'),
  phone: z.string().trim().max(40).optional().default(''),
  what: z.array(z.enum(bookingWants)).max(4).default([]),
  website: honeypot,
});
export type BookingInput = z.input<typeof bookingSchema>;

/** "mar 28 de oct" */
export function formatDay(d: Date): string {
  return `${weekdays[d.getDay()]} ${d.getDate()} de ${months[d.getMonth()]}`;
}
