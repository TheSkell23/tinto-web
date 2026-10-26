import { JsonLd } from '@/components/JsonLd';
import { pageStructuredData } from '@/lib/structured-data';
import { pageMetadata } from '@/lib/metadata';
import Image from 'next/image';
import Link from 'next/link';
import type { CSSProperties } from 'react';
import { CrmMockup } from '@/components/CrmMockup';
import { Icon } from '@/components/Icons';
import { PageHero } from '@/components/PageHero';
import { ScrollToGo } from '@/components/ScrollToGo';
import {
  Accent,
  Button,
  ClosingBand,
  CreamCard,
  GhostTitle,
  Reveal,
  SectionTitle,
} from '@/components/ui';
import {
  solBenefit,
  solClosing,
  solFor,
  solHero,
  solSteps,
  solTable,
  solTypes,
} from '@/content/soluciones';
import { k, u } from '@/lib/u';

const check = (size: number) => (
  <span
    style={{
      flex: 'none',
      width: u(size),
      height: u(size),
      borderRadius: '50%',
      background: 'var(--grad-primary)',
      color: '#fff',
      display: 'grid',
      placeItems: 'center',
    }}
  >
    <Icon name="check" size="58%" stroke={3} />
  </span>
);
const cellBase: CSSProperties = {
  padding: u(1.05, 1),
  borderTop: '1px solid rgba(42,29,18,.08)',
  textAlign: 'center',
  fontSize: u(1.05),
  fontWeight: 600,
};
const cellHot: CSSProperties = {
  ...cellBase,
  background: 'linear-gradient(180deg,rgba(255,138,61,.04),rgba(255,138,61,.12))',
};
const cellLabel: CSSProperties = {
  padding: u(1.05, 1),
  borderTop: '1px solid rgba(42,29,18,.08)',
  fontSize: u(1.05),
  fontWeight: 600,
  color: '#7a6a58',
};
const thStyle: CSSProperties = {
  padding: u(1.3, 1),
  textAlign: 'center',
  fontSize: u(1.3),
  fontWeight: 800,
  letterSpacing: '-.02em',
};
const glassCard = (extra: CSSProperties): CSSProperties => ({
  position: 'absolute',
  background: 'linear-gradient(135deg,rgba(255,255,255,.9),rgba(255,246,235,.8))',
  backdropFilter: 'blur(14px)',
  WebkitBackdropFilter: 'blur(14px)',
  border: '1px solid rgba(255,255,255,.9)',
  ...extra,
});

export const metadata = pageMetadata('/soluciones');

export default function SolucionesPage() {
  const f = solFor.card;
  return (
    <>
      <JsonLd data={pageStructuredData('/soluciones')} />
      <ScrollToGo />
      <div className="pg">
        <PageHero
          ghost={solHero.ghost}
          title={solHero.title}
          accent={solHero.accent}
          text={solHero.text}
          primary={{ label: 'Ver soluciones', href: '#tipos' }}
          secondary={{ label: 'Agendar una demo →', href: '/agendar' }}
        >
          <CrmMockup
            title={solHero.board.title}
            period={solHero.board.period}
            columns={solHero.board.columns}
            card={solHero.board.card}
          />
        </PageHero>

        {/* Para quién es */}
        <div style={{ paddingBottom: u(9) }}>
          <Reveal
            style={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              gap: u(0.8),
              marginBottom: u(3),
            }}
          >
            <GhostTitle size={5.4} top={-3.6} align="left">
              {solFor.ghost}
            </GhostTitle>
            <h3
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
                  maxWidth: u(44),
                  textWrap: 'balance',
                } as CSSProperties
              }
            >
              {solFor.title} <Accent>{solFor.accent}</Accent>
            </h3>
          </Reveal>
          <div
            className="rg"
            style={{ '--c': '1.05fr 1fr', gap: u(4), alignItems: 'center' } as CSSProperties}
          >
            <Reveal style={{ position: 'relative' }}>
              <Image
                src="/images/foto-oficina.png"
                alt={solFor.alt}
                width={896}
                height={1200}
                sizes="(max-width: 899px) 100vw, 46vw"
                style={{
                  width: '100%',
                  aspectRatio: '4/4.3',
                  objectFit: 'cover',
                  objectPosition: '50% 78%',
                  display: 'block',
                  borderRadius: u(2.8),
                  boxShadow: `0 ${u(1.4)} ${u(3.4)} rgba(60,40,20,.16)`,
                  height: 'auto',
                }}
              />
              <div
                className="glass"
                style={{
                  position: 'absolute',
                  left: u(1.6),
                  top: u(1.6),
                  display: 'flex',
                  alignItems: 'center',
                  gap: u(0.7),
                  padding: u(0.7, 1.2),
                  borderRadius: 99,
                  background: 'rgba(255,255,255,.82)',
                  fontSize: u(0.95),
                  fontWeight: 700,
                  boxShadow: '0 8px 20px rgba(60,40,20,.16)',
                }}
              >
                <span
                  className="dot"
                  style={{
                    width: u(0.7),
                    height: u(0.7),
                    borderRadius: '50%',
                    background: '#2fbf71',
                  }}
                />
                {solFor.live}
              </div>
              <div
                className="sol-today"
                style={glassCard({
                  left: u(-2.4),
                  bottom: u(2.4),
                  width: u(21),
                  padding: u(1.3, 1.5),
                  borderRadius: u(1.8),
                  boxShadow: '0 18px 40px rgba(60,40,20,.22)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: u(0.9),
                })}
              >
                <div
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                  <span
                    style={{
                      fontSize: u(0.75),
                      fontWeight: 700,
                      letterSpacing: '.12em',
                      color: '#8a5a1f',
                    }}
                  >
                    {solFor.today.label}
                  </span>
                  <span
                    style={{
                      fontSize: u(1.4),
                      fontWeight: 800,
                      color: '#e8782a',
                      letterSpacing: '-.02em',
                    }}
                  >
                    {solFor.today.value}
                  </span>
                </div>
                {solFor.today.rows.map(([ini, name, sub, st, hot]) => (
                  <div
                    key={name as string}
                    style={{ display: 'flex', alignItems: 'center', gap: u(0.8) }}
                  >
                    <span
                      style={{
                        flex: 'none',
                        width: u(2),
                        height: u(2),
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg,#ffd2b0,#ff9d86)',
                        display: 'grid',
                        placeItems: 'center',
                        fontSize: u(0.8),
                        fontWeight: 800,
                        color: '#fff',
                      }}
                    >
                      {ini}
                    </span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: u(0.95), fontWeight: 800, lineHeight: 1.2 }}>
                        {name}
                      </div>
                      <div style={{ fontSize: u(0.75), color: '#7a6a58' }}>{sub}</div>
                    </div>
                    <span
                      style={{
                        fontSize: u(0.75),
                        fontWeight: 800,
                        padding: u(0.25, 0.7),
                        borderRadius: 99,
                        ...(hot
                          ? { background: 'var(--grad-primary)', color: '#fff' }
                          : { background: '#fff4e6', color: '#c2561a' }),
                      }}
                    >
                      {st}
                    </span>
                  </div>
                ))}
                <div
                  style={{
                    height: u(0.4),
                    borderRadius: 99,
                    background: 'rgba(138,90,31,.12)',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      width: `${solFor.today.progress}%`,
                      height: '100%',
                      background: 'linear-gradient(90deg,#ff8a3d,#ff9d86)',
                    }}
                  />
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: u(0.75),
                    color: '#7a6a58',
                  }}
                >
                  <span>{solFor.today.goal}</span>
                  <b style={{ color: '#2a1d12' }}>{solFor.today.progress}%</b>
                </div>
              </div>
              <div
                className="sol-citas"
                style={glassCard({
                  right: u(-1.6),
                  top: u(6.4),
                  padding: u(1, 1.3),
                  borderRadius: u(1.5),
                  boxShadow: '0 14px 32px rgba(60,40,20,.2)',
                })}
              >
                <div
                  style={{
                    fontSize: u(0.75),
                    fontWeight: 700,
                    letterSpacing: '.1em',
                    color: '#8a5a1f',
                  }}
                >
                  {solFor.citas.label}
                </div>
                <div
                  style={{
                    fontSize: u(2),
                    fontWeight: 800,
                    color: '#2a1d12',
                    letterSpacing: '-.03em',
                    lineHeight: 1.1,
                  }}
                >
                  {solFor.citas.value}{' '}
                  <span style={{ fontSize: u(0.9), color: '#2fbf71' }}>{solFor.citas.delta}</span>
                </div>
              </div>
            </Reveal>

            <CreamCard style={{ padding: u(2.4), gap: u(1.6) }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: u(1),
                }}
              >
                <span
                  style={{
                    fontSize: u(0.85),
                    fontWeight: 700,
                    letterSpacing: '.14em',
                    color: '#8a5a1f',
                  }}
                >
                  {f.label}
                </span>
                <span className="tag" style={{ color: '#e8782a' }}>
                  {f.badge}
                </span>
              </div>
              <div>
                <div
                  className="fz"
                  style={
                    {
                      ...k(5.4),
                      lineHeight: 0.98,
                      fontWeight: 800,
                      letterSpacing: '-.04em',
                      color: '#e8782a',
                    } as CSSProperties
                  }
                >
                  {f.big}
                </div>
                <div
                  style={{
                    fontSize: u(1.15),
                    lineHeight: 1.55,
                    color: '#7a6a58',
                    maxWidth: u(30),
                    marginTop: u(0.6),
                  }}
                >
                  {f.text}
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: u(0.5) }}>
                <div
                  style={{
                    position: 'relative',
                    height: u(0.9),
                    borderRadius: 99,
                    background: 'rgba(138,90,31,.1)',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: '38%',
                      borderRadius: 99,
                      background: 'rgba(138,90,31,.18)',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      left: '38%',
                      right: 0,
                      top: 0,
                      bottom: 0,
                      borderRadius: `0 99px 99px 0`,
                      background: 'linear-gradient(90deg,#ff8a3d,#ff9d86)',
                    }}
                  />
                  <span
                    style={{
                      position: 'absolute',
                      left: '38%',
                      top: u(-0.5),
                      width: u(1.9),
                      height: u(1.9),
                      marginLeft: u(-0.95),
                      borderRadius: '50%',
                      background: '#fff',
                      border: `${u(0.3)} solid #ff8a3d`,
                      boxShadow: '0 3px 8px rgba(232,120,42,.4)',
                    }}
                  />
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: u(0.8),
                    color: '#7a6a58',
                  }}
                >
                  <span>{f.scale[0]}</span>
                  <span style={{ fontWeight: 700, color: '#e8782a', marginLeft: u(2) }}>
                    {f.scale[1]}
                  </span>
                  <span>{f.scale[2]}</span>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {f.checks.map(([t, tg], i) => (
                  <div
                    key={t}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: u(1),
                      padding: u(0.9, 0),
                      borderTop: '1px solid rgba(42,29,18,.08)',
                      fontSize: u(1.1),
                      fontWeight: 600,
                      ...(i === 0 ? { borderTop: '1px solid rgba(42,29,18,.08)' } : {}),
                    }}
                  >
                    {check(1.8)}
                    <span style={{ flex: 1 }}>{t}</span>
                    <span
                      style={{
                        flex: 'none',
                        fontSize: u(0.8),
                        fontWeight: 700,
                        color: '#8a5a1f',
                        padding: u(0.3, 0.8),
                        borderRadius: 99,
                        background: '#fff4e6',
                      }}
                    >
                      {tg}
                    </span>
                  </div>
                ))}
              </div>
              <div
                className="rg"
                style={{ '--c': 'repeat(3,1fr)', '--m': 3, gap: u(1) } as CSSProperties}
              >
                {f.stats.map(([v, l]) => (
                  <div
                    key={v}
                    style={{
                      padding: u(1.1, 1.2),
                      borderRadius: u(1.4),
                      background: '#fff',
                      border: '1px solid rgba(240,222,200,.95)',
                      boxShadow: '0 4px 12px rgba(240,150,80,.1)',
                    }}
                  >
                    <div
                      style={{
                        fontSize: u(1.8),
                        fontWeight: 800,
                        letterSpacing: '-.03em',
                        lineHeight: 1,
                      }}
                    >
                      {v}
                    </div>
                    <div
                      style={{
                        fontSize: u(0.85),
                        color: '#7a6a58',
                        marginTop: u(0.35),
                        lineHeight: 1.3,
                      }}
                    >
                      {l}
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: u(1.4), flexWrap: 'wrap' }}>
                <Button href="/agendar" lift>
                  ¿Agendamos un tinto?
                </Button>
                <Link href="/contacto" className="link-brand" style={{ fontSize: u(1.05) }}>
                  Hablar con ventas →
                </Link>
              </div>
            </CreamCard>
          </div>
        </div>

        {/* Tipos */}
        <div id="tipos" style={{ padding: `${u(2)} 0 ${u(9)}` }}>
          <SectionTitle ghost={solTypes.ghost} title={solTypes.title} sub={solTypes.sub} />
          <div className="rg" style={{ '--c': 'repeat(3,1fr)', gap: u(1.6) } as CSSProperties}>
            {solTypes.items.map((t, i) => (
              <CreamCard key={t.title} lift delay={i * 80} style={{ gap: u(1) }}>
                <div style={{ position: 'relative', display: 'flex', flexDirection: 'column' }}>
                  <Image
                    src={t.image}
                    alt=""
                    width={896}
                    height={1200}
                    sizes="(max-width: 899px) 100vw, 30vw"
                    style={{
                      width: '100%',
                      aspectRatio: '1/1.2',
                      objectFit: 'cover',
                      objectPosition: '50% 35%',
                      borderRadius: u(1.5),
                      display: 'block',
                      height: 'auto',
                    }}
                  />
                  <div
                    className="glass"
                    style={{
                      position: 'absolute',
                      left: u(1),
                      top: u(1),
                      display: 'flex',
                      alignItems: 'center',
                      gap: u(0.5),
                      padding: u(0.45, 0.9),
                      borderRadius: 99,
                      fontSize: u(0.8),
                      fontWeight: 700,
                      boxShadow: '0 6px 16px rgba(60,40,20,.16)',
                    }}
                  >
                    <span
                      style={{
                        width: u(0.55),
                        height: u(0.55),
                        borderRadius: '50%',
                        background: t.chipColor,
                      }}
                    />
                    {t.chip}
                  </div>
                  <div
                    style={{
                      position: 'absolute',
                      left: u(1),
                      right: u(1),
                      bottom: u(1),
                      padding: u(0.9, 1.1),
                      borderRadius: u(1.3),
                      background:
                        'linear-gradient(135deg,rgba(255,255,255,.92),rgba(255,246,235,.82))',
                      backdropFilter: 'blur(14px)',
                      WebkitBackdropFilter: 'blur(14px)',
                      border: '1px solid rgba(255,255,255,.9)',
                      boxShadow: '0 12px 28px rgba(60,40,20,.22)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: u(1),
                    }}
                  >
                    <div style={{ minWidth: 0 }}>
                      <div
                        style={{
                          fontSize: u(0.65),
                          fontWeight: 700,
                          letterSpacing: '.12em',
                          color: '#8a5a1f',
                        }}
                      >
                        {t.glass[0]}
                      </div>
                      <div
                        style={{
                          fontSize: u(1),
                          fontWeight: 800,
                          letterSpacing: '-.01em',
                          lineHeight: 1.2,
                          marginTop: u(0.15),
                        }}
                      >
                        {t.glass[1]}
                      </div>
                      <div style={{ fontSize: u(0.75), color: '#7a6a58' }}>{t.glass[2]}</div>
                    </div>
                    <span
                      style={{
                        flex: 'none',
                        fontSize: u(1.3),
                        fontWeight: 800,
                        color: '#e8782a',
                        letterSpacing: '-.02em',
                      }}
                    >
                      {t.glass[3]}
                    </span>
                  </div>
                </div>
                <span className="tag" style={{ alignSelf: 'flex-start', fontSize: u(0.85) }}>
                  {t.range}
                </span>
                <h4
                  style={{ margin: 0, fontSize: u(1.7), fontWeight: 800, letterSpacing: '-.02em' }}
                >
                  {t.title}
                </h4>
                <div style={{ fontSize: u(1.05), lineHeight: 1.5, color: '#7a6a58' }}>{t.text}</div>
                <div style={{ display: 'flex', flexDirection: 'column', marginTop: u(0.4) }}>
                  {t.checks.map((c, j) => (
                    <div
                      key={c}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: u(0.9),
                        padding: u(0.7, 0),
                        fontSize: u(1.05),
                        fontWeight: 600,
                        ...(j ? { borderTop: '1px solid rgba(42,29,18,.08)' } : {}),
                      }}
                    >
                      {check(1.7)}
                      {c}
                    </div>
                  ))}
                </div>
                <Link
                  href="/agendar"
                  className="link-brand"
                  style={{ fontSize: u(1.05), marginTop: u(0.4) }}
                >
                  Pedir una demo →
                </Link>
              </CreamCard>
            ))}
          </div>
        </div>

        {/* Paso a paso */}
        <div style={{ paddingBottom: u(9) }}>
          <SectionTitle ghost={solSteps.ghost} title={solSteps.title} sub={solSteps.sub} />
          <div
            className="rg"
            style={{ '--c': 'repeat(4,1fr)', '--m': 1, gap: u(1.6) } as CSSProperties}
          >
            {solSteps.items.map(([t, d], i) => (
              <CreamCard key={t} delay={i * 70}>
                <span className="num">{i + 1}</span>
                <div style={{ fontSize: u(1.45), fontWeight: 800, letterSpacing: '-.02em' }}>
                  {t}
                </div>
                <div style={{ fontSize: u(1.05), lineHeight: 1.5, color: '#7a6a58' }}>{d}</div>
              </CreamCard>
            ))}
          </div>
        </div>

        {/* Tabla */}
        <div style={{ paddingBottom: u(9) }}>
          <SectionTitle ghost={solTable.ghost} title={solTable.title} sub={solTable.sub} />
          <Reveal>
            <div
              className="cream soft sol-table"
              style={{ padding: u(1.4, 2), overflow: 'hidden' }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: '1fr repeat(3,1.2fr)' }}>
                <div />
                <div style={thStyle}>{solTable.cols[0]}</div>
                <div
                  style={{
                    ...thStyle,
                    background: 'linear-gradient(180deg,rgba(255,138,61,.16),rgba(255,138,61,.04))',
                    borderRadius: `${u(1.4)} ${u(1.4)} 0 0`,
                    borderTop: '1px solid rgba(255,255,255,.95)',
                    boxShadow:
                      '0 -1.2cqw 2.4cqw -.8cqw rgba(60,60,60,.09),0 -.25cqw .7cqw rgba(60,60,60,.06),inset 0 1px 0 #fff',
                    color: '#c2561a',
                  }}
                >
                  {solTable.cols[1]}
                </div>
                <div style={thStyle}>{solTable.cols[2]}</div>
                {solTable.rows.map(([label, a, b, c], i) => (
                  <div key={label} style={{ display: 'contents' }}>
                    <div style={cellLabel}>{label}</div>
                    <div style={cellBase}>{a}</div>
                    <div style={cellHot}>{b}</div>
                    <div style={cellBase}>
                      {i === solTable.rows.length - 1 ? (
                        <Link href="/agendar" style={{ color: '#e8782a', fontWeight: 800 }}>
                          {c}
                        </Link>
                      ) : (
                        c
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <section
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
        <div
          className="cq-pad"
          style={{
            padding: `${u(4)} ${u(12)}`,
            display: 'flex',
            flexDirection: 'column',
            gap: u(3.4),
          }}
        >
          <SectionTitle variant="b" ghost={solBenefit.ghost} title={solBenefit.title} as="h2" />
          <div className="rg" style={{ '--c': 'repeat(3,1fr)', gap: u(2) } as CSSProperties}>
            {solBenefit.items.map((b, i) => (
              <Reveal
                key={b.title}
                delay={i * 80}
                style={{ display: 'flex', flexDirection: 'column', gap: u(1.4) }}
              >
                <div
                  className="sol-frame"
                  style={{
                    padding: u(1.8),
                    borderRadius: u(1.8),
                    height: u(13),
                    boxSizing: 'border-box',
                    background:
                      'linear-gradient(145deg,rgba(255,236,214,.85),rgba(240,200,160,.55) 55%,rgba(255,226,196,.8))',
                    border: '1px solid rgba(255,255,255,.85)',
                    boxShadow: `inset 0 1px 0 rgba(255,255,255,.95),inset 0 -1px 0 rgba(255,255,255,.4),0 ${u(1.4)} ${u(3.4)} rgba(190,120,60,.22)`,
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                  }}
                >
                  <div
                    className="cream soft"
                    style={{
                      borderRadius: u(1.6),
                      padding: u(1.2),
                      height: '100%',
                      boxSizing: 'border-box',
                      overflow: 'hidden',
                      gap: 0,
                    }}
                  >
                    <div style={{ display: 'flex', gap: u(0.6), marginBottom: u(1) }}>
                      {b.chips.map(([c, tone]) => (
                        <span
                          key={c}
                          className="pill"
                          style={
                            tone === 'b'
                              ? {
                                  background:
                                    'linear-gradient(180deg,rgba(255,255,255,.8),rgba(239,232,219,.75))',
                                }
                              : undefined
                          }
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                    {b.bars.map((w) => (
                      <div
                        key={w}
                        style={{
                          height: u(0.8),
                          borderRadius: 99,
                          background: '#efe8db',
                          marginBottom: u(0.8),
                          width: `${w}%`,
                        }}
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <h4
                    style={{
                      margin: 0,
                      fontSize: u(1.5),
                      fontWeight: 600,
                      letterSpacing: '-.02em',
                    }}
                  >
                    {b.title}
                  </h4>
                  <div
                    style={{
                      fontSize: u(1.05),
                      color: '#7a6a58',
                      lineHeight: 1.5,
                      marginTop: u(0.4),
                    }}
                  >
                    {b.text}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ClosingBand title={solClosing.title} accent={solClosing.accent} text={solClosing.text} />
    </>
  );
}
