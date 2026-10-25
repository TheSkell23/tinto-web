'use client';

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type FormEvent,
  type ReactNode,
} from 'react';
import { chatWelcome, ideaQuestions, quickQuestions } from '@/content/dudas';
import { FALLBACK_ERROR, answer } from '@/lib/ai';
import { u } from '@/lib/u';

type Msg = { from: 'bot' | 'me'; text: string };

const TYPING_MS = 700;
const dot: CSSProperties = {
  flex: 'none',
  borderRadius: '50%',
  background: 'var(--grad-primary)',
  display: 'grid',
  placeItems: 'center',
  color: '#fff',
  fontWeight: 800,
};

/** Chat del asistente + ideas de preguntas. `children` = tarjeta de contacto humano (columna derecha). */
export function DudasChat({ children }: { children: ReactNode }) {
  const [chat, setChat] = useState<Msg[]>([{ from: 'bot', text: chatWelcome }]);
  const [draft, setDraft] = useState('');
  const [typing, setTyping] = useState(false);
  const scroller = useRef<HTMLDivElement>(null);
  const busy = useRef(false);

  useEffect(() => {
    const el = scroller.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [chat, typing]);

  async function ask(q: string) {
    const text = q.trim();
    if (!text || busy.current) return;
    busy.current = true;
    setChat((c) => [...c, { from: 'me', text }]);
    setDraft('');
    setTyping(true);
    let reply: string;
    try {
      reply = await answer(text);
    } catch {
      reply = FALLBACK_ERROR;
    }
    await new Promise((r) => setTimeout(r, TYPING_MS));
    setChat((c) => [...c, { from: 'bot', text: reply }]);
    setTyping(false);
    busy.current = false;
  }

  const send = (e: FormEvent) => {
    e.preventDefault();
    void ask(draft);
  };

  return (
    <div
      className="rg"
      style={
        {
          '--c': 'minmax(0,1.7fr) minmax(0,1fr)',
          gap: u(2),
          alignItems: 'start',
          paddingBottom: u(9),
        } as CSSProperties
      }
    >
      <div className="cream chat" style={{ padding: 0, gap: 0, overflow: 'hidden', height: u(44) }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: u(1),
            padding: u(1.4, 2),
            borderBottom: '1px solid rgba(42,29,18,.08)',
          }}
        >
          <span
            style={{
              ...dot,
              width: u(2.8),
              height: u(2.8),
              fontSize: u(1.2),
              boxShadow: '0 4px 10px rgba(255,120,60,.3)',
            }}
          >
            t
          </span>
          <div style={{ lineHeight: 1.25 }}>
            <div style={{ fontSize: u(1.25), fontWeight: 800 }}>Asistente de Tinto</div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: u(0.5),
                fontSize: u(0.9),
                color: '#7a6a58',
              }}
            >
              <span
                style={{
                  width: u(0.7),
                  height: u(0.7),
                  borderRadius: '50%',
                  background: '#2fbf71',
                }}
              />
              En línea · responde al instante
            </div>
          </div>
          <span className="tag" style={{ marginLeft: 'auto', fontSize: u(0.8) }}>
            Vista previa
          </span>
        </div>

        <div
          ref={scroller}
          id="chat-scroll"
          role="log"
          aria-live="polite"
          aria-label="Conversación con el asistente"
          style={{
            flex: 1,
            minHeight: 0,
            overflowY: 'auto',
            padding: u(2),
            display: 'flex',
            flexDirection: 'column',
            gap: u(1.2),
            background: 'linear-gradient(180deg,rgba(255,246,235,.5),rgba(255,255,255,0))',
          }}
        >
          {chat.map((m, i) => {
            const me = m.from === 'me';
            return (
              <div
                key={i}
                data-from={m.from}
                style={{
                  display: 'flex',
                  alignItems: 'flex-end',
                  gap: u(0.9),
                  justifyContent: me ? 'flex-end' : 'flex-start',
                }}
              >
                {!me && (
                  <span
                    aria-hidden="true"
                    style={{ ...dot, width: u(2.4), height: u(2.4), fontSize: u(1) }}
                  >
                    t
                  </span>
                )}
                <div
                  style={{
                    maxWidth: '70%',
                    padding: u(1.1, 1.5),
                    borderRadius: me ? u(1.6, 1.6, 0.4, 1.6) : u(1.6, 1.6, 1.6, 0.4),
                    background: me ? 'var(--grad-primary)' : '#fff',
                    color: me ? '#fff' : '#2a1d12',
                    fontSize: u(1.1),
                    lineHeight: 1.5,
                    boxShadow: me
                      ? '0 6px 14px rgba(232,120,42,.3)'
                      : '0 3px 10px rgba(80,50,20,.08)',
                    whiteSpace: 'pre-line',
                  }}
                >
                  {m.text}
                </div>
              </div>
            );
          })}
          {typing && (
            <div
              data-testid="typing"
              aria-label="El asistente está escribiendo"
              style={{ display: 'flex', alignItems: 'center', gap: u(0.9) }}
            >
              <span
                aria-hidden="true"
                style={{ ...dot, width: u(2.4), height: u(2.4), fontSize: u(1) }}
              >
                t
              </span>
              <div
                style={{
                  padding: u(1.1, 1.5),
                  borderRadius: u(1.6, 1.6, 1.6, 0.4),
                  background: '#fff',
                  boxShadow: '0 3px 10px rgba(80,50,20,.08)',
                  fontSize: u(1.4),
                  letterSpacing: '.2em',
                  color: '#e8782a',
                }}
              >
                ···
              </div>
            </div>
          )}
        </div>

        <div
          style={{
            padding: u(1.4, 2),
            borderTop: '1px solid rgba(42,29,18,.08)',
            display: 'flex',
            flexDirection: 'column',
            gap: u(1),
            background: 'rgba(255,255,255,.7)',
          }}
        >
          <div style={{ display: 'flex', gap: u(0.7), flexWrap: 'wrap' }}>
            {quickQuestions.map((q) => (
              <button
                key={q}
                type="button"
                className="quick"
                onClick={() => void ask(q)}
                style={{
                  cursor: 'pointer',
                  padding: u(0.6, 1.2),
                  borderRadius: 99,
                  border: '1px solid rgba(138,90,31,.25)',
                  background: '#fff',
                  fontSize: u(0.95),
                  fontWeight: 600,
                  color: '#2a1d12',
                }}
              >
                {q}
              </button>
            ))}
          </div>
          <form onSubmit={send} style={{ display: 'flex', gap: u(1), alignItems: 'center' }}>
            <input
              type="text"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Escribe tu pregunta…"
              aria-label="Escribe tu pregunta"
              className="field"
              style={{
                flex: 1,
                minWidth: 0,
                boxSizing: 'border-box',
                padding: u(1.1, 1.6),
                borderRadius: 99,
                border: '1px solid rgba(138,90,31,.25)',
                background: '#fff',
                font: 'inherit',
                fontSize: u(1.1),
                color: '#2a1d12',
                outline: 'none',
              }}
            />
            <button type="submit" className="btn btn-primary" style={{ padding: u(1.1, 2) }}>
              Enviar
            </button>
          </form>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: u(1.6) }}>
        <div className="cream" style={{ padding: u(2) }}>
          <div
            style={{ fontSize: u(0.9), fontWeight: 700, letterSpacing: '.12em', color: '#8a5a1f' }}
          >
            PRUEBA PREGUNTANDO
          </div>
          {ideaQuestions.map((q) => (
            <button
              key={q}
              type="button"
              className="idea"
              onClick={() => void ask(q)}
              style={{
                textAlign: 'left',
                cursor: 'pointer',
                padding: u(1, 1.2),
                borderRadius: u(1.2),
                background: 'rgba(255,255,255,.85)',
                border: '1px solid rgba(240,222,200,.95)',
                fontSize: u(1.05),
                fontWeight: 600,
              }}
            >
              {q}
            </button>
          ))}
        </div>
        {children}
      </div>
    </div>
  );
}
