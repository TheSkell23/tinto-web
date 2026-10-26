'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState, type MouseEvent } from 'react';
import { navGroups, type NavLink } from '@/content/site';
import { goHref, scrollToSection } from '@/lib/scroll';
import { HeaderLogo, type LogoSheet } from './HeaderLogo';
import { Icon } from './Icons';
import { MobileMenu } from './MobileMenu';

const HYST = 24;

/**
 * Header flotante de vidrio. Vive FUERA de cualquier elemento con container-type
 * (si no, position:fixed se rompería). Se dimensiona en px/min(), como el original.
 * `compact` es la única fuente de verdad: controla el ancho, la barra de 4 campos y la animación del logo.
 */
export function Header({ logoSheet }: { logoSheet: LogoSheet | null }) {
  const pathname = usePathname();
  const [compact, setCompact] = useState(false);
  const [open, setOpen] = useState(-1);
  const [menu, setMenu] = useState(false);
  const rootRef = useRef<HTMLElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const f = (init = false) => {
      const th = window.innerHeight * 0.5;
      const y = window.scrollY;
      // histéresis de ±24px alrededor del umbral del diseño (scrollY > innerHeight*0.5)
      setCompact((prev) => (init ? y > th : prev ? y >= th - HYST : y > th + HYST));
    };
    f(true);
    const on = () => f();
    window.addEventListener('scroll', on, { passive: true });
    window.addEventListener('resize', on);
    return () => {
      window.removeEventListener('scroll', on);
      window.removeEventListener('resize', on);
    };
  }, []);

  // cerrar paneles al navegar
  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setOpen(-1);
    setMenu(false);
  }

  // clic fuera / Esc cierran el panel desplegable
  useEffect(() => {
    if (open < 0) return;
    const down = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(-1);
    };
    const key = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(-1);
    };
    document.addEventListener('pointerdown', down);
    document.addEventListener('keydown', key);
    return () => {
      document.removeEventListener('pointerdown', down);
      document.removeEventListener('keydown', key);
    };
  }, [open]);

  const onNavigate = useCallback(
    (e: MouseEvent<HTMLAnchorElement>, l: Pick<NavLink, 'page' | 'find'>) => {
      setOpen(-1);
      setMenu(false);
      if (l.page === pathname) {
        e.preventDefault();
        scrollToSection(l.find, true);
      }
    },
    [pathname],
  );

  const showNav = true; // el header solo se encoge; el contenido no cambia

  return (
    <>
      <header ref={rootRef} className="hdr" data-compact={compact} data-testid="header">
        <HeaderLogo compact={compact} sheet={logoSheet} />

        <div className="hdr-center">
          <nav
            aria-label="Principal"
            inert={!showNav}
            className="hdr-sw"
            style={{
              gridArea: '1/1',
              display: 'flex',
              fontSize: 14,
              whiteSpace: 'nowrap',
              fontWeight: 500,
              opacity: showNav ? 1 : 0,
              transform: showNav ? 'translateY(0)' : 'translateY(-8px)',
            }}
          >
            {navGroups.map((g, i) => {
              const isOpen = open === i && showNav;
              return (
                <div
                  key={g.label}
                  style={{ position: 'relative' }}
                  onMouseEnter={() => setOpen(i)}
                  onMouseLeave={() => setOpen(-1)}
                >
                  <div
                    className="hdr-link"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      borderRadius: 999,
                      fontSize: 14,
                      fontWeight: 500,
                      background: isOpen ? 'rgba(255,255,255,.55)' : 'transparent',
                      transition: 'background .25s ease',
                    }}
                  >
                    <Link
                      href={g.page}
                      onClick={(e) => onNavigate(e, { page: g.page, find: '' })}
                      style={{ padding: '8px 2px 8px 10px', borderRadius: '999px 0 0 999px' }}
                    >
                      {g.label}
                    </Link>
                    <button
                      type="button"
                      aria-label={'Abrir opciones de ' + g.label}
                      aria-expanded={isOpen}
                      aria-haspopup="true"
                      aria-controls={'hdr-panel-' + i}
                      onClick={() => setOpen(isOpen ? -1 : i)}
                      style={{
                        display: 'grid',
                        placeItems: 'center',
                        padding: '8px 10px 8px 6px',
                        border: 0,
                        background: 'none',
                        cursor: 'pointer',
                        borderRadius: '0 999px 999px 0',
                      }}
                    >
                      <Icon
                        name="chevron"
                        size={11}
                        stroke={2.4}
                        style={{
                          transition: 'transform .3s ease',
                          transform: 'rotate(' + (isOpen ? 180 : 0) + 'deg)',
                        }}
                      />
                    </button>
                  </div>
                  <div
                    id={`hdr-panel-${i}`}
                    style={{
                      position: 'absolute',
                      top: '100%',
                      left: '50%',
                      paddingTop: 14,
                      opacity: isOpen ? 1 : 0,
                      visibility: isOpen ? 'visible' : 'hidden',
                      transform: `translate(-50%,${isOpen ? '0' : '-8px'})`,
                      transition: `opacity .25s ease,transform .35s cubic-bezier(.2,.8,.2,1),visibility 0s linear ${isOpen ? '0s' : '.35s'}`,
                    }}
                  >
                    <div
                      style={{
                        minWidth: 250,
                        padding: 8,
                        borderRadius: 22,
                        background:
                          'linear-gradient(135deg,rgba(255,255,255,.88),rgba(255,244,230,.78))',
                        backdropFilter: 'blur(14px) saturate(1.6)',
                        WebkitBackdropFilter: 'blur(14px) saturate(1.6)',
                        border: '1px solid rgba(255,255,255,.8)',
                        boxShadow:
                          'inset 0 1px 0 rgba(255,255,255,.9),0 18px 40px rgba(80,50,20,.22)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                      }}
                    >
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
                            whiteSpace: 'nowrap',
                          }}
                        >
                          <span style={{ fontSize: 14, fontWeight: 600 }}>{l.label}</span>
                          <span style={{ fontSize: 12, fontWeight: 500, color: '#7a6a58' }}>
                            {l.sub}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </nav>
        </div>

        <div style={{ flex: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
          <div className="hdr-cta-wrap">
            <Link
              href="/agendar"
              inert={!showNav}
              className="hdr-sw hdr-cta"
              style={{
                gridArea: '1/1',
                background: 'linear-gradient(135deg,#ff8a3d,#ff9d86)',
                color: '#fff',
                padding: '10px 18px',
                borderRadius: 999,
                fontSize: 13.5,
                fontWeight: 600,
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,.55),0 6px 14px rgba(232,120,42,.35)',
                whiteSpace: 'nowrap',
                opacity: showNav ? 1 : 0,
                pointerEvents: showNav ? 'auto' : 'none',
              }}
            >
              ¿Agendamos un tinto?
            </Link>
          </div>
          <button
            ref={burgerRef}
            type="button"
            className="hdr-burger"
            aria-label={menu ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menu}
            aria-controls="mobile-menu"
            onClick={() => setMenu((m) => !m)}
            style={{
              width: 42,
              height: 42,
              borderRadius: 999,
              placeItems: 'center',
              cursor: 'pointer',
              background: 'linear-gradient(180deg,rgba(255,255,255,.95),rgba(246,232,214,.85))',
              border: '1px solid rgba(138,90,31,.22)',
              boxShadow: 'inset 0 1px 0 #fff,0 6px 14px rgba(80,50,20,.12)',
            }}
          >
            <Icon name={menu ? 'close' : 'menu'} size={20} />
          </button>
        </div>
      </header>

      <MobileMenu
        open={menu}
        onClose={() => setMenu(false)}
        burgerRef={burgerRef}
        onNavigate={onNavigate}
      />
    </>
  );
}
