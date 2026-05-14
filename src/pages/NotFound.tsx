import { scrollToSection } from '@/lib/scroll';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-4">Página no encontrada</p>
        <button
          onClick={() => scrollToSection('hero')}
          className="text-primary hover:text-primary/80 underline transition-colors"
        >
          Volver al inicio
        </button>
      </div>
    </div>
  );
};

export default NotFound;
