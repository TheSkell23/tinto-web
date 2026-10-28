import type { CSSProperties } from 'react';
import { textSize, u } from '@/lib/u';
import type { MockCard, MockColumn } from './CrmMockup';

const ellipsis: CSSProperties = {
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
};

/** "ANA M." -> "Ana M." */
const person = (label: string) =>
  label
    .split(' ')
    .map((w) => w.charAt(0) + w.slice(1).toLowerCase())
    .join(' ');

/**
 * Visual de Soluciones: el reparto por asesor como carriles horizontales (carga de cada asesor y sus
 * oportunidades en fichas) y la asignación automática encima. Distinto del tablero por columnas de Producto.
 */
export function AssignBoard({
  title,
  period,
  columns,
  card,
}: {
  title: string;
  period: string;
  columns: readonly MockColumn[];
  card: MockCard;
}) {
  const max = Math.max(...columns.map((c) => c.count));
  // Una misma persona no debe verse repetida en dos carriles
  const seen = new Set<string>();
  const lanes = columns.map((col) => ({
    ...col,
    items: col.items.filter(([, name]) => {
      if (seen.has(name)) return false;
      seen.add(name);
      return true;
    }),
  }));

  return (
    <div
      className="mock-wrap assign-board"
      style={{
        position: 'relative',
        borderRadius: u(3),
        overflow: 'hidden',
        aspectRatio: '1/.95',
        background:
          'radial-gradient(60% 50% at 85% 8%,rgba(249,201,160,.9),transparent 70%),radial-gradient(55% 55% at 6% 96%,rgba(255,157,134,.6),transparent 70%),linear-gradient(135deg,#fff4e6,#ffe0c4)',
        boxShadow: `0 ${u(1.4)} ${u(3.4)} rgba(240,150,80,.25)`,
      }}
    >
      <div
        className="mock-in"
        style={{ position: 'absolute', left: u(2.6), right: u(2.6), top: u(2.6), bottom: u(2.6) }}
      >
        <div
          className="mock-win"
          style={{
            height: '100%',
            boxSizing: 'border-box',
            overflow: 'hidden',
            borderRadius: u(2),
            background: 'linear-gradient(135deg,rgba(255,255,255,.9),rgba(255,246,235,.82))',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,.85)',
            boxShadow: '0 18px 44px rgba(60,35,10,.3)',
            padding: u(1.5),
            display: 'flex',
            flexDirection: 'column',
            gap: u(1.1),
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: u(0.8) }}>
            <span
              style={{
                width: u(1.1),
                height: u(1.1),
                borderRadius: '50%',
                background: 'linear-gradient(135deg,#ff8a3d,#ff9d86)',
                boxShadow: '0 0 0 4px rgba(255,138,61,.2)',
              }}
            />
            <span style={{ fontSize: textSize(1), fontWeight: 800 }}>{title}</span>
            <span
              style={{
                marginLeft: 'auto',
                fontSize: textSize(0.8),
                fontWeight: 700,
                color: '#7a6a58',
              }}
            >
              {period}
            </span>
          </div>

          {lanes.map((lane) => (
            <div
              key={lane.label}
              className="ab-lane"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: u(1),
                padding: u(0.9),
                borderRadius: u(1.4),
                background: 'rgba(255,255,255,.7)',
                border: '1px solid rgba(255,255,255,.9)',
              }}
            >
              <span
                style={{
                  flex: 'none',
                  width: u(3.2),
                  height: u(3.2),
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg,#ffd2b0,#ff8a3d)',
                  display: 'grid',
                  placeItems: 'center',
                  fontSize: textSize(1.1),
                  fontWeight: 800,
                  color: '#fff',
                  boxShadow: '0 6px 14px rgba(232,120,42,.3)',
                }}
              >
                {lane.label.charAt(0)}
              </span>
              <div className="ab-who" style={{ flex: 'none', width: u(8.5), minWidth: 0 }}>
                <div style={{ fontSize: textSize(0.95), fontWeight: 800, ...ellipsis }}>
                  {person(lane.label)}
                </div>
                <div
                  style={{
                    marginTop: u(0.35),
                    height: u(0.5),
                    borderRadius: 99,
                    background: 'rgba(42,29,18,.1)',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    className="bar-x"
                    style={{
                      width: `${Math.round((lane.count / max) * 100)}%`,
                      height: '100%',
                      borderRadius: 99,
                      background: 'linear-gradient(90deg,#ff8a3d,#ff9d86)',
                    }}
                  />
                </div>
                <div style={{ marginTop: u(0.3), fontSize: textSize(0.7), color: '#7a6a58' }}>
                  <b style={{ color: '#2a1d12', fontSize: textSize(0.9) }}>{lane.count}</b>{' '}
                  oportunidades
                </div>
              </div>
              <div
                className="ab-chips"
                style={{ display: 'flex', gap: u(0.6), minWidth: 0, flex: 1 }}
              >
                {lane.items.slice(0, 3).map(([ini, name, sub, score, hot]) => (
                  <div
                    key={name}
                    className="mock-item"
                    style={{
                      flex: 1,
                      minWidth: 0,
                      padding: u(0.6, 0.8),
                      borderRadius: u(1),
                      background: '#fff',
                      boxShadow: '0 4px 12px rgba(80,50,20,.1)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: u(0.15),
                    }}
                    title={`${ini} ${sub}`}
                  >
                    <div style={{ fontSize: textSize(0.8), fontWeight: 800, ...ellipsis }}>
                      {name}
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: u(0.4),
                        fontSize: textSize(0.65),
                        color: '#7a6a58',
                      }}
                    >
                      <span style={ellipsis}>{sub}</span>
                      <span
                        style={{
                          fontWeight: 800,
                          padding: u(0.1, 0.45),
                          borderRadius: 99,
                          color: hot ? '#fff' : '#e8782a',
                          background: hot ? 'linear-gradient(135deg,#ff8a3d,#ff9d86)' : '#fff4e6',
                        }}
                      >
                        {score}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        className="mock-float"
        style={{
          position: 'absolute',
          left: u(5),
          right: u(1.6),
          bottom: u(1.6),
          padding: u(1.3, 1.6),
          borderRadius: u(1.6),
          background: 'linear-gradient(135deg,rgba(255,255,255,.96),rgba(255,248,238,.92))',
          boxShadow: '0 14px 36px rgba(60,35,10,.28)',
          border: '1px solid rgba(255,255,255,.9)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span
            style={{
              fontSize: textSize(0.7),
              fontWeight: 700,
              letterSpacing: '.1em',
              color: '#8a5a1f',
            }}
          >
            {card.label}
          </span>
          <span
            style={{
              fontSize: textSize(0.7),
              fontWeight: 700,
              padding: u(0.25, 0.8),
              borderRadius: 99,
              color: '#fff',
              background: 'linear-gradient(135deg,#ff8a3d,#ff9d86)',
            }}
          >
            {card.badge}
          </span>
        </div>
        <div style={{ margin: `${u(0.5)} 0`, fontSize: textSize(1.25), fontWeight: 800 }}>
          {card.title}
        </div>
        {card.rows.map(([a, b]) => (
          <div
            key={a}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: textSize(0.85),
              color: '#7a6a58',
              marginTop: u(0.3),
            }}
          >
            <span>{a}</span>
            <b style={{ color: '#2a1d12' }}>{b}</b>
          </div>
        ))}
      </div>
    </div>
  );
}
