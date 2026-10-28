import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@/components/Icons';
import { homeHero, homeHeroPreview as copy, homeModules } from '@/content/home';
import styles from './HomeHeroPreview.module.css';

/** Experimento inspirado en la referencia: centro editorial y retratos laterales. */
export function HomeHeroPreview() {
  return (
    <div className={styles.shell}>
      <section className={styles.hero} aria-labelledby="inicio-title">
        <div className={styles.content}>
          <p className={styles.category}>
            <span aria-hidden="true">
              <Icon name="shield" size={16} />
            </span>
            {copy.category}
          </p>
          <h1 id="inicio-title" className={styles.title}>
            {copy.title.map((line, index) => (
              <span key={line}>
                {index > 0 ? ' ' : ''}
                {line}
              </span>
            ))}
          </h1>
          <p className={styles.description}>{homeHero.body.trim()}</p>
          <div className={styles.actions}>
            <Link href="/producto" className={`${styles.secondary} btn`}>
              {copy.explore}
            </Link>
            <Link href="/agendar" className={`${styles.primary} btn`}>
              {homeHero.cta}
              <Icon name="arrow" size={17} />
            </Link>
          </div>
        </div>
        <div className={styles.people}>
          <figure className={styles.team}>
            <div className={styles.teamPhoto}>
              <Image
                src="/images/foto-corredora.png"
                alt=""
                fill
                sizes="(max-width: 899px) 110px, 150px"
              />
            </div>
            <figcaption className={styles.teamLabel}>
              <span className={styles.dot} aria-hidden="true" />
              {copy.team}
            </figcaption>
          </figure>
          <figure className={styles.advisor}>
            <div className={styles.advisorPhoto}>
              <Image
                src="/images/foto-soporte.png"
                alt=""
                fill
                sizes="(max-width: 899px) 110px, 160px"
              />
            </div>
            <figcaption className={styles.advisorLabel}>
              <Icon name="chat" size={14} />
              {copy.context}
            </figcaption>
            <svg className={styles.pointer} viewBox="0 0 40 46" fill="none" aria-hidden="true">
              <path d="M5 3l29 20-14 3-6 14L5 3z" fill="currentColor" />
              <path
                d="M2 5l-1-4M32 10l4-2M27 39l3 4"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </figure>
        </div>
        <div className={styles.modules}>
          <p>{homeModules.title}</p>
          <ul aria-label="Módulos de Tinto">
            {homeModules.items.map((item) => (
              <li key={item.title}>
                <Icon name={item.icon} size={24} stroke={1.8} />
                <span>{item.title}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
