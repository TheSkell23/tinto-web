import { SectionHero } from '@/components/SectionHero';
import { JsonLd } from '@/components/JsonLd';
import { pageStructuredData } from '@/lib/structured-data';
import { pageMetadata } from '@/lib/metadata';
import type { CSSProperties } from 'react';
import { BookingFlow } from '@/components/BookingFlow';
import { Accent, Reveal } from '@/components/ui';
import { agendarHero } from '@/content/agendar';
import { textSize, k, u } from '@/lib/u';

export const metadata = pageMetadata('/agendar');

export default function AgendarPage() {
  return (
    <div className="pg">
      <JsonLd data={pageStructuredData('/agendar')} />
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
            {agendarHero.title} <Accent>{agendarHero.accent}</Accent>
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
            {agendarHero.text}
          </p>
        </Reveal>
      </SectionHero>
      <BookingFlow />
    </div>
  );
}
