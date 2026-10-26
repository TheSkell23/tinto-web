import type { ReactNode } from 'react';

export function MobileScroll({ label, children }: { label: string; children: ReactNode }) {
  return <div className="mobile-scroll" data-mobile-scroll="" role="region" aria-label={label} tabIndex={0}>{children}</div>;
}
