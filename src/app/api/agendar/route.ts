import { NextResponse } from 'next/server';
import { bookingSchema } from '@/lib/schemas';
import { bookingChannels } from '@/content/agendar';
import { sendMail } from '@/lib/mail';

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Solicitud inválida' }, { status: 400 });
  }
  const parsed = bookingSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: parsed.error.issues[0]?.message ?? 'Datos inválidos' },
      { status: 422 },
    );
  }
  const d = parsed.data;
  if (d.website) return NextResponse.json({ ok: true });

  const res = await sendMail({
    subject: `Nueva cita — ${d.name} (${d.day} ${d.slot})`,
    replyTo: d.email,
    fields: [
      ['Canal', bookingChannels[d.channel].name],
      ['Día', d.day],
      ['Hora', d.slot],
      ['Nombre', d.name],
      ['Correo', d.email],
      ['Teléfono', d.phone || '—'],
      ['Qué busca', d.what.join(', ') || '—'],
    ],
  });
  if (!res.ok) return NextResponse.json({ ok: false, error: res.error }, { status: 503 });
  return NextResponse.json({ ok: true });
}
