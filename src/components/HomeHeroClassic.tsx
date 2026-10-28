import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@/components/Icons';
import { homeHero } from '@/content/home';
import { textSize, u } from '@/lib/u';

/** Hero anterior conservado para comparar esta prueba. */
export function HomeHeroClassic() {
  const h = homeHero;
  return (
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
          className="kenburns"
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
              sizes="(max-width: 899px) 150px, 20vw"
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
                fontSize: textSize(1),
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
                gap: `max(12px, ${u(1.4)})`,
                background: 'linear-gradient(180deg,rgba(255,255,255,.95),rgba(246,232,214,.85))',
                backdropFilter: 'blur(6px)',
                WebkitBackdropFilter: 'blur(6px)',
                color: '#2a1d12',
                padding: `max(5px, ${u(0.4)}) max(5px, ${u(0.4)}) max(5px, ${u(0.4)}) max(18px, ${u(1.4)})`,
                fontWeight: 600,
                fontSize: `max(13px, ${u(1)})`,
                textShadow: 'none',
                position: 'relative',
                zIndex: 4,
                top: u(4.3),
                left: u(2.7),
                width: 'fit-content',
                border: '1px solid rgba(138,90,31,.22)',
                boxShadow: 'inset 0 1px 0 #fff,0 6px 14px rgba(80,50,20,.12)',
              }}
            >
              {h.cta}
              <span
                className="hero-cta-arrow"
                style={{
                  flex: 'none',
                  width: `max(28px, ${u(2.2)})`,
                  height: `max(28px, ${u(2.2)})`,
                  borderRadius: '50%',
                  background: '#2a1d12',
                  color: '#fff',
                  display: 'grid',
                  placeItems: 'center',
                }}
              >
                <Icon name="arrow" size="56%" stroke={2.4} />
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
                  fontSize: textSize(0.65),
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
                  fontSize: textSize(0.75),
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
                fontSize: textSize(1.1),
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
                    fontSize: textSize(0.85),
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
                      fontSize: textSize(0.65),
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
        <span style={{ fontSize: textSize(1.1), color: '#7a6a58' }}>{h.trust.label}</span>
        <div
          style={{
            display: 'flex',
            gap: u(4),
            flexWrap: 'wrap',
            fontSize: textSize(1.9),
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
  );
}
