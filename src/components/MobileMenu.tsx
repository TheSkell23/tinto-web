'use client';

import Link from 'next/link';
import { useEffect, useRef, type MouseEvent, type RefObject } from 'react';
import { navGroups, type NavLink } from '@/content/site';
import { goHref } from '@/lib/scroll';

const FOCUSABLE = 'a[href],button:not([disabled])';

/**
 * Menú móvil (hamburguesa) con el mismo estilo de vidrio.
 * Foco atrapado; cierra con Esc, clic fuera o al navegar. Se renderiza como hermano del <header>
 * (el header tiene backdrop-filter y crearía un containing block para elementos fixed hijos).
 */
export function MobileMenu({
  open,
  onClose,
  burgerRef,
  onNavigate,
}: {
  open: boolean;
  onClose: () => void;
  burgerRef: RefObject<HTMLButtonElement | null>;
  onNavigate: (e: MouseEvent<HTMLAnchorElement>, l: Pick<NavLink, 'page' | 'find'>) => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const wasOpen = useRef(false);

  useEffect(() => {
    if (!open) {
      if (wasOpen.current) burgerRef.current?.focus();
      wasOpen.current = false;
      return;
    }
    wasOpen.current = true;
    const panel = panelRef.current;
    panel?.querySelector<HTMLElement>(FOCUSABLE)?.focus();
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';

    const key = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !panel) return;
      // el ciclo de foco incluye el botón de la hamburguesa + los enlaces del panel
      const items = [
        burgerRef.current,
        ...Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)),
      ].filter((x): x is HTMLElement => !!x);
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      } else if (!items.includes(active as HTMLElement)) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', key);
    return () => {
      document.removeEventListener('keydown', key);
      document.documentElement.style.overflow = prev;
    };
  }, [open, onClose, burgerRef]);

  return (
    <div
      id="mobile-menu"
      className="min-[900px]:hidden"
      aria-hidden={!open}
      inert={!open}
      style={{ position: 'fixed', inset: 0, zIndex: 49, pointerEvents: open ? 'auto' : 'none' }}
    >
      <div
        onClick={onClose}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(42,29,18,.18)',
          opacity: open ? 1 : 0,
          transition: 'opacity .3s ease',
        }}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menú"
        style={{
          position: 'absolute',
          top: 70,
          left: 12,
          right: 12,
          maxHeight: 'calc(100dvh - 84px)',
          overflowY: 'auto',
          padding: 10,
          borderRadius: 26,
          background: 'linear-gradient(135deg,rgba(255,255,255,.98),rgba(255,247,238,.97))',
          backdropFilter: 'blur(14px) saturate(1.6)',
          WebkitBackdropFilter: 'blur(14px) saturate(1.6)',
          border: '1px solid rgba(255,255,255,.8)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,.9),0 18px 40px rgba(80,50,20,.22)',
          opacity: open ? 1 : 0,
          transform: open ? 'translateY(0)' : 'translateY(-10px)',
          transition: 'opacity .25s ease,transform .35s cubic-bezier(.2,.8,.2,1)',
        }}
      >
        {navGroups.map((g) => (
          <div key={g.label} style={{ padding: '6px 0' }}>
            <div
              style={{
                padding: '6px 14px',
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '.12em',
                textTransform: 'uppercase',
                color: '#8a5a1f',
              }}
            >
              {g.label}
            </div>
            {g.links.map((l) => (
              <Link
                key={l.label}
                href={goHref(l)}
                className="hdr-sub"
                onClick={(e) => onNavigate(e, l)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                  padding: '10px 14px',
                  borderRadius: 15,
                }}
              >
                <span style={{ fontSize: 15, fontWeight: 600 }}>{l.label}</span>
                <span style={{ fontSize: 13, fontWeight: 500, color: '#7a6a58' }}>{l.sub}</span>
              </Link>
            ))}
          </div>
        ))}
        <Link
          href="/agendar"
          onClick={onClose}
          className="btn btn-primary"
          style={{ margin: '8px 4px 4px', fontSize: 15, padding: '14px 24px', display: 'flex' }}
        >
          ¿Agendamos un tinto?
        </Link>
      </div>
    </div>
  );
}
