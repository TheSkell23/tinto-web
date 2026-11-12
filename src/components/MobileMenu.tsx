'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icon } from '@/components/Icons';
import styles from './MobileMenu.module.css';
import { useEffect, useRef, type MouseEvent, type RefObject } from 'react';
import { navGroups, site, type NavLink } from '@/content/site';
import { goHref } from '@/lib/scroll';

const FOCUSABLE = 'a[href],button:not([disabled])';
const linkIcons: Record<string, readonly string[]> = {
  '/producto': ['grid', 'dollar', 'bars'],
  '/soluciones': ['user', 'target', 'columns'],
  '/nosotros': ['user', 'heart', 'chat'],
  '/dudas': ['chat', 'search', 'headset'],
  '/contacto': ['mail', 'phone', 'calendar'],
};

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
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);
  const wasOpen = useRef(false);

  useEffect(() => {
    if (!open) {
      if (wasOpen.current) burgerRef.current?.focus({ preventScroll: true });
      wasOpen.current = false;
      return;
    }
    wasOpen.current = true;
    const panel = panelRef.current;
    panel?.querySelector<HTMLElement>(FOCUSABLE)?.focus({ preventScroll: true });
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
    // Si la ventana pasa a ancho de escritorio con el menú abierto, se cierra (y se libera el scroll).
    const desktop = window.matchMedia('(min-width: 900px)');
    const onDesktop = () => desktop.matches && onClose();
    desktop.addEventListener('change', onDesktop);
    return () => {
      document.removeEventListener('keydown', key);
      desktop.removeEventListener('change', onDesktop);
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
          touchAction: 'none',
        }}
      />
      <div
        ref={panelRef}
        className={styles.panel}
        role="dialog"
        aria-modal="true"
        aria-label="Menú"
        style={{
          position: 'absolute',
          top: 'var(--mobile-menu-top, 70px)',
          left: 'var(--mobile-menu-side, 12px)',
          right: 'var(--mobile-menu-side, 12px)',
          maxHeight: 'var(--mobile-menu-height, calc(100dvh - 84px))',
          overflowY: 'auto',
          overscrollBehavior: 'contain',
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
        <div className={styles.groups}>
          {navGroups.map((g) => (
            <div key={g.label} className={styles.group} data-current={pathname === g.page}>
              <div className={styles.heading}>
                <span className={styles.dot} aria-hidden="true" />
                {g.label}
              </div>
              <div className={styles.links}>
                {g.links.map((l, index) => (
                  <Link
                    key={l.label}
                    href={goHref(l)}
                    className={styles.link}
                    onClick={(e) => onNavigate(e, l)}
                  >
                    <span className={styles.icon} aria-hidden="true">
                      <Icon name={linkIcons[g.page]?.[index] ?? 'grid'} size={20} stroke={1.8} />
                    </span>
                    <span className={styles.copy}>
                      <span className={styles.label}>{l.label}</span>
                      <span className={styles.description}>{l.sub}</span>
                    </span>
                    <span className={styles.arrow} aria-hidden="true">
                      <Icon name="arrow" size={17} stroke={2} />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className={styles.footer}>
          <a
            href={site.loginUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="btn"
            style={{ display: 'flex', justifyContent: 'center', width: '100%', minHeight: 44, marginBottom: 10 }}
          >
            Ingresar
          </a>
          <Link href="/agendar" onClick={onClose} className={`btn btn-primary ${styles.cta}`}>
            ¿Agendamos un tinto?
            <Icon name="arrow" size={19} stroke={2.2} />
          </Link>
        </div>
      </div>
    </div>
  );
}
