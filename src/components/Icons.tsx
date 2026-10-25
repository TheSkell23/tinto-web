import type { CSSProperties, ReactNode } from 'react';

/** Íconos de línea (2px redondeados). Todos usan currentColor salvo que se indique `stroke`. */
const P: Record<string, ReactNode> = {
  chat: <path d="M21 12a8 8 0 01-11.5 7.2L4 21l1.8-5.5A8 8 0 1121 12z" />,
  chat2: <path d="M4 20l1.5-4.5A8 8 0 1112 20a8 8 0 01-3.5-.8z" />,
  shield: (
    <>
      <path d="M12 3l8 3v6c0 4.5-3.2 8-8 9-4.8-1-8-4.5-8-9V6l8-3z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  columns: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="3" />
      <path d="M3 10h18M9 4v16" />
    </>
  ),
  bars: <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />,
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="3" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </>
  ),
  table: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="3" />
      <path d="M3 10h18M3 15h18M9 4v16" />
    </>
  ),
  code: <path d="M8 8l-4 4 4 4M16 8l4 4-4 4M14 5l-4 14" />,
  headset: (
    <>
      <path d="M4 14v-2a8 8 0 0116 0v2" />
      <rect x="3" y="14" width="4" height="6" rx="1.5" />
      <rect x="17" y="14" width="4" height="6" rx="1.5" />
    </>
  ),
  heart: <path d="M12 20s-7-4.4-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.6-7 10-7 10z" />,
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="M3 8l9 6 9-6" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s7-6 7-11a7 7 0 10-14 0c0 5 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  phone: (
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" />
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  video: (
    <>
      <path d="M15 10l5-3v10l-5-3z" />
      <rect x="3" y="6" width="12" height="12" rx="3" />
    </>
  ),
  /* header: reemplazo de ◎ ▦ ✉ $ ⌄ */
  target: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
    </>
  ),
  grid: (
    <>
      <rect x="3" y="3" width="8" height="8" rx="2" />
      <rect x="13" y="3" width="8" height="8" rx="2" />
      <rect x="3" y="13" width="8" height="8" rx="2" />
      <rect x="13" y="13" width="8" height="8" rx="2" />
    </>
  ),
  dollar: (
    <path d="M12 3v18M16.5 7.5C16 6 14.3 5 12 5c-2.5 0-4.2 1.200-4.200 3 0 4.200 8.400 2.200 8.400 6.500 0 1.800-1.800 3-4.200 3-2.400 0-4.200-1-4.700-2.700" />
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c1-4 4-6 8-6s7 2 8 6" />
    </>
  ),
  folder: <path d="M3 7a2 2 0 0 1 2-2h4l2 3h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />,
  sun: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="6" />
      <path d="M20 20l-4-4" />
    </>
  ),
  bell: <path d="M6 17V11a6 6 0 0 1 12 0v6l2 2H4zM10 21h4" />,
  pause: (
    <>
      <rect x="6" y="5" width="4" height="14" rx="1.5" />
      <rect x="14" y="5" width="4" height="14" rx="1.5" />
    </>
  ),
  hand: (
    <path d="M8 13V6a1.5 1.5 0 0 1 3 0v5M11 11V4.5a1.5 1.5 0 0 1 3 0V11M14 11V6a1.5 1.5 0 0 1 3 0v7c0 4-2 7-6 7-3 0-4-2-6-5l-1-2a1.5 1.5 0 0 1 2.500-1.500L8 13" />
  ),
  chevron: <path d="M6 9l6 6 6-6" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  check: <path d="M5 12.5l4.500 4.500L19 7.500" />,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  plus: <path d="M12 5v14M5 12h14" />,
};

export function Icon({
  name,
  size,
  stroke = 2,
  style,
  className,
}: {
  name: keyof typeof P | string;
  size?: string | number;
  stroke?: number;
  style?: CSSProperties;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
      style={{ width: size, height: size, display: 'block', flex: 'none', ...style }}
    >
      {P[name]}
    </svg>
  );
}
