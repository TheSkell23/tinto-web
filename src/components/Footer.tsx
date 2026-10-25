import Link from 'next/link';
import type { CSSProperties } from 'react';
import { footerCols, site } from '@/content/site';
import { k, u } from '@/lib/u';

const socials = [
  {
    label: 'X',
    svg: (
      <path
        fill="#111"
        d="M18.9 2H22l-7.1 8.1L23 22h-6.4l-5-6.6L5.8 22H2.7l7.6-8.7L2.2 2h6.6l4.5 6L18.9 2zm-1.1 18h1.7L7.2 3.9H5.4L17.8 20z"
      />
    ),
  },
  {
    label: 'Instagram',
    svg: (
      <>
        <defs>
          <linearGradient id="igF" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="#f9a13a" />
            <stop offset=".5" stopColor="#e1306c" />
            <stop offset="1" stopColor="#833ab4" />
          </linearGradient>
        </defs>
        <rect
          x="3"
          y="3"
          width="18"
          height="18"
          rx="5"
          fill="none"
          stroke="url(#igF)"
          strokeWidth="2"
        />
        <circle cx="12" cy="12" r="4" fill="none" stroke="url(#igF)" strokeWidth="2" />
        <circle cx="17.5" cy="6.5" r="1.2" fill="#e1306c" />
      </>
    ),
  },
  {
    label: 'Behance',
    svg: (
      <path
        fill="#1769ff"
        d="M3 6h5.5c2.2 0 3.5 1.1 3.5 2.9 0 1.2-.6 2.1-1.7 2.5 1.4.4 2.2 1.5 2.2 3 0 2-1.5 3.2-3.9 3.2H3zm3 4.2h2c.9 0 1.4-.4 1.4-1.1S8.9 8 8 8H6zm0 5.7h2.3c1 0 1.6-.5 1.6-1.3s-.6-1.3-1.6-1.3H6zM15 7h5v1.2h-5zM17.5 9.5c2.4 0 3.8 1.6 3.8 4v.5h-5.7c.1 1.2.9 1.9 2 1.9.8 0 1.4-.3 1.7-.9h1.9c-.4 1.6-1.8 2.6-3.7 2.6-2.4 0-4-1.7-4-4.1s1.6-4 4-4zm-1.8 3.2h3.6c-.1-1-.8-1.7-1.8-1.7s-1.7.6-1.8 1.7z"
      />
    ),
  },
  {
    label: 'YouTube',
    svg: (
      <>
        <rect x="2" y="5" width="20" height="14" rx="4" fill="#ff0000" />
        <path d="M10 9l5 3-5 3z" fill="#fff" />
      </>
    ),
  },
  {
    label: 'LinkedIn',
    svg: (
      <path
        fill="#0a66c2"
        d="M4 9h3.5v11H4zM5.75 3.5a2 2 0 110 4 2 2 0 010-4zM10 9h3.3v1.5c.5-.9 1.7-1.8 3.4-1.8 3.5 0 4.1 2.3 4.1 5.3V20h-3.5v-5.2c0-1.2 0-2.8-1.7-2.8s-2 1.3-2 2.7V20H10z"
      />
    ),
  },
];

const colTitle: CSSProperties = { fontSize: u(1.5), fontWeight: 500, color: '#2a1d12' };
const linkSt: CSSProperties = { fontSize: u(0.95), color: '#7a5c3a' };

/** Pie común: logo en máscara, columnas de enlaces y CTA "Contactar". */
export function Footer() {
  return (
    <footer
      className="cq cq-pad"
      style={{
        background: '#fff',
        padding: `${u(2)} ${u(4)} ${u(2)}`,
        position: 'relative',
        zIndex: 3,
      }}
    >
      <div
        className="foot-card"
        style={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius: u(3.4),
          background:
            'radial-gradient(45% 50% at 12% 20%,rgba(249,201,160,.55),transparent 70%),radial-gradient(45% 50% at 92% 30%,rgba(233,180,138,.45),transparent 70%),linear-gradient(180deg,#fcf3e6,#f6e3cc)',
          padding: `${u(4.4)} ${u(5.4)} 0`,
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: u(4),
          }}
        >
          <div
            className="fz"
            style={
              {
                ...k(2.3),
                lineHeight: 1.05,
                fontWeight: 500,
                letterSpacing: '-.02em',
                color: '#2a1d12',
                maxWidth: u(22),
              } as CSSProperties
            }
          >
            Tu aliado para vender con contexto
          </div>
          <Link
            href="/contacto"
            className="btn btn-lift btn-strong fz"
            style={
              {
                ...k(2.4),
                padding: `${u(1.2)} ${u(3.4)}`,
                background: 'linear-gradient(135deg,#ff8a3d,#ff9d86)',
                fontWeight: 500,
                letterSpacing: '-.02em',
                color: '#fff',
                lineHeight: 1,
              } as CSSProperties
            }
          >
            Contactar
          </Link>
        </div>

        <div
          className="rg"
          style={
            {
              '--c': '1fr 1fr 1.6fr',
              '--m': 2,
              gap: u(3),
              marginTop: u(3.6),
              alignItems: 'start',
            } as CSSProperties
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: u(1.1) }}>
            <Link href={footerCols.producto.href} style={colTitle}>
              {footerCols.producto.title}
            </Link>
            <div style={{ display: 'flex', flexDirection: 'column', gap: u(0.7) }}>
              {footerCols.producto.links.map((l) => (
                <Link key={l.label} href={l.href} style={linkSt}>
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: u(1.1) }}>
            <Link href={footerCols.explorar.href} style={colTitle}>
              {footerCols.explorar.title}
            </Link>
            <div style={{ display: 'flex', flexDirection: 'column', gap: u(0.7) }}>
              {footerCols.explorar.links.map((l) => (
                <Link key={l.label} href={l.href} style={linkSt}>
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: u(1.1) }}
            className="foot-social"
          >
            <Link href={footerCols.conocenos.href} style={colTitle}>
              {footerCols.conocenos.title}
            </Link>
            <div style={{ display: 'flex', gap: u(0.8), flexWrap: 'wrap' }}>
              {socials.map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="foot-soc"
                  style={{
                    width: u(3.4),
                    height: u(3.4),
                    borderRadius: '50%',
                    display: 'grid',
                    placeItems: 'center',
                    background:
                      'linear-gradient(160deg,rgba(255,255,255,.95),rgba(255,244,230,.7))',
                    border: '1px solid rgba(255,255,255,.95)',
                    boxShadow: `inset 0 1px 0 #fff,0 ${u(0.4)} ${u(1.2)} rgba(140,90,40,.18)`,
                  }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    style={{ width: u(1.7), height: u(1.7), display: 'block' }}
                  >
                    {s.svg}
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div
          className="foot-logo"
          style={{ height: u(13.5), marginTop: u(2.6), overflow: 'hidden' }}
        >
          <div
            role="img"
            aria-label="tinto"
            style={{
              width: '84%',
              aspectRatio: '793/228',
              margin: '0 auto',
              background: 'linear-gradient(180deg,#e8782a,#8a5a1f 55%,#4a2f1a)',
              WebkitMask: 'url(/images/tinto-logo.png) center/100% 100% no-repeat',
              mask: 'url(/images/tinto-logo.png) center/100% 100% no-repeat',
            }}
          />
        </div>
      </div>
      <div
        className="foot-legal"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: `${u(1.2)} ${u(2)} 0`,
          fontSize: u(0.85),
          color: '#8a6a48',
          gap: u(2),
          flexWrap: 'wrap',
        }}
      >
        <span>{site.copyright}</span>
        <div style={{ display: 'flex', gap: u(2) }}>
          <a href="#" style={{ textDecoration: 'underline' }}>
            Términos del servicio
          </a>
          <a href="#" style={{ textDecoration: 'underline' }}>
            Política de privacidad
          </a>
        </div>
      </div>
    </footer>
  );
}
