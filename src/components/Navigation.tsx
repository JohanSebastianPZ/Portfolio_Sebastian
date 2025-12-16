import { useState, useEffect } from 'react';
import { Menu, X, Code, Github, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const navItems = [
    { id: 'hero', label: 'Inicio' },
    { id: 'about', label: 'Sobre mí' },
    { id: 'projects', label: 'Proyectos' },
    // { id: 'hiring', label: 'Contratación' }, //Proxima implementacion 
    // { id: 'blog', label: 'Blog' }, // Proxima implementacion
    { id: 'contact', label: 'Contacto' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-background/80 backdrop-blur-md border-b border-border' : ''
    }`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => scrollToSection('hero')}
            className="flex items-center gap-2 text-xl font-bold text-primary hover:text-primary/80 transition-colors"
          >
            <Code className="w-6 h-6" />
            <span>Sebastian Dev</span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-muted-foreground hover:text-primary transition-colors relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
          </div>

          {/* Social Links */}
          <div className="hidden md:flex items-center gap-4">
            <Button
              size="icon"
              variant="ghost"
              className="hover:bg-accent hover:text-accent-foreground"
              onClick={() => window.open('https://github.com/JohanSebastianPZ', '_blank')}
            >
              <Github className="w-5 h-5" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="hover:bg-accent hover:text-accent-foreground"
              onClick={() => window.open('https://www.linkedin.com/in/johan-sebastian-neiva-martinez-a653b8207/?trk=opento_sprofile_goalscard', '_blank')}
            >
              <Linkedin className="w-5 h-5" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="hover:bg-accent hover:text-accent-foreground"
              onClick={() => scrollToSection('contact')}
            >
              <Mail className="w-5 h-5" />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            size="icon"
            variant="ghost"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 glass-effect rounded-lg border border-border">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="px-4 py-2 text-left text-muted-foreground hover:text-primary transition-colors"
                >
                  {item.label}
                </button>
              ))}
              <div className="flex items-center gap-4 px-4 pt-2 border-t border-border">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => window.open('https://github.com/JohanSebastianPZ', '_blank')}
                >
                  <Github className="w-5 h-5" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => window.open('https://www.linkedin.com/in/johan-sebastian-neiva-martinez-a653b8207/?trk=opento_sprofile_goalscard', '_blank')}
                >
                  <Linkedin className="w-5 h-5" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => scrollToSection('contact')}
                >
                  <Mail className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;