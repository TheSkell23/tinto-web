# Movimiento de Tinto

Se conserva y amplía el sistema existente (Reveal, variantes de entrada, logo, contadores, gráficas, mensajes de chat, FAQ y transición de páginas). No se añaden librerías.

- Momento principal: la portada presenta su mensaje y las oportunidades aparecen de forma secuencial, como el flujo de captación, calificación y organización.
- Continuidad: imágenes que se descubren, tarjetas con desfase corto, navegación fundida y FAQ con apertura progresiva.
- Respuesta: selección de filtros/días/horas, foco de campos, botones presionados, carga de formularios y confirmación de éxito.
- Presupuesto: solo transformaciones, opacidad y recorte breve en imágenes; los bucles se pausan fuera del viewport y al ocultar la pestaña. El zoom continuo del hero se desactiva en móvil. No se usa animación para desplazar layout ni se obliga a esperar antes de usar controles.
- Accesibilidad: con prefers-reduced-motion se mantiene el contenido y las selecciones estáticos. Los contadores se detienen y restauran su cifra al cambiar esta preferencia mientras están animándose. Los efectos hover se limitan a dispositivos con puntero apropiado.
- Fuentes de verdad: motion.css y MotionEnhancements.tsx complementan MotionController.tsx; no sustituyen el sistema que garantiza que el contenido nunca dependa de JavaScript para ser visible.

Para ver movimiento: recargar el sitio con la opción de reducir movimiento desactivada y recorrer las páginas. Los estados offline/404 y los formularios continúan funcionando.
