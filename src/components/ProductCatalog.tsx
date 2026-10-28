'use client';

import Link from 'next/link';
import { useState, type CSSProperties } from 'react';
import { categories, moduleCards, type Category, type ModuleCard } from '@/content/producto';
import { textSize, u } from '@/lib/u';

const chip: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: u(0.6),
  padding: u(0.55, 0.9),
  borderRadius: 99,
  background: 'rgba(255,255,255,.88)',
  fontSize: textSize(0.85),
  fontWeight: 700,
  color: '#2a1d12',
  boxShadow: '0 4px 10px rgba(80,50,20,.1)',
};
const dot = (c: string): CSSProperties => ({
  width: u(0.7),
  height: u(0.7),
  borderRadius: '50%',
  background: c,
});
const cell = (h: number, a: number): CSSProperties => ({
  height: u(h),
  borderRadius: u(0.7),
  background: `rgba(255,255,255,${a})`,
  boxShadow: '0 3px 8px rgba(80,50,20,.1)',
});
const colHead: CSSProperties = {
  fontSize: textSize(0.7),
  fontWeight: 700,
  letterSpacing: '.06em',
  color: '#8a5a1f',
};

function Visual({ v }: { v: ModuleCard['visual'] }) {
  if (v === 'channels')
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: u(0.6),
          justifyContent: 'center',
          padding: u(2.2, 1.6, 2.6),
        }}
      >
        <div style={chip}>
          <span style={dot('#2fbf71')} />
          WhatsApp · 12
        </div>
        <div style={chip}>
          <span style={dot('#e8782a')} />
          Formulario web · 7
        </div>
        <div style={chip}>
          <span style={dot('#c2561a')} />
          Instagram · 5
        </div>
      </div>
    );
  if (v === 'score')
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          paddingBottom: u(1.6),
        }}
      >
        <div
          style={{
            width: u(9),
            height: u(9),
            borderRadius: '50%',
            background: 'conic-gradient(#e8782a 0 84%,rgba(255,255,255,.75) 0)',
            display: 'grid',
            placeItems: 'center',
          }}
        >
          <div
            style={{
              width: u(6.6),
              height: u(6.6),
              borderRadius: '50%',
              background: '#fff',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span
              style={{
                fontSize: textSize(2.4),
                fontWeight: 800,
                letterSpacing: '-.04em',
                lineHeight: 1,
              }}
            >
              84
            </span>
            <span style={{ fontSize: textSize(0.7), fontWeight: 700, color: '#7a6a58' }}>
              PUNTAJE
            </span>
          </div>
        </div>
      </div>
    );
  if (v === 'kanban')
    return (
      <div
        className="catalog-board"
        style={{ display: 'flex', gap: u(0.8), padding: u(3, 1.4, 2.6) }}
      >
        {[
          ['ATRAÍDA', [2.1, 1.6, 2.1]],
          ['CALIFICADA', [2.1, 1.6]],
          ['ORGANIZADA', [2.1, 1.6]],
        ].map(([label, hs]) => (
          <div
            key={label as string}
            style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: u(0.5) }}
          >
            <div style={colHead}>{label as string}</div>
            {(hs as number[]).map((h, i) => (
              <div key={i} style={cell(h, h > 2 ? (i === 2 ? 0.68 : 0.92) : 0.8)} />
            ))}
          </div>
        ))}
      </div>
    );
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: u(0.9), padding: u(3, 1.8, 3) }}>
      {[20, 29, 25, 38, 46].map((h, i) => (
        <div
          key={i}
          style={{
            flex: 1,
            height: `${h}%`,
            borderRadius: `${u(0.6)} ${u(0.6)} ${u(0.2)} ${u(0.2)}`,
            background:
              i === 4 ? 'linear-gradient(180deg,#ff8a3d,#ff9d86)' : 'rgba(255,255,255,.85)',
            boxShadow: '0 3px 8px rgba(80,50,20,.1)',
          }}
        />
      ))}
    </div>
  );
}

/** Catálogo de módulos con filtro (estado `cat`): Todos / Captar / Calificar / Organizar / Medir. */
export function ProductCatalog() {
  const [cat, setCat] = useState<Category>('Todos');
  return (
    <>
      <div
        role="group"
        aria-label="Filtrar módulos"
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: u(0.8),
          margin: `${u(-0.6)} 0 ${u(2.4)}`,
          flexWrap: 'wrap',
        }}
      >
        {categories.map((t) => {
          const on = cat === t;
          return (
            <button
              key={t}
              type="button"
              aria-pressed={on}
              onClick={() => setCat(t)}
              style={{
                cursor: 'pointer',
                padding: u(0.8, 1.8),
                borderRadius: 99,
                fontSize: textSize(1.05),
                fontWeight: 700,
                border: `1px solid ${on ? '#ff8a3d' : 'rgba(138,90,31,.2)'}`,
                background: on ? 'var(--grad-primary)' : 'rgba(255,255,255,.8)',
                color: on ? '#fff' : '#2a1d12',
                boxShadow: on ? '0 6px 14px rgba(232,120,42,.35)' : 'none',
                transition: 'all .25s ease',
              }}
            >
              {t}
            </button>
          );
        })}
      </div>
      <div
        className="rg tablet-cards"
        data-testid="catalog"
        style={{ '--c': 'repeat(4,minmax(0,1fr))', '--m': 1, gap: u(1.6) } as CSSProperties}
      >
        {moduleCards.map((c) => {
          const show = cat === 'Todos' || cat === c.cat;
          return (
            <article
              key={c.name + cat}
              className="cream lift anim-pop"
              hidden={!show}
              style={{ display: show ? 'flex' : 'none', padding: u(1.2), gap: u(1) }}
            >
              <div
                style={{
                  position: 'relative',
                  aspectRatio: '4/3',
                  borderRadius: u(1.5),
                  overflow: 'hidden',
                  background: c.gradient,
                  border: '1px solid rgba(255,255,255,.8)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <Visual v={c.visual} />
                <span
                  style={{
                    position: 'absolute',
                    left: u(1),
                    top: u(1),
                    fontSize: textSize(0.8),
                    fontWeight: 700,
                    padding: u(0.4, 0.9),
                    borderRadius: 99,
                    background: 'rgba(255,255,255,.85)',
                    color: '#8a5a1f',
                  }}
                >
                  {c.tag}
                </span>
                <span
                  style={{
                    position: 'absolute',
                    left: u(1.2),
                    bottom: u(1.1),
                    fontSize: textSize(0.85),
                    fontWeight: 700,
                    letterSpacing: '.12em',
                    textTransform: 'uppercase',
                    color: 'rgba(138,90,31,.7)',
                  }}
                >
                  {c.cat}
                </span>
              </div>
              <div
                style={{
                  padding: `0 ${u(0.8)} ${u(0.6)}`,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: u(0.8),
                  flex: 1,
                }}
              >
                <h3
                  style={{
                    margin: 0,
                    fontSize: textSize(1.55),
                    fontWeight: 800,
                    letterSpacing: '-.02em',
                  }}
                >
                  {c.name}
                </h3>
                <div style={{ fontSize: textSize(1), lineHeight: 1.5, color: '#7a6a58' }}>
                  {c.desc}
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: u(0.5),
                    flex: 1,
                    alignContent: 'flex-start',
                  }}
                >
                  {c.chips.map((x) => (
                    <span
                      key={x}
                      style={{
                        fontSize: textSize(0.8),
                        fontWeight: 600,
                        padding: u(0.35, 0.8),
                        borderRadius: 99,
                        border: '1px solid rgba(138,90,31,.2)',
                        color: '#7a6a58',
                      }}
                    >
                      {x}
                    </span>
                  ))}
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderTop: '1px solid rgba(42,29,18,.08)',
                    paddingTop: u(1),
                    gap: u(1),
                  }}
                >
                  <span style={{ fontSize: textSize(1), fontWeight: 700, color: '#7a6a58' }}>
                    {c.price}
                  </span>
                  <Link
                    href="/agendar"
                    style={{
                      fontSize: textSize(1),
                      fontWeight: 700,
                      color: '#fff',
                      padding: u(0.6, 1.3),
                      borderRadius: 99,
                      background: 'var(--grad-primary)',
                      boxShadow: '0 4px 10px rgba(232,120,42,.3)',
                    }}
                  >
                    Ver demo
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
}
