import { useState } from "react";
import { ExternalLink, Github, Filter } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const sectionRef = useScrollAnimation([activeFilter]);

  const projects = [
    {
      id: 1,
      title: "Activity Booking",
      description: "Optimización de plugin de booking con módulos de impresión de facturas y captura de parámetros dinámicos en WooCommerce.",
      image: "/Activity_booking.png",
      technologies: ["PHP", "Javascript"],
      category: "backend",
      github: "https://github.com/JohanSebastianPZ/Activity_Booking_Plugin.git",
      live: "https://github.com/JohanSebastianPZ/Activity_Booking_Plugin.git",
    },
    {
      id: 2,
      title: "Emisora Max FM",
      description: "Plataforma web para una emisora de radio en Barcelona con streaming en vivo, chat interactivo moderado por IA y panel de administración. Frontend en React, bot de chat en Python y conexión a base de datos en PHP.",
      image: "/maxfm.png",
      technologies: ["React", "TypeScript", "Vite", "Python", "PHP"],
      category: "web",
      github: "https://github.com/dimitryx01/maxfm-radiowave-glow.git",
      live: "https://github.com/dimitryx01/maxfm-radiowave-glow.git",
    },
  ];

  const categories = [
    { id: "all", label: "Todos" },
    { id: "web", label: "Web" },
    { id: "backend", label: "Backend" },
  ];

  const filteredProjects = projects.filter(
    (project) => activeFilter === "all" || project.category === activeFilter
  );

  return (
    <section id="projects" ref={sectionRef} className="py-20 bg-gradient-to-b from-indigo-950/5 to-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4 fade-in-up">
            <div className="w-12 h-1 bg-gradient-to-r from-indigo-500/60 to-indigo-400/30 rounded-full" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 fade-in-up text-gradient">
            Proyectos destacados
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto fade-in-up">
            Una selección de mis trabajos más representativos y las tecnologías utilizadas
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12 fade-in-up">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeFilter === category.id ? "default" : "outline"}
              onClick={() => setActiveFilter(category.id)}
              className={`transition-all duration-300 ${
                activeFilter === category.id
                  ? "bg-indigo-700 hover:bg-indigo-600 text-white border-0"
                  : "border-white/10 text-muted-foreground hover:border-indigo-500/40 hover:text-indigo-300"
              }`}
            >
              <Filter className="w-4 h-4 mr-2" />
              {category.label}
            </Button>
          ))}
        </div>

        {/* Grid de Proyectos */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <Card key={project.id} className="hover-lift glass-effect border-white/5 group fade-in-up overflow-hidden">
                <div className="relative aspect-video w-full bg-muted">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      e.currentTarget.src = "https://via.placeholder.com/400x225?text=No+Image";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    <Button size="icon" variant="secondary" onClick={() => window.open(project.live, "_blank")} className="bg-white/10 hover:bg-indigo-600 border-0 text-white transition-colors">
                      <ExternalLink className="w-5 h-5" />
                    </Button>
                    <Button size="icon" variant="secondary" onClick={() => window.open(project.github, "_blank")} className="bg-white/10 hover:bg-indigo-700 border-0 text-white transition-colors">
                      <Github className="w-5 h-5" />
                    </Button>
                  </div>
                </div>

                <CardContent className="p-6">
                  <h4 className="text-xl font-semibold mb-3">{project.title}</h4>
                  <p className="text-muted-foreground mb-4 line-clamp-3 text-sm">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-[10px] uppercase tracking-wider bg-white/5 text-slate-400 border border-white/10">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => window.open(project.live, "_blank")} className="flex-1 bg-indigo-700 hover:bg-indigo-600 text-white border-0 transition-colors">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Ver proyecto
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => window.open(project.github, "_blank")} className="border-white/10 text-muted-foreground hover:border-indigo-500/40 hover:text-indigo-300 transition-colors">
                      <Github className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-12 fade-in-up">
              <p className="text-muted-foreground italic">No hay proyectos disponibles en esta categoría.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects;
