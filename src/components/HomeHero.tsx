import { Icon } from '@/components/Icons';
import { Button } from '@/components/ui';
import { homeHero } from '@/content/home';
import './HomeHero.css';

/**
 * Hero de la portada: ocupa toda la pantalla (100svh) con fondo de degradado naranja, así al abrir la página
 * no se ve nada de las secciones siguientes. Insignia, titular, dos botones, tarjetas de vidrio y carrusel
 * de agencias al pie.
 */
export function HomeHero() {
  const logos = homeHero.trust.logos;
  const card = homeHero.card;
  return (
    <section className="hc" aria-labelledby="hc-title">
      <span className="hc-mesh" aria-hidden="true">
        <i className="a" />
        <i className="b" />
        <i className="c" />
      </span>

      <div className="hc-body">
        <span className="hc-badge">
          <span className="hc-dot" aria-hidden="true" />
          CRM para agencias de seguros
        </span>
        <h1 id="hc-title" className="hc-title">
          Atrae, precalifica y <em>organiza tus oportunidades.</em>
        </h1>
        <p className="hc-text">{homeHero.body.trim()}</p>
        <div className="hc-actions">
          <Button href="/agendar" strong lift className="hc-btn">
            {homeHero.cta}
            <Icon name="arrow" size={18} stroke={2.4} />
          </Button>
          <Button href="/producto" variant="glass" lift className="hc-btn hc-alt">
            Ver el producto
          </Button>
        </div>
        <div className="hc-journey">
          {card.steps.map((step, index) => (
            <span key={step}>
              <span className="hc-step-dot" aria-hidden="true"><Icon name={['chat', 'shield', 'columns'][index]} size={17} /></span>
              {step}
              {index < card.steps.length - 1 && <Icon name="arrow" size={15} />}
            </span>
          ))}
        </div>
      </div>
      <span className="hc-wordmark" aria-hidden="true">tinto</span>

      <div className="hc-person l">
        <div className="hc-glass hc-mini">
          <span className="hc-k">PUNTAJE</span>
          <span className="hc-big">
            84<small> / 100</small>
          </span>
          <span className="hc-bar" aria-hidden="true">
            <i />
          </span>
          <span className="hc-sub">Cierre estimado · 12 días</span>
        </div>
      </div>

      <div className="hc-person r">
        <div className="hc-glass hc-ficha">
          <div className="hc-row">
            <span className="hc-k">{card.label}</span>
            <span className="hc-tag">{card.badge}</span>
          </div>
          {card.rows.map(([a, b]) => (
            <div className="hc-row line" key={a}>
              <span>{a}</span>
              <b>{b}</b>
            </div>
          ))}
        </div>
        <svg className="hc-cursor" viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="currentColor"
            stroke="#fff"
            strokeWidth="1.6"
            strokeLinejoin="round"
            d="M4 3l16 7.2-6.6 2.2L10.7 20 4 3z"
          />
        </svg>
      </div>

      <div className="hc-marquee" aria-label={homeHero.trust.label}>
        <div className="hc-track" aria-hidden="true">
          {[...logos, ...logos, ...logos, ...logos].map((l, i) => (
            <span key={i}>{l}</span>
          ))}
        </div>
        <span className="sr-only">{logos.join(', ')}</span>
      </div>
      <span className="hc-cap" aria-hidden="true" />
    </section>
  );
}
