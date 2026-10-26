export const GO_OFFSET = 140;

export const goHref = (l: { page: string; find: string }) =>
  l.page + (l.find ? '?go=' + encodeURIComponent(l.find) : '');

/** Suma el translateY de los ancestros `.rv` aún sin revelar, para medir la posición final del título. */
function pendingShift(el: Element): number {
  let shift = 0;
  for (let n: Element | null = el; n; n = n.parentElement) {
    if (!n.classList?.contains('rv') || n.classList.contains('rv-in')) continue;
    const m = new DOMMatrixReadOnly(getComputedStyle(n).transform);
    shift += m.m42;
  }
  return shift;
}

export function findHeading(find: string): HTMLElement | undefined {
  const needle = find.trim();
  return Array.from(document.querySelectorAll<HTMLElement>('h1,h2,h3')).find((h) =>
    (h.textContent ?? '').trim().startsWith(needle),
  );
}

/** Scroll a la sección cuyo título empieza por `find` (offset 140px). Sin `find`, al inicio de la página. */
export function scrollToSection(find: string, smooth: boolean): boolean {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const behavior: ScrollBehavior = smooth && !reduce ? 'smooth' : 'auto';
  if (!find) {
    window.scrollTo({ top: 0, behavior });
    return true;
  }
  const h = findHeading(find);
  if (!h) return false;
  const header = document.querySelector('header');
  const offset = window.matchMedia('(max-width: 899px)').matches && header
    ? Math.ceil(header.getBoundingClientRect().bottom) + 16
    : GO_OFFSET;
  const top = h.getBoundingClientRect().top - pendingShift(h) + window.scrollY - offset;
  window.scrollTo({ top: Math.max(0, top), behavior });
  return true;
}
