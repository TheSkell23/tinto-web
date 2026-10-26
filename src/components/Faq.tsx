'use client';

import { useState } from 'react';
import { textSize, u } from '@/lib/u';

/** Acordeón de una sola apertura (estado `faq`, abierto el índice 1 por defecto, como el diseño). */
export function Faq({ items }: { items: ReadonlyArray<readonly [string, string]> }) {
  const [open, setOpen] = useState(1);
  return (
    <div
      className="cream"
      style={{ padding: u(1, 2.4), maxWidth: u(64), margin: '0 auto', gap: 0 }}
    >
      {items.map(([q, a], i) => {
        const on = open === i;
        return (
          <div
            key={q}
            style={{
              borderTop: i ? '1px solid rgba(42,29,18,.08)' : 'none',
              padding: `${u(1.3)} 0`,
            }}
          >
            <h3 style={{ margin: 0, font: 'inherit' }}>
              <button
                type="button"
                aria-expanded={on}
                aria-controls={`faq-a-${i}`}
                id={`faq-q-${i}`}
                onClick={() => setOpen(on ? -1 : i)}
                style={{
                  cursor: 'pointer',
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: u(1.5),
                  padding: 0,
                  border: 0,
                  background: 'none',
                  textAlign: 'left',
                  fontSize: textSize(1.3),
                  fontWeight: 800,
                  letterSpacing: '-.02em',
                }}
              >
                <span>{q}</span>
                <span
                  aria-hidden="true"
                  style={{
                    flex: 'none',
                    width: u(2.4),
                    height: u(2.4),
                    borderRadius: '50%',
                    background: 'var(--grad-primary)',
                    color: '#fff',
                    display: 'grid',
                    placeItems: 'center',
                    fontSize: textSize(1.4),
                    lineHeight: 1,
                    transition: 'transform .3s ease',
                    transform: `rotate(${on ? 45 : 0}deg)`,
                  }}
                >
                  +
                </span>
              </button>
            </h3>
            <div
              id={`faq-a-${i}`}
              role="region"
              aria-labelledby={`faq-q-${i}`}
              hidden={!on}
              style={{
                display: on ? 'block' : 'none',
                paddingTop: u(0.8),
                fontSize: textSize(1.1),
                lineHeight: 1.6,
                color: '#7a6a58',
                maxWidth: u(52),
              }}
            >
              {a}
            </div>
          </div>
        );
      })}
    </div>
  );
}
