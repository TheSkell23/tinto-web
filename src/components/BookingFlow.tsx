'use client';

import Link from 'next/link';
import { useMemo, useState, useSyncExternalStore, type CSSProperties, type ReactNode } from 'react';
import { bookingChannels, bookingWants, months, timeSlots, weekdays } from '@/content/agendar';
import { bookingSchema, formatDay } from '@/lib/schemas';
import { u } from '@/lib/u';

const SEL = 'rgba(255,255,255,.95)';
const OFF = 'rgba(255,255,255,.55)';
const BD_OFF = 'rgba(138,90,31,.15)';
const EMAIL = /.+@.+/;

const stepNum: CSSProperties = {
  flex: 'none',
  width: u(2.8),
  height: u(2.8),
  borderRadius: '50%',
  background: 'var(--grad-primary)',
  color: '#fff',
  display: 'grid',
  placeItems: 'center',
  fontSize: u(1.2),
  fontWeight: 800,
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,.6),0 6px 14px rgba(255,120,60,.3)',
};
const stepTitle: CSSProperties = {
  margin: 0,
  fontSize: u(1.7),
  fontWeight: 800,
  letterSpacing: '-.02em',
};
const inputSt: CSSProperties = {
  width: '100%',
  boxSizing: 'border-box',
  marginTop: u(0.5),
  padding: u(1.1, 1.3),
  borderRadius: u(1.2),
  border: '1px solid rgba(138,90,31,.22)',
  background: 'rgba(255,255,255,.9)',
  font: 'inherit',
  fontSize: u(1.1),
  color: '#2a1d12',
  outline: 'none',
};
const fieldLabel: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  fontSize: u(1),
  fontWeight: 700,
  color: '#7a6a58',
};
const sumRow: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  gap: u(1),
  padding: u(0.9, 0),
  borderTop: '1px solid rgba(42,29,18,.08)',
  fontSize: u(1.1),
};

function Step({ n, title, children }: { n: number; title: string; children: ReactNode }) {
  return (
    <section
      aria-labelledby={`booking-step-${n}`}
      className="cream"
      style={{
        padding: u(2.4),
        gap: u(1.4),
        background: 'linear-gradient(160deg,rgba(255,253,249,.92),rgba(255,246,235,.7))',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: u(1.1) }}>
        <span style={stepNum}>{n}</span>
        <h2 id={`booking-step-${n}`} style={stepTitle}>
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

const subscribeNever = () => () => {};
const todayKey = () => {
  const n = new Date();
  const p = (x: number) => String(x).padStart(2, '0');
  return n.getFullYear() + '-' + p(n.getMonth() + 1) + '-' + p(n.getDate());
};

/** Flujo de reserva: canal → día/hora → datos, con resumen y pantalla de confirmación. */
export function BookingFlow() {
  const [ch, setCh] = useState(0);
  const [day, setDay] = useState(0);
  const [slot, setSlot] = useState(-1);
  const [name, setName] = useState('');
  const [mail, setMail] = useState('');
  const [phone, setPhone] = useState('');
  const [what, setWhat] = useState<string[]>([]);
  const [done, setDone] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [hp, setHp] = useState('');

  // Los 7 días siguientes (sin domingos). La fecha de hoy solo existe en el cliente (el HTML estático no la conoce).
  const today = useSyncExternalStore(subscribeNever, todayKey, () => '');
  const dates = useMemo(() => {
    if (!today) return [];
    const d0 = new Date(today + 'T00:00:00');
    const list: Date[] = [];
    for (let k = 1; list.length < 7; k++) {
      const d = new Date(d0);
      d.setDate(d0.getDate() + k);
      if (d.getDay() !== 0) list.push(d);
    }
    return list;
  }, [today]);

  const channel = bookingChannels[ch];
  const dd = dates[day];
  const ok = slot >= 0 && name.trim().length > 0 && EMAIL.test(mail);
  const sumDay = dd ? `${weekdays[dd.getDay()]} ${dd.getDate()} de ${months[dd.getMonth()]}` : '—';
  const sumTime = slot >= 0 ? timeSlots[slot] : 'Elige un horario';

  async function submit() {
    if (!ok || !dd || sending) return;
    const parsed = bookingSchema.safeParse({
      channel: ch,
      day: formatDay(dd),
      slot: timeSlots[slot],
      name,
      email: mail,
      phone,
      what,
      website: hp,
    });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? 'Revisa los datos');
      return;
    }
    setSending(true);
    setError('');
    try {
      const res = await fetch('/api/agendar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) throw new Error(data.error || 'No pudimos reservar tu cita.');
      setDone(true);
      window.scrollTo({
        top: 0,
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'No pudimos reservar tu cita.');
    } finally {
      setSending(false);
    }
  }

  if (done) {
    return (
      <div
        className="cream"
        data-testid="booking-done"
        style={{
          padding: u(4),
          gap: u(1.4),
          maxWidth: u(52),
          margin: `0 auto ${u(6)}`,
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <span
          style={{
            width: u(6),
            height: u(6),
            borderRadius: '50%',
            background: 'var(--grad-primary)',
            color: '#fff',
            display: 'grid',
            placeItems: 'center',
            fontSize: u(2.6),
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,.6),0 10px 24px rgba(255,120,60,.35)',
          }}
          aria-hidden="true"
        >
          ✓
        </span>
        <h2
          style={{
            margin: 0,
            fontSize: u(3),
            lineHeight: 1.08,
            fontWeight: 800,
            letterSpacing: '-.035em',
          }}
        >
          ¡Listo, {name.trim().split(' ')[0]}! Tu tinto está agendado.
        </h2>
        <p
          style={{
            margin: 0,
            fontSize: u(1.2),
            lineHeight: 1.55,
            color: '#7a6a58',
            maxWidth: u(38),
          }}
        >
          {channel.name} · {sumDay} · {sumTime}. Te enviaremos la confirmación a {mail}.
        </p>
        <div
          style={{
            display: 'flex',
            gap: u(1.2),
            marginTop: u(1),
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          <Link
            href="/"
            className="btn btn-primary"
            style={{ padding: u(1.2, 2.4), fontSize: u(1.2) }}
          >
            Volver al inicio
          </Link>
          <button
            type="button"
            className="link-ink"
            style={{
              background: 'none',
              border: 0,
              cursor: 'pointer',
              fontSize: u(1.2),
              padding: u(1.2, 1.6),
            }}
            onClick={() => {
              setDone(false);
              setSlot(-1);
            }}
          >
            Agendar otra →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="rg"
      style={
        {
          '--c': 'minmax(0,1.6fr) minmax(0,1fr)',
          gap: u(2),
          alignItems: 'start',
          paddingBottom: u(9),
        } as CSSProperties
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: u(1.6) }}>
        <Step n={1} title="¿Cómo quieres conversar?">
          <div
            className="rg"
            role="group"
            aria-label="Canal"
            style={{ '--c': 'repeat(3,1fr)', '--m': 1, gap: u(1.2) } as CSSProperties}
          >
            {bookingChannels.map((c, i) => (
              <button
                key={c.name}
                type="button"
                aria-pressed={ch === i}
                onClick={() => setCh(i)}
                className="bk-opt"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  gap: u(0.6),
                  padding: u(1.6),
                  borderRadius: u(1.6),
                  textAlign: 'left',
                  cursor: 'pointer',
                  border: `2px solid ${ch === i ? '#ff8a3d' : BD_OFF}`,
                  background: ch === i ? SEL : OFF,
                }}
              >
                <span className="tag" style={{ alignSelf: 'flex-start' }}>
                  {c.meta}
                </span>
                <span style={{ fontSize: u(1.35), fontWeight: 800, letterSpacing: '-.02em' }}>
                  {c.name}
                </span>
                <span style={{ fontSize: u(1), lineHeight: 1.45, color: '#7a6a58' }}>{c.desc}</span>
              </button>
            ))}
          </div>
        </Step>

        <Step n={2} title="Elige día y hora">
          <div
            className="rg bk-days"
            role="group"
            aria-label="Día"
            style={{ '--c': 'repeat(7,1fr)', '--m': 4, gap: u(0.8) } as CSSProperties}
          >
            {(dates.length ? dates : Array.from({ length: 7 }, () => null)).map((d, i) => (
              <button
                key={i}
                type="button"
                aria-pressed={day === i}
                disabled={!d}
                onClick={() => {
                  setDay(i);
                  setSlot(-1);
                }}
                className="bk-opt"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: u(0.2),
                  padding: u(1, 0.4),
                  borderRadius: u(1.4),
                  cursor: 'pointer',
                  border: `2px solid ${day === i ? '#ff8a3d' : BD_OFF}`,
                  background: day === i ? SEL : OFF,
                }}
              >
                <span
                  style={{
                    fontSize: u(0.85),
                    fontWeight: 700,
                    letterSpacing: '.08em',
                    textTransform: 'uppercase',
                    color: '#7a6a58',
                  }}
                >
                  {d ? weekdays[d.getDay()] : '···'}
                </span>
                <span style={{ fontSize: u(1.7), fontWeight: 800 }}>{d ? d.getDate() : '–'}</span>
                <span style={{ fontSize: u(0.85), color: '#7a6a58' }}>
                  {d ? months[d.getMonth()] : ''}
                </span>
              </button>
            ))}
          </div>
          <div
            className="rg bk-slots"
            role="group"
            aria-label="Hora"
            style={{ '--c': 'repeat(6,1fr)', '--m': 3, gap: u(0.8) } as CSSProperties}
          >
            {timeSlots.map((t, i) => {
              const off = (day + i) % 4 === 3;
              const on = slot === i;
              return (
                <button
                  key={t}
                  type="button"
                  aria-pressed={on}
                  aria-disabled={off}
                  disabled={off}
                  onClick={() => !off && setSlot(i)}
                  className="bk-opt"
                  style={{
                    textAlign: 'center',
                    padding: u(0.9, 0),
                    borderRadius: 99,
                    cursor: off ? 'not-allowed' : 'pointer',
                    border: `2px solid ${on ? '#ff8a3d' : BD_OFF}`,
                    background: on ? 'var(--grad-primary)' : OFF,
                    color: on ? '#fff' : off ? 'rgba(122,106,88,.5)' : '#2a1d12',
                    fontSize: u(1.1),
                    fontWeight: 700,
                    textDecoration: off ? 'line-through' : 'none',
                  }}
                >
                  {t}
                </button>
              );
            })}
          </div>
        </Step>

        <Step n={3} title="Tus datos">
          <div className="rg" style={{ '--c': '1fr 1fr', gap: u(1.2) } as CSSProperties}>
            <label style={fieldLabel}>
              Nombre completo
              <input
                className="field"
                type="text"
                name="name"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tu nombre completo"
                style={inputSt}
              />
            </label>
            <label style={fieldLabel}>
              Correo electrónico
              <input
                className="field"
                type="email"
                name="email"
                autoComplete="email"
                value={mail}
                onChange={(e) => setMail(e.target.value)}
                placeholder="tu@correo.com"
                style={inputSt}
              />
            </label>
            <label style={fieldLabel}>
              Teléfono
              <input
                className="field"
                type="tel"
                name="phone"
                autoComplete="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+57 300 000 0000"
                style={inputSt}
              />
            </label>
            <div role="group" aria-label="¿Qué buscas?" style={fieldLabel}>
              ¿Qué buscas?
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: u(0.6), marginTop: u(0.5) }}>
                {bookingWants.map((w) => {
                  const on = what.includes(w);
                  return (
                    <button
                      key={w}
                      type="button"
                      aria-pressed={on}
                      onClick={() => setWhat((s) => (on ? s.filter((x) => x !== w) : [...s, w]))}
                      className="bk-opt"
                      style={{
                        cursor: 'pointer',
                        padding: u(0.7, 1.2),
                        borderRadius: 99,
                        border: `2px solid ${on ? '#ff8a3d' : BD_OFF}`,
                        background: on ? SEL : OFF,
                        fontSize: u(1),
                        fontWeight: 700,
                        color: '#2a1d12',
                      }}
                    >
                      {w}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
          <div
            aria-hidden="true"
            style={{ position: 'absolute', left: -9999, width: 1, height: 1, overflow: 'hidden' }}
          >
            <label>
              No llenar este campo
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={hp}
                onChange={(e) => setHp(e.target.value)}
              />
            </label>
          </div>
        </Step>
      </div>

      <aside
        className="cream bk-sum"
        aria-label="Resumen de tu cita"
        style={{
          padding: u(2.4),
          gap: u(1.4),
          background: 'linear-gradient(160deg,rgba(255,253,249,.92),rgba(255,246,235,.7))',
          position: 'sticky',
          top: 110,
        }}
      >
        <div
          style={{
            fontSize: u(0.9),
            fontWeight: 700,
            letterSpacing: '.14em',
            textTransform: 'uppercase',
            color: '#e8782a',
          }}
        >
          Tu cita
        </div>
        <div style={{ fontSize: u(1.8), fontWeight: 800, letterSpacing: '-.02em' }}>
          {channel.name}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={sumRow}>
            <span style={{ color: '#7a6a58' }}>Duración</span>
            <span style={{ fontWeight: 700 }}>{channel.meta.split(' · ')[0]}</span>
          </div>
          <div style={sumRow}>
            <span style={{ color: '#7a6a58' }}>Día</span>
            <span style={{ fontWeight: 700, textAlign: 'right' }} data-testid="sum-day">
              {sumDay}
            </span>
          </div>
          <div style={sumRow}>
            <span style={{ color: '#7a6a58' }}>Hora</span>
            <span style={{ fontWeight: 700, textAlign: 'right' }} data-testid="sum-time">
              {sumTime}
            </span>
          </div>
          <div style={sumRow}>
            <span style={{ color: '#7a6a58' }}>Costo</span>
            <span style={{ fontWeight: 700 }}>Gratis</span>
          </div>
        </div>
        <button
          type="button"
          data-testid="confirm"
          className="btn btn-primary"
          disabled={!ok || sending}
          onClick={submit}
          style={{ padding: u(1.2, 2.4), fontSize: u(1.2), width: '100%' }}
        >
          {sending ? 'Confirmando…' : 'Confirmar cita'}
        </button>
        {error && (
          <div
            role="alert"
            style={{
              fontSize: u(0.95),
              color: '#a2442f',
              background: '#fbe3dc',
              padding: u(0.8, 1.2),
              borderRadius: u(1),
              textAlign: 'center',
            }}
          >
            {error}
          </div>
        )}
        <div style={{ fontSize: u(0.95), lineHeight: 1.5, color: '#7a6a58', textAlign: 'center' }}>
          {ok
            ? 'Sin costo y sin compromiso de compra.'
            : 'Completa horario, nombre y correo para confirmar.'}
        </div>
      </aside>
    </div>
  );
}
