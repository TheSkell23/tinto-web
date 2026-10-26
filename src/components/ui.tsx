import Link from 'next/link';
import type { CSSProperties, MouseEventHandler, ReactNode } from 'react';
import { textSize, k, u } from '@/lib/u';

/* ---------- Reveal: fade + translateY al hacer scroll (lo activa MotionController) ---------- */
export function Reveal({
  children,
  className = '',
  style,
  delay,
  fill,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  delay?: number;
  fill?: boolean;
}) {
  return (
    <div
      className={`rv${fill ? ' rv-fill' : ''}${className ? ' ' + className : ''}`}
      style={delay ? ({ ...style, '--rv-d': `${delay}ms` } as CSSProperties) : style}
    >
      {children}
    </div>
  );
}

/* ---------- Título fantasma (decorativo, aria-hidden) ---------- */
export function GhostTitle({
  children,
  size = 5.4,
  top = -3.6,
  align = 'center',
  style,
}: {
  children: ReactNode;
  size?: number;
  top?: number | string;
  align?: 'center' | 'left';
  style?: CSSProperties;
}) {
  return (
    <span
      aria-hidden="true"
      data-ghost=""
      className="ghost"
      style={
        {
          ...k(size),
          top: typeof top === 'number' ? u(top) : top,
          ...(align === 'center' ? { left: '50%', transform: 'translateX(-50%)' } : { left: 0 }),
          ...style,
        } as CSSProperties
      }
    >
      {children}
    </span>
  );
}

/* ---------- Título de sección con fantasma ---------- */
export function SectionTitle({
  ghost,
  title,
  sub,
  variant = 'a',
  ghostSize,
  ghostTop,
  align = 'center',
  as: As = 'h2',
  maxWidth,
  style,
}: {
  ghost: string;
  title: ReactNode;
  sub?: ReactNode;
  variant?: 'a' | 'b';
  ghostSize?: number;
  ghostTop?: number;
  align?: 'center' | 'left';
  as?: 'h2' | 'h3';
  maxWidth?: number;
  style?: CSSProperties;
}) {
  const a = variant === 'a';
  const center = align === 'center';
  return (
    <Reveal
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        gap: u(a ? 0.8 : 1.4),
        alignItems: center ? 'center' : 'flex-start',
        textAlign: center ? 'center' : 'left',
        ...(a && center ? { margin: `0 auto ${u(3.8)}`, maxWidth: u(48) } : {}),
        ...(a && !center ? { marginBottom: u(3) } : {}),
        ...style,
      }}
    >
      <GhostTitle
        size={ghostSize ?? (a ? 5.4 : 9)}
        top={ghostTop ?? (a ? -3.6 : -6.3)}
        align={align}
      >
        {ghost}
      </GhostTitle>
      <As
        className="fz"
        style={
          {
            ...k(a ? 3.4 : 3.6),
            position: 'relative',
            zIndex: 1,
            margin: 0,
            lineHeight: 1.06,
            fontWeight: a ? 800 : 600,
            letterSpacing: a ? '-.035em' : '-.025em',
            textWrap: 'balance',
            maxWidth: maxWidth ? u(maxWidth) : a ? undefined : u(54),
          } as CSSProperties
        }
      >
        {title}
      </As>
      {sub && (
        <p
          style={{
            margin: 0,
            fontSize: textSize(1.2),
            lineHeight: 1.5,
            color: '#7a6a58',
            maxWidth: a ? undefined : u(42),
            position: 'relative',
            zIndex: 1,
          }}
        >
          {sub}
        </p>
      )}
    </Reveal>
  );
}

export const Accent = ({ children }: { children: ReactNode }) => (
  <span style={{ color: '#e8782a' }}>{children}</span>
);

/* ---------- Tarjeta crema ---------- */
export function CreamCard({
  children,
  soft,
  lift,
  href,
  style,
  className = '',
  reveal = true,
  delay,
}: {
  children: ReactNode;
  soft?: boolean;
  lift?: boolean;
  href?: string;
  style?: CSSProperties;
  className?: string;
  reveal?: boolean;
  delay?: number;
}) {
  const cls = `cream${soft ? ' soft' : ''}${lift ? ' lift' : ''}${className ? ' ' + className : ''}`;
  const inner = href ? (
    <Link href={href} className={cls} style={{ color: 'inherit', ...style }}>
      {children}
    </Link>
  ) : (
    <div className={cls} style={style}>
      {children}
    </div>
  );
  return reveal ? (
    <Reveal fill delay={delay}>
      {inner}
    </Reveal>
  ) : (
    inner
  );
}

/* ---------- Botón ---------- */
export function Button({
  href,
  children,
  variant = 'primary',
  strong,
  lift,
  className = '',
  style,
  type,
  onClick,
  disabled,
}: {
  href?: string;
  children: ReactNode;
  variant?: 'primary' | 'dark' | 'glass' | 'link';
  strong?: boolean;
  lift?: boolean;
  className?: string;
  style?: CSSProperties;
  type?: 'button' | 'submit';
  onClick?: MouseEventHandler<HTMLElement>;
  disabled?: boolean;
}) {
  const base =
    variant === 'link'
      ? `link-ink ${className}`
      : `btn btn-primary${variant === 'dark' ? ' btn-dark' : ''}${variant === 'glass' ? ' btn-glass' : ''}${strong ? ' btn-strong' : ''}${lift ? ' btn-lift' : ''} ${className}`;
  const st: CSSProperties =
    variant === 'dark' || variant === 'glass'
      ? { fontWeight: 600, fontSize: textSize(1.1), padding: u(1.1, 2.4), ...style }
      : (style ?? {});
  if (href) {
    return (
      <Link
        href={href}
        className={base}
        style={st}
        onClick={onClick as MouseEventHandler<HTMLAnchorElement>}
      >
        {children}
      </Link>
    );
  }
  return (
    <button
      type={type ?? 'button'}
      className={base}
      style={st}
      onClick={onClick as MouseEventHandler<HTMLButtonElement>}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

/* ---------- Chip de vidrio (sobre fotos y maquetas) ---------- */
export function GlassChip({
  children,
  style,
  className = '',
}: {
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
}) {
  return (
    <div className={`glass ${className}`} style={style}>
      {children}
    </div>
  );
}

/* ---------- Tarjeta de cierre ---------- */
export function ClosingCard({
  title,
  accent,
  text,
  cta = '¿Agendamos un tinto?',
  href = '/agendar',
  rows,
}: {
  title: ReactNode;
  accent?: ReactNode;
  text?: ReactNode;
  cta?: string;
  href?: string;
  rows?: boolean;
}) {
  return (
    <Reveal
      style={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: u(3),
        padding: u(4.4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: u(1.4),
        textAlign: 'center',
        marginBottom: rows ? 0 : u(8),
        background:
          'radial-gradient(55% 90% at 8% 15%,rgba(249,201,160,.75),transparent 70%),radial-gradient(45% 80% at 95% 90%,rgba(255,157,134,.5),transparent 70%),linear-gradient(135deg,#fff4e6,#ffe8d2)',
        border: '1px solid rgba(255,255,255,.9)',
        boxShadow: `0 ${u(1.4)} ${u(3.4)} rgba(240,150,80,.22),inset 0 1px 0 #fff`,
      }}
    >
      <h2
        className="fz"
        style={
          {
            ...k(3.4),
            margin: 0,
            lineHeight: 1.06,
            fontWeight: 800,
            letterSpacing: '-.035em',
            maxWidth: u(40),
            textWrap: 'balance',
          } as CSSProperties
        }
      >
        {title} {accent && <Accent>{accent}</Accent>}
      </h2>
      {text && (
        <p
          style={{
            margin: 0,
            fontSize: textSize(1.2),
            color: '#7a6a58',
            maxWidth: u(34),
            lineHeight: 1.5,
          }}
        >
          {text}
        </p>
      )}
      <Button href={href} style={{ marginTop: u(0.6) }}>
        {cta}
      </Button>
    </Reveal>
  );
}

/** Banda blanca con la tarjeta de cierre (como en Producto, Soluciones y Nosotros). */
export function ClosingBand(props: Parameters<typeof ClosingCard>[0]) {
  return (
    <div
      className="cq cq-pad"
      style={{ background: '#fff', color: '#2a1d12', padding: `${u(6)} ${u(6)} 0` }}
    >
      <ClosingCard {...props} />
    </div>
  );
}
