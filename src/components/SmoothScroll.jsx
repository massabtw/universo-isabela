import { useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

export default function SmoothScroll() {
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let lenis;
    const configure = () => {
      lenis?.destroy();
      lenis = preference.matches ? null : new Lenis({
        autoRaf: true,
        lerp: 0.075,
        smoothWheel: true,
        anchors: true,
        allowNestedScroll: true,
        prevent: node => node.closest?.('[role="dialog"], [data-lenis-prevent]'),
      });
      window.lenisInstance = lenis;
    };
    configure();
    preference.addEventListener('change', configure);
    return () => {
      preference.removeEventListener('change', configure);
      window.lenisInstance = null;
      lenis?.destroy();
    };
  }, []);
  return null;
}
