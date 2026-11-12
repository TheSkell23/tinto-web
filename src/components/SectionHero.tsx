import type { ReactNode } from 'react';
import './SectionHero.css';

/**
 * Fondo de degradado naranja a todo el ancho para el hero de cada sección. Va dentro de `.pg` y compensa su
 * relleno. `full` lo estira a la altura de la pantalla (en escritorio) para que al abrir la página solo se vea el hero.
 */
export function SectionHero({ children, full = false }: { children: ReactNode; full?: boolean }) {
  return (
    <section className={`sh${full ? ' sh-full' : ''}`}>
      <span className="sh-wordmark" aria-hidden="true">tinto</span>
      {children}
      <span className="sh-cap" aria-hidden="true" />
    </section>
  );
}
