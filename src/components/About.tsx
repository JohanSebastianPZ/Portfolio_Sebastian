import { type LucideIcon, Briefcase, Code, Cpu, Globe, Zap, Award, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
// @ts-ignore
import { GitHubCalendar } from 'react-github-calendar';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import TechSlider from '@/components/TechSlider';

interface Service {
  Icon: LucideIcon;
  iconBg: string;
  title: string;
  description: string;
}

// Defined outside component — no recreation on re-renders
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

  return (
    <section id="about" ref={sectionRef} className="py-20 bg-gradient-to-b from-background to-indigo-950/5">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4 fade-in-up">
            <div className="w-12 h-1 bg-gradient-to-r from-indigo-500/60 to-indigo-400/30 rounded-full" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 fade-in-up text-gradient">
            Sobre mí
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto fade-in-up">
            Desarrollador apasionado por crear soluciones digitales que marcan la diferencia
          </p>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end gap-12 lg:gap-20 mb-20">

          {/* Text Content */}
          <div className="fade-in-up flex-1 space-y-7 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-3">
              <div className="w-8 h-px bg-indigo-400" />
              <span className="text-indigo-400 text-sm font-medium tracking-widest uppercase">
                Desarrollador Web
              </span>
            </div>

            <div>
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-1">
                Hola, soy
              </h3>
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-gradient">
                Sebastian Martinez
              </h3>
            </div>

            <p className="text-muted-foreground leading-relaxed text-base lg:text-lg max-w-lg mx-auto lg:mx-0">
              Desarrollador en formación apasionado por construir experiencias digitales
              modernas. He trabajado en proyectos personales y ejercicios que me han
              permitido afianzar el desarrollo web y conocer herramientas del ecosistema actual.
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-2">
              {[
                { label: 'Frontend',          cls: 'bg-indigo-900/30 border-indigo-500/30 text-indigo-300'       },
                { label: 'Backend',           cls: 'bg-slate-800/40  border-slate-500/30  text-slate-300'        },
                { label: 'IA & Prompting',    cls: 'bg-violet-900/30 border-violet-500/30 text-violet-300'       },
                { label: 'Aprendiz continuo', cls: 'bg-slate-800/30  border-border/40     text-muted-foreground' },
              ].map(({ label, cls }) => (
                <span key={label} className={`px-3 py-1.5 rounded-full text-sm border font-medium ${cls}`}>
                  {label}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-6 sm:gap-10 pt-4 border-t border-border/30">
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-primary">1+</p>
                <p className="text-xs text-muted-foreground mt-0.5">Proyectos propios</p>
              </div>
              <div className="w-px h-10 bg-border/50" />
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-primary">∞</p>
                <p className="text-xs text-muted-foreground mt-0.5">Ganas de aprender</p>
              </div>
              <div className="w-px h-10 bg-border/50" />
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-primary">100%</p>
                <p className="text-xs text-muted-foreground mt-0.5">Comprometido</p>
              </div>
            </div>
          </div>

          {/* Portrait */}
          <div className="fade-in-up flex justify-center lg:justify-end shrink-0">
            <div className="relative">
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-64 h-64 sm:w-80 sm:h-80 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-44 h-44 sm:w-56 sm:h-56 bg-violet-600/10 rounded-full blur-2xl pointer-events-none" />
              <img
                src="./imagen.png"
                alt="Sebastian Martinez"
                className="relative z-10 w-[320px] sm:w-[400px] lg:w-[480px] object-contain select-none"
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
                <div className="w-full flex justify-center overflow-x-auto py-4">
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
