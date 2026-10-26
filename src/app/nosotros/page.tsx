import { JsonLd } from '@/components/JsonLd';
import { pageStructuredData } from '@/lib/structured-data';
import { pageMetadata } from '@/lib/metadata';
import Image from 'next/image';
import type { CSSProperties } from 'react';
import { Icon } from '@/components/Icons';
import { PageHero } from '@/components/PageHero';
import { ScrollToGo } from '@/components/ScrollToGo';
import { Button, ClosingBand, CreamCard, GhostTitle, Reveal, SectionTitle } from '@/components/ui';
import {
  nosClosing,
  nosHero,
  nosMilestones,
  nosReviews,
  nosStory,
  nosTeams,
  nosValues,
} from '@/content/nosotros';
import { k, u } from '@/lib/u';

const accentEm: CSSProperties = { fontWeight: 800, fontStyle: 'normal', color: '#e8782a' };
const heroChip = (pos: CSSProperties): CSSProperties => ({
  position: 'absolute',
  padding: u(0.9, 1.3),
  borderRadius: u(1.4),
  background: 'linear-gradient(135deg,rgba(255,255,255,.85),rgba(255,244,230,.7))',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  border: '1px solid rgba(255,255,255,.85)',
  boxShadow: '0 8px 24px rgba(80,50,20,.18)',
  ...pos,
});
const band = (extra: CSSProperties): CSSProperties => ({ position: 'relative', ...extra });

export const metadata = pageMetadata('/nosotros');

export default function NosotrosPage() {
  return (
    <>
      <JsonLd data={pageStructuredData('/nosotros')} />
      <ScrollToGo />
      <div className="pg">
        <PageHero
          ghost={nosHero.ghost}
          title={nosHero.title}
          accent={nosHero.accent}
          text={nosHero.text}
          primary={{ label: 'Conócenos', href: '#valores' }}
          secondary={{ label: 'Hablemos →', href: '/contacto' }}
          stats={nosHero.stats}
        >
          <div
            style={{
              position: 'relative',
              borderRadius: u(2.4),
              overflow: 'hidden',
              aspectRatio: '1/1.05',
              boxShadow: `0 ${u(1.2)} ${u(3)} rgba(60,40,20,.14)`,
            }}
          >
            <Image
              src="/images/foto-equipo.png"
              alt={nosHero.alt}
              fill
              sizes="(max-width: 899px) 100vw, 44vw"
              style={{ objectFit: 'cover', objectPosition: '50% 60%' }}
            />
            <div style={heroChip({ right: u(1.4), top: u(1.4) })}>
              <div
                style={{
                  fontSize: u(0.8),
                  fontWeight: 700,
                  letterSpacing: '.1em',
                  color: '#8a5a1f',
                }}
              >
                {nosHero.chips[0][0]}
              </div>
              <div
                style={{
                  fontSize: u(1.6),
                  fontWeight: 800,
                  color: '#e8782a',
                  letterSpacing: '-.02em',
                }}
              >
                {nosHero.chips[0][1]}
              </div>
            </div>
            <div style={heroChip({ left: u(1.4), bottom: u(1.4) })}>
              <div
                style={{
                  fontSize: u(0.8),
                  fontWeight: 700,
                  letterSpacing: '.1em',
                  color: '#8a5a1f',
                }}
              >
                {nosHero.chips[1][0]}
              </div>
              <div
                style={{
                  fontSize: u(1.6),
                  fontWeight: 800,
                  color: '#e8782a',
                  letterSpacing: '-.02em',
                }}
              >
                {nosHero.chips[1][1]}
              </div>
            </div>
          </div>
        </PageHero>

        {/* Valores */}
        <div id="valores" style={{ padding: `${u(2)} 0 ${u(9)}` }}>
          <SectionTitle ghost={nosValues.ghost} title={nosValues.title} sub={nosValues.sub} />
          <div
            className="rg"
            style={{ '--c': 'repeat(4,1fr)', '--m': 1, gap: u(1.6) } as CSSProperties}
          >
            {nosValues.items.map(([t, d], i) => (
              <CreamCard key={t} soft delay={i * 70}>
                <span className="num">{i + 1}</span>
                <div style={{ fontSize: u(1.45), fontWeight: 800, letterSpacing: '-.02em' }}>
                  {t}
                </div>
                <div style={{ fontSize: u(1.05), lineHeight: 1.5, color: '#7a6a58' }}>{d}</div>
              </CreamCard>
            ))}
          </div>
        </div>

        {/* Hitos */}
        <div style={{ paddingBottom: u(9) }}>
          <SectionTitle
            ghost={nosMilestones.ghost}
            title={nosMilestones.title}
            sub={nosMilestones.sub}
          />
          <div
            className="rg"
            style={{ '--c': 'repeat(4,1fr)', '--m': 1, gap: u(1.6) } as CSSProperties}
          >
            {nosMilestones.items.map(([y, t, d], i) => (
              <CreamCard key={y} soft delay={i * 70}>
                <div
                  className="fz"
                  style={
                    {
                      ...k(2.6),
                      fontWeight: 800,
                      letterSpacing: '-.03em',
                      color: '#e8782a',
                      lineHeight: 1,
                    } as CSSProperties
                  }
                >
                  {y}
                </div>
                <div style={{ fontSize: u(1.35), fontWeight: 800, letterSpacing: '-.02em' }}>
                  {t}
                </div>
                <div style={{ fontSize: u(1.05), lineHeight: 1.5, color: '#7a6a58' }}>{d}</div>
              </CreamCard>
            ))}
          </div>
        </div>

        {/* Equipo */}
        <div style={{ paddingBottom: u(9) }}>
          <SectionTitle ghost={nosTeams.ghost} title={nosTeams.title} sub={nosTeams.sub} />
          <div className="rg" style={{ '--c': 'repeat(3,1fr)', gap: u(1.6) } as CSSProperties}>
            {nosTeams.items.map((t, i) => (
              <CreamCard key={t.title} soft lift delay={i * 80}>
                <span className="ico" style={{ width: u(4.4), height: u(4.4) }}>
                  <Icon name={t.icon} size={u(2)} stroke={1.8} style={{ color: '#fff' }} />
                </span>
                <div style={{ fontSize: u(1.6), fontWeight: 800, letterSpacing: '-.02em' }}>
                  {t.title}
                </div>
                <div style={{ fontSize: u(0.95), fontWeight: 700, color: '#e8782a' }}>{t.role}</div>
                <div style={{ fontSize: u(1.05), lineHeight: 1.5, color: '#7a6a58' }}>{t.text}</div>
              </CreamCard>
            ))}
          </div>
        </div>
      </div>

      <section
        className="cq sheet"
        style={{
          marginTop: u(-4),
          fontFamily: 'inherit',
          padding: `${u(6)} 0 0`,
          display: 'flex',
          flexDirection: 'column',
          gap: u(4),
        }}
      >
        <div
          className="cq-pad"
          style={band({
            padding: `${u(5)} ${u(12)} ${u(4)}`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: u(2.2),
            textAlign: 'center',
            background:
              'linear-gradient(180deg,#fff 0,rgba(255,255,255,0) 45%),radial-gradient(40% 70% at 12% 20%,rgba(249,201,160,.5),transparent 70%),radial-gradient(40% 70% at 90% 20%,rgba(233,180,138,.4),transparent 70%)',
          })}
        >
          <GhostTitle size={9} top={-2.1}>
            {nosStory.ghost}
          </GhostTitle>
          <Reveal
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: u(2.2) }}
          >
            <h2
              className="fz"
              style={
                {
                  ...k(5.4),
                  margin: 0,
                  maxWidth: u(60),
                  lineHeight: 1.04,
                  fontWeight: 600,
                  letterSpacing: '-.03em',
                  color: '#2a1d12',
                  textWrap: 'balance',
                  position: 'relative',
                  zIndex: 1,
                } as CSSProperties
              }
            >
              {nosStory.title} <em style={accentEm}>{nosStory.accent}</em>
            </h2>
            <p
              style={{
                margin: 0,
                maxWidth: u(46),
                fontSize: u(1.3),
                lineHeight: 1.55,
                color: '#7a6a58',
                position: 'relative',
                zIndex: 1,
              }}
            >
              {nosStory.text1}
              <strong style={{ color: '#2a1d12', fontWeight: 600 }}>{nosStory.strong}</strong>
              {nosStory.text2}
            </p>
            <div style={{ display: 'flex', gap: u(1), flexWrap: 'wrap', justifyContent: 'center' }}>
              <Button href="/producto#planes" variant="dark" lift>
                Ver planes
              </Button>
              <Button href="/contacto" variant="glass" lift>
                Hablar con ventas
              </Button>
            </div>
          </Reveal>
        </div>

        <div
          className="cq-pad"
          style={{
            padding: `${u(5)} ${u(2)} 0`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: u(3),
            textAlign: 'center',
          }}
        >
          <Reveal>
            <h3
              className="fz"
              style={
                {
                  ...k(5.4),
                  margin: '0 auto',
                  lineHeight: 1.05,
                  letterSpacing: '-.03em',
                  fontWeight: 600,
                  maxWidth: u(64),
                  textWrap: 'balance',
                  color: '#2a1d12',
                } as CSSProperties
              }
            >
              {nosStory.coffeeTitle} <em style={accentEm}>{nosStory.coffeeAccent}</em>
            </h3>
          </Reveal>
          <Image
            src="/images/cafecito-conversacion.jpg"
            alt={nosStory.coffeeAlt}
            width={2750}
            height={1536}
            sizes="92vw"
            style={{
              width: u(92),
              maxWidth: '100%',
              height: 'auto',
              display: 'block',
              mixBlendMode: 'multiply',
            }}
          />
        </div>

        <div
          className="sheet cq-pad"
          style={{
            zIndex: 3,
            marginTop: u(-4),
            padding: `${u(8)} ${u(12)} ${u(6)}`,
            display: 'flex',
            flexDirection: 'column',
            gap: u(4),
            background: 'linear-gradient(180deg,#fff 0,#f6efe5 18%,#f6efe5 82%,#fff 100%)',
          }}
        >
          <SectionTitle variant="b" ghost={nosReviews.ghost} title={nosReviews.title} />
          <div
            className="rg"
            style={{ '--c': 'repeat(3,1fr)', '--m': 1, gap: u(1.4) } as CSSProperties}
          >
            {nosReviews.items.map(([q, n, r], i) => (
              <CreamCard
                key={n}
                soft
                delay={(i % 3) * 80}
                style={{ padding: u(1.8), borderRadius: u(1.8), gap: u(1.2) }}
              >
                <span
                  style={{ color: '#e8782a', letterSpacing: '.1em', fontSize: u(1.05) }}
                  aria-label="5 de 5 estrellas"
                >
                  ★★★★★
                </span>
                <div style={{ fontSize: u(1.15), lineHeight: 1.5 }}>{q}</div>
                <div
                  style={{ display: 'flex', alignItems: 'center', gap: u(0.9), marginTop: 'auto' }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      flex: 'none',
                      width: u(3),
                      height: u(3),
                      borderRadius: '50%',
                      background: '#c9a27a',
                      boxShadow: `inset ${u(0.3)} ${u(0.3)} ${u(0.6)} rgba(90,50,10,.35),inset ${u(-0.3)} ${u(-0.3)} ${u(0.6)} rgba(255,255,255,.55),0 0 0 ${u(0.35)} #f6efe5,${u(0.5)} ${u(0.6)} ${u(1)} rgba(140,95,50,.3)`,
                    }}
                  />
                  <div style={{ lineHeight: 1.3 }}>
                    <div style={{ fontSize: u(1), fontWeight: 600 }}>{n}</div>
                    <div style={{ fontSize: u(0.9), color: '#7a6a58' }}>{r}</div>
                  </div>
                </div>
              </CreamCard>
            ))}
          </div>
        </div>
      </section>

      <ClosingBand title={nosClosing.title} accent={nosClosing.accent} text={nosClosing.text} />
    </>
  );
}
