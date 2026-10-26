import { JsonLd } from '@/components/JsonLd';
import { pageStructuredData } from '@/lib/structured-data';
import { pageMetadata } from '@/lib/metadata';
import Image from 'next/image';
import type { CSSProperties } from 'react';
import { ContactForm } from '@/components/ContactForm';
import { Icon } from '@/components/Icons';
import { ScrollToGo } from '@/components/ScrollToGo';
import { Accent, Button, GhostTitle, Reveal } from '@/components/ui';
import { contactoChannels, contactoCta, contactoHero, contactoWays } from '@/content/contacto';
import { textSize, k, u } from '@/lib/u';

const glass = (extra: CSSProperties = {}): CSSProperties => ({
  padding: u(0.9, 1.2),
  borderRadius: u(1.3),
  background: 'rgba(255,255,255,.85)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  border: '1px solid rgba(255,255,255,.9)',
  boxShadow: '0 5px 14px rgba(80,50,20,.1)',
  ...extra,
});

export const metadata = pageMetadata('/contacto');

export default function ContactoPage() {
  const m = contactoCta.mock;
  return (
    <>
      <JsonLd data={pageStructuredData('/contacto')} />
      <ScrollToGo />
      <div className="pg">
        <div
          className="rg ct-hero"
          style={
            {
              '--c': '1fr 1.1fr',
              gap: u(5),
              alignItems: 'stretch',
              minHeight: u(42),
              paddingBottom: u(3),
            } as CSSProperties
          }
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: u(3),
            }}
          >
            <Reveal
              style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                gap: u(2),
                alignItems: 'flex-start',
              }}
            >
              <GhostTitle size={6.6} top={-4.6} align="left">
                {contactoHero.ghost}
              </GhostTitle>
              <h1
                className="fz"
                style={
                  {
                    ...k(5.8),
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
                {contactoHero.title} <Accent>{contactoHero.accent}</Accent>
              </h1>
              <p
                style={{
                  margin: 0,
                  maxWidth: u(30),
                  fontSize: textSize(1.25),
                  lineHeight: 1.55,
                  color: '#7a6a58',
                }}
              >
                {contactoHero.text}
              </p>
            </Reveal>
            <Reveal style={{ display: 'flex', flexDirection: 'column', gap: u(1.3) }}>
              {contactoHero.info.map((i) => (
                <div key={i.label} style={{ display: 'flex', alignItems: 'center', gap: u(1.2) }}>
                  <span
                    className="cream soft"
                    style={{
                      flex: 'none',
                      width: u(3.6),
                      height: u(3.6),
                      borderRadius: u(1.2),
                      padding: 0,
                      display: 'grid',
                      placeItems: 'center',
                    }}
                  >
                    <Icon name={i.icon} size={u(1.7)} stroke={1.8} style={{ color: '#e8782a' }} />
                  </span>
                  <div style={{ lineHeight: 1.3 }}>
                    <div style={{ fontSize: textSize(0.85), color: '#7a6a58', fontWeight: 500 }}>
                      {i.label}
                    </div>
                    <div style={{ fontSize: textSize(1.2), fontWeight: 700 }}>{i.value}</div>
                  </div>
                </div>
              ))}
            </Reveal>
          </div>
          <Reveal>
            <ContactForm />
          </Reveal>
        </div>

        {/* Tres formas */}
        <div
          className="ct-ways"
          style={{
            position: 'relative',
            zIndex: 2,
            margin: `${u(2)} ${u(-8)} 0`,
            padding: `${u(3)} ${u(8)} 0`,
            background: '#fff',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: u(1.6),
            textAlign: 'center',
          }}
        >
          <span
            aria-hidden="true"
            data-ghost=""
            className="ghost ct-ghost"
            style={
              {
                ...k(6),
                top: `calc(${u(3)} + 111px - ${u(4.2)})`,
                left: '50%',
                transform: 'translateX(-50%)',
              } as CSSProperties
            }
          >
            {contactoWays.ghost}
          </span>
          <h2
            className="fz ct-off1"
            style={
              {
                ...k(4),
                zIndex: 1,
                margin: 0,
                lineHeight: 1.05,
                fontWeight: 800,
                letterSpacing: '-.035em',
                maxWidth: u(50),
                textWrap: 'balance',
                color: '#2a1d12',
                position: 'relative',
                top: 111,
              } as CSSProperties
            }
          >
            {contactoWays.title} <Accent>{contactoWays.accent}</Accent>
          </h2>
          <p
            className="ct-off2"
            style={{
              margin: 0,
              fontSize: textSize(1.2),
              color: '#7a6a58',
              maxWidth: u(34),
              lineHeight: 1.5,
              position: 'relative',
              top: 103,
            }}
          >
            {contactoWays.text}
          </p>
          <div
            className="rg"
            style={
              {
                '--c': 'repeat(3,1fr)',
                '--m': 1,
                gap: u(1.6),
                width: '100%',
                marginTop: u(2),
              } as CSSProperties
            }
          >
            {contactoWays.items.map((w, i) => (
              <div
                key={w.title}
                className="cream soft ct-off3"
                style={{
                  textAlign: 'left',
                  gap: u(1),
                  padding: u(2.4),
                  borderRadius: u(2.4),
                  position: 'relative',
                  top: 116,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                  }}
                >
                  <span className="ico">
                    <Icon name={w.icon} size={u(1.8)} stroke={1.8} style={{ color: '#fff' }} />
                  </span>
                  <span className="tag">{w.tag}</span>
                </div>
                <div
                  style={{
                    fontSize: textSize(1.7),
                    fontWeight: 800,
                    letterSpacing: '-.02em',
                    marginTop: u(0.6),
                  }}
                >
                  {w.title}
                </div>
                <div style={{ fontSize: textSize(1.05), lineHeight: 1.5, color: '#7a6a58' }}>{w.text}</div>
                <a
                  href="#form"
                  className="link-brand"
                  style={{ marginTop: u(0.6), alignSelf: 'flex-start', fontSize: textSize(1.05) }}
                  data-i={i}
                >
                  {w.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
        <div
          className="ct-ways-img"
          style={{
            position: 'relative',
            width: `calc(100% + ${u(16)})`,
            margin: `${u(4)} ${u(-8)} 0`,
          }}
        >
          <Image
            src="/images/jinetes-desierto.jpg"
            alt={contactoWays.alt}
            width={3132}
            height={1376}
            sizes="100vw"
            style={{ display: 'block', width: '100%', height: 'auto', mixBlendMode: 'multiply' }}
          />
        </div>

        <div
          className="ct-sheet sheet"
          style={{ zIndex: 3, margin: `${u(-7)} ${u(-8)} 0`, padding: `${u(1)} ${u(8)} 0` }}
        >
          <div
            className="rg ct-chan"
            style={
              {
                '--c': 'repeat(3,1fr)',
                '--m': 1,
                gap: u(1.6),
                padding: `${u(5)} ${u(4)} ${u(5)}`,
              } as CSSProperties
            }
          >
            {contactoChannels.map((c, i) => (
              <Reveal key={c.title} fill delay={i * 80}>
                <div className="cream soft lift" style={{ gap: u(1.2) }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <span className="ico" style={{ width: u(4.4), height: u(4.4) }}>
                      <Icon name={c.icon} size={u(1.9)} stroke={1.8} style={{ color: '#fff' }} />
                    </span>
                    <span className="tag">{c.tag}</span>
                  </div>
                  <h3
                    style={{
                      margin: 0,
                      fontSize: textSize(1.6),
                      fontWeight: 800,
                      letterSpacing: '-.02em',
                    }}
                  >
                    {c.title}
                  </h3>
                  <div>
                    {c.rows.map(([a, b]) => (
                      <div
                        key={a}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          gap: u(1),
                          padding: u(0.7, 0),
                          borderTop: '1px solid rgba(42,29,18,.08)',
                          fontSize: textSize(1.05),
                        }}
                      >
                        <span style={{ color: '#7a6a58' }}>{a}</span>
                        <span style={{ fontWeight: 700, textAlign: 'right' }}>{b}</span>
                      </div>
                    ))}
                  </div>
                  <a href="#form" className="link-brand" style={{ fontSize: textSize(1.05) }}>
                    {c.cta}
                  </a>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal
            className="rg"
            style={
              {
                '--c': '1fr 1.15fr',
                '--m': 1,
                position: 'relative',
                overflow: 'hidden',
                borderRadius: u(3),
                padding: u(3.6),
                gap: u(3),
                alignItems: 'center',
                marginBottom: u(8),
                background:
                  'radial-gradient(55% 90% at 8% 15%,rgba(249,201,160,.75),transparent 70%),radial-gradient(45% 80% at 95% 90%,rgba(255,157,134,.5),transparent 70%),linear-gradient(135deg,#fff4e6,#ffe8d2)',
                border: '1px solid rgba(255,255,255,.9)',
                boxShadow: `0 ${u(1.4)} ${u(3.4)} rgba(240,150,80,.22),inset 0 1px 0 #fff`,
              } as CSSProperties
            }
          >
            <div
              style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                gap: u(1.5),
                alignItems: 'flex-start',
              }}
            >
              <h2
                className="fz"
                style={
                  {
                    ...k(3.4),
                    position: 'relative',
                    zIndex: 1,
                    margin: 0,
                    lineHeight: 1.04,
                    fontWeight: 800,
                    letterSpacing: '-.035em',
                    textWrap: 'balance',
                  } as CSSProperties
                }
              >
                {contactoCta.title} <Accent>{contactoCta.accent}</Accent>
              </h2>
              <p
                style={{
                  margin: 0,
                  fontSize: textSize(1.15),
                  lineHeight: 1.55,
                  color: '#7a6a58',
                  maxWidth: u(27),
                }}
              >
                {contactoCta.text}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: u(0.8) }}>
                {contactoCta.checks.map((c) => (
                  <div
                    key={c}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: u(0.9),
                      fontSize: textSize(1.1),
                      fontWeight: 600,
                    }}
                  >
                    <span
                      style={{
                        flex: 'none',
                        width: u(1.9),
                        height: u(1.9),
                        borderRadius: '50%',
                        background: 'var(--grad-primary)',
                        color: '#fff',
                        display: 'grid',
                        placeItems: 'center',
                        boxShadow:
                          'inset 0 1px 0 rgba(255,255,255,.6),0 3px 8px rgba(232,120,42,.35)',
                      }}
                    >
                      <Icon name="check" size="58%" stroke={3} />
                    </span>
                    {c}
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: u(1), marginTop: u(0.4), flexWrap: 'wrap' }}>
                <Button
                  href="/producto"
                  strong
                  lift
                  style={{ padding: u(1.05, 2.5), fontSize: textSize(1.1) }}
                >
                  Ver producto
                </Button>
                <Button
                  href="/dudas"
                  variant="glass"
                  lift
                  style={{ padding: u(1.05, 2.5), fontSize: textSize(1.1), fontWeight: 700 }}
                >
                  Hablar con un asesor
                </Button>
              </div>
              <div
                style={{
                  display: 'flex',
                  gap: u(2.4),
                  marginTop: u(0.6),
                  paddingTop: u(1.4),
                  borderTop: '1px solid rgba(42,29,18,.1)',
                  width: '100%',
                  flexWrap: 'wrap',
                }}
              >
                {contactoCta.stats.map(([v, l]) => (
                  <div key={v} style={{ lineHeight: 1.25 }}>
                    <div
                      style={{
                        fontSize: textSize(2.2),
                        fontWeight: 800,
                        letterSpacing: '-.03em',
                        color: '#e8782a',
                      }}
                    >
                      {v}
                    </div>
                    <div style={{ fontSize: textSize(0.9), color: '#7a6a58' }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
            <div
              className="ct-mock"
              style={{
                borderRadius: u(3),
                padding: u(2),
                background:
                  'radial-gradient(60% 50% at 15% 8%,rgba(249,201,160,.9),transparent 70%),radial-gradient(55% 55% at 92% 96%,rgba(255,157,134,.55),transparent 70%),linear-gradient(135deg,#fff4e6,#ffe0c4)',
                boxShadow: `0 ${u(1.4)} ${u(3.4)} rgba(240,150,80,.22)`,
                display: 'flex',
                flexDirection: 'column',
                gap: u(1.4),
                alignSelf: 'start',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: u(0.5) }}>
                {['#ff8a3d', '#ffb98a', '#ffd9bd'].map((c) => (
                  <span
                    key={c}
                    style={{ width: u(0.8), height: u(0.8), borderRadius: '50%', background: c }}
                  />
                ))}
                <span style={{ marginLeft: u(0.8), fontSize: textSize(0.95), fontWeight: 800 }}>
                  Oportunidades
                </span>
                <span
                  style={{
                    marginLeft: 'auto',
                    fontSize: textSize(0.8),
                    fontWeight: 700,
                    color: '#7a6a58',
                  }}
                >
                  {m.header}
                </span>
              </div>
              <div
                style={{
                  padding: u(1.5),
                  borderRadius: u(1.8),
                  background: 'linear-gradient(135deg,rgba(255,255,255,.96),rgba(255,246,235,.88))',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255,255,255,.9)',
                  boxShadow: '0 10px 26px rgba(80,50,20,.14)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: u(0.7),
                }}
              >
                <div
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                  <span
                    style={{
                      fontSize: textSize(0.75),
                      fontWeight: 700,
                      letterSpacing: '.12em',
                      color: '#8a5a1f',
                    }}
                  >
                    {m.card.label}
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
                    {m.card.badge}
                  </span>
                </div>
                <div style={{ fontSize: textSize(1.4), fontWeight: 800, letterSpacing: '-.02em' }}>
                  {m.card.title}
                </div>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'var(--mobile-detail-columns, auto 1fr)',
                    gap: `${u(0.4)} ${u(1.4)}`,
                    fontSize: textSize(1),
                    borderTop: '1px solid rgba(42,29,18,.08)',
                    paddingTop: u(0.7),
                  }}
                >
                  {m.card.rows.map(([a, b]) => (
                    <span key={a} style={{ display: 'contents' }}>
                      <span style={{ color: '#7a6a58' }}>{a}</span>
                      <b style={{ textAlign: 'right' }}>{b}</b>
                    </span>
                  ))}
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'var(--mobile-counter-columns, repeat(3,1fr))', gap: u(1) }}>
                {m.counters.map(([l, v, hot]) => (
                  <div
                    key={l as string}
                    style={glass({
                      padding: u(1, 1.2),
                      background: 'rgba(255,255,255,.92)',
                      backdropFilter: 'none',
                    })}
                  >
                    <div style={{ fontSize: textSize(0.8), fontWeight: 700, color: '#7a6a58' }}>{l}</div>
                    <div
                      style={{
                        fontSize: textSize(2),
                        fontWeight: 800,
                        letterSpacing: '-.03em',
                        lineHeight: 1.1,
                        color: hot ? '#e8782a' : '#2a1d12',
                      }}
                    >
                      {v}
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: u(1) }}>
                {m.alerts.map(([l, v]) => (
                  <div key={l} style={glass()}>
                    <div
                      style={{
                        fontSize: textSize(0.7),
                        fontWeight: 700,
                        letterSpacing: '.1em',
                        color: '#8a5a1f',
                      }}
                    >
                      {l}
                    </div>
                    <div style={{ fontSize: textSize(1.1), fontWeight: 800, lineHeight: 1.25 }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </>
  );
}
