import { Code, Heart, Github, Linkedin, Mail, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const quickLinks = [
    { label: 'Inicio', id: 'hero' },
    { label: 'Sobre mí', id: 'about' },
    { label: 'Proyectos', id: 'projects' },
    // { label: 'Blog', id: 'blog' },
    { label: 'Contacto', id: 'contact' }
  ];

  const socialLinks = [
    {
      icon: <Github className="w-5 h-5" />,
      url: 'https://github.com/JohansebastianPZ',
      label: 'GitHub'
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      url: 'https://www.linkedin.com/in/johan-sebastian-neiva-martinez-a653b8207/?trk=opento_sprofile_goalscard',
      label: 'LinkedIn'
    },
    // {
    //   icon: <Twitter className="w-5 h-5" />,
    //   url: 'https://twitter.com/tu-usuario',
    //   label: 'Twitter'
    // },
    {
      icon: <Mail className="w-5 h-5" />,
      url: 'mailto:johansebastian627@gmail.com',
      label: 'Email'
    }
  ];

  return (
    <footer className="bg-gradient-accent border-t border-border/20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Code className="w-6 h-6 text-primary" />
              <span className="text-xl font-bold">Sebastian Dev</span>
            </div>
            <p className="text-muted-foreground">
              Desarrollador web especializado en crear experiencias digitales excepcionales.
            </p>
            <div className="flex gap-2">
              {socialLinks.map((social, index) => (
                <Button
                  key={index}
                  size="icon"
                  variant="ghost"
                  className="hover:bg-accent hover:text-accent-foreground"
                  onClick={() => window.open(social.url, '_blank')}
                  aria-label={social.label}
                >
                  {social.icon}
                </Button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold">Enlaces rápidos</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="font-semibold">Servicios</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>Frontend en formacion</li>
              <li>Backend inicial</li>
              <li>Colaboracion en proyectos</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold">Contacto</h4>
            <div className="space-y-2 text-muted-foreground">
              <p>johansebastian627@gmail.com</p>
              <p>+34 611 877 077</p>
              <p>Barcelona, España</p>
            </div>
            <Button
              onClick={() => scrollToSection('contact')}
              className="w-full  hover:opacity-90"
            >
              Iniciar proyecto
            </Button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/20 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center gap-1 text-muted-foreground mb-4 md:mb-0">
            <span>© 2025 Sebastian Dev. Hecho con</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span>y mucho café</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <button className="hover:text-primary transition-colors">
              Política de privacidad
            </button>
            <button className="hover:text-primary transition-colors">
              Términos de servicio
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;