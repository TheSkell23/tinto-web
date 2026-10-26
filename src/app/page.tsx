import { pageMetadata } from '@/lib/metadata';
import Image from 'next/image';
import Link from 'next/link';
import type { CSSProperties } from 'react';
import { Icon } from '@/components/Icons';
import { Accent, Button, CreamCard, GhostTitle, Reveal, SectionTitle } from '@/components/ui';
import {
  homeBanner,
  homeFor,
  homeHero,
  homeModules,
  homeQuick,
  homeReviews,
  homeStats,
  homeSteps,
  homeWork,
} from '@/content/home';
import { k, u } from '@/lib/u';

const mini: CSSProperties = {
  width: '100%',
  marginTop: u(1),
  textAlign: 'left',
  minHeight: u(15),
  boxSizing: 'border-box',
  borderRadius: u(1.6),
  padding: u(1.6),
  gap: 0,
};
const row: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: `${u(0.8)} 0`,
  borderBottom: '1px solid rgba(42,29,18,.07)',
  fontSize: u(1.05),
};
const chipOff: CSSProperties = {
  padding: u(0.6, 1.2),
  borderRadius: 99,
  fontSize: u(0.95),
  fontWeight: 700,
  border: '1px solid rgba(138,90,31,.22)',
  background: 'rgba(255,255,255,.85)',
  color: '#5a4a3a',
};

function Check() {
  return (
    <span
      style={{
        flex: 'none',
        width: u(1.8),
        height: u(1.8),
        borderRadius: '50%',
        background: 'var(--grad-primary)',
        color: '#fff',
        display: 'grid',
        placeItems: 'center',
      }}
    >
      <Icon name="check" size="55%" stroke={3} />
    </span>
  );
}

export const metadata = pageMetadata('/');

export default function HomePage() {
  const h = homeHero;
  return (
    <>
      {/* ---------- Hero ---------- */}
      <div>
        <h1 id="inicio-title" className="sr-only">
          tinto: atrae, precalifica y organiza tus oportunidades
        </h1>
        <section
          aria-labelledby="inicio-title"
          className="home-hero cq"
          style={{
            position: 'relative',
            width: '100%',
            height: 'calc(100vh + 6cqw)',
            minHeight: 520,
            overflow: 'hidden',
            background: '#3a2a1c',
            color: '#fff',
          }}
        >
          <Image
            src="/images/hero-inicio.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(180deg,rgba(28,18,10,.5),rgba(28,18,10,0) 22%,rgba(28,18,10,0) 45%,rgba(28,18,10,.6))',
            }}
          />
          <div
            className="hero-in"
            style={{
              position: 'absolute',
              zIndex: 2,
              bottom: u(11),
              left: u(4),
              right: u(4),
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: u(3),
            }}
          >
            <div
              className="hero-left"
              style={{
                width: u(22),
                display: 'flex',
                flexDirection: 'column',
                gap: u(1),
                textShadow: '0 1px 12px rgba(40,22,8,.55)',
              }}
            >
              <Image
                className="hero-logo"
                src="/images/tinto-blanco.png"
                alt="tinto"
                width={2376}
                height={683}
                sizes="20vw"
                style={{
                  width: '43%',
                  aspectRatio: '3.48/1',
                  objectFit: 'contain',
                  objectPosition: 'left',
                  display: 'block',
                  position: 'relative',
                  top: u(4.4),
                  left: u(2.9),
                  height: 'auto',
                }}
              />
              <p
                className="hero-p"
                style={{
                  margin: 0,
                  fontSize: u(1),
                  lineHeight: 1.45,
                  position: 'relative',
                  top: u(4.5),
                  left: u(3.3),
                  width: u(31),
                  height: 78,
                }}
              >
                <strong style={{ fontWeight: 700 }}>{h.tagline}</strong>
                {h.body}
              </p>
              <Link
                href="/agendar"
                className="hero-cta btn btn-lift"
                style={{
                  alignSelf: 'flex-start',
                  justifyContent: 'flex-start',
                  gap: u(1.4),
                  background: 'linear-gradient(180deg,rgba(255,255,255,.95),rgba(246,232,214,.85))',
                  backdropFilter: 'blur(6px)',
                  WebkitBackdropFilter: 'blur(6px)',
                  color: '#2a1d12',
                  padding: u(0.4, 0.4, 0.4, 1.4),
                  fontWeight: 600,
                  fontSize: u(1),
                  textShadow: 'none',
                  position: 'relative',
                  zIndex: 4,
                  top: u(4.3),
                  left: u(2.7),
                  width: u(14.6),
                  height: u(2),
                  border: '1px solid rgba(138,90,31,.22)',
                  boxShadow: 'inset 0 1px 0 #fff,0 6px 14px rgba(80,50,20,.12)',
                }}
              >
                {h.cta}
                <span
                  className="hero-cta-arrow"
                  style={{
                    width: u(2),
                    height: u(2),
                    borderRadius: '50%',
                    background: '#2a1d12',
                    color: '#fff',
                    display: 'grid',
                    placeItems: 'center',
                    position: 'relative',
                    left: u(-0.5),
                    marginLeft: 'auto',
                  }}
                >
                  <Icon name="arrow" size="55%" stroke={2.4} />
                </span>
              </Link>
            </div>
            <div
              className="hero-card"
              style={{
                width: u(23),
                padding: u(1.3, 1.6),
                borderRadius: u(1.1),
                background: 'linear-gradient(135deg,rgba(255,255,255,.62),rgba(255,244,230,.38))',
                backdropFilter: 'blur(12px) saturate(1.6)',
                WebkitBackdropFilter: 'blur(12px) saturate(1.6)',
                border: '1px solid rgba(255,255,255,.7)',
                boxShadow: `inset 0 1px 0 rgba(255,255,255,.9),0 14px 36px rgba(80,50,20,.2)`,
                color: '#2a1d12',
                display: 'flex',
                flexDirection: 'column',
                gap: u(0.7),
                position: 'relative',
                top: u(1.5),
                left: u(-3.3),
                boxSizing: 'border-box',
                zIndex: 30,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: u(0.8),
                }}
              >
                <span
                  style={{
                    fontSize: u(0.65),
                    fontWeight: 600,
                    letterSpacing: '.1em',
                    color: '#5a4a3a',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {h.card.label}
                </span>
                <span
                  style={{
                    fontSize: u(0.75),
                    fontWeight: 700,
                    padding: u(0.3, 0.8),
                    borderRadius: 99,
                    background: 'var(--grad-primary)',
                    color: '#fff',
                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,.55)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {h.card.badge}
                </span>
              </div>
              <div
                style={{
                  fontSize: u(1.1),
                  lineHeight: 1.18,
                  fontWeight: 700,
                  letterSpacing: '-.01em',
                }}
              >
                {h.card.title}
              </div>
              <div>
                {h.card.rows.map(([a, b]) => (
                  <div
                    key={a}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: u(0.8),
                      padding: u(0.4, 0),
                      borderTop: '1px solid rgba(42,29,18,.15)',
                      fontSize: u(0.85),
                      lineHeight: 1.15,
                    }}
                  >
                    <span style={{ color: '#5a4a3a' }}>{a}</span>
                    <span style={{ fontWeight: 700, textAlign: 'right' }}>{b}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: u(0.6), marginTop: u(0.5) }}>
                {h.card.steps.map((s) => (
                  <div
                    key={s}
                    style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: u(0.3) }}
                  >
                    <span
                      style={{
                        height: u(0.3),
                        borderRadius: 99,
                        background: 'linear-gradient(90deg,#ff8a3d,#ff9d86)',
                      }}
                    />
                    <span
                      style={{
                        fontSize: u(0.65),
                        color: '#5a4a3a',
                        fontWeight: 500,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {s}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <div
          className="cq cq-pad trust sheet"
          style={{
            marginTop: '-3vw',
            zIndex: 3,
            borderRadius: '44px 44px 0 0',
            padding: `${u(3.4)} ${u(6)} ${u(2)}`,
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: u(2),
          }}
        >
          <span style={{ fontSize: u(1.1), color: '#7a6a58' }}>{h.trust.label}</span>
          <div
            style={{
              display: 'flex',
              gap: u(4),
              flexWrap: 'wrap',
              fontSize: u(1.9),
              fontWeight: 600,
              letterSpacing: '-.02em',
              color: '#b8a995',
            }}
          >
            {h.trust.logos.map((l) => (
              <span key={l}>{l}</span>
            ))}
          </div>
        </div>
      </div>

      <section
        aria-label="C?mo funciona Tinto"
        className="cq"
        style={{
          position: 'relative',
          zIndex: 2,
          background: '#fff',
          padding: `${u(6)} 0 0`,
          display: 'flex',
          flexDirection: 'column',
          gap: u(4),
        }}
      >
        {/* ---------- Tres pasos ---------- */}
        <div
          className="sheet cq-pad"
          style={{
            marginTop: u(-6),
            padding: `${u(8)} ${u(12)} ${u(9)}`,
            display: 'flex',
            flexDirection: 'column',
            gap: u(4),
          }}
        >
          <SectionTitle
            variant="b"
            ghost={homeSteps.ghost}
            title={homeSteps.title}
            sub={homeSteps.sub}
            as="h2"
          />
          <div
            className="rg steps"
            style={{ '--c': 'repeat(3,1fr)', position: 'relative', gap: u(2.4) } as CSSProperties}
          >
            <div
              className="steps-line"
              style={{
                position: 'absolute',
                top: u(1.7),
                left: '16%',
                right: '16%',
                borderTop: '1px dashed rgba(42,29,18,.25)',
              }}
            />
            {[
              {
                n: 1,
                t: 'Conecta tus canales',
                d: 'WhatsApp, formularios y redes llegan a un solo lugar.',
              },
              {
                n: 2,
                t: 'Precalifica',
                d: 'Define las preguntas clave que filtran a cada oportunidad.',
              },
              {
                n: 3,
                t: 'Da seguimiento',
                d: 'Cada oportunidad avanza por su etapa hasta cerrar.',
              },
            ].map((s, i) => (
              <Reveal
                key={s.n}
                delay={i * 90}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: u(1.2),
                  textAlign: 'center',
                }}
              >
                <span
                  style={{
                    width: u(3.4),
                    height: u(3.4),
                    borderRadius: '50%',
                    background: '#fff',
                    border: '1px solid rgba(42,29,18,.15)',
                    display: 'grid',
                    placeItems: 'center',
                    fontSize: u(1.2),
                    position: 'relative',
                    zIndex: 1,
                  }}
                >
                  {s.n}
                </span>
                <div style={{ fontSize: u(1.6), fontWeight: 600 }}>{s.t}</div>
                <div
                  style={{ fontSize: u(1.1), color: '#7a6a58', lineHeight: 1.5, maxWidth: u(20) }}
                >
                  {s.d}
                </div>
                <div className="cream soft" style={mini}>
                  {s.n === 1 && (
                    <>
                      <div style={{ fontSize: u(1.2), fontWeight: 600, marginBottom: u(1) }}>
                        Tus canales
                      </div>
                      <div
                        style={{
                          padding: u(0.9, 1.1),
                          borderRadius: u(0.8),
                          background: '#f7f3ec',
                          fontSize: u(1.05),
                          marginBottom: u(0.8),
                        }}
                      >
                        WhatsApp Business
                      </div>
                      <div
                        style={{
                          padding: u(0.9, 1.1),
                          borderRadius: u(0.8),
                          background: '#f7f3ec',
                          fontSize: u(1.05),
                          marginBottom: u(1.2),
                          color: '#7a6a58',
                        }}
                      >
                        Conectado
                      </div>
                      <div
                        style={{
                          textAlign: 'center',
                          padding: u(1),
                          borderRadius: u(0.8),
                          background: 'var(--grad-dark)',
                          boxShadow:
                            'inset 0 1px 0 rgba(255,255,255,.28),0 6px 14px rgba(42,29,18,.25)',
                          color: '#fff',
                          fontSize: u(1.1),
                          fontWeight: 600,
                        }}
                      >
                        Continuar
                      </div>
                    </>
                  )}
                  {s.n === 2 && (
                    <>
                      <div style={{ fontSize: u(1.2), fontWeight: 600, marginBottom: u(1) }}>
                        Pregunta clave
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: u(0.7),
                          marginBottom: u(1.4),
                        }}
                      >
                        <span
                          style={{
                            ...chipOff,
                            border: '1px solid #ff8a3d',
                            background: 'var(--grad-primary)',
                            color: '#fff',
                            boxShadow: '0 4px 10px rgba(232,120,42,.3)',
                          }}
                        >
                          Este mes
                        </span>
                        {['En 3 meses', 'En 6 meses', 'No sé'].map((c) => (
                          <span key={c} style={chipOff}>
                            {c}
                          </span>
                        ))}
                      </div>
                      <div style={row}>
                        <span>¿Cuándo vence su póliza?</span>
                        <span style={{ color: '#7a6a58' }}>Activa</span>
                      </div>
                      <div style={row}>
                        <span>Puntaje</span>
                        <span style={{ color: '#7a6a58' }}>84 / 100</span>
                      </div>
                    </>
                  )}
                  {s.n === 3 && (
                    <>
                      <div style={{ fontSize: u(1.2), fontWeight: 600, marginBottom: u(0.6) }}>
                        Tu pipeline
                      </div>
                      <div style={row}>
                        <span>Contactada</span>
                        <Icon name="check" size={u(1.2)} style={{ color: '#7a6a58' }} />
                      </div>
                      <div style={row}>
                        <span>En propuesta</span>
                        <Icon name="check" size={u(1.2)} style={{ color: '#7a6a58' }} />
                      </div>
                      <div style={row}>
                        <span>Cierre estimado</span>
                        <span style={{ color: '#7a6a58' }}>12 días</span>
                      </div>
                      <div
                        style={{
                          marginTop: u(1),
                          height: u(0.6),
                          borderRadius: 99,
                          background: '#efe8db',
                        }}
                      >
                        <div
                          style={{
                            width: '68%',
                            height: '100%',
                            borderRadius: 99,
                            background: 'linear-gradient(90deg,#ff8a5c,#ffb48a)',
                          }}
                        />
                      </div>
                    </>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* ---------- Imagen "Todo lo que te imaginas" ---------- */}
        <div
          className="banner-wrap"
          style={{ position: 'relative', background: '#fff', marginTop: u(2), overflow: 'hidden' }}
        >
          <Image
            src="/images/colinas-escritorio.jpg"
            alt={homeBanner.alt}
            width={2712}
            height={1536}
            sizes="100vw"
            className="banner-img"
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
          <Image
            className="bird"
            src="/images/pajaros.png"
            alt=""
            width={417}
            height={282}
            sizes="19vw"
            style={
              {
                position: 'absolute',
                right: '9%',
                top: '21%',
                width: u(19),
                height: 'auto',
                opacity: 0.9,
                pointerEvents: 'none',
                '--bd': '5200ms',
                '--bx': '12px',
              } as CSSProperties
            }
          />
          <Image
            className="bird"
            src="/images/pajaros.png"
            alt=""
            width={417}
            height={282}
            sizes="9vw"
            style={
              {
                position: 'absolute',
                left: '8%',
                top: '30%',
                width: u(9),
                height: 'auto',
                opacity: 0.7,
                transform: 'scaleX(-1)',
                pointerEvents: 'none',
                '--bd': '6100ms',
                '--bx': '-10px',
              } as CSSProperties
            }
          />
          <div
            className="banner-text"
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: `calc(5% + ${u(3)})`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: u(1),
              textAlign: 'center',
              padding: u(0, 4),
            }}
          >
            <GhostTitle size={9} top={-6.2} style={{ maxWidth: '100%' }}>
              {homeBanner.ghost}
            </GhostTitle>
            <Reveal
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: u(1) }}
            >
              <h2
                className="fz"
                style={
                  {
                    ...k(4.2),
                    margin: 0,
                    lineHeight: 1.06,
                    letterSpacing: '-.025em',
                    fontWeight: 600,
                    maxWidth: u(88),
                    color: '#2a1d12',
                    textShadow: '0 0 2cqw #fff,0 0 1cqw #fff',
                    position: 'relative',
                    zIndex: 1,
                  } as CSSProperties
                }
              >
                {homeBanner.title}{' '}
                <em style={{ fontStyle: 'normal', fontWeight: 800, color: '#e8782a' }}>
                  {homeBanner.accent}
                </em>
              </h2>
              <p
                style={{
                  margin: 0,
                  fontSize: u(1.25),
                  lineHeight: 1.5,
                  color: '#6b5a48',
                  maxWidth: u(60),
                  textShadow: '0 0 1.4cqw #fff,0 0 .6cqw #fff',
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                {homeBanner.sub}
              </p>
            </Reveal>
          </div>
        </div>

        {/* ---------- Módulos ---------- */}
        <div className="cq-pad" style={{ padding: `${u(4)} ${u(12)} ${u(9)}` }}>
          <SectionTitle
            ghost={homeModules.ghost}
            title={homeModules.title}
            sub={homeModules.sub}
            as="h2"
          />
          <div
            className="rg"
            style={{ '--c': 'repeat(4,1fr)', '--m': 1, gap: u(1.6) } as CSSProperties}
          >
            {homeModules.items.map((m, i) => (
              <CreamCard
                key={m.title}
                href="/producto?go=Elige%20tu%20m%C3%B3dulo"
                lift
                delay={i * 70}
              >
                <span className="ico">
                  <Icon name={m.icon} size={u(1.9)} stroke={1.8} style={{ color: '#fff' }} />
                </span>
                <div style={{ fontSize: u(1.5), fontWeight: 800, letterSpacing: '-.02em' }}>
                  {m.title}
                </div>
                <div style={{ fontSize: u(1.05), lineHeight: 1.5, color: '#7a6a58' }}>{m.text}</div>
                <span
                  style={{ marginTop: 'auto', fontSize: u(1), fontWeight: 700, color: '#e8782a' }}
                >
                  Ver módulo →
                </span>
              </CreamCard>
            ))}
          </div>
        </div>

        {/* ---------- Cifras ---------- */}
        <div className="cq-pad" style={{ padding: `${u(4)} ${u(12)} ${u(9)}` }}>
          <Reveal>
            <div
              className="cream rg"
              style={
                {
                  '--c': 'repeat(4,1fr)',
                  '--m': 2,
                  padding: u(3.4, 4),
                  gap: u(2),
                  background:
                    'radial-gradient(55% 90% at 8% 15%,rgba(249,201,160,.55),transparent 70%),linear-gradient(135deg,#fff4e6,#ffe8d2)',
                } as CSSProperties
              }
            >
              {homeStats.map((s, i) => (
                <div
                  key={s.value}
                  className={i ? 'stat-b' : ''}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: u(0.5),
                    ...(i
                      ? { borderLeft: '1px solid rgba(138,90,31,.18)', paddingLeft: u(2) }
                      : {}),
                  }}
                >
                  <div
                    className="fz"
                    style={
                      {
                        ...k(4),
                        fontWeight: 800,
                        letterSpacing: '-.04em',
                        lineHeight: 1,
                        color: '#e8782a',
                      } as CSSProperties
                    }
                  >
                    {s.value}
                  </div>
                  <div style={{ fontSize: u(1.1), color: '#7a6a58' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* ---------- Para quién es ---------- */}
        <div className="cq-pad" style={{ padding: `${u(4)} ${u(12)} ${u(9)}` }}>
          <div
            className="rg"
            style={{ '--c': '1fr 1fr', gap: u(4), alignItems: 'center' } as CSSProperties}
          >
            <Reveal>
              <Image
                src="/images/foto-corredora.png"
                alt={homeFor.alt}
                width={896}
                height={1200}
                sizes="(max-width: 899px) 100vw, 42vw"
                style={{
                  width: '100%',
                  aspectRatio: '4/4.2',
                  objectFit: 'cover',
                  objectPosition: '50% 60%',
                  display: 'block',
                  borderRadius: u(2.8),
                  boxShadow: `0 ${u(1.4)} ${u(3.4)} rgba(60,40,20,.16)`,
                  height: 'auto',
                }}
              />
            </Reveal>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: u(1.4),
                position: 'relative',
              }}
            >
              <GhostTitle size={5.4} top={-4.2} align="left">
                {homeFor.ghost}
              </GhostTitle>
              <Reveal style={{ display: 'flex', flexDirection: 'column', gap: u(1.4) }}>
                <h2
                  className="fz"
                  style={
                    {
                      ...k(3.4),
                      position: 'relative',
                      zIndex: 1,
                      margin: 0,
                      lineHeight: 1.06,
                      fontWeight: 800,
                      letterSpacing: '-.035em',
                      textWrap: 'balance',
                    } as CSSProperties
                  }
                >
                  {homeFor.title} <Accent>{homeFor.accent}</Accent>
                </h2>
                <p style={{ margin: 0, fontSize: u(1.2), lineHeight: 1.55, color: '#7a6a58' }}>
                  {homeFor.text}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: u(0.9) }}>
                  {homeFor.checks.map((c) => (
                    <div
                      key={c}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: u(1),
                        fontSize: u(1.15),
                        fontWeight: 600,
                      }}
                    >
                      <Check />
                      {c}
                    </div>
                  ))}
                </div>
                <div
                  style={{
                    display: 'flex',
                    gap: u(1.4),
                    alignItems: 'center',
                    marginTop: u(0.6),
                    flexWrap: 'wrap',
                  }}
                >
                  <Button href="/soluciones">Ver soluciones</Button>
                  <Link href="/agendar" className="link-brand" style={{ fontSize: u(1.05) }}>
                    Agendar demo →
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </div>

        {/* ---------- Reseñas ---------- */}
        <div className="cq-pad" style={{ padding: `${u(4)} ${u(12)} ${u(9)}` }}>
          <SectionTitle ghost={homeReviews.ghost} title={homeReviews.title} as="h2" />
          <div className="rg" style={{ '--c': 'repeat(3,1fr)', gap: u(1.6) } as CSSProperties}>
            {homeReviews.items.map((r, i) => (
              <CreamCard key={r.org} delay={i * 80} style={{ gap: u(1.4) }}>
                <div
                  style={{ color: '#e8782a', fontSize: u(1.3), letterSpacing: '.2em' }}
                  aria-label="5 de 5 estrellas"
                >
                  ★★★★★
                </div>
                <div
                  style={{
                    fontSize: u(1.35),
                    lineHeight: 1.45,
                    fontWeight: 600,
                    letterSpacing: '-.01em',
                  }}
                >
                  {r.quote}
                </div>
                <div
                  style={{ display: 'flex', alignItems: 'center', gap: u(0.9), marginTop: 'auto' }}
                >
                  <span
                    style={{
                      flex: 'none',
                      width: u(2.8),
                      height: u(2.8),
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg,#ffd2b0,#ff9d86)',
                      display: 'grid',
                      placeItems: 'center',
                      color: '#fff',
                      fontWeight: 800,
                      fontSize: u(1.1),
                    }}
                  >
                    {r.initial}
                  </span>
                  <div style={{ lineHeight: 1.25 }}>
                    <div style={{ fontSize: u(1), fontWeight: 800 }}>{r.role}</div>
                    <div style={{ fontSize: u(0.9), color: '#7a6a58' }}>{r.org}</div>
                  </div>
                </div>
              </CreamCard>
            ))}
          </div>
        </div>

        {/* ---------- Preguntas rápidas ---------- */}
        <div className="cq-pad" style={{ padding: `${u(4)} ${u(12)} ${u(9)}` }}>
          <SectionTitle ghost={homeQuick.ghost} title={homeQuick.title} as="h2" />
          <div className="rg" style={{ '--c': 'repeat(3,1fr)', gap: u(1.6) } as CSSProperties}>
            {homeQuick.items.map((q, i) => (
              <CreamCard key={q.q} delay={i * 80} style={{ gap: u(0.9) }}>
                <h3
                  style={{ margin: 0, fontSize: u(1.35), fontWeight: 800, letterSpacing: '-.02em' }}
                >
                  {q.q}
                </h3>
                <div style={{ fontSize: u(1.05), lineHeight: 1.55, color: '#7a6a58' }}>{q.a}</div>
              </CreamCard>
            ))}
          </div>
          <Reveal style={{ textAlign: 'center', marginTop: u(2.4) }}>
            <Link href="/dudas" className="link-brand" style={{ fontSize: u(1.1) }}>
              {homeQuick.link}
            </Link>
          </Reveal>
        </div>

        {/* ---------- Cómo trabajamos + cierre ---------- */}
        <div
          className="cq-pad"
          style={{
            padding: `${u(6)} ${u(12)} ${u(10)}`,
            display: 'flex',
            flexDirection: 'column',
            gap: u(3),
          }}
        >
          <Reveal
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: u(1.2),
              textAlign: 'center',
            }}
          >
            <span
              style={{
                fontSize: u(0.95),
                fontWeight: 600,
                letterSpacing: '.12em',
                color: '#8a5a1f',
              }}
            >
              {homeWork.eyebrow}
            </span>
            <h2
              className="fz"
              style={
                {
                  ...k(3.6),
                  margin: 0,
                  lineHeight: 1.06,
                  maxWidth: u(50),
                  textWrap: 'balance',
                } as CSSProperties
              }
            >
              {homeWork.title} <Accent>{homeWork.accent}</Accent>
            </h2>
          </Reveal>
          <div className="rg" style={{ '--c': 'repeat(3,1fr)', gap: u(1.6) } as CSSProperties}>
            {homeWork.items.map((w, i) => (
              <CreamCard
                key={w.title}
                soft
                delay={i * 80}
                style={{ padding: u(2), borderRadius: u(2), gap: u(0.8) }}
              >
                <span className="num" style={{ width: u(3), height: u(3), fontSize: u(1.2) }}>
                  {i + 1}
                </span>
                <div style={{ fontSize: u(1.5), fontWeight: 800, letterSpacing: '-.02em' }}>
                  {w.title}
                </div>
                <div style={{ fontSize: u(1.05), lineHeight: 1.5, color: '#7a6a58' }}>{w.text}</div>
              </CreamCard>
            ))}
          </div>
          <Reveal
            className="home-close"
            style={{
              marginTop: u(1),
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: u(3),
              padding: u(3, 4),
              borderRadius: u(3),
              background:
                'radial-gradient(60% 120% at 12% 20%,rgba(249,201,160,.7),transparent 70%),radial-gradient(55% 120% at 92% 80%,rgba(255,157,134,.5),transparent 70%),linear-gradient(135deg,#fff4e6,#ffe6d0)',
              border: '1px solid rgba(255,255,255,.9)',
              boxShadow: `0 ${u(1.4)} ${u(3.4)} rgba(240,150,80,.22),inset 0 1px 0 #fff`,
            }}
          >
            <div style={{ maxWidth: u(34) }}>
              <h3
                className="fz"
                style={
                  {
                    ...k(2.6),
                    margin: 0,
                    lineHeight: 1.08,
                    fontWeight: 800,
                    letterSpacing: '-.03em',
                    color: '#2a1d12',
                  } as CSSProperties
                }
              >
                {homeWork.closing.title}
              </h3>
              <div
                style={{ fontSize: u(1.15), lineHeight: 1.5, color: '#7a5c3a', marginTop: u(0.8) }}
              >
                {homeWork.closing.text}
              </div>
            </div>
            <Button
              href="/agendar"
              strong
              lift
              style={{ flex: 'none', padding: u(1.2, 3), fontSize: u(1.2) }}
            >
              ¿Agendamos un tinto?
            </Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
