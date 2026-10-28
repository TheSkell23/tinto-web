import type { CSSProperties, ReactNode } from 'react';
import { textSize, k, u } from '@/lib/u';
import { SectionHero } from './SectionHero';
import { Accent, Button, Reveal } from './ui';

/** Portada de cada página: grid 1.05fr / 1fr, H1 acento naranja, subtítulo, dos botones y visual a la derecha. */
export function PageHero({
  title,
  accent,
  titleEnd,
  text,
  primary,
  secondary,
  stats,
  children,
}: {
  ghost?: string;
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
    <SectionHero full>
      <div
        className="rg hero-layout"
        style={
          {
            '--c': '1.05fr 1fr',
            gap: u(4),
            alignItems: 'center',
          } as CSSProperties
        }
      >
        <div
          className="hero-copy"
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            gap: u(1.6),
            alignItems: 'flex-start',
          }}
        >
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
            className="hero-actions"
            style={{
              display: 'flex',
              gap: u(1.2),
              alignItems: 'center',
              marginTop: u(0.6),
              flexWrap: 'wrap',
            }}
          >
            <Button href={primary.href} strong lift>
              {primary.label}
            </Button>
            <Button href={secondary.href} variant="glass" lift>
              {secondary.label}
            </Button>
          </div>
          {stats && (
            <div
              className="hero-stats"
              style={{
                display: 'flex',
                gap: u(3),
                marginTop: u(1.4),
                flexWrap: 'wrap',
                padding: u(1.2, 2),
                borderRadius: u(1.8),
                background: 'linear-gradient(135deg,rgba(255,255,255,.85),rgba(255,244,230,.6))',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,.9)',
                boxShadow: '0 10px 28px rgba(190,110,50,.16)',
              }}
            >
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
        <Reveal variant="right" className="hero-visual">
          {children}
        </Reveal>
      </div>
    </SectionHero>
  );
}
