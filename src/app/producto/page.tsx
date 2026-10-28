import { MobileScroll } from '@/components/MobileScroll';
import { JsonLd } from '@/components/JsonLd';
import { pageStructuredData } from '@/lib/structured-data';
import { pageMetadata } from '@/lib/metadata';
import type { CSSProperties } from 'react';
import { CrmMockup } from '@/components/CrmMockup';
import { Icon } from '@/components/Icons';
import { PageHero } from '@/components/PageHero';
import { ProductCatalog } from '@/components/ProductCatalog';
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
  compare,
  connections,
  crmBoard,
  dashboard,
  features,
  plans,
  principles,
  problems,
  productoClosing,
  productoHero,
  whyTinto,
} from '@/content/producto';
import { textSize, k, u } from '@/lib/u';

const checkRow: CSSProperties = {
  display: 'flex',
  gap: u(1.2),
  alignItems: 'center',
  padding: `${u(1.1)} 0`,
  borderBottom: '1px solid rgba(42,29,18,.08)',
  fontSize: textSize(1.2),
};
const tick = (
  size: number,
  bg = 'linear-gradient(180deg,#ffb48a,#ff8a5c)',
  radius: string | number = u(0.5),
): CSSProperties => ({
  flex: 'none',
  width: u(size),
  height: u(size),
  borderRadius: radius,
  background: bg,
  color: '#fff',
  display: 'grid',
  placeItems: 'center',
});
const frame: CSSProperties = {
  padding: u(2.4),
  borderRadius: u(2),
  background:
    'linear-gradient(145deg,rgba(255,236,214,.85),rgba(240,200,160,.55) 55%,rgba(255,226,196,.8))',
  border: '1px solid rgba(255,255,255,.85)',
  boxShadow: `inset 0 1px 0 rgba(255,255,255,.95),inset 0 -1px 0 rgba(255,255,255,.4),0 ${u(1.4)} ${u(3.4)} rgba(190,120,60,.22)`,
  WebkitBackdropFilter: 'blur(8px)',
  backdropFilter: 'blur(8px)',
};
const inner: CSSProperties = {
  borderRadius: u(1.6),
  padding: u(1.8),
  minHeight: u(16),
  boxSizing: 'border-box',
  gap: 0,
};
const small: CSSProperties = {
  borderRadius: u(1.6),
  padding: u(1.4, 1.6),
  boxSizing: 'border-box',
  gap: 0,
};

function Pill({ tone = 'rgba(253,230,207,.75)', children }: { tone?: string; children: string }) {
  return (
    <span
      className="pill"
      style={{ background: `linear-gradient(180deg,rgba(255,255,255,.8),${tone})` }}
    >
      {children}
    </span>
  );
}

function FeatureText({ f, order }: { f: (typeof features.rows)[number]; order?: number }) {
  return (
    <Reveal style={{ order, display: 'flex', flexDirection: 'column', gap: u(1.4) }}>
      <Pill>{f.tag}</Pill>
      <h3
        className="fz"
        style={
          {
            ...k(2.8),
            margin: 0,
            lineHeight: 1.08,
            letterSpacing: '-.03em',
            fontWeight: 600,
          } as CSSProperties
        }
      >
        {f.title}
      </h3>
      <p style={{ margin: 0, fontSize: textSize(1.2), lineHeight: 1.5, color: '#7a6a58' }}>
        {f.text}
      </p>
      <div>
        {f.checks.map((c) => (
          <div key={c} style={checkRow}>
            <span style={tick(1.9)}>
              <Icon name="check" size="60%" stroke={3} />
            </span>
            {c}
          </div>
        ))}
      </div>
    </Reveal>
  );
}

const featureGrid = { '--c': '1fr 1.1fr', gap: u(5), alignItems: 'center' } as CSSProperties;

const sideIcon = (children: React.ReactNode) => (
  <span
    style={{
      width: u(3.4),
      height: u(3.4),
      borderRadius: '50%',
      display: 'grid',
      placeItems: 'center',
      color: '#7a6a58',
    }}
  >
    {children}
  </span>
);
const ico = (name: string, size = 1.6) => <Icon name={name} size={u(size)} stroke={1.7} />;

const spark = (stroke: string) => (
  <svg viewBox="0 0 60 30" aria-hidden="true" style={{ width: u(3.4), height: u(2), flex: 'none' }}>
    <path
      d="M0 22 C10 22 12 6 22 12 S34 26 44 14 S54 6 60 8"
      fill="none"
      className="draw"
      pathLength={1}
      stroke={stroke}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

function StatCard({
  icon,
  bg,
  color,
  label,
  value,
  extra,
  dark,
}: {
  icon: React.ReactNode;
  bg?: string;
  color?: string;
  label: string;
  value: string;
  extra?: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <div
      className="cream soft"
      style={{
        ...small,
        flexDirection: 'row',
        alignItems: 'center',
        gap: u(0.7),
        padding: u(1, 1),
        ...(dark
          ? {
              background: 'linear-gradient(135deg,#b88a5a,#8a5a1f)',
              color: '#fff',
              justifyContent: 'space-between',
              padding: u(1.2, 1.4),
            }
          : {}),
      }}
    >
      <span
        style={{
          flex: 'none',
          width: u(2.4),
          height: u(2.4),
          borderRadius: '50%',
          background: dark ? 'rgba(255,255,255,.22)' : (bg ?? '#efe3d0'),
          color: dark ? '#fff' : (color ?? '#8a5a1f'),
          display: 'grid',
          placeItems: 'center',
          marginRight: dark ? u(0.5) : 0,
        }}
      >
        {icon}
      </span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontSize: textSize(0.8),
            color: dark ? undefined : '#7a6a58',
            opacity: dark ? 0.85 : 1,
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontSize: textSize(1.5),
            fontWeight: 600,
            letterSpacing: '-.02em',
            whiteSpace: 'nowrap',
          }}
        >
          {value}
        </div>
      </div>
      {extra}
    </div>
  );
}

export const metadata = pageMetadata('/producto');

export default function ProductoPage() {
  return (
    <>
      <JsonLd data={pageStructuredData('/producto')} />
      <ScrollToGo />
      <div className="pg">
        <PageHero
          ghost={productoHero.ghost}
          title={productoHero.title}
          accent={productoHero.accent}
          titleEnd={productoHero.titleEnd}
          text={productoHero.text}
          primary={{ label: 'Ver módulos', href: '#catalogo' }}
          secondary={{ label: 'Hablar con un asesor →', href: '/contacto' }}
          stats={productoHero.stats}
        >
          <CrmMockup
            title={crmBoard.title}
            period={crmBoard.period}
            columns={crmBoard.columns}
            card={crmBoard.card}
          />
        </PageHero>

        {/* El punto de partida */}
        <div style={{ paddingBottom: u(6.5) }}>
          <SectionTitle
            ghost={problems.ghost}
            title={
              <>
                {problems.title} <Accent>{problems.accent}</Accent>
              </>
            }
          />
          <div
            className="rg tablet-cards"
            style={{ '--c': 'repeat(3,1fr)', gap: u(1.6) } as CSSProperties}
          >
            {problems.items.map(([t, d], i) => (
              <CreamCard key={t} soft delay={i * 80}>
                <span className="num">{i + 1}</span>
                <div style={{ fontSize: textSize(1.45), fontWeight: 800, letterSpacing: '-.02em' }}>
                  {t}
                </div>
                <div style={{ fontSize: textSize(1.05), lineHeight: 1.5, color: '#7a6a58' }}>
                  {d}
                </div>
              </CreamCard>
            ))}
          </div>
        </div>

        {/* Catálogo */}
        <div id="catalogo" style={{ padding: `${u(1)} 0 ${u(6.5)}` }}>
          <SectionTitle
            ghost="Módulos"
            title="Elige tu módulo"
            sub="Cada módulo funciona solo y mejor en conjunto."
          />
          <ProductCatalog />
        </div>

        {/* Cuatro ideas */}
        <div style={{ paddingBottom: u(6.5) }}>
          <SectionTitle ghost={principles.ghost} title={principles.title} sub={principles.sub} />
          <div
            className="rg tablet-cards"
            style={{ '--c': 'repeat(4,1fr)', '--m': 1, gap: u(1.6) } as CSSProperties}
          >
            {principles.items.map(([t, d], i) => (
              <CreamCard key={t} soft delay={i * 70}>
                <span className="num">{i + 1}</span>
                <div style={{ fontSize: textSize(1.45), fontWeight: 800, letterSpacing: '-.02em' }}>
                  {t}
                </div>
                <div style={{ fontSize: textSize(1.05), lineHeight: 1.5, color: '#7a6a58' }}>
                  {d}
                </div>
              </CreamCard>
            ))}
          </div>
        </div>

        {/* Conexiones */}
        <div style={{ paddingBottom: u(6.5) }}>
          <SectionTitle ghost={connections.ghost} title={connections.title} sub={connections.sub} />
          <div
            className="rg tablet-cards"
            style={{ '--c': 'repeat(4,1fr)', '--m': 1, gap: u(1.6) } as CSSProperties}
          >
            {connections.items.map((c, i) => (
              <CreamCard key={c.title} soft delay={i * 70}>
                <span className="ico" style={{ width: u(4.4), height: u(4.4) }}>
                  <Icon name={c.icon} size={u(2)} stroke={1.8} style={{ color: '#fff' }} />
                </span>
                <div style={{ fontSize: textSize(1.4), fontWeight: 800, letterSpacing: '-.02em' }}>
                  {c.title}
                </div>
                <div style={{ fontSize: textSize(1.05), lineHeight: 1.5, color: '#7a6a58' }}>
                  {c.text}
                </div>
              </CreamCard>
            ))}
          </div>
        </div>
      </div>

      <section
        aria-label="Funciones y planes de Tinto"
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
        {/* Funciones */}
        <div
          className="sheet cq-pad"
          style={{
            marginTop: u(-6),
            padding: `${u(6)} ${u(10)} ${u(6.5)}`,
            display: 'flex',
            flexDirection: 'column',
            gap: u(5),
          }}
        >
          <SectionTitle
            variant="b"
            ghost={features.ghost}
            title={features.title}
            sub={features.sub}
          />

          <div className="rg" style={featureGrid}>
            <FeatureText f={features.rows[0]} order={1} />
            <Reveal style={{ order: 2 }}>
              <div style={frame}>
                <div className="cream soft" style={inner}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontSize: textSize(1.2),
                      fontWeight: 600,
                      marginBottom: u(1.2),
                    }}
                  >
                    <span>Oportunidades nuevas</span>
                    <span className="pill">+38%</span>
                  </div>
                  {[
                    ['Lun', 80],
                    ['Mié', 62],
                    ['Vie', 44],
                  ].map(([d, w]) => (
                    <div
                      key={d}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: u(1),
                        marginBottom: u(1.6),
                        fontSize: textSize(1),
                        color: '#7a6a58',
                      }}
                    >
                      <span style={{ width: u(3) }}>{d}</span>
                      <div
                        style={{
                          flex: 1,
                          height: u(1.3),
                          borderRadius: `0 ${u(0.9)} ${u(0.9)} 0`,
                          background: '#f4ece0',
                        }}
                      >
                        <div
                          className="bar-x"
                          style={{
                            position: 'relative',
                            width: `${w}%`,
                            height: '100%',
                            background: 'linear-gradient(90deg,#ff8a3d,#ff9d86)',
                            borderRadius: `${u(0.3)} ${u(0.9)} 0 ${u(0.3)}`,
                          }}
                        >
                          <span
                            style={{
                              position: 'absolute',
                              right: 0,
                              top: '100%',
                              width: u(1.2),
                              height: u(0.9),
                              background: '#ffa088',
                              borderRadius: `0 0 ${u(0.45)} 0`,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          <div className="rg" style={featureGrid}>
            <FeatureText f={features.rows[1]} order={2} />
            <Reveal style={{ order: 1 }}>
              <div style={frame}>
                <div className="cream soft" style={inner}>
                  <div style={{ fontSize: textSize(1.2), fontWeight: 600, marginBottom: u(1.2) }}>
                    Configuración lista
                  </div>
                  <div
                    style={{ display: 'flex', flexWrap: 'wrap', gap: u(0.8), marginBottom: u(1.4) }}
                  >
                    <Pill tone="rgba(246,227,204,.75)">Lead calificado</Pill>
                    <Pill tone="rgba(239,232,219,.75)">Cita agendada</Pill>
                    <Pill>Propuesta enviada</Pill>
                    <Pill tone="rgba(233,221,201,.75)">Póliza cerrada</Pill>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: u(1),
                      borderRadius: u(0.9),
                      background: '#f7f3ec',
                      fontSize: textSize(1.05),
                    }}
                  >
                    <span>Recordatorio de llamada</span>
                    <span
                      style={{
                        width: u(3.4),
                        height: u(1.8),
                        borderRadius: 99,
                        background: 'linear-gradient(90deg,#ff8a5c,#ffb48a)',
                        position: 'relative',
                      }}
                    >
                      <span
                        style={{
                          position: 'absolute',
                          right: u(0.2),
                          top: u(0.2),
                          width: u(1.4),
                          height: u(1.4),
                          borderRadius: '50%',
                          background: '#ffeedd',
                          boxShadow: '0 1px 3px rgba(150,60,0,.3)',
                        }}
                      />
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="rg" style={featureGrid}>
            <FeatureText f={features.rows[2]} />
            <Reveal>
              <div style={frame}>
                <div className="cream soft" style={{ ...inner, position: 'relative' }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: textSize(1.2),
                      fontWeight: 600,
                      marginBottom: u(1),
                    }}
                  >
                    <span>Citas</span>
                    <span style={{ color: '#7a6a58', fontWeight: 400 }}>por semana</span>
                  </div>
                  <div
                    style={{ display: 'flex', gap: u(1.4), height: u(10), alignItems: 'flex-end' }}
                  >
                    {[
                      ['S1', 40],
                      ['S2', 52],
                      ['S3', 66],
                      ['S4', 84],
                    ].map(([s, h]) => (
                      <div
                        key={s}
                        style={{
                          flex: 1,
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'flex-end',
                          gap: u(0.7),
                          height: '100%',
                        }}
                      >
                        <div
                          className="bar-y"
                          style={{
                            width: '100%',
                            height: `${h}%`,
                            borderRadius: u(0.5),
                            background:
                              s === 'S4'
                                ? 'linear-gradient(180deg,#ffb48a,#ff8a5c)'
                                : 'linear-gradient(180deg,#ffe9cf,#ffd8b0)',
                          }}
                        />
                        <span style={{ fontSize: textSize(0.9), color: '#7a6a58' }}>{s}</span>
                      </div>
                    ))}
                  </div>
                  <div
                    style={{
                      position: 'absolute',
                      right: u(2),
                      top: u(4.6),
                      background: '#fff',
                      padding: u(0.8, 1.2),
                      borderRadius: u(1),
                      boxShadow: `0 ${u(1)} ${u(2.4)} rgba(60,40,20,.18)`,
                      fontSize: textSize(1),
                      lineHeight: 1.4,
                    }}
                  >
                    <b>+12 citas</b>
                    <br />
                    <span style={{ color: '#7a6a58' }}>vs. inicio</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Por qué Tinto */}
        <div
          className="rg cq-pad"
          style={
            {
              '--c': '1fr 1.1fr',
              padding: `${u(4)} ${u(10)}`,
              gap: u(5),
              alignItems: 'center',
            } as CSSProperties
          }
        >
          <div
            style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: u(1.6) }}
          >
            <GhostTitle size={5.8} top={-3.6} align="left">
              {whyTinto.ghost}
            </GhostTitle>
            <Reveal style={{ display: 'flex', flexDirection: 'column', gap: u(1.6) }}>
              <h2
                className="fz"
                style={
                  {
                    ...k(3.4),
                    margin: 0,
                    lineHeight: 1.06,
                    letterSpacing: '-.025em',
                    fontWeight: 600,
                    position: 'relative',
                    zIndex: 1,
                  } as CSSProperties
                }
              >
                {whyTinto.title}{' '}
                <em style={{ fontStyle: 'normal', fontWeight: 800, color: '#e8782a' }}>
                  {whyTinto.accent}
                </em>
              </h2>
              <p
                style={{
                  margin: 0,
                  fontSize: textSize(1.2),
                  lineHeight: 1.55,
                  color: '#7a6a58',
                  maxWidth: u(34),
                }}
              >
                {whyTinto.text}
              </p>
              <Button
                href="#planes"
                strong
                lift
                style={{ alignSelf: 'flex-start', fontSize: textSize(1.1), fontWeight: 600 }}
              >
                {whyTinto.cta}
              </Button>
            </Reveal>
          </div>
          <Reveal>
            <div style={{ ...frame, padding: u(2.2), borderRadius: u(2.4) }}>
              <div
                style={{
                  background: 'linear-gradient(160deg,rgba(255,255,255,.88),rgba(255,248,238,.62))',
                  border: '1px solid rgba(255,255,255,.95)',
                  borderRadius: u(1.8),
                  padding: u(2.4),
                  boxShadow: `inset 0 1px 0 #fff,0 ${u(1.2)} ${u(3)} rgba(120,80,40,.14)`,
                  backdropFilter: 'blur(9px)',
                  WebkitBackdropFilter: 'blur(9px)',
                }}
              >
                <div style={{ fontSize: textSize(1.5), fontWeight: 600, marginBottom: u(0.8) }}>
                  {whyTinto.boxTitle}
                </div>
                {whyTinto.checks.map((c) => (
                  <div
                    key={c}
                    style={{
                      display: 'flex',
                      gap: u(1),
                      alignItems: 'center',
                      padding: `${u(1.1)} 0`,
                      borderBottom: '1px solid rgba(42,29,18,.08)',
                      fontSize: textSize(1.25),
                      fontWeight: 500,
                    }}
                  >
                    <span
                      style={{
                        ...tick(1.9, 'var(--grad-primary)', '50%'),
                        border: '1px solid rgba(255,255,255,.7)',
                        boxShadow:
                          'inset 0 1px 0 rgba(255,255,255,.7),0 3px 8px rgba(232,120,42,.35)',
                      }}
                    >
                      <Icon name="check" size="58%" stroke={3} />
                    </span>
                    {c}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* Tu panel */}
        <div
          className="cq-pad"
          style={{
            padding: `${u(4)} ${u(10)} ${u(6)}`,
            display: 'flex',
            flexDirection: 'column',
            gap: u(3.4),
            background: 'linear-gradient(180deg,#fff 0,#fbf5ec 22%,#fbf5ec 78%,#fff 100%)',
          }}
        >
          <SectionTitle
            variant="b"
            ghost={dashboard.ghost}
            title={dashboard.title}
            sub={dashboard.sub}
          />
          <Reveal>
            <div
              className="dash rg"
              style={
                {
                  '--c': `${u(5.6)} minmax(0,1fr)`,
                  background: '#efe7da',
                  borderRadius: u(3),
                  padding: u(2.4),
                  gap: u(2),
                } as CSSProperties
              }
            >
              <div
                className="dash-side"
                style={{
                  background: '#fff',
                  borderRadius: u(3),
                  padding: u(1.2, 0.8),
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: u(0.8),
                }}
              >
                <span
                  style={{
                    width: u(3.4),
                    height: u(3.4),
                    borderRadius: '50%',
                    background: '#2a1d12',
                    display: 'grid',
                    placeItems: 'center',
                  }}
                >
                  <span style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: u(0.25) }}>
                    {[0, 1, 2, 3].map((i) => (
                      <i
                        key={i}
                        style={{
                          width: u(0.5),
                          height: u(0.5),
                          background: '#fff',
                          borderRadius: u(0.15),
                        }}
                      />
                    ))}
                  </span>
                </span>
                {sideIcon(ico('bars'))}
                {sideIcon(ico('calendar'))}
                {sideIcon(<Icon name="user" size={u(1.6)} stroke={1.7} />)}
                {sideIcon(<Icon name="folder" size={u(1.6)} stroke={1.7} />)}
                <span style={{ flex: 1, minHeight: u(6) }} />
                {sideIcon(<Icon name="sun" size={u(1.6)} stroke={1.7} />)}
                <span
                  style={{ width: u(3), height: u(3), borderRadius: '50%', background: '#5a4230' }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: u(1.4), minWidth: 0 }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: u(1),
                    flexWrap: 'wrap',
                  }}
                >
                  <div>
                    <div
                      style={{ fontSize: textSize(2), fontWeight: 600, letterSpacing: '-.02em' }}
                    >
                      Hola, Carlos!
                    </div>
                    <div style={{ fontSize: textSize(1.05), color: '#5a4a3a' }}>
                      Revisa cómo van tus oportunidades y tu actividad esta semana
                    </div>
                  </div>
                  <div
                    className="dash-search"
                    style={{ display: 'flex', alignItems: 'center', gap: u(1) }}
                  >
                    <span
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: u(16),
                        padding: u(0.5, 0.5, 0.5, 1.4),
                        borderRadius: 99,
                        background: '#fff',
                        fontSize: textSize(1.05),
                        color: '#8b7b68',
                      }}
                    >
                      Buscar...
                      <span
                        style={{
                          width: u(2.8),
                          height: u(2.8),
                          borderRadius: '50%',
                          background: '#2a1d12',
                          display: 'grid',
                          placeItems: 'center',
                          color: '#fff',
                        }}
                      >
                        <Icon name="search" size={u(1.3)} stroke={1.7} />
                      </span>
                    </span>
                    <span
                      style={{
                        position: 'relative',
                        width: u(3.2),
                        height: u(3.2),
                        borderRadius: '50%',
                        background: '#fff',
                        display: 'grid',
                        placeItems: 'center',
                      }}
                    >
                      <Icon name="bell" size={u(1.5)} stroke={1.7} />
                      <i
                        style={{
                          position: 'absolute',
                          top: u(0.7),
                          right: u(0.8),
                          width: u(0.7),
                          height: u(0.7),
                          borderRadius: '50%',
                          background: '#e8782a',
                          border: '2px solid #fff',
                        }}
                      />
                    </span>
                  </div>
                </div>

                <div
                  className="rg tablet-cards"
                  style={{ '--c': 'repeat(4,minmax(0,1fr))', '--m': 2, gap: u(1) } as CSSProperties}
                >
                  <StatCard
                    icon={<Icon name="clock" size={u(1.5)} stroke={1.7} />}
                    label="Citas"
                    value="32"
                    extra={
                      <div
                        style={{
                          display: 'flex',
                          gap: u(0.35),
                          alignItems: 'flex-end',
                          height: u(2.2),
                        }}
                      >
                        {[40, 70, 55, 85, 60, 95].map((h, i) => (
                          <span
                            key={i}
                            style={{
                              width: u(0.45),
                              height: `${h}%`,
                              borderRadius: 99,
                              background: i === 5 ? '#8a5a1f' : '#b9a88f',
                            }}
                          />
                        ))}
                      </div>
                    }
                  />
                  <StatCard
                    icon={<Icon name="pause" size={u(1.5)} stroke={1.7} />}
                    label="Citas hoy"
                    value="18"
                    extra={spark('#8a5a1f')}
                  />
                  <StatCard
                    icon={<Icon name="hand" size={u(1.5)} stroke={1.7} />}
                    bg="#fde6cf"
                    color="#d9692a"
                    label="Oportunidades nuevas"
                    value="+38%"
                    extra={spark('#e8782a')}
                  />
                  <StatCard
                    dark
                    icon={<Icon name="heart" size={u(1.5)} stroke={1.7} />}
                    label="Conversión"
                    value="92 pts"
                    extra={spark('#fff')}
                  />
                </div>

                <div
                  className="rg"
                  style={
                    {
                      '--c': 'minmax(0,2fr) minmax(0,1fr) minmax(0,1fr)',
                      '--m': 1,
                      gap: u(1.2),
                    } as CSSProperties
                  }
                >
                  <div className="cream soft" style={small}>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontSize: textSize(1.15),
                        fontWeight: 600,
                        marginBottom: u(1),
                      }}
                    >
                      <span>
                        Conversión{' '}
                        <span
                          style={{ fontWeight: 400, color: '#3d6b36', fontSize: textSize(0.9) }}
                        >
                          ● En meta
                        </span>
                      </span>
                      <span style={{ fontWeight: 400, color: '#7a6a58', fontSize: textSize(0.9) }}>
                        Semanal ⌄
                      </span>
                    </div>
                    <div style={{ display: 'flex', gap: u(1.2), marginBottom: u(0.6) }}>
                      {[
                        ['Citas', '43', '+2.4%', '#e5f0e1', '#3d6b36'],
                        ['Perdidas', '12%', '−4.7%', '#fbe3dc', '#a2442f'],
                      ].map(([l, v, d, bg, fg]) => (
                        <div
                          key={l}
                          style={{
                            padding: u(0.6, 1),
                            borderRadius: u(0.8),
                            boxShadow: `0 ${u(0.6)} ${u(1.6)} rgba(60,40,20,.1)`,
                            fontSize: textSize(0.85),
                            color: '#7a6a58',
                          }}
                        >
                          {l}
                          <div
                            style={{ fontSize: textSize(1.4), fontWeight: 600, color: '#2a1d12' }}
                          >
                            {v}{' '}
                            <span
                              style={{
                                fontSize: textSize(0.75),
                                padding: u(0.15, 0.5),
                                borderRadius: 99,
                                background: bg,
                                color: fg,
                              }}
                            >
                              {d}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <svg
                      viewBox="0 0 240 70"
                      preserveAspectRatio="none"
                      aria-hidden="true"
                      style={{ width: '100%', height: u(9), display: 'block' }}
                    >
                      <defs>
                        <linearGradient id="dg1" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0" stopColor="#8a5a1f" stopOpacity=".22" />
                          <stop offset="1" stopColor="#8a5a1f" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M0 52 C18 50 24 40 38 44 S58 18 72 36 S96 62 112 40 S134 8 150 30 S182 56 200 38 S228 28 240 34 L240 70 L0 70 Z"
                        fill="url(#dg1)"
                      />
                      <path
                        d="M0 52 C18 50 24 40 38 44 S58 18 72 36 S96 62 112 40 S134 8 150 30 S182 56 200 38 S228 28 240 34"
                        fill="none"
                        className="draw"
                        pathLength={1}
                        stroke="#8a5a1f"
                        strokeWidth="1.6"
                      />
                    </svg>
                  </div>
                  <div
                    className="cream soft"
                    style={{ ...small, alignItems: 'center', textAlign: 'center', gap: u(0.6) }}
                  >
                    <div
                      style={{ alignSelf: 'flex-start', fontSize: textSize(1.15), fontWeight: 600 }}
                    >
                      Meta semanal
                    </div>
                    <div style={{ fontSize: textSize(0.9), color: '#7a6a58' }}>Citas</div>
                    <div style={{ fontSize: textSize(1.7), fontWeight: 600, color: '#8a5a1f' }}>
                      32 / 40
                    </div>
                    <div
                      style={{
                        position: 'relative',
                        width: u(11),
                        height: u(5.5),
                        marginTop: u(0.6),
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        style={{
                          width: u(11),
                          height: u(11),
                          borderRadius: '50%',
                          background:
                            'conic-gradient(from -90deg at 50% 50%,#8a5a1f 0 144deg,#efe5d6 144deg 180deg,transparent 180deg)',
                        }}
                      />
                      <div
                        style={{
                          position: 'absolute',
                          left: u(2.2),
                          top: u(2.2),
                          width: u(6.6),
                          height: u(6.6),
                          borderRadius: '50%',
                          background: '#fff',
                        }}
                      />
                      <div
                        style={{
                          position: 'absolute',
                          left: 0,
                          right: 0,
                          bottom: 0,
                          textAlign: 'center',
                          fontSize: textSize(1.5),
                          fontWeight: 600,
                        }}
                      >
                        80%
                      </div>
                    </div>
                  </div>
                  <div
                    className="cream soft"
                    style={{ ...small, alignItems: 'center', textAlign: 'center', gap: u(0.4) }}
                  >
                    <span
                      style={{
                        width: u(4.2),
                        height: u(4.2),
                        borderRadius: '50%',
                        background: '#f3d6b8',
                        display: 'grid',
                        placeItems: 'center',
                        fontWeight: 600,
                        fontSize: textSize(1.5),
                        color: '#8a5a1f',
                      }}
                    >
                      C
                    </span>
                    <div style={{ fontSize: textSize(1.2), fontWeight: 600, marginTop: u(0.4) }}>
                      Carlos Pérez
                    </div>
                    <div style={{ fontSize: textSize(0.85), color: '#7a6a58' }}>
                      carlos@correo.com
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        gap: u(1.4),
                        marginTop: u(0.8),
                        fontSize: textSize(0.8),
                        color: '#7a6a58',
                      }}
                    >
                      {[
                        ['Cierres', 18],
                        ['Racha', 12],
                        ['Metas', 5],
                      ].map(([l, v]) => (
                        <div key={l}>
                          {l}
                          <div
                            style={{ fontSize: textSize(1.3), fontWeight: 600, color: '#2a1d12' }}
                          >
                            {v}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div
                  className="rg"
                  style={
                    {
                      '--c': 'minmax(0,2fr) minmax(0,1fr) minmax(0,1fr)',
                      '--m': 1,
                      gap: u(1.2),
                    } as CSSProperties
                  }
                >
                  <div
                    className="cream soft"
                    style={{
                      ...small,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: u(1.4),
                      padding: u(1.6, 2),
                    }}
                  >
                    <div style={{ maxWidth: u(15) }}>
                      <div style={{ fontSize: textSize(1.5), fontWeight: 600, lineHeight: 1.15 }}>
                        Tu embudo ideal
                      </div>
                      <div
                        style={{
                          fontSize: textSize(0.9),
                          lineHeight: 1.5,
                          color: '#7a6a58',
                          margin: `${u(0.8)} 0 ${u(1.2)}`,
                        }}
                      >
                        Etapas, campos y alertas guardados para que cada día empiece ordenado.
                      </div>
                      <span
                        style={{
                          display: 'inline-block',
                          padding: u(0.7, 1.4),
                          borderRadius: u(0.8),
                          background: 'linear-gradient(180deg,#d1a572,#8a5a1f)',
                          boxShadow:
                            'inset 0 1px 0 rgba(255,255,255,.45),0 6px 14px rgba(138,90,31,.3)',
                          color: '#fff',
                          fontSize: textSize(0.95),
                          fontWeight: 500,
                        }}
                      >
                        Ajustar +
                      </span>
                    </div>
                    <div
                      style={{
                        position: 'relative',
                        flex: 1,
                        height: u(11),
                        borderRadius: u(1.4),
                        background: '#f3ecdf',
                      }}
                    >
                      {[
                        ['12%', '14%', 'linear-gradient(135deg,#f3d6b8,#e8b98a)'],
                        ['18%', '34%', 'linear-gradient(135deg,#c9955f,#8a5a1f)'],
                        ['24%', '54%', 'linear-gradient(135deg,#5a4230,#2a1d12)'],
                      ].map(([l, t, bg]) => (
                        <span
                          key={t}
                          style={{
                            position: 'absolute',
                            left: l,
                            top: t,
                            width: '62%',
                            height: '30%',
                            borderRadius: u(1),
                            background: bg,
                            transform: 'skewX(-8deg)',
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="cream soft" style={small}>
                    <div
                      style={{ fontSize: textSize(1.15), fontWeight: 600, marginBottom: u(0.8) }}
                    >
                      Tus tareas
                    </div>
                    {[
                      ['Llamar a Marta R.', 'Hoy, 10:30', 'Alta'],
                      ['Enviar propuesta', 'Hoy, 13:00', 'Media'],
                      ['Renovación de póliza', 'Hoy, 16:15', 'Baja'],
                    ].map(([t, w, p]) => (
                      <div
                        key={t}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: u(1),
                          padding: u(0.5, 0),
                        }}
                      >
                        <span
                          style={{
                            width: u(0.25),
                            height: u(2.6),
                            background: '#8a5a1f',
                            borderRadius: 99,
                          }}
                        />
                        <div style={{ flex: 1, lineHeight: 1.3 }}>
                          <div style={{ fontSize: textSize(1.05), fontWeight: 600 }}>{t}</div>
                          <div style={{ fontSize: textSize(0.85), color: '#7a6a58' }}>{w}</div>
                        </div>
                        <span
                          style={{
                            fontSize: textSize(0.85),
                            padding: u(0.25, 0.7),
                            borderRadius: 99,
                            background: '#e5f0e1',
                            color: '#3d6b36',
                          }}
                        >
                          {p}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div
                    className="cream soft"
                    style={{
                      ...small,
                      alignItems: 'center',
                      textAlign: 'center',
                      justifyContent: 'center',
                      gap: u(0.7),
                    }}
                  >
                    <span
                      style={{
                        width: u(5),
                        height: u(5),
                        borderRadius: '50%',
                        border: '2px solid #8a5a1f',
                        display: 'grid',
                        placeItems: 'center',
                      }}
                    >
                      <span
                        style={{
                          width: u(3),
                          height: u(3),
                          borderRadius: '50%',
                          border: '2px solid #e8782a',
                          display: 'grid',
                          placeItems: 'center',
                          color: '#8a5a1f',
                        }}
                      >
                        <Icon name="hand" size={u(1.5)} stroke={1.7} />
                      </span>
                    </span>
                    <div style={{ fontSize: textSize(1.35), fontWeight: 600 }}>
                      ¡No pierdas el hilo!
                    </div>
                    <div style={{ fontSize: textSize(0.9), color: '#7a6a58', lineHeight: 1.4 }}>
                      Revisa tus 3 seguimientos pendientes de hoy.
                    </div>
                    <span
                      style={{
                        marginTop: u(0.4),
                        padding: u(0.7, 1.4),
                        borderRadius: u(0.8),
                        background: 'linear-gradient(180deg,#d1a572,#8a5a1f)',
                        boxShadow:
                          'inset 0 1px 0 rgba(255,255,255,.45),0 6px 14px rgba(138,90,31,.3)',
                        color: '#fff',
                        fontSize: textSize(0.95),
                        fontWeight: 500,
                      }}
                    >
                      Ver tareas
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Precios */}
        <div
          id="planes"
          className="cq-pad"
          style={{
            padding: `${u(6)} ${u(10)} ${u(4)}`,
            display: 'flex',
            flexDirection: 'column',
            gap: u(2.6),
            background:
              'linear-gradient(180deg,#fff 0,rgba(255,255,255,0) 22%),radial-gradient(45% 60% at 50% 12%,rgba(249,201,160,.5),transparent 70%)',
          }}
        >
          <SectionTitle variant="b" ghost={plans.ghost} title={plans.title} sub={plans.sub} />
          <div
            style={{
              alignSelf: 'center',
              display: 'flex',
              alignItems: 'center',
              gap: u(0.4),
              padding: u(0.4),
              borderRadius: 99,
              background: '#fff',
              border: '1px solid rgba(42,29,18,.1)',
              fontSize: textSize(1.05),
              fontWeight: 500,
            }}
          >
            <span
              style={{
                padding: u(0.6, 1.6),
                borderRadius: 99,
                background: 'var(--grad-primary)',
                color: '#fff',
              }}
            >
              Mensual
            </span>
            <span style={{ padding: u(0.6, 1.2) }}>Anual</span>
            <span className="pill">Ahorra 20%</span>
          </div>
          <div
            className="rg tablet-cards"
            style={{ '--c': 'repeat(3,1fr)', gap: u(1.6) } as CSSProperties}
          >
            {plans.items.map((p, i) => (
              <Reveal key={p.name} fill delay={i * 80}>
                <div
                  className={p.featured ? '' : 'cream soft'}
                  style={
                    p.featured
                      ? {
                          padding: u(2.4),
                          borderRadius: u(1.8),
                          background: 'linear-gradient(170deg,#fff,#fbe9d3)',
                          border: '1.5px solid #e8782a',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: u(1.2),
                          boxShadow: `0 ${u(1.6)} ${u(4)} rgba(232,120,42,.18)`,
                        }
                      : { padding: u(2.4), borderRadius: u(1.8), gap: u(1.2) }
                  }
                >
                  <div
                    style={{
                      fontSize: textSize(1.4),
                      fontWeight: 600,
                      display: 'flex',
                      gap: u(0.8),
                      alignItems: 'center',
                    }}
                  >
                    {p.name}
                    {p.featured && <span className="pill">Popular</span>}
                  </div>
                  <div style={{ fontSize: textSize(1.05), color: '#7a6a58' }}>{p.desc}</div>
                  <div>
                    <span
                      className="fz"
                      style={
                        { ...k(3.4), fontWeight: 600, letterSpacing: '-.03em' } as CSSProperties
                      }
                    >
                      {p.price}
                    </span>
                    <span style={{ fontSize: textSize(1), color: '#7a6a58' }}> / único pago</span>
                  </div>
                  {p.featured ? (
                    <Button
                      href="/agendar"
                      strong
                      lift
                      style={{ padding: u(1), fontSize: textSize(1.1), fontWeight: 600 }}
                    >
                      Elegir plan
                    </Button>
                  ) : (
                    <Button
                      href="/agendar"
                      variant="glass"
                      lift
                      style={{ padding: u(1), fontSize: textSize(1.1) }}
                    >
                      Elegir plan
                    </Button>
                  )}
                  <div
                    style={{
                      fontSize: textSize(1),
                      fontWeight: 600,
                      marginTop: u(0.6),
                      display: 'flex',
                      alignItems: 'center',
                      gap: u(1),
                    }}
                  >
                    Incluye
                    <span style={{ flex: 1, height: 1, background: 'rgba(42,29,18,.12)' }} />
                  </div>
                  {p.includes.map((x) => (
                    <div
                      key={x}
                      style={{
                        display: 'flex',
                        gap: u(0.9),
                        fontSize: textSize(1.05),
                        marginBottom: u(0.9),
                        alignItems: 'center',
                      }}
                    >
                      <span style={{ ...tick(1.5, '#e8782a', '50%') }}>
                        <Icon name="check" size="60%" stroke={3} />
                      </span>
                      {x}
                    </div>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>

        </div>

        {/* Comparar planes */}
        <div
          className="sheet cq-pad"
          style={{
            padding: `${u(6)} ${u(10)} ${u(8)}`,
            // Sin foto intermedia: cancela solo el gap exterior, sin invadir los planes.
            marginTop: u(-4),
            display: 'flex',
            flexDirection: 'column',
            gap: u(5),
          }}
        >
          <SectionTitle
            variant="b"
            ghost={compare.ghost}
            title={compare.title}
            sub={compare.sub}
            ghostSize={7}
            ghostTop={-6.4}
          />
          <Reveal>
            <MobileScroll label="Comparación de planes. Desliza horizontalmente para ver todas las columnas.">
              <div
                className="cream soft cmp"
                style={{
                  padding: 0,
                  gap: 0,
                  borderRadius: u(1.6),
                  overflow: 'hidden',
                  display: 'grid',
                  gridTemplateColumns: '1.6fr 1fr 1fr 1fr',
                }}
              >
                <div
                  style={{ padding: u(1.6), background: 'linear-gradient(180deg,#fbf3e8,#fff)' }}
                >
                  <div style={{ fontSize: textSize(1.2), fontWeight: 600 }}>Características</div>
                  <div
                    style={{
                      fontSize: textSize(0.95),
                      color: '#7a6a58',
                      marginTop: u(0.4),
                      lineHeight: 1.4,
                    }}
                  >
                    Elige el plan ideal para tu ritmo.
                  </div>
                </div>
                {compare.head.map((h, i) => (
                  <div
                    key={h}
                    style={{
                      padding: u(1.6),
                      borderLeft: '1px solid rgba(42,29,18,.08)',
                      textAlign: 'center',
                      background: 'linear-gradient(180deg,#fbf3e8,#fff)',
                    }}
                  >
                    <div style={{ fontSize: textSize(1.1), fontWeight: 600 }}>{h}</div>
                    <div
                      style={{ fontSize: textSize(1.9), fontWeight: 600, letterSpacing: '-.02em' }}
                    >
                      {compare.prices[i]}
                    </div>
                  </div>
                ))}
                {compare.rows.map(([label, a, b, c]) => (
                  <div key={label} style={{ display: 'contents' }}>
                    <div
                      style={{
                        padding: u(1.4),
                        display: 'flex',
                        alignItems: 'center',
                        borderTop: '1px solid rgba(42,29,18,.08)',
                        fontSize: textSize(1.05),
                      }}
                    >
                      {label}
                    </div>
                    {[a, b, c].map((on, j) => (
                      <div
                        key={j}
                        style={{
                          padding: u(1.4),
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderTop: '1px solid rgba(42,29,18,.08)',
                          borderLeft: '1px solid rgba(42,29,18,.08)',
                        }}
                      >
                        <span
                          style={{
                            width: u(1.8),
                            height: u(1.8),
                            borderRadius: '50%',
                            background: on ? '#e8782a' : '#e8e1d4',
                            color: '#fff',
                            display: 'grid',
                            placeItems: 'center',
                          }}
                        >
                          {on ? (
                            <Icon name="check" size="60%" stroke={3} />
                          ) : (
                            <span style={{ fontSize: textSize(1) }} aria-label="No incluido">
                              –
                            </span>
                          )}
                        </span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </MobileScroll>
          </Reveal>
        </div>
      </section>

      <ClosingBand
        title={productoClosing.title}
        accent={productoClosing.accent}
        text={productoClosing.text}
      />
    </>
  );
}
