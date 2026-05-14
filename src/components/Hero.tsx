import { useEffect, useState, useCallback } from 'react';
import { ChevronDown, Download, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { scrollToSection } from '@/lib/scroll';

const BUBBLES = [
  { id: 1,  size: 80,  x: 8,  y: 12, colors: 'from-indigo-500/10 to-indigo-600/5',  depth: 20, delay: '0s',   duration: '6s'  },
  { id: 2,  size: 130, x: 80, y: 8,  colors: 'from-blue-600/10 to-indigo-500/5',    depth: 40, delay: '1s',   duration: '8s'  },
  { id: 3,  size: 60,  x: 20, y: 70, colors: 'from-slate-500/8 to-indigo-500/5',    depth: 30, delay: '2s',   duration: '7s'  },
  { id: 4,  size: 110, x: 68, y: 60, colors: 'from-indigo-700/10 to-indigo-600/5',  depth: 50, delay: '0.5s', duration: '9s'  },
  { id: 5,  size: 55,  x: 48, y: 15, colors: 'from-indigo-400/8 to-blue-500/5',     depth: 20, delay: '1.5s', duration: '5s'  },
  { id: 6,  size: 95,  x: 12, y: 50, colors: 'from-blue-700/10 to-indigo-600/5',    depth: 40, delay: '3s',   duration: '10s' },
  { id: 7,  size: 75,  x: 88, y: 42, colors: 'from-indigo-600/10 to-indigo-500/5',  depth: 30, delay: '2.5s', duration: '7s'  },
  { id: 8,  size: 45,  x: 58, y: 82, colors: 'from-slate-600/8 to-indigo-500/5',    depth: 50, delay: '4s',   duration: '6s'  },
  { id: 9,  size: 65,  x: 35, y: 35, colors: 'from-indigo-500/8 to-blue-600/5',     depth: 25, delay: '3.5s', duration: '8s'  },
  { id: 10, size: 50,  x: 72, y: 25, colors: 'from-indigo-600/10 to-indigo-400/5',  depth: 35, delay: '5s',   duration: '9s'  },
];

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showCV, setShowCV] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePos({
      x: (e.clientX / window.innerWidth - 0.5) * 2,
      y: (e.clientY / window.innerHeight - 0.5) * 2,
    });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-indigo-950/8 to-background" />

      {/* Bubbles — outer div handles mouse parallax, inner div handles float animation */}
      {BUBBLES.map((bubble) => (
        <div
          key={bubble.id}
          className="absolute pointer-events-none"
          style={{
            left: `${bubble.x}%`,
            top: `${bubble.y}%`,
            transform: `translate(${mousePos.x * bubble.depth}px, ${mousePos.y * bubble.depth}px)`,
            transition: 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            willChange: 'transform',
          }}
        >
          <div
            className={`rounded-full bg-gradient-to-br ${bubble.colors} blur-xl`}
            style={{
              width: bubble.size,
              height: bubble.size,
              animation: `float ${bubble.duration} ease-in-out infinite ${bubble.delay}`,
            }}
          />
        </div>
      ))}

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

          {/* Action Buttons */}
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

          {/* Stats */}
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

      {/* Scroll Indicator */}
      <button
        onClick={() => scrollToSection('about')}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-muted-foreground hover:text-primary transition-colors animate-bounce"
      >
        <ChevronDown className="w-6 h-6" />
      </button>
    </section>
  );
};

export default Hero;
