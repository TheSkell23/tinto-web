import Image from 'next/image';

/**
 * Visual del hero de Nosotros: foto del equipo con marco de color desfasado, un recorte circular de los
 * rostros y fichas de vidrio flotantes. Usa solo la foto y las cifras que ya existen.
 */
export function TeamVisual({
  alt,
  chips,
  since,
}: {
  alt: string;
  chips: ReadonlyArray<ReadonlyArray<string>>;
  since: ReadonlyArray<string>;
}) {
  return (
    <div className="tv sh-visual">
      <span className="tv-frame" aria-hidden="true" />
      <span className="tv-dots" aria-hidden="true" />
      <div className="tv-photo">
        <Image
          src="/images/foto-equipo.png"
          alt={alt}
          fill
          sizes="(max-width: 899px) 100vw, 44vw"
          style={{ objectFit: 'cover', objectPosition: '50% 60%' }}
        />
      </div>
      <div className="tv-face" aria-hidden="true">
        <Image
          src="/images/foto-equipo.png"
          alt=""
          fill
          sizes="160px"
          style={{ objectFit: 'cover', objectPosition: '30% 38%', transform: 'scale(2.3)' }}
        />
      </div>
      <div className="tv-chip tv-a mock-float">
        <span>{chips[0][0]}</span>
        <b>{chips[0][1]}</b>
      </div>
      <div className="tv-chip tv-b">
        <span>{chips[1][0]}</span>
        <b>{chips[1][1]}</b>
      </div>
      <div className="tv-since" aria-hidden="true">
        <b>{since[0]}</b>
        <span>{since[1]}</span>
      </div>
    </div>
  );
}
