import { Heart, Github, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { scrollToSection } from '@/lib/scroll';

const Footer = () => {
  const quickLinks = [
    { label: 'Inicio',     id: 'hero' },
    { label: 'Sobre mí',  id: 'about' },
    { label: 'Proyectos', id: 'projects' },
    { label: 'Contacto',  id: 'contact' },
  ];

  const socialLinks = [
    { icon: <Github className="w-5 h-5" />,   url: 'https://github.com/JohansebastianPZ',                                                                          label: 'GitHub'  },
    { icon: <Linkedin className="w-5 h-5" />, url: 'https://www.linkedin.com/in/johan-sebastian-neiva-martinez-a653b8207/?skipRedirect=true', label: 'LinkedIn' },
    { icon: <Mail className="w-5 h-5" />,     url: 'mailto:johansebastian627@gmail.com',                                                                    label: 'Email'   },
  ];

  return (
    <footer className="relative border-t border-white/5 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-indigo-950/8 to-background pointer-events-none" />

      <div className="relative container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img src="/icono.png" alt="Logo" className="w-6 h-6 object-contain" />
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-300 to-slate-200 bg-clip-text text-transparent">
                Sebastian Dev
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Desarrollador web especializado en crear experiencias digitales excepcionales.
            </p>
            <div className="flex gap-1">
              {socialLinks.map((social, index) => (
                <Button key={index} size="icon" variant="ghost" className="text-muted-foreground hover:text-indigo-300 hover:bg-indigo-900/30 transition-colors" onClick={() => window.open(social.url, '_blank')} aria-label={social.label}>
                  {social.icon}
                </Button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-medium text-foreground text-sm uppercase tracking-wider">Enlaces</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <button onClick={() => scrollToSection(link.id)} className="text-muted-foreground hover:text-indigo-300 transition-colors text-sm">
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="font-medium text-foreground text-sm uppercase tracking-wider">Servicios</h4>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li>Frontend en formación</li>
              <li>Backend inicial</li>
              <li>Colaboración en proyectos</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-medium text-foreground text-sm uppercase tracking-wider">Contacto</h4>
            <div className="space-y-2 text-muted-foreground text-sm">
              <p>johansebastian627@gmail.com</p>
              <p>+34 611 877 077</p>
              <p>Barcelona, España</p>
            </div>
            <Button onClick={() => scrollToSection('contact')} className="w-full bg-indigo-700 hover:bg-indigo-600 text-white border-0 transition-colors text-sm">
              Iniciar proyecto
            </Button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 relative">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-1 text-muted-foreground mb-4 md:mb-0 text-sm">
              <span>© 2025 Sebastian Dev. Hecho con</span>
              <Heart className="w-3.5 h-3.5 text-rose-400/70 fill-current" />
              <span>y mucho café</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <button className="hover:text-indigo-300 transition-colors">Política de privacidad</button>
              <button className="hover:text-indigo-300 transition-colors">Términos de servicio</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
