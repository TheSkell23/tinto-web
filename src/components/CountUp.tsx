'use client';

import { useEffect, useRef } from 'react';

const DURATION = 1500;

/** Separa "2.000", "50K+", "4.9★", "38%" en prefijo, número y sufijo. */
function parse(value: string) {
  const m = value.match(/^([^\d]*)(\d[\d.,]*)(.*)$/);
  if (!m) return null;
  const [, pre, raw, post] = m;
  const thousands = /^\d{1,3}(\.\d{3})+$/.test(raw); // 2.000 -> miles; 4.9 -> decimal
  const decimals = thousands ? 0 : (raw.split(/[.,]/)[1]?.length ?? 0);
  const n = thousands ? Number(raw.replace(/\./g, '')) : Number(raw.replace(',', '.'));
  return Number.isFinite(n)
    ? { pre, post, n, thousands, decimals, sep: raw.includes(',') ? ',' : '.' }
    : null;
}

const fmt = (p: NonNullable<ReturnType<typeof parse>>, v: number) => {
  const body = p.thousands
    ? Math.round(v).toLocaleString('es-CO')
    : v.toFixed(p.decimals).replace('.', p.sep);
  return p.pre + body + p.post;
};

/** Cifra que cuenta desde 0 hasta su valor la primera vez que se ve. El HTML ya trae el valor final. */
export function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    const p = parse(value);
    if (!el || !p || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    el.textContent = fmt(p, 0);
    let raf = 0;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const stop = () => {
      if (!preference.matches) return;
      cancelAnimationFrame(raf);
      el.textContent = value;
      io.disconnect();
    };
    const run = () => {
      const t0 = performance.now();
      const step = (now: number) => {
        const t = Math.min(1, (now - t0) / DURATION);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = t < 1 ? fmt(p, p.n * eased) : value;
        if (t < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    };
    const io = new IntersectionObserver(
      (entries) => {
        if (preference.matches) return;
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          run();
        }
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    preference.addEventListener('change', stop);
    return () => {
      io.disconnect();
      preference.removeEventListener('change', stop);
      cancelAnimationFrame(raf);
      el.textContent = value;
    };
  }, [value]);

  return <span ref={ref}>{value}</span>;
}
