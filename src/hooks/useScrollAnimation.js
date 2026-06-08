import { useEffect, useRef } from 'react';

/**
 * Hook que detecta cuando un elemento entra en el viewport y aplica clases de animación.
 * @param {string} hiddenClass - clase inicial (oculto)
 * @param {string} showClass - clase cuando es visible
 * @param {object} options - opciones para IntersectionObserver (threshold, rootMargin)
 * @returns {React.RefObject} ref a enlazar al elemento contenedor
 */
export function useScrollAnimation(hiddenClass = 'hidden', showClass = 'show', options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(showClass);
          entry.target.classList.remove(hiddenClass);
        } else {
          // Si se quiere que la animación se repita al salir, descomentar:
          // entry.target.classList.remove(showClass);
          // entry.target.classList.add(hiddenClass);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
      ...options,
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [hiddenClass, showClass, options]);

  return ref;
}