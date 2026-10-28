'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

const cl = (x: number) => Math.max(0, Math.min(1, x));
/** Anticipación: se revela un 15 % del alto de la ventana antes de que el bloque entre en pantalla. */
const LEAD = 0.15;

/**
 * Equivalente a initMotion del diseño, con IntersectionObserver propio:
 *  - `.rv` entra con fade + translateY (34px) la primera vez que se acerca a la pantalla.
 *  - El contenido es VISIBLE por defecto (sin JS, con error o con movimiento reducido). Solo después
 *    de iniciar correctamente este efecto se marca `<html data-motion="ready">`, que es lo único
 *    que activa el estado oculto en el CSS.
 *  - Cada bloque se anima una sola vez. Un barrido en cada scroll revela cualquier bloque que el
 *    observer no haya visto (scroll rápido, saltos, recarga a mitad de página).
 *  - Los títulos fantasma (`[data-ghost]`) hacen parallax y se desvanecen según su distancia al centro.
 */
export function MotionController() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduce.matches) {
      delete root.dataset.motion; // movimiento reducido: todo visible y sin animación
      return;
    }

    // ---- Revelado ----
    const pendingEls = () => document.querySelectorAll<HTMLElement>('.rv:not(.rv-in)');
    const reveal = (el: Element) => el.classList.add('rv-in');

    /** Revela todo lo que ya está en pantalla, por encima de ella o a punto de entrar. */
    const sweep = () => {
      const limit = window.innerHeight * (1 + LEAD);
      pendingEls().forEach((el) => {
        if (el.getBoundingClientRect().top < limit) reveal(el);
      });
    };

    // Lo que ya se ve al iniciar (o está por encima) se muestra sin ocultarlo ni parpadear.
    sweep();
    root.dataset.motion = 'ready'; // a partir de aquí lo que está por debajo queda oculto hasta acercarse

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          reveal(e.target);
          io.unobserve(e.target);
        }
      },
      { rootMargin: `0px 0px ${LEAD * 100}% 0px`, threshold: 0.01 },
    );
    const watch = () => {
      pendingEls().forEach((el) => io.observe(el));
      sweep();
    };
    watch();
    let pending = 0;
    const mo = new MutationObserver(() => {
      cancelAnimationFrame(pending);
      pending = requestAnimationFrame(watch);
    });
    mo.observe(document.body, { childList: true, subtree: true });

    let sweepTick = false;
    const onScroll = () => {
      if (sweepTick) return;
      sweepTick = true;
      requestAnimationFrame(() => {
        sweepTick = false;
        sweep();
      });
    };
    const onShow = () => sweep(); // vuelta desde la caché del navegador / pestaña
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    window.addEventListener('pageshow', onShow);
    document.addEventListener('visibilitychange', onShow);
    const late = window.setTimeout(sweep, 1200); // red de seguridad tras cargar imágenes/fuentes

    // Si el usuario activa "reducir movimiento" con la página abierta, se muestra todo.
    const onReduce = () => {
      if (!reduce.matches) return;
      delete root.dataset.motion;
      pendingEls().forEach(reveal);
    };
    reduce.addEventListener('change', onReduce);

    // ---- Fantasmas ----
    const visible = new Set<HTMLElement>();
    const gio = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.add(e.target as HTMLElement);
          else visible.delete(e.target as HTMLElement);
        }
        schedule();
      },
      { rootMargin: '100% 0px 100% 0px' },
    );
    const ghosts = new Set<HTMLElement>();
    const watchGhosts = () =>
      document.querySelectorAll<HTMLElement>('[data-ghost]').forEach((g) => {
        if (!ghosts.has(g)) {
          ghosts.add(g);
          gio.observe(g);
        }
      });
    watchGhosts();
    const mo2 = new MutationObserver(watchGhosts);
    mo2.observe(document.body, { childList: true, subtree: true });

    let tick = false;
    const run = () => {
      tick = false;
      const h = window.innerHeight;
      visible.forEach((g) => {
        const r = g.getBoundingClientRect();
        const d = (r.top + r.height / 2 - h / 2) / h;
        g.style.translate = `0 ${Math.round(d * 36)}px`;
        g.style.opacity = cl(2.1 - Math.abs(d) * 1.8).toFixed(2);
      });
    };
    function schedule() {
      if (!tick) {
        tick = true;
        requestAnimationFrame(run);
      }
    }
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    schedule();

    return () => {
      io.disconnect();
      gio.disconnect();
      mo.disconnect();
      mo2.disconnect();
      cancelAnimationFrame(pending);
      window.clearTimeout(late);
      reduce.removeEventListener('change', onReduce);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      window.removeEventListener('pageshow', onShow);
      document.removeEventListener('visibilitychange', onShow);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [pathname]);

  return null;
}
