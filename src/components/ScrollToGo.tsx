'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { scrollToSection } from '@/lib/scroll';

/** Lee ?go=<título> al llegar a la página y hace scroll suave a esa sección (offset 140px). */
export function ScrollToGo() {
  const pathname = usePathname();
  useEffect(() => {
    const go = new URLSearchParams(window.location.search).get('go');
    if (!go) return;
    let tries = 0;
    let timer = 0;
    const attempt = () => {
      if (scrollToSection(go, false)) {
        // reajuste: al terminar de cargar imágenes/reveal el título puede desplazarse unos px
        timer = window.setTimeout(() => scrollToSection(go, false), 700);
        return;
      }
      if (++tries > 10) return;
      timer = window.setTimeout(attempt, 150);
    };
    timer = window.setTimeout(attempt, 250);
    return () => window.clearTimeout(timer);
  }, [pathname]);
  return null;
}
