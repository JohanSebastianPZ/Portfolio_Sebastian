import { useEffect, useRef, useState } from "react";
import { ExternalLink, Github, Eye, Filter } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Projects = () => {
	const sectionRef = useRef<HTMLElement>(null);
	const [activeFilter, setActiveFilter] = useState("all");

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const elements = entry.target.querySelectorAll(".fade-in-up");
						elements.forEach((el, index) => {
							setTimeout(() => {
								el.classList.add("visible");
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

	const projects = [
		{
			id: 1,
			title: "Activity Booking",
			description: "Optimización de plugin de booking con módulos de impresión de facturas y captura de parámetros dinámicos en WooCommerce.",
			image: "/Activity_booking.png",
			technologies: ["PHP", "Javascript"],
			category: "backend",
			featured: true,
			github: "https://github.com/JohanSebastianPZ/Activity_Booking_Plugin.git",
			live: "https://github.com/JohanSebastianPZ/Activity_Booking_Plugin.git",
		},
		/*},
        {
            id: 2,
            title: "Task Management App",
            description: "Aplicación de gestión de tareas con colaboración en tiempo real, notificaciones y analíticas.",
            image: "/api/placeholder/400/300",
            technologies: ["React", "Firebase", "Material-UI", "WebSocket"],
            category: "web",
            github: "https://github.com",
            live: "https://example.com",
            featured: true,
        },
        {
            id: 3,
            title: "Mobile Banking App",
            description: "Aplicación bancaria móvil con autenticación biométrica, transferencias y gestión de cuentas.",
            image: "/api/placeholder/400/300",
            technologies: ["React Native", "TypeScript", "Redux", "Biometrics"],
            category: "mobile",
            github: "https://github.com",
            live: "https://example.com",
            featured: true,
        },
        {
            id: 4,
            title: "Analytics Dashboard",
            description: "Dashboard de analíticas en tiempo real con gráficos interactivos y reportes automatizados.",
            image: "/api/placeholder/400/300",
            technologies: ["Vue.js", "D3.js", "Python", "MongoDB"],
            category: "web",
            github: "https://github.com",
            live: "https://example.com",
            featured: false,
        },
        {
            id: 5,
            title: "API Gateway",
            description: "Gateway de API escalable con autenticación, rate limiting y monitoreo de performance.",
            image: "/api/placeholder/400/300",
            technologies: ["Node.js", "Express", "Redis", "Docker"],
            category: "backend",
            github: "https://github.com",
            live: "https://example.com",
            featured: false,
        },
        {
            id: 6,
            title: "IoT Dashboard",
            description: "Panel de control para dispositivos IoT con monitoreo en tiempo real y alertas.",
            image: "/api/placeholder/400/300",
            technologies: ["Angular", "MQTT", "InfluxDB", "Grafana"],
            category: "web",
            github: "https://github.com",
            live: "https://example.com",
            featured: false,
        },*/
	];

	const categories = [
		{ id: "all", label: "Todos" },
		{ id: "web", label: "Web" },
		{ id: "backend", label: "Backend" },
	];

	// Lógica de filtrado simplificada y robusta
	const filteredProjects = projects.filter((project) => activeFilter === "all" || project.category === activeFilter);

	return (
		<section id="projects" ref={sectionRef} className="py-20 bg-background">
			<div className="container mx-auto px-4">
				{/* Header */}
				<div className="text-center mb-16">
					<h2 className="text-3xl md:text-4xl font-bold mb-4 fade-in-up">Proyectos destacados</h2>
					<p className="text-lg text-muted-foreground max-w-2xl mx-auto fade-in-up">Una selección de mis trabajos más representativos y las tecnologías utilizadas</p>
				</div>

				{/* Filter Buttons */}
				<div className="flex flex-wrap justify-center gap-4 mb-12 fade-in-up">
					{categories.map((category) => (
						<Button key={category.id} variant={activeFilter === category.id ? "default" : "outline"} onClick={() => setActiveFilter(category.id)} className="transition-all duration-300">
							<Filter className="w-4 h-4 mr-2" />
							{category.label}
						</Button>
					))}
				</div>

				{/* Grid de Proyectos */}
				<div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
					{filteredProjects.length > 0 ? (
						filteredProjects.map((project) => (
							<Card key={project.id} className="hover-lift glass-effect border-border/20 group fade-in-up overflow-hidden">
								{/* Contenedor de Imagen Corregido */}
								<div className="relative aspect-video w-full bg-muted">
									<img
										src={project.image}
										alt={project.title}
										className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
										onError={(e) => {
											// Fallback si la imagen no carga
											e.currentTarget.src = "https://via.placeholder.com/400x225?text=No+Image";
										}}
									/>
									<div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
										<Button size="icon" variant="secondary" onClick={() => window.open(project.live, "_blank")}>
											<ExternalLink className="w-5 h-5" />
										</Button>
										<Button size="icon" variant="secondary" onClick={() => window.open(project.github, "_blank")}>
											<Github className="w-5 h-5" />
										</Button>
									</div>
								</div>

								<CardContent className="p-6">
									<h4 className="text-xl font-semibold mb-3">{project.title}</h4>
									<p className="text-muted-foreground mb-4 line-clamp-3 text-sm">{project.description}</p>
									<div className="flex flex-wrap gap-2 mb-6">
										{project.technologies.map((tech) => (
											<Badge key={tech} variant="secondary" className="text-[10px] uppercase tracking-wider">
												{tech}
											</Badge>
										))}
									</div>
									<div className="flex gap-2">
										<Button size="sm" onClick={() => window.open(project.live, "_blank")} className="flex-1">
											<ExternalLink className="w-4 h-4 mr-2" />
											Ver proyecto
										</Button>
										<Button size="sm" variant="outline" onClick={() => window.open(project.github, "_blank")}>
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
