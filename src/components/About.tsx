import { type LucideIcon, Briefcase, Code, Cpu, Globe, Zap, Award, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
// @ts-ignore
import { GitHubCalendar } from 'react-github-calendar';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import TechSlider from '@/components/TechSlider';
import { useRef, useEffect } from 'react';

interface Service {
  Icon: LucideIcon;
  iconBg: string;
  title: string;
  description: string;
}

const SERVICES: Service[] = [
  {
    Icon: Globe,
    iconBg: 'bg-indigo-900/50 text-indigo-300',
    title: 'Desarrollo Web',
    description: 'Creación de aplicaciones web modernas, responsivas y funcionales usando HTML, CSS y JavaScript',
  },
  {
    Icon: Award,
    iconBg: 'bg-slate-800/60 text-slate-300',
    title: 'Proyectos Personales',
    description: 'Experimentando con proyectos propios para practicar nuevas tecnologías y conceptos',
  },
  {
    Icon: Users,
    iconBg: 'bg-indigo-900/50 text-indigo-300',
    title: 'Colaboración',
    description: 'Participando en proyectos en equipo y contribuyendo a repositorios de práctica',
  },
  {
    Icon: Zap,
    iconBg: 'bg-slate-800/60 text-slate-300',
    title: 'Crecimiento Continuo',
    description: 'Aprendiendo nuevas herramientas y mejores prácticas para mejorar mis habilidades como desarrollador',
  },
];

const About = () => {
  const sectionRef = useScrollAnimation();
  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = calendarRef.current;
    if (!el) return;

    let rafId: number;
    let tries = 0;
    const MAX_TRIES = 120;

    const scrollToRecent = () => {
      if (el.scrollWidth > el.clientWidth) {
        el.scrollLeft = el.scrollWidth;
        return;
      }
      if (++tries < MAX_TRIES) {
        rafId = requestAnimationFrame(scrollToRecent);
      }
    };

    rafId = requestAnimationFrame(scrollToRecent);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-24 bg-gradient-to-b from-background to-indigo-950/5">
      <div className="container mx-auto px-4">

        {/* Hero intro */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 lg:gap-16 mb-28 items-center">

          {/* Texto — primero en HTML = primero en móvil */}
          <div className="flex-1 space-y-10">

            <div className="fade-in-up flex items-center gap-3">
              <div className="w-8 h-px bg-indigo-400" />
              <span className="text-indigo-400 text-sm font-medium tracking-[0.25em] uppercase">
                Desarrollador Web
              </span>
            </div>

            <div className="fade-in-up space-y-2">
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                Diseño · Código · Experiencia
              </p>
              <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[0.95] tracking-tighter text-foreground">
                CREO<br />
                <span className="text-indigo-400">PRODUCTOS</span><br />
                DIGITALES
              </h2>
              <p className="text-base text-muted-foreground max-w-md pt-4 leading-relaxed font-light">
                Me especializo en desarrollo frontend y backend, transformando ideas en
                aplicaciones web modernas, responsivas y optimizadas.
              </p>
            </div>

            <div className="fade-in-up flex flex-wrap gap-2">
              {[
                { label: 'Frontend',       cls: 'bg-indigo-900/30 border-indigo-500/30 text-indigo-300' },
                { label: 'Backend',        cls: 'bg-slate-800/40  border-slate-500/30  text-slate-300'  },
                { label: 'IA & Prompting', cls: 'bg-violet-900/30 border-violet-500/30 text-violet-300' },
              ].map(({ label, cls }) => (
                <span key={label} className={`px-3 py-1.5 rounded-full text-sm border font-medium ${cls}`}>
                  {label}
                </span>
              ))}
            </div>

            <div className="fade-in-up flex items-center gap-8 sm:gap-12 pt-6 border-t border-border/30">
              <div>
                <p className="text-4xl font-black text-primary">1+</p>
                <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">Proyectos propios</p>
              </div>
              <div className="w-px h-12 bg-border/50" />
              <div>
                <p className="text-4xl font-black text-primary">∞</p>
                <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">Ganas de aprender</p>
              </div>
              <div className="w-px h-12 bg-border/50" />
              <div>
                <p className="text-4xl font-black text-primary">100%</p>
                <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">Comprometido</p>
              </div>
            </div>
          </div>

          {/* Imagen — segundo en HTML = segundo en móvil, derecha en desktop */}
          <div className="fade-in-up flex justify-center items-center">
            <div className="relative flex justify-center">
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-64 h-64 sm:w-80 sm:h-80 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-44 h-44 sm:w-56 sm:h-56 bg-violet-600/10 rounded-full blur-2xl pointer-events-none" />
              <img
                src="./imagen.png"
                alt="Sebastian Martinez"
                className="relative z-10 w-[280px] sm:w-[360px] lg:w-[420px] object-contain select-none mx-auto"
                style={{ filter: 'drop-shadow(0 24px 48px rgba(99,102,241,0.18))' }}
                draggable={false}
              />
              <div
                className="absolute bottom-0 left-0 right-0 h-24 z-20 pointer-events-none"
                style={{ background: 'linear-gradient(to top, hsl(var(--background)), transparent)' }}
              />
            </div>
          </div>

        </div>

        {/* Tech Slider */}
        <div className="fade-in-up mb-20">
          <Card className="glass-effect border-indigo-500/15 overflow-hidden">
            <CardContent className="p-8">
              <div className="flex flex-col items-center">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Cpu className="w-6 h-6 text-indigo-400" />
                  Stack tecnológico
                </h3>
                <div className="w-full">
                  <TechSlider />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Github Calendar */}
        <div className="fade-in-up mb-20">
          <Card className="glass-effect border-indigo-500/15 overflow-hidden">
            <CardContent className="p-8">
              <div className="flex flex-col items-center">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Code className="w-6 h-6 text-indigo-400" />
                  Mi Actividad en GitHub
                </h3>
                <div ref={calendarRef} className="w-full overflow-x-auto py-4">
                  <GitHubCalendar
                    username="JohanSebastianPZ"
                    colorScheme='dark'
                    blockSize={16}
                    blockMargin={5}
                    fontSize={16}
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-4 italic">
                  Contribuciones realizadas en el último año
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Services */}
        <div className="fade-in-up">
          <h3 className="text-2xl font-bold text-center mb-12 flex items-center justify-center gap-2">
            <Briefcase className="w-6 h-6 text-indigo-400" />
            Servicios que ofrezco
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map(({ Icon, iconBg, title, description }, index) => (
              <Card key={index} className="hover-lift glass-effect border-border/20 group">
                <CardContent className="p-6 text-center">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 mx-auto ${iconBg} transition-transform duration-300 group-hover:scale-110`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <h4 className="text-lg font-semibold mb-2">{title}</h4>
                  <p className="text-muted-foreground text-sm">{description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;