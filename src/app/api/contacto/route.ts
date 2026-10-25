import { NextResponse } from 'next/server';
import { contactSchema } from '@/lib/schemas';
import { sendMail } from '@/lib/mail';

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Solicitud inválida' }, { status: 400 });
  }
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: parsed.error.issues[0]?.message ?? 'Datos inválidos' },
      { status: 422 },
    );
  }
  const d = parsed.data;
  // Honeypot: un bot rellenó el campo oculto. Se responde "ok" sin enviar nada.
  if (d.website) return NextResponse.json({ ok: true });

  const res = await sendMail({
    subject: `Nuevo mensaje de contacto — ${d.name}`,
    replyTo: d.email,
    fields: [
      ['Nombre', d.name],
      ['Correo', d.email],
      ['Teléfono', d.phone || '—'],
      ['Qué busca', d.want.join(', ') || '—'],
      ['Mensaje', d.message || '—'],
    ],
  });
  if (!res.ok) return NextResponse.json({ ok: false, error: res.error }, { status: 503 });
  return NextResponse.json({ ok: true });
}
