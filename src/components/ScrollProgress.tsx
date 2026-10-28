'use client';

import { useEffect, useRef } from 'react';

/** Barra fina en la parte superior que muestra cuánto se ha leído de la página. */
export function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let tick = false;
    const update = () => {
      tick = false;
      const el = bar.current;
      if (!el) return;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      el.style.transform = `scaleX(${p.toFixed(4)})`;
    };
    const onScroll = () => {
      if (!tick) {
        tick = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return <div ref={bar} className="m-progress" aria-hidden="true" />;
}
