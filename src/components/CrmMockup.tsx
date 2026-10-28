import type { CSSProperties } from 'react';
import { textSize, u } from '@/lib/u';

export type MockItem = readonly [
  initial: string,
  name: string,
  sub: string,
  score: number,
  hot?: boolean,
];
export type MockColumn = {
  label: string;
  count: number;
  hot?: boolean;
  items: readonly MockItem[];
};
export type MockCard = {
  label: string;
  badge: string;
  title: string;
  rows: readonly (readonly [string, string])[];
};

const ellipsis: CSSProperties = {
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
};

/** Maqueta del CRM: ventana con 3 puntos, columnas con tarjetas y una ficha de oportunidad superpuesta. */
export function CrmMockup({
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
  return (
    <div
      className="mock-wrap"
      style={{
        position: 'relative',
        borderRadius: u(3),
        overflow: 'hidden',
        aspectRatio: '1/.8',
        background:
          'radial-gradient(60% 50% at 15% 8%,rgba(249,201,160,.9),transparent 70%),radial-gradient(55% 55% at 92% 96%,rgba(255,157,134,.6),transparent 70%),linear-gradient(135deg,#fff4e6,#ffe0c4)',
        boxShadow: `0 ${u(1.4)} ${u(3.4)} rgba(240,150,80,.25)`,
      }}
    >
      <div
        className="mock-in"
        style={{ position: 'absolute', left: u(3), right: u(3), top: u(3), bottom: u(3) }}
      >
        <div
          className="mock-win"
          style={{
            height: '100%',
            boxSizing: 'border-box',
            overflow: 'hidden',
            borderRadius: u(2),
            background: 'linear-gradient(135deg,rgba(255,255,255,.88),rgba(255,246,235,.8))',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,.85)',
            boxShadow: '0 18px 44px rgba(60,35,10,.32)',
            padding: u(1.3),
            display: 'flex',
            flexDirection: 'column',
            gap: u(1),
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: u(0.5) }}>
            {['#ff8a3d', '#ffb98a', '#ffd9bd'].map((c) => (
              <span
                key={c}
                style={{ width: u(0.7), height: u(0.7), borderRadius: '50%', background: c }}
              />
            ))}
            <span style={{ marginLeft: u(0.7), fontSize: textSize(0.9), fontWeight: 800 }}>
              {title}
            </span>
            <span
              style={{
                marginLeft: 'auto',
                fontSize: textSize(0.75),
                fontWeight: 700,
                color: '#7a6a58',
              }}
            >
              {period}
            </span>
          </div>
          <div className="mock-columns" style={{ display: 'flex', gap: u(0.7) }}>
            {columns.map((col) => (
              <div
                key={col.label}
                style={{
                  flex: 1,
                  minWidth: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: u(0.6),
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    fontSize: textSize(0.7),
                    fontWeight: 700,
                    letterSpacing: '.06em',
                    color: '#8a5a1f',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <span>{col.label}</span>
                  <span
                    style={{
                      fontSize: textSize(1),
                      fontWeight: 800,
                      color: '#2a1d12',
                      letterSpacing: 0,
                    }}
                  >
                    {col.count}
                  </span>
                </div>
                {col.items.map(([ini, name, sub, score, hot]) => {
                  const isHot = hot ?? col.hot ?? false;
                  return (
                    <div
                      key={name + ini + score}
                      className="mock-item"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: u(0.6),
                        padding: u(0.7),
                        borderRadius: u(1),
                        background: 'rgba(255,255,255,.92)',
                        boxShadow: '0 4px 12px rgba(80,50,20,.1)',
                      }}
                    >
                      <span
                        style={{
                          flex: 'none',
                          width: u(1.9),
                          height: u(1.9),
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg,#ffd2b0,#ff9d86)',
                          display: 'grid',
                          placeItems: 'center',
                          fontSize: textSize(0.75),
                          fontWeight: 800,
                          color: '#fff',
                        }}
                      >
                        {ini}
                      </span>
                      <div style={{ minWidth: 0, flex: 1 }}>
                        <div style={{ fontSize: textSize(0.85), fontWeight: 800, ...ellipsis }}>
                          {name}
                        </div>
                        <div style={{ fontSize: textSize(0.65), color: '#7a6a58', ...ellipsis }}>
                          {sub}
                        </div>
                      </div>
                      <span
                        style={{
                          fontSize: textSize(0.7),
                          fontWeight: 800,
                          padding: u(0.2, 0.5),
                          borderRadius: 99,
                          ...(isHot
                            ? {
                                background: 'linear-gradient(135deg,#ff8a3d,#ff9d86)',
                                color: '#fff',
                              }
                            : { background: '#fff4e6', color: '#c2561a' }),
                        }}
                      >
                        {score}
                      </span>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
        <div
          className="mock-float"
          style={{
            position: 'absolute',
            left: '7%',
            right: u(-1.5),
            bottom: u(-1.5),
            padding: u(1.3),
            borderRadius: u(1.6),
            background: 'linear-gradient(135deg,rgba(255,255,255,.95),rgba(255,246,235,.88))',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,.85)',
            boxShadow: '0 18px 40px rgba(60,35,10,.35)',
            display: 'flex',
            flexDirection: 'column',
            gap: u(0.6),
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span
              style={{
                fontSize: textSize(0.75),
                fontWeight: 700,
                letterSpacing: '.12em',
                color: '#8a5a1f',
              }}
            >
              {card.label}
            </span>
            <span
              style={{
                fontSize: textSize(0.75),
                fontWeight: 700,
                padding: u(0.3, 0.8),
                borderRadius: 99,
                background: '#fff',
                border: '1px solid rgba(138,90,31,.2)',
                color: '#e8782a',
              }}
            >
              {card.badge}
            </span>
          </div>
          <div style={{ fontSize: textSize(1.2), fontWeight: 800, letterSpacing: '-.02em' }}>
            {card.title}
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'auto 1fr',
              gap: `${u(0.35)} ${u(1.2)}`,
              fontSize: textSize(0.9),
            }}
          >
            {card.rows.map(([a, b]) => (
              <span key={a} style={{ display: 'contents' }}>
                <span style={{ color: '#7a6a58' }}>{a}</span>
                <b style={{ textAlign: 'right' }}>{b}</b>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
