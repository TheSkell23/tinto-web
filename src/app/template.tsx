import type { ReactNode } from 'react';

/** Se vuelve a montar en cada cambio de ruta: da el fundido de entrada entre páginas. */
export default function Template({ children }: { children: ReactNode }) {
  return <div className="page-in">{children}</div>;
}
