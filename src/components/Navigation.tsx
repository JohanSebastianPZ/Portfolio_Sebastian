import { useState, useEffect } from 'react';
import { Menu, X, Code, Github, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { scrollToSection } from '@/lib/scroll';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    scrollToSection(sectionId);
    setIsMenuOpen(false);
  };

  const navItems = [
    { id: 'hero',     label: 'Inicio' },
    { id: 'about',    label: 'Sobre mí' },
    { id: 'projects', label: 'Proyectos' },
    { id: 'contact',  label: 'Contacto' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-background/80 backdrop-blur-md border-b border-white/5' : ''
    }`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button onClick={() => handleNavClick('hero')} className="flex items-center gap-2 text-xl font-bold hover:opacity-70 transition-opacity">
            <Code className="w-6 h-6 text-indigo-400" />
            <span className="bg-gradient-to-r from-indigo-300 to-slate-200 bg-clip-text text-transparent">
              Sebastian Dev
            </span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="text-muted-foreground hover:text-foreground transition-colors relative group text-sm"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-indigo-500/60 rounded-full transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </div>

          {/* Social Links */}
          <div className="hidden md:flex items-center gap-1">
            <Button size="icon" variant="ghost" className="text-muted-foreground hover:text-indigo-300 hover:bg-indigo-900/30 transition-colors" onClick={() => window.open('https://github.com/JohanSebastianPZ', '_blank')}>
              <Github className="w-5 h-5" />
            </Button>
            <Button size="icon" variant="ghost" className="text-muted-foreground hover:text-indigo-300 hover:bg-indigo-900/30 transition-colors" onClick={() => window.open('https://www.linkedin.com/in/johan-sebastian-neiva-martinez-a653b8207/?trk=opento_sprofile_goalscard', '_blank')}>
              <Linkedin className="w-5 h-5" />
            </Button>
            <Button size="icon" variant="ghost" className="text-muted-foreground hover:text-indigo-300 hover:bg-indigo-900/30 transition-colors" onClick={() => handleNavClick('contact')}>
              <Mail className="w-5 h-5" />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button size="icon" variant="ghost" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 glass-effect rounded-lg border border-white/5">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <button key={item.id} onClick={() => handleNavClick(item.id)} className="px-4 py-2 text-left text-muted-foreground hover:text-foreground transition-colors text-sm">
                  {item.label}
                </button>
              ))}
              <div className="flex items-center gap-2 px-4 pt-2 border-t border-white/5">
                <Button size="icon" variant="ghost" className="hover:text-indigo-300" onClick={() => window.open('https://github.com/JohanSebastianPZ', '_blank')}><Github className="w-5 h-5" /></Button>
                <Button size="icon" variant="ghost" className="hover:text-indigo-300" onClick={() => window.open('https://www.linkedin.com/in/johan-sebastian-neiva-martinez-a653b8207/?trk=opento_sprofile_goalscard', '_blank')}><Linkedin className="w-5 h-5" /></Button>
                <Button size="icon" variant="ghost" className="hover:text-indigo-300" onClick={() => handleNavClick('contact')}><Mail className="w-5 h-5" /></Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
