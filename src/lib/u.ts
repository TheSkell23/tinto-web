/**
 * Unidad fluida del diseño. En escritorio 1u = 1cqw (igual que el diseño original);
 * en móvil/tablet --u pasa a una unidad basada en px para que el texto sea legible.
 * u(2.2, 1.4) -> "calc(2.2 * var(--u)) calc(1.4 * var(--u))". Los strings pasan tal cual.
 */
export const u = (...v: Array<number | string>): string =>
  v.map((x) => (typeof x === 'number' ? (x === 0 ? '0' : `calc(${x} * var(--u))`) : x)).join(' ');

/** Variable --k para títulos grandes con la clase .fz (usa --ud en móvil, ver globals.css). */
export const k = (n: number): Record<string, number> => ({ '--k': n });

/** Suelo de lectura móvil. Sin variables móviles conserva exactamente el cálculo de escritorio. */
export const textSize = (n: number): string =>
  `max(var(${n >= 1 ? '--mobile-body-min' : '--mobile-label-min'}, 0px), ${u(n)})`;

/** Los campos conservan su tamaño de escritorio y alcanzan 16 px en móviles. */
export const fieldSize = (n: number): string => `max(var(--mobile-input-min, 0px), ${textSize(n)})`;
