import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Download, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { scrollToSection } from '@/lib/scroll';

const STAR_COLORS = [
  '#ffffff',
  '#bfdbfe',
  '#93c5fd',
  '#67e8f9',
  '#a5f3fc',
  '#818cf8',
  '#c4b5fd',
  '#fda4af',
  '#fde68a',
  '#6ee7b7',
];

const NEBULAE = [
  { x: 0.15, y: 0.25, r: 99,  g: 102, b: 241, a: 0.04,  radius: 280 },
  { x: 0.78, y: 0.65, r: 167, g: 139, b: 250, a: 0.035, radius: 240 },
  { x: 0.85, y: 0.15, r: 56,  g: 189, b: 248, a: 0.03,  radius: 200 },
  { x: 0.45, y: 0.82, r: 244, g: 114, b: 182, a: 0.025, radius: 220 },
];

interface Star {
  x: number;
  y: number;
  size: number;
  color: string;
  baseAlpha: number;
  twinkleSpeed: number;
  twinkleOffset: number;
  depth: number;
  driftAmpX: number;
  driftAmpY: number;
  driftFreqX: number;
  driftFreqY: number;
  driftPhaseX: number;
  driftPhaseY: number;
}

const PI2 = Math.PI * 2;
const PROX_RADIUS = 180;
const PROX_RADIUS_SQ = PROX_RADIUS * PROX_RADIUS;

const StarCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Stars partitioned by size to batch shadowBlur changes (3 state changes/frame vs N)
  const dimRef    = useRef<Star[]>([]);
  const medRef    = useRef<Star[]>([]);
  const brightRef = useRef<Star[]>([]);
  const mouseRef  = useRef({ x: -9999, y: -9999 });
  const rafRef    = useRef<number>(0);
  // Nebulae pre-rendered once; reused with drawImage instead of 4 radial gradient creates/frame
  const offRef    = useRef<HTMLCanvasElement | null>(null);
  const pausedRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const buildOffscreen = (w: number, h: number) => {
      const off = document.createElement('canvas');
      off.width = w;
      off.height = h;
      const oc = off.getContext('2d')!;
      NEBULAE.forEach((n) => {
        const nx = n.x * w;
        const ny = n.y * h;
        const g = oc.createRadialGradient(nx, ny, 0, nx, ny, n.radius);
        g.addColorStop(0, `rgba(${n.r},${n.g},${n.b},${n.a})`);
        g.addColorStop(1, `rgba(${n.r},${n.g},${n.b},0)`);
        oc.fillStyle = g;
        oc.fillRect(0, 0, w, h);
      });
      offRef.current = off;
    };

    const init = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      if (canvas.width === 0) return;

      buildOffscreen(canvas.width, canvas.height);

      const count = Math.min(220, Math.floor((canvas.width * canvas.height) / 5500));
      const stars: Star[] = Array.from({ length: count }, () => ({
        x: Math.random(),
        y: Math.random(),
        size: Math.pow(Math.random(), 2) * 2.8 + 0.3,
        color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
        baseAlpha: Math.random() * 0.2 + 0.72,
        twinkleSpeed: Math.random() * 1.5 + 0.4,
        twinkleOffset: Math.random() * Math.PI * 2,
        depth: Math.random() * 0.7 + 0.3,
        driftAmpX:  Math.random() * 0.05 + 0.02,
        driftAmpY:  Math.random() * 0.05 + 0.02,
        driftFreqX: Math.random() * 0.12 + 0.06,
        driftFreqY: Math.random() * 0.10 + 0.05,
        driftPhaseX: Math.random() * Math.PI * 2,
        driftPhaseY: Math.random() * Math.PI * 2,
      }));

      dimRef.current    = stars.filter(s => s.size <= 1.0);
      medRef.current    = stars.filter(s => s.size > 1.0 && s.size <= 1.8);
      brightRef.current = stars.filter(s => s.size > 1.8);
    };

    const drawBatch = (
      stars: Star[],
      t: number,
      mx: number,
      my: number,
      hasMouse: boolean,
      w: number,
      h: number,
    ) => {
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        const driftX = star.driftAmpX * Math.sin(t * star.driftFreqX + star.driftPhaseX) * w;
        const driftY = star.driftAmpY * Math.cos(t * star.driftFreqY + star.driftPhaseY) * h;
        const px = star.x * w + driftX + (hasMouse ? (mx / w - 0.5) * star.depth * 55 : 0);
        const py = star.y * h + driftY + (hasMouse ? (my / h - 0.5) * star.depth * 55 : 0);

        // Skip sqrt for distant stars — only compute when inside radius
        let proximity = 0;
        if (hasMouse) {
          const dx = px - mx;
          const dy = py - my;
          const dSq = dx * dx + dy * dy;
          if (dSq < PROX_RADIUS_SQ) proximity = Math.max(0, 1 - Math.sqrt(dSq) / PROX_RADIUS);
        }

        const twinkle = Math.sin(t * star.twinkleSpeed + star.twinkleOffset);
        ctx.shadowColor = star.color;
        ctx.globalAlpha = Math.min(1, star.baseAlpha + twinkle * 0.1 + proximity * 0.3);
        ctx.fillStyle   = star.color;
        ctx.beginPath();
        ctx.arc(px, py, Math.max(0.3, star.size * (1 + twinkle * 0.15 + proximity * 2.5)), 0, PI2);
        ctx.fill();
      }
    };

    const draw = (time: number) => {
      if (pausedRef.current) { rafRef.current = requestAnimationFrame(draw); return; }

      const { width, height } = canvas;
      if (width === 0 || height === 0) { rafRef.current = requestAnimationFrame(draw); return; }

      ctx.clearRect(0, 0, width, height);

      // One drawImage instead of creating 4 radial gradients every frame
      if (offRef.current) ctx.drawImage(offRef.current, 0, 0);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const t  = time * 0.001;
      const hasMouse = mx > -9000;

      if (hasMouse) {
        const aura = ctx.createRadialGradient(mx, my, 0, mx, my, 140);
        aura.addColorStop(0, 'rgba(129,140,248,0.07)');
        aura.addColorStop(1, 'rgba(129,140,248,0)');
        ctx.fillStyle = aura;
        ctx.fillRect(0, 0, width, height);
      }

      // 3 shadowBlur state changes instead of one per star
      ctx.shadowBlur = 0;
      drawBatch(dimRef.current, t, mx, my, hasMouse, width, height);
      ctx.shadowBlur = 14;
      drawBatch(medRef.current, t, mx, my, hasMouse, width, height);
      ctx.shadowBlur = 24;
      drawBatch(brightRef.current, t, mx, my, hasMouse, width, height);

      ctx.shadowBlur  = 0;
      ctx.globalAlpha = 1;
      rafRef.current  = requestAnimationFrame(draw);
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const onVisibility = () => { pausedRef.current = document.hidden; };

    init();
    const resizeObserver = new ResizeObserver(init);
    resizeObserver.observe(canvas);
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('visibilitychange', onVisibility);
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      resizeObserver.disconnect();
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
};

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showCV, setShowCV] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setIsVisible(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-indigo-950/8 to-background" />

      <StarCanvas />

      <div className="container mx-auto px-4 py-20 text-center relative z-10">
        <div className={`transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <p className="text-lg text-muted-foreground mb-4">
            Hola, soy
          </p>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-gradient">
            Sebastian Martinez
          </h1>

          <h2 className="text-xl md:text-2xl lg:text-3xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Creo experiencias digitales excepcionales con código limpio y diseño elegante
          </h2>

          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            Soy desarrollador en formación, especializado en frontend y backend. Me apasiona transformar ideas en aplicaciones web modernas,
            responsivas y optimizadas, me apasiona seguir perfeccionando mis habilidades para aportar valor real a cada proyecto.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button
              size="lg"
              className="text-primary-foreground hover:opacity-90 transition-opacity group"
              onClick={() => scrollToSection('projects')}
            >
              Ver mis proyectos
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors group"
              onClick={() => setShowCV(true)}
            >
              Ver CV
              <Download className="ml-2 w-5 h-5 group-hover:translate-y-1 transition-transform" />
            </Button>
          </div>

          {showCV && (
            <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
              <div className="bg-background rounded-lg w-full max-w-4xl h-[90vh] flex flex-col">
                <div className="flex justify-between p-4">
                  <span className="font-bold">CV - Sebastian Martinez</span>
                  <button onClick={() => setShowCV(false)}>✕</button>
                </div>
                <iframe src="/cv.pdf" className="flex-1 rounded-b-lg" />
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-2">Aprendiendo</div>
              <div className="text-sm text-muted-foreground">En desarrollo Web</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-2">1+</div>
              <div className="text-sm text-muted-foreground">Proyectos propios</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-2">Practicando</div>
              <div className="text-sm text-muted-foreground">Proyectos simulados</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-2">Siempre</div>
              <div className="text-sm text-muted-foreground">Disponible para aprender</div>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={() => scrollToSection('about')}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-muted-foreground hover:text-primary transition-colors animate-bounce z-10"
      >
        <ChevronDown className="w-6 h-6" />
      </button>
    </section>
  );
};

export default Hero;
