/** Textos de las páginas de estado: 404 (no existe) y sin conexión. */
export const notFoundPage = {
  ghost: 'Error 404',
  title: 'Esta página no está',
  accent: 'por aquí.',
  text: 'Puede que el enlace esté roto o que la página se haya movido. Volvamos a un lugar seguro.',
  primary: { label: 'Volver al inicio', href: '/' },
  secondary: { label: 'Ver el producto →', href: '/producto' },
};

export const offlinePage = {
  ghost: 'Sin conexión',
  title: 'Parece que te quedaste',
  accent: 'sin internet.',
  text: 'Revisa tu conexión y vuelve a intentarlo. En cuanto regrese, esta página se actualiza sola.',
  retry: 'Reintentar',
  home: 'Ir al inicio',
};
