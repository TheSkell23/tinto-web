'use client';

import Link from 'next/link';
import { useEffect, useRef, useSyncExternalStore } from 'react';

function subscribe(callback: () => void) {
  window.addEventListener('online', callback);
  window.addEventListener('offline', callback);
  return () => {
    window.removeEventListener('online', callback);
    window.removeEventListener('offline', callback);
  };
}
const isOnline = () => navigator.onLine;
const serverOnline = () => true;

/** Respaldo offline únicamente: no guarda páginas, formularios ni respuestas del API. */
export function OfflineSupport() {
  const online = useSyncExternalStore(subscribe, isOnline, serverOnline);
  const retry = useRef<HTMLButtonElement>(null);
  const home = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (online) return;
    const previousFocus =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const background = Array.from(
      document.querySelectorAll<HTMLElement>('header, main, footer, .skip-link, #mobile-menu'),
    );
    const previousInert = background.map((node) => node.inert);
    background.forEach((node) => {
      node.inert = true;
    });
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    retry.current?.focus({ preventScroll: true });
    const trap = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;
      event.preventDefault();
      if (document.activeElement === retry.current) home.current?.focus();
      else retry.current?.focus();
    };
    document.addEventListener('keydown', trap);
    return () => {
      background.forEach((node, index) => {
        node.inert = previousInert[index];
      });
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', trap);
      previousFocus?.focus({ preventScroll: true });
    };
  }, [online]);

  return (
    <>
      {!online && (
        <section
          className="connection-page is-offline offline-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="offline-title"
        >
          <div className="connection-content">
            <svg
              className="connection-symbol"
              viewBox="0 0 80 80"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M14 28c14-13 38-13 52 0M25 40c8-7 22-7 30 0M36 52c3-2 5-2 8 0M10 10l60 60" />
              <circle cx="40" cy="64" r="2" fill="currentColor" stroke="none" />
            </svg>
            <h1 className="connection-title" id="offline-title">
              Nos quedamos sin conexión.
            </h1>
            <p className="connection-text">
              El tinto puede esperar. Revisa tu conexión y vuelve a intentarlo.
            </p>
            <div className="connection-actions">
              <button
                ref={retry}
                className="connection-action"
                type="button"
                onClick={() => window.location.reload()}
              >
                Volver a intentar
              </button>
              <Link
                ref={home}
                href="/"
                prefetch={false}
                onClick={(event) => {
                  event.preventDefault();
                  // Navegaci?n HTML completa: el respaldo offline no es una respuesta RSC.
                  // eslint-disable-next-line @next/next/no-location-assign-relative-destination
                  window.location.assign('/');
                }}
                className="connection-action secondary"
              >
                Ir al inicio
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
