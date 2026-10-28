'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/** Capas complementarias: listas de tarjetas y bucles limitados a su área visible. */
export function MotionEnhancements() {
  const pathname = usePathname();
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (preference.matches || !('IntersectionObserver' in window)) return;
    const root = document.documentElement;
    const observed = new Set<Element>();
    const loops = '.hero-card, .mock-float, .kenburns, .bird, .typing-dots, .hc, .sh';
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const node = entry.target;
          if (node.matches(loops)) node.classList.toggle('motion-in-view', entry.isIntersecting);
          else if (entry.isIntersecting) {
            node.classList.add('motion-entered');
            observer.unobserve(node);
          }
        }
      },
      { threshold: 0.08 },
    );
    const watch = () => {
      document
        .querySelectorAll<HTMLElement>('main .tablet-cards > :not([hidden])')
        .forEach((node) => {
          if (observed.has(node)) return;
          const siblings = Array.from(node.parentElement?.children ?? []);
          node.style.setProperty('--motion-order', String(Math.min(siblings.indexOf(node), 4)));
          node.classList.add('motion-list-item');
          observed.add(node);
          observer.observe(node);
        });
      document.querySelectorAll(loops).forEach((node) => {
        if (observed.has(node)) return;
        observed.add(node);
        observer.observe(node);
      });
    };
    let frame = 0;
    const mutation = new MutationObserver((records) => {
      if (!records.some((record) => Array.from(record.addedNodes).some((node) => node.nodeType === 1))) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(watch);
    });
    watch();
    root.dataset.detailMotion = 'ready';
    const visibility = () => {
      root.dataset.motionVisibility = document.hidden ? 'hidden' : 'visible';
    };
    visibility();
    mutation.observe(document.querySelector('main') ?? document.body, {
      childList: true,
      subtree: true,
    });
    document.addEventListener('visibilitychange', visibility);
    return () => {
      observer.disconnect();
      mutation.disconnect();
      cancelAnimationFrame(frame);
      document.removeEventListener('visibilitychange', visibility);
      delete root.dataset.detailMotion;
      delete root.dataset.motionVisibility;
    };
  }, [pathname]);
  return null;
}
