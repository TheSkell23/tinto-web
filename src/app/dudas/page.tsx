import { SectionHero } from '@/components/SectionHero';
import { JsonLd } from '@/components/JsonLd';
import { pageStructuredData } from '@/lib/structured-data';
import { pageMetadata } from '@/lib/metadata';
import Image from 'next/image';
import Link from 'next/link';
import type { CSSProperties } from 'react';
import { DudasChat } from '@/components/DudasChat';
import { Faq } from '@/components/Faq';
import { ScrollToGo } from '@/components/ScrollToGo';
import { Accent, Button, ClosingCard, Reveal, SectionTitle } from '@/components/ui';
import { dudasClosing, dudasHero, faqSection, humanCard } from '@/content/dudas';
import { site } from '@/content/site';
import { textSize, k, u } from '@/lib/u';

export const metadata = pageMetadata('/dudas');

export default function DudasPage() {
  return (
    <>
      <JsonLd data={pageStructuredData('/dudas')} />
      <ScrollToGo />
      <div className="pg">
        <SectionHero>
          <Reveal
            style={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              gap: u(1.2),
            }}
          >
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
              {dudasHero.title} <Accent>{dudasHero.accent}</Accent>
            </h1>
            <p
              style={{
                margin: 0,
                fontSize: textSize(1.3),
                lineHeight: 1.55,
                color: '#7a6a58',
                maxWidth: u(40),
              }}
            >
              {dudasHero.text}
            </p>
          </Reveal>
        </SectionHero>

        <DudasChat>
          <div className="cream" style={{ padding: u(1.2), gap: u(1.2) }}>
            <div style={{ position: 'relative' }}>
              <Image
                src="/images/foto-soporte.png"
                alt={humanCard.alt}
                width={896}
                height={1200}
                sizes="(max-width: 899px) 100vw, 30vw"
                style={{
                  width: '100%',
                  aspectRatio: '16/10',
                  objectFit: 'cover',
                  objectPosition: '50% 30%',
                  borderRadius: u(1.6),
                  display: 'block',
                  height: 'auto',
                }}
              />
              <div
                className="glass"
                style={{
                  position: 'absolute',
                  left: u(1),
                  bottom: u(1),
                  display: 'flex',
                  alignItems: 'center',
                  gap: u(0.7),
                  padding: u(0.6, 1.1),
                  borderRadius: 99,
                  background: 'rgba(255,255,255,.88)',
                  boxShadow: '0 8px 20px rgba(60,40,20,.2)',
                }}
              >
                <span
                  style={{
                    width: u(0.7),
                    height: u(0.7),
                    borderRadius: '50%',
                    background: '#2fbf71',
                  }}
                />
                <span style={{ fontSize: textSize(0.95), fontWeight: 800 }}>{site.advisor}</span>
                <span style={{ fontSize: textSize(0.85), color: '#7a6a58' }}>
                  Asesora · en línea
                </span>
              </div>
            </div>
            <div
              style={{
                padding: `0 ${u(0.8)} ${u(0.6)}`,
                display: 'flex',
                flexDirection: 'column',
                gap: u(0.6),
              }}
            >
              <h2
                style={{
                  margin: 0,
                  fontSize: textSize(1.6),
                  fontWeight: 800,
                  letterSpacing: '-.02em',
                  lineHeight: 1.15,
                }}
              >
                {humanCard.title}
              </h2>
              <div style={{ fontSize: textSize(1.05), lineHeight: 1.5, color: '#7a6a58' }}>
                {humanCard.text}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', marginTop: u(0.4) }}>
                {humanCard.channels.map(([ic, t, s, r]) => (
                  <div
                    key={t}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: u(1),
                      padding: u(0.9, 0),
                      borderTop: '1px solid rgba(42,29,18,.08)',
                    }}
                  >
                    <span
                      aria-hidden="true"
                      style={{
                        flex: 'none',
                        width: u(2.6),
                        height: u(2.6),
                        borderRadius: '50%',
                        background: 'var(--grad-primary)',
                        display: 'grid',
                        placeItems: 'center',
                        color: '#fff',
                        fontSize: textSize(1),
                        fontWeight: 800,
                      }}
                    >
                      {ic}
                    </span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: textSize(1.1), fontWeight: 800, lineHeight: 1.2 }}>
                        {t}
                      </div>
                      <div style={{ fontSize: textSize(0.9), color: '#7a6a58' }}>{s}</div>
                    </div>
                    <span
                      style={{
                        fontSize: textSize(0.85),
                        fontWeight: 700,
                        color: '#e8782a',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {r}
                    </span>
                  </div>
                ))}
              </div>
              <div
                style={{
                  display: 'flex',
                  gap: u(1),
                  alignItems: 'center',
                  marginTop: u(0.8),
                  flexWrap: 'wrap',
                }}
              >
                <Button href="/contacto" style={{ padding: u(0.9, 1.8), fontSize: textSize(1.05) }}>
                  Contactar
                </Button>
                <Link href="/agendar" className="link-brand" style={{ fontSize: textSize(1.05) }}>
                  Agendar demo →
                </Link>
              </div>
            </div>
          </div>
        </DudasChat>

        <div style={{ paddingBottom: u(6.5) }}>
          <SectionTitle ghost={faqSection.ghost} title={faqSection.title} sub={faqSection.sub} />
          <Reveal>
            <Faq items={faqSection.items} />
          </Reveal>
        </div>

        <ClosingCard
          title={dudasClosing.title}
          accent={dudasClosing.accent}
          text={dudasClosing.text}
        />
      </div>
    </>
  );
}
