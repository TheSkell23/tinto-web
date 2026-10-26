import type { CSSProperties, ReactNode } from 'react';
import { textSize, k, u } from '@/lib/u';
import { Accent, Button, GhostTitle, Reveal } from './ui';

/** Portada de cada página: grid 1.05fr / 1fr, H1 acento naranja, subtítulo, dos botones y visual a la derecha. */
export function PageHero({
  ghost,
  title,
  accent,
  titleEnd,
  text,
  primary,
  secondary,
  stats,
  children,
}: {
  ghost: string;
  title: ReactNode;
  accent: ReactNode;
  titleEnd?: ReactNode;
  text: string;
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
  stats?: ReadonlyArray<readonly [string, string]>;
  children: ReactNode;
}) {
  return (
    <div
      className="rg"
      style={
        {
          '--c': '1.05fr 1fr',
          gap: u(4),
          alignItems: 'center',
          paddingBottom: u(9),
        } as CSSProperties
      }
    >
      <div
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          gap: u(1.6),
          alignItems: 'flex-start',
        }}
      >
        <GhostTitle size={5.6} top={-4.6} align="left">
          {ghost}
        </GhostTitle>
        <h1
          className="fz"
          style={
            {
              ...k(5.2),
              position: 'relative',
              zIndex: 1,
              margin: 0,
              lineHeight: 1,
              fontWeight: 800,
              letterSpacing: '-.04em',
              textWrap: 'balance',
            } as CSSProperties
          }
        >
          {title} <Accent>{accent}</Accent>
          {titleEnd ? <> {titleEnd}</> : null}
        </h1>
        <p
          style={{
            margin: 0,
            fontSize: textSize(1.3),
            lineHeight: 1.55,
            color: '#7a6a58',
            maxWidth: u(36),
          }}
        >
          {text}
        </p>
        <div
          style={{
            display: 'flex',
            gap: u(1.2),
            alignItems: 'center',
            marginTop: u(0.6),
            flexWrap: 'wrap',
          }}
        >
          <Button href={primary.href}>{primary.label}</Button>
          <Button href={secondary.href} variant="link">
            {secondary.label}
          </Button>
        </div>
        {stats && (
          <div style={{ display: 'flex', gap: u(3), marginTop: u(1.4), flexWrap: 'wrap' }}>
            {stats.map(([v, l]) => (
              <div key={v}>
                <div
                  className="fz"
                  style={{ ...k(2.2), fontWeight: 800, letterSpacing: '-.03em' } as CSSProperties}
                >
                  {v}
                </div>
                <div style={{ fontSize: textSize(1), color: '#7a6a58' }}>{l}</div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Reveal>{children}</Reveal>
    </div>
  );
}
