import { useEffect, useRef } from 'react';
import { Code, Smartphone, Globe, Zap, Award, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
// @ts-ignore
import GitHubCalendar from 'react-github-calendar';

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll('.fade-in-up');
            elements.forEach((el, index) => {
              setTimeout(() => {
                el.classList.add('visible');
              }, index * 200);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const skills = [
    { name: 'Java', level: 60 },
    { name: 'SQL', level: 50 },
    { name: 'Linux', level: 50 },
    { name: 'JavaScript', level: 40 },
    { name: 'Redes', level: 50 },
    { name: 'Docker', level: 50 },
    { name: 'Git', level: 50 },
  ];

  const services = [
    {
      icon: <Globe className="w-8 h-8 text-primary" />,
      title: 'Desarrollo Web',
      description: 'Creación de aplicaciones web modernas, responsivas y funcionales usando HTML, CSS y JavaScript'
    },
    {
      icon: <Award className="w-8 h-8 text-primary" />,
      title: 'Proyectos Personales',
      description: 'Experimentando con proyectos propios para practicar nuevas tecnologías y conceptos'
    },
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: 'Colaboración',
      description: 'Participando en proyectos en equipo y contribuyendo a repositorios de práctica'
    },
    {
      icon: <Zap className="w-8 h-8 text-primary" />,
      title: 'Crecimiento Continuo',
      description: 'Aprendiendo nuevas herramientas y mejores prácticas para mejorar mis habilidades como desarrollador'
    },
  ];

  return (
    <section id="about" ref={sectionRef} className="py-20 bg-accent/5">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 fade-in-up">
            Sobre mí
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto fade-in-up">
            Desarrollador apasionado por crear soluciones digitales que marcan la diferencia
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Text Content */}
          <div className="space-y-6">
            <div className="fade-in-up">
              <h3 className="text-2xl font-bold mb-4">Mi historia</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Soy un desarrollador web en formación con muchas ganas de aprender y 
                crecer en el mundo de la tecnología. Durante mi aprendizaje, he 
                trabajado en proyectos personales y ejercicios que me han permitido 
                afianzar las bases del desarrollo web y conocer herramientas modernas.
              </p>
            </div>

            {/* Skills */}
            <div className="fade-in-up">
              <h4 className="text-xl font-semibold mb-4">Habilidades técnicas</h4>
              <div className="space-y-4">
                {skills.map((skill) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">{skill.name}</span>
                      <span className="text-sm text-muted-foreground">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="fade-in-up">
            <div className="relative">
              <div className="aspect-square bg-gradient-accent rounded-2xl flex items-center justify-center overflow-hidden min-w-[300px] md:min-w-[400px]">  
                <img
                  src="./imagen.png"
                  alt="Mi imagen"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* --- NUEVA SECCIÓN: GITHUB CALENDAR --- */}
        <div className="fade-in-up mb-20">
          <Card className="glass-effect border-border/20 overflow-hidden">
            <CardContent className="p-8">
              <div className="flex flex-col items-center">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Code className="w-6 h-6 text-primary" /> Mi Actividad en GitHub
                </h3>
                <div className="w-full flex justify-center overflow-x-auto py-4">
                  <GitHubCalendar 
                    username="JohanSebastianPZ" 
                    colorScheme='dark'
                    blockSize={12}
                    blockMargin={4}
                    fontSize={14}
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
          <h3 className="text-2xl font-bold text-center mb-12">
            Servicios que ofrezco
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="hover-lift glass-effect border-border/20">
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4">
                    {service.icon}
                  </div>
                  <h4 className="text-xl font-semibold mb-3">{service.title}</h4>
                  <p className="text-muted-foreground">{service.description}</p>
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