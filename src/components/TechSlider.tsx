import { useEffect, useRef } from 'react';

const AIChipIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" width="68" height="68">
    <title>IA & Prompting</title>
    <rect x="17" y="17" width="30" height="30" rx="5" fill="#6366f1" fillOpacity="0.85" />
    <rect x="23" y="23" width="18" height="18" rx="3" fill="#818cf8" fillOpacity="0.55" />
    <circle cx="32" cy="32" r="5" fill="#c4b5fd" />
    <line x1="24" y1="17" x2="24" y2="9"  stroke="#818cf8" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="32" y1="17" x2="32" y2="9"  stroke="#818cf8" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="40" y1="17" x2="40" y2="9"  stroke="#818cf8" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="24" y1="47" x2="24" y2="55" stroke="#818cf8" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="32" y1="47" x2="32" y2="55" stroke="#818cf8" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="40" y1="47" x2="40" y2="55" stroke="#818cf8" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="17" y1="24" x2="9"  y2="24" stroke="#818cf8" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="17" y1="32" x2="9"  y2="32" stroke="#818cf8" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="17" y1="40" x2="9"  y2="40" stroke="#818cf8" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="47" y1="24" x2="55" y2="24" stroke="#818cf8" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="47" y1="32" x2="55" y2="32" stroke="#818cf8" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="47" y1="40" x2="55" y2="40" stroke="#818cf8" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

const FallbackIcon = ({ name }: { name: string }) => (
  <div className="w-[68px] h-[68px] rounded-xl bg-slate-800/60 border border-slate-700/40 flex items-center justify-center">
    <span className="text-xs text-slate-400 font-medium text-center leading-tight px-1">{name}</span>
  </div>
);

const CDN = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons';

const TECH = [
  { name: 'React',          icon: `${CDN}/react/react-original.svg` },
  { name: 'TypeScript',     icon: `${CDN}/typescript/typescript-original.svg` },
  { name: 'JavaScript',     icon: `${CDN}/javascript/javascript-original.svg` },
  { name: 'Java',           icon: `${CDN}/java/java-original.svg` },
  { name: 'SQL',            icon: `${CDN}/postgresql/postgresql-original.svg` },
  { name: 'Linux',          icon: `${CDN}/linux/linux-original.svg` },
  { name: 'Docker',         icon: `${CDN}/docker/docker-original.svg` },
  { name: 'Git',            icon: `${CDN}/git/git-original.svg` },
  { name: 'IA & Prompting', icon: null },
];

const SPEED = 0.55;

// Triplicado para evitar huecos en pantallas anchas
const items = [...TECH, ...TECH, ...TECH];

const TechSlider = () => {
  const wrapperRef   = useRef<HTMLDivElement>(null);
  const trackRef     = useRef<HTMLDivElement>(null);
  const posRef       = useRef(0);
  const isPausedRef  = useRef(false);
  const isDragRef    = useRef(false);
  const lastXRef     = useRef(0);
  const rafRef       = useRef<number>(0);
  const halfWidthRef = useRef(0);
  const isVisibleRef = useRef(false);
  const readyRef     = useRef(false);

  useEffect(() => {
    const track   = trackRef.current;
    const wrapper = wrapperRef.current;
    if (!track || !wrapper) return;

    // Espera a que todas las imágenes carguen antes de calcular halfWidth
    const computeHalf = () => {
      halfWidthRef.current = track.scrollWidth / 3; // dividido entre 3 porque triplicamos
      readyRef.current = true;
    };

    const waitForImages = () => {
      const images = Array.from(track.querySelectorAll('img'));
      if (images.length === 0) { computeHalf(); return; }

      const promises = images.map(img =>
        img.complete
          ? Promise.resolve()
          : new Promise<void>(resolve => {
              img.onload  = () => resolve();
              img.onerror = () => resolve(); // resuelve igual si falla
            })
      );

      Promise.all(promises).then(computeHalf);
    };

    waitForImages();

    const ro = new ResizeObserver(() => {
      // Recalcula tras resize pero solo si ya estaba listo
      if (readyRef.current) computeHalf();
    });
    ro.observe(track);

    const io = new IntersectionObserver(
      ([entry]) => { isVisibleRef.current = entry.isIntersecting; },
      { threshold: 0 },
    );
    io.observe(wrapper);

    const animate = () => {
      if (readyRef.current && !isDragRef.current && !isPausedRef.current && isVisibleRef.current) {
        const half = halfWidthRef.current;
        if (half > 0) {
          posRef.current += SPEED;
          if (posRef.current >= half) posRef.current -= half;
        }
      }
      track.style.transform = `translateX(${-posRef.current}px)`;
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  const onMouseEnter = () => { isPausedRef.current = true; };
  const onMouseLeave = () => { isPausedRef.current = false; isDragRef.current = false; };

  const onMouseDown = (e: React.MouseEvent) => {
    isDragRef.current = true;
    lastXRef.current  = e.clientX;
    e.preventDefault();
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragRef.current) return;
    const delta = lastXRef.current - e.clientX;
    lastXRef.current = e.clientX;
    const half = halfWidthRef.current;
    if (half > 0) posRef.current = ((posRef.current + delta) % half + half) % half;
  };
  const onMouseUp = () => { isDragRef.current = false; };

  const onTouchStart = (e: React.TouchEvent) => {
    isDragRef.current   = true;
    isPausedRef.current = true;
    lastXRef.current    = e.touches[0].clientX;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (!isDragRef.current) return;
    const delta = lastXRef.current - e.touches[0].clientX;
    lastXRef.current = e.touches[0].clientX;
    const half = halfWidthRef.current;
    if (half > 0) posRef.current = ((posRef.current + delta) % half + half) % half;
  };
  const onTouchEnd = () => { isDragRef.current = false; isPausedRef.current = false; };

  return (
    <div
      ref={wrapperRef}
      className="relative overflow-hidden py-4 cursor-grab active:cursor-grabbing select-none"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Fade izquierda */}
      <div
        className="absolute inset-y-0 left-0 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, hsl(var(--background)), transparent)' }}
      />
      {/* Fade derecha */}
      <div
        className="absolute inset-y-0 right-0 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, hsl(var(--background)), transparent)' }}
      />

      <div
        ref={trackRef}
        className="flex items-center gap-12 w-max"
        style={{ willChange: 'transform' }}
      >
        {items.map((tech, i) => (
          <div
            key={i}
            className="flex items-center justify-center w-[70px] h-[70px] shrink-0 transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_14px_rgba(129,140,248,0.55)]"
            title={tech.name}
          >
            {tech.icon === null ? (
              <AIChipIcon />
            ) : (
              <img
                src={tech.icon}
                alt={tech.name}
                width={68}
                height={68}
                draggable={false}
                className="w-[68px] h-[68px] object-contain"
                onError={e => {
                  // Fallback si el CDN falla
                  const parent = (e.target as HTMLImageElement).parentElement;
                  if (parent) {
                    (e.target as HTMLImageElement).style.display = 'none';
                    const fb = document.createElement('div');
                    fb.className = 'w-[68px] h-[68px] rounded-xl bg-slate-800/60 border border-slate-700/40 flex items-center justify-center';
                    fb.innerHTML = `<span class="text-xs text-slate-400 font-medium text-center leading-tight px-1">${tech.name}</span>`;
                    parent.appendChild(fb);
                  }
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechSlider;