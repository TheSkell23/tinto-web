'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

export type LogoSheet = {
  frames: number;
  cols: number;
  frameW: number;
  frameH: number;
  delays: number[];
  duration: number;
  firstFrameVisible: boolean;
};

const SHEET_URL = '/anim/logo-sheet.webp';
const SLOT_W = 96;
const FADE = 'opacity 120ms linear';

/** Índice del fotograma para el instante t (búsqueda binaria sobre los tiempos acumulados). */
function frameAt(starts: number[], t: number): number {
  let lo = 0;
  let hi = starts.length - 1;
  while (lo < hi) {
    const mid = (lo + hi + 1) >> 1;
    if (starts[mid] <= t) lo = mid;
    else hi = mid - 1;
  }
  return lo;
}

/**
 * Logo del header. `compact` viene del MISMO cálculo que usa el header para cambiar de tamaño
 * (una sola fuente de verdad), así la animación arranca en el mismo instante que la transición de ancho.
 * El GIF no se usa en el navegador: se reproduce una hoja de sprites en <canvas> hacia delante o hacia atrás.
 */
export function HeaderLogo({ compact, sheet }: { compact: boolean; sheet: LogoSheet | null }) {
  const ratio = sheet ? sheet.frameW / sheet.frameH : 3.4;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvasOn, setCanvasOn] = useState(false); // el canvas está visible (si no, se ve el logo estático)
  const [failed, setFailed] = useState(false);
  const api = useRef<{ setTarget: (c: boolean) => void } | null>(null);
  const compactRef = useRef(compact);

  useEffect(() => {
    if (!sheet) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(SLOT_W * dpr);
    canvas.height = Math.round((SLOT_W * dpr) / ratio);
    ctx.imageSmoothingQuality = 'high';

    const starts: number[] = [];
    let acc = 0;
    for (const d of sheet.delays) {
      starts.push(acc);
      acc += d;
    }
    const duration = sheet.duration || acc;

    let img: HTMLImageElement | null = null;
    let ready = false;
    let t = compactRef.current && reduce ? duration : 0;
    let dir: -1 | 0 | 1 = 0;
    let shown = -1;
    let raf = 0;
    let last = 0;
    let dead = false;

    const draw = (force = false) => {
      const f = Math.min(frameAt(starts, Math.min(t, duration)), sheet.frames - 1);
      if (f === shown && !force) return;
      shown = f;
      canvas.dataset.frame = String(f);
      if (!ready || !img) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(
        img,
        (f % sheet.cols) * sheet.frameW,
        Math.floor(f / sheet.cols) * sheet.frameH,
        sheet.frameW,
        sheet.frameH,
        0,
        0,
        canvas.width,
        canvas.height,
      );
    };

    const tick = (now: number) => {
      raf = 0;
      if (dead) return;
      const dt = Math.min(now - last, 100);
      last = now;
      t += dir * dt;
      if (t >= duration) {
        t = duration;
        dir = 0;
      } else if (t <= 0) {
        t = 0;
        dir = 0;
        if (!sheet.firstFrameVisible) setCanvasOn(false); // fin de la reversa: vuelve al logo estático
      }
      draw();
      canvas.dataset.playing = dir === 0 ? 'false' : 'true';
      if (dir !== 0) raf = requestAnimationFrame(tick);
    };

    const setTarget = (isCompact: boolean) => {
      const want: -1 | 1 = isCompact ? 1 : -1;
      canvas.dataset.dir = String(want);
      if (want === 1) load(); // si aún no se precargó, empieza a bajar la hoja ya
      if (reduce) {
        t = isCompact ? duration : 0;
        dir = 0;
        setCanvasOn(sheet.firstFrameVisible || isCompact);
        draw();
        return;
      }
      if (want === 1) setCanvasOn(true);
      if ((want === 1 && t >= duration) || (want === -1 && t <= 0)) {
        dir = 0;
        if (want === -1 && !sheet.firstFrameVisible) setCanvasOn(false);
        draw();
        return;
      }
      dir = want; // continúa desde el fotograma actual (interrumpible, sin reiniciar)
      canvas.dataset.playing = 'true';
      if (!raf) {
        last = performance.now();
        raf = requestAnimationFrame(tick);
      }
    };
    api.current = { setTarget };

    const load = () => {
      if (img || dead) return;
      img = new window.Image();
      img.decoding = 'async';
      img.src = SHEET_URL;
      img
        .decode()
        .then(() => {
          if (dead) return;
          ready = true;
          draw(true);
          if (sheet.firstFrameVisible || t > 0 || dir !== 0) setCanvasOn(true);
        })
        .catch(() => {
          if (!dead) setFailed(true);
        });
    };

    // Precarga al terminar de cargar la página (cuando el navegador está libre).
    const idle = () => {
      const ric = (window as unknown as { requestIdleCallback?: (cb: () => void) => number })
        .requestIdleCallback;
      if (ric) ric(load);
      else setTimeout(load, 200);
    };
    if (document.readyState === 'complete') idle();
    else window.addEventListener('load', idle, { once: true });

    canvas.dataset.dir = '0';
    canvas.dataset.frame = String(compactRef.current && reduce ? sheet.frames - 1 : 0);
    // Si ya está compacto al montar (p. ej. recarga con scroll), arranca en el estado correcto.
    if (compactRef.current) {
      t = duration;
      load();
      canvas.dataset.dir = '1';
      draw(true);
    }

    return () => {
      dead = true;
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('load', idle);
      api.current = null;
    };
  }, [sheet, ratio]);

  // La animación sigue a `compact` (misma fuente de verdad que el ancho del header).
  const first = useRef(true);
  useEffect(() => {
    compactRef.current = compact;
    if (first.current) {
      first.current = false;
      return;
    }
    api.current?.setTarget(compact);
  }, [compact]);

  const useCanvas = !!sheet && !failed && canvasOn;

  return (
    <Link
      href="/"
      aria-label="tinto — inicio"
      style={{
        position: 'relative',
        display: 'block',
        flex: 'none',
        width: SLOT_W,
        aspectRatio: String(ratio),
        overflow: 'hidden',
      }}
    >
      <Image
        src="/images/tinto-logo.png"
        alt="tinto"
        width={793}
        height={228}
        sizes="96px"
        priority
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          display: 'block',
          transform: 'scale(1)',
          transformOrigin: 'left center',
          transition: `${FADE}, transform .6s cubic-bezier(.2,.8,.2,1)`,
          opacity: useCanvas ? 0 : 1,
        }}
      />
      {sheet && !failed && (
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            display: 'block',
            transition: FADE,
            opacity: useCanvas ? 1 : 0,
          }}
        />
      )}
    </Link>
  );
}
