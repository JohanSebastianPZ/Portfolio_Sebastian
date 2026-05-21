import { useEffect, useRef } from 'react';

export function useScrollAnimation(deps: unknown[] = []) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll<HTMLElement>('.fade-in-up').forEach((el, index) => {
              // CSS transition-delay replaces setTimeout — no timers, no queued callbacks
              el.style.transitionDelay = `${index * 0.15}s`;
              el.classList.add('visible');
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return sectionRef;
}
