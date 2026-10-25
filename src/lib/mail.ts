import { Resend } from 'resend';

export type MailResult = { ok: true; simulated?: boolean } | { ok: false; error: string };

const esc = (s: string) =>
  s.replace(
    /[&<>"']/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] as string,
  );

/**
 * Envía un correo con Resend. Sin RESEND_API_KEY: en desarrollo responde éxito y registra en consola;
 * en producción devuelve un error amable. Nunca lanza por falta de variables (no rompe el build).
 */
export async function sendMail(opts: {
  subject: string;
  fields: Array<[string, string]>;
  replyTo?: string;
}): Promise<MailResult> {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!key || !to || !from) {
    if (process.env.NODE_ENV !== 'production') {
      console.info(
        '[tinto] Formulario recibido (sin Resend configurado):',
        opts.subject,
        Object.fromEntries(opts.fields),
      );
      return { ok: true, simulated: true };
    }
    return {
      ok: false,
      error:
        'No pudimos enviar tu mensaje ahora. Escríbenos por WhatsApp o a nuestro correo y te respondemos en menos de 24 horas.',
    };
  }

  try {
    const resend = new Resend(key);
    const html = `<h2>${esc(opts.subject)}</h2><table>${opts.fields
      .map(([k, v]) => `<tr><td><b>${esc(k)}</b></td><td>${esc(v)}</td></tr>`)
      .join('')}</table>`;
    const { error } = await resend.emails.send({
      from,
      to,
      subject: opts.subject,
      html,
      replyTo: opts.replyTo,
    });
    if (error) throw new Error(error.message);
    return { ok: true };
  } catch (e) {
    console.error('[tinto] Error al enviar con Resend', e);
    return {
      ok: false,
      error:
        'No pudimos enviar tu mensaje ahora. Inténtalo de nuevo en unos minutos o escríbenos por WhatsApp.',
    };
  }
}
