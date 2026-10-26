'use client';

import { useState, type CSSProperties, type FormEvent } from 'react';
import { wants } from '@/content/contacto';
import { contactSchema } from '@/lib/schemas';
import { textSize, fieldSize, u } from '@/lib/u';

const input: CSSProperties = {
  font: 'inherit',
  fontWeight: 500,
  fontSize: fieldSize(1.05),
  padding: u(1.05, 1.4),
  borderRadius: u(1.2),
  border: '1px solid rgba(240,222,200,1)',
  background: 'rgba(255,255,255,.92)',
  boxShadow: `inset 0 ${u(0.2)} ${u(0.5)} rgba(140,95,50,.08)`,
  color: '#2a1d12',
  outline: 'none',
  width: '100%',
  boxSizing: 'border-box',
};
const label: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: u(0.6),
  fontSize: textSize(0.95),
  fontWeight: 600,
  color: '#2a1d12',
};

type Status = 'idle' | 'sending' | 'done' | 'error';

/** Formulario de Contacto: validación Zod en cliente y servidor (POST /api/contacto), honeypot anti-spam. */
export function ContactForm() {
  const [sel, setSel] = useState<string[]>(['Captar leads']);
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get('name') ?? ''),
      email: String(fd.get('email') ?? ''),
      phone: String(fd.get('phone') ?? ''),
      message: String(fd.get('message') ?? ''),
      want: sel,
      website: String(fd.get('website') ?? ''),
    };
    const parsed = contactSchema.safeParse(payload);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? 'Revisa los datos');
      setStatus('error');
      return;
    }
    setStatus('sending');
    setError('');
    try {
      const res = await fetch('/api/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) throw new Error(data.error || 'No pudimos enviar tu mensaje.');
      setStatus('done');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No pudimos enviar tu mensaje.');
      setStatus('error');
    }
  }

  return (
    <div
      id="form"
      className="cream soft contact-form"
      style={{ borderRadius: u(2.6), padding: `var(--mobile-form-padding, ${u(2.6)})`, gap: u(1.3) }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: u(1),
        }}
      >
        <h2 style={{ margin: 0, fontSize: textSize(1.7), fontWeight: 800, letterSpacing: '-.02em' }}>
          Escríbenos
        </h2>
        <span className="tag" style={{ fontSize: textSize(0.8) }}>
          Respuesta en 24 h
        </span>
      </div>

      {status === 'done' ? (
        <div
          role="status"
          data-testid="contact-success"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: u(1),
            alignItems: 'flex-start',
            padding: u(2, 0),
          }}
        >
          <span
            style={{
              width: u(4.4),
              height: u(4.4),
              borderRadius: '50%',
              background: 'var(--grad-primary)',
              color: '#fff',
              display: 'grid',
              placeItems: 'center',
              fontSize: textSize(2),
            }}
          >
            ✓
          </span>
          <div style={{ fontSize: textSize(1.7), fontWeight: 800, letterSpacing: '-.02em' }}>
            ¡Gracias! Recibimos tu mensaje.
          </div>
          <div style={{ fontSize: textSize(1.1), lineHeight: 1.5, color: '#7a6a58' }}>
            Un asesor te responde en menos de 24 horas.
          </div>
        </div>
      ) : (
        <form
          onSubmit={onSubmit}
          noValidate
          style={{ display: 'flex', flexDirection: 'column', gap: u(1.3) }}
        >
          <label style={label}>
            Nombre completo
            <input
              className="field"
              name="name"
              type="text"
              autoComplete="name"
              inputMode="text"
              enterKeyHint="next"
              placeholder="Tu nombre completo"
              style={input}
            />
          </label>
          <label style={label}>
            Correo electrónico
            <input
              className="field"
              name="email"
              type="email"
              inputMode="email"
              enterKeyHint="next"
              autoComplete="email"
              placeholder="tu@correo.com"
              style={input}
            />
          </label>
          <label style={label}>
            Teléfono
            <input
              className="field"
              name="phone"
              type="tel"
              inputMode="tel"
              enterKeyHint="next"
              autoComplete="tel"
              placeholder="+57 300 000 0000"
              style={input}
            />
          </label>
          <div
            role="group"
            aria-label="¿Qué buscas?"
            style={{ display: 'flex', flexDirection: 'column', gap: u(0.6) }}
          >
            <div style={{ fontSize: textSize(0.95), fontWeight: 600 }}>¿Qué buscas?</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: u(0.6) }}>
              {wants.map((w) => {
                const on = sel.includes(w);
                return (
                  <button
                    key={w}
                    type="button"
                    aria-pressed={on}
                    onClick={() => setSel((s) => (on ? s.filter((x) => x !== w) : [...s, w]))}
                    style={{
                      cursor: 'pointer',
                      padding: u(0.55, 1.2),
                      borderRadius: 99,
                      fontSize: textSize(0.9),
                      fontWeight: 600,
                      ...(on
                        ? {
                            background: 'var(--grad-primary)',
                            color: '#fff',
                            border: 0,
                            boxShadow:
                              'inset 0 1px 0 rgba(255,255,255,.6),0 6px 14px rgba(255,120,60,.3)',
                          }
                        : {
                            background:
                              'linear-gradient(180deg,rgba(255,255,255,.95),rgba(246,232,214,.85))',
                            border: '1px solid rgba(138,90,31,.22)',
                            color: '#2a1d12',
                          }),
                    }}
                  >
                    {w}
                  </button>
                );
              })}
            </div>
          </div>
          <label style={label}>
            Mensaje
            <textarea
              className="field"
              name="message"
              rows={4}
              enterKeyHint="enter"
              placeholder="Cuéntanos cómo es tu día de trabajo…"
              style={{ ...input, resize: 'vertical', minHeight: u(8) }}
            />
          </label>
          {/* honeypot: invisible para personas; los bots lo rellenan */}
          <div
            aria-hidden="true"
            style={{ position: 'absolute', left: -9999, width: 1, height: 1, overflow: 'hidden' }}
          >
            <label>
              No llenar este campo
              <input name="website" type="text" tabIndex={-1} autoComplete="off" />
            </label>
          </div>
          {status === 'error' && (
            <div
              role="alert"
              style={{
                fontSize: textSize(1),
                color: '#a2442f',
                background: '#fbe3dc',
                padding: u(0.8, 1.2),
                borderRadius: u(1),
              }}
            >
              {error}
            </div>
          )}
          <button
            type="submit"
            className="btn btn-lift btn-strong"
            disabled={status === 'sending'}
            style={{
              alignSelf: 'flex-start',
              gap: u(1),
              background: 'var(--grad-primary)',
              color: '#fff',
              padding: u(1, 2.4),
              fontSize: textSize(1.1),
              fontWeight: 700,
            }}
          >
            {status === 'sending' ? 'Enviando…' : 'Enviar mensaje'}{' '}
            <span style={{ fontSize: textSize(1.3) }} aria-hidden="true">
              →
            </span>
          </button>
        </form>
      )}
    </div>
  );
}
