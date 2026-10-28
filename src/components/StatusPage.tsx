import type { CSSProperties, ReactNode } from 'react';
import { k, u } from '@/lib/u';
import { Accent, GhostTitle } from './ui';

/** Estructura común de las páginas de estado (404 y sin conexión). */
export function StatusPage({
  ghost,
  title,
  accent,
  text,
  children,
}: {
  ghost: string;
  title: string;
  accent: string;
  text: string;
  children: ReactNode;
}) {
  return (
    <div className="pg" style={{ minHeight: '82vh', paddingBottom: u(8) }}>
      <div
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: u(1.6),
          paddingTop: u(4),
        }}
      >
        <GhostTitle size={9} top={-1.5}>
          {ghost}
        </GhostTitle>
        <h1
          className="fz"
          style={
            {
              ...k(5),
              position: 'relative',
              zIndex: 1,
              margin: 0,
              lineHeight: 1,
              fontWeight: 800,
              letterSpacing: '-.04em',
              textWrap: 'balance',
              maxWidth: u(50),
            } as CSSProperties
          }
        >
          {title} <Accent>{accent}</Accent>
        </h1>
        <p
          style={{
            margin: 0,
            fontSize: u(1.3),
            lineHeight: 1.55,
            color: '#7a6a58',
            maxWidth: u(38),
            position: 'relative',
            zIndex: 1,
          }}
        >
          {text}
        </p>
        <div
          style={{
            display: 'flex',
            gap: u(1.2),
            alignItems: 'center',
            marginTop: u(1),
            flexWrap: 'wrap',
            justifyContent: 'center',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
