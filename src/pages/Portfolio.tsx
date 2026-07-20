// src/pages/Portfolio.tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ExternalLink, ChevronRight, 
  Globe, ShoppingCart, Monitor, Smartphone, 
   Layers, Search, ArrowUpRight,
  Eye,
  Zap, Cpu, Server, UtensilsCrossed 
} from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
  category: 'web' | 'pos' | 'mobile' | 'ecommerce' | 'system';
  tags: string[];
  featured: boolean;
  year: number;
  client: string;
  technologies: string[];
  details: string[];
  status: 'active' | 'completed' | 'maintenance';
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Automanufacturas de Querétaro',
    description: 'Plataforma industrial con e-commerce integrado y gestión de catálogo de productos especializados.',
    image: '/assets/amq-pag.png',
    link: 'https://www.amq.com.mx/',
    category: 'ecommerce',
    tags: ['E-commerce', 'Industrial', 'B2B'],
    featured: true,
    year: 2023,
    client: 'AMQ Group',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Tailwind'],
    details: [
      'Sistema de catálogo con 500+ productos',
      'Integración de pago con múltiples pasarelas',
      'Panel administrativo con análisis de ventas',
      'Optimización para dispositivos móviles'
    ],
    status: 'active'
  },
  {
    id: 2,
    title: 'FlyZZ Services',
    description: 'Plataforma de servicios digitales con enfoque en experiencia de usuario y rendimiento.',
    image: '/assets/flyzz-pag.png',
    link: 'https://flyzz.com.mx/',
    category: 'web',
    tags: ['UX/UI', 'Performance', 'SEO'],
    featured: true,
    year: 2023,
    client: 'FlyZZ Services',
    technologies: ['Next.js', 'TypeScript', 'Tailwind', 'GraphQL'],
    details: [
      'Tiempo de carga optimizado < 2s',
      'Diseño responsive adaptativo',
      'Sistema de reservas en tiempo real',
      'Integración con Google Business'
    ],
    status: 'active'
  },
  {
    id: 3,
    title: 'Spartan TV Plus',
    description: 'Plataforma de streaming con contenido exclusivo y sistema de recomendaciones inteligentes.',
    image: '/assets/spartan-pag.png',
    link: 'https://spartantvplus.com/en',
    category: 'system',
    tags: ['Streaming', 'Multimedia', 'VOD'],
    featured: true,
    year: 2024,
    client: 'Spartan Media',
    technologies: ['React', 'Video.js', 'Firebase', 'AWS'],
    details: [
      'Streaming en calidad 4K',
      'Sistema de recomendaciones personalizado',
      'Gestión de contenido multi-usuario',
      'Analytics en tiempo real'
    ],
    status: 'active'
  },
  {
    id: 4,
    title: 'ATAKGG POS System',
    description: 'Sistema empresarial de punto de venta con gestión completa de inventario y facturación para ATAKGG.',
    image: '/assets/atakgg.png',           // ← Cambia si el nombre real es diferente
    link: 'https://atakgg.revolution505.com',
    category: 'pos',
    tags: ['POS', 'Inventario', 'Facturación', 'Gaming'],
    featured: true,
    year: 2024,
    client: 'ATAKGG Business',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'WebSockets'],
    details: [
      'Gestión de inventario en tiempo real',
      'Facturación electrónica CFDI 4.0',
      'Reportes analíticos avanzados',
      'Integración con impresoras fiscales'
    ],
    status: 'active'
  },
  {
    id: 5,
    title: 'LQC Gaming Platform',
    description: 'Plataforma integral para gestión de torneos gaming con sistema POS y streaming integrado.',
    image: '/assets/lqc.png',              // ← Cambia si el nombre real es diferente
    link: 'https://lqc.revolution505.com',
    category: 'pos',
    tags: ['Gaming', 'Torneos', 'Streaming', 'POS'],
    featured: true,
    year: 2024,
    client: 'League Querétaro Championship',
    technologies: ['React', 'Socket.io', 'Tailwind', 'AWS'],
    details: [
      'Sistema de brackets automático',
      'Streaming integrado en 4K',
      'Gestión de premios y patrocinios',
      'Panel de control para organizadores'
    ],
    status: 'active'
  },
  {
    id: 6,
    title: 'La Peña de Santiago',
    description: 'Portal turístico con sistema de reservas y gestión de contenido para atracción local.',
    image: '/assets/pena-pag.png',
    link: 'https://www.xn--lapeadesantiago-lgb.com/index.html',
    category: 'web',
    tags: ['Turismo', 'Reservas', 'CMS'],
    featured: false,
    year: 2023,
    client: 'La Peña de Santiago',
    technologies: ['Vue.js', 'Express', 'MongoDB'],
    details: [
      'Sistema de reservas online',
      'Galería interactiva 360°',
      'Blog integrado con CMS',
      'Mapa de ubicación interactivo'
    ],
    status: 'active'
  },
  // ... puedes mantener o quitar los otros proyectos si quieres
];

const categories = [
  { id: 'all', label: 'Todos', icon: <Layers className="w-4 h-4" />, count: projects.length },
  { id: 'web', label: 'Sitios Web', icon: <Globe className="w-4 h-4" />, count: projects.filter(p => p.category === 'web').length },
  { id: 'pos', label: 'Sistemas POS', icon: <ShoppingCart className="w-4 h-4" />, count: projects.filter(p => p.category === 'pos').length },
  { id: 'ecommerce', label: 'E-commerce', icon: <Monitor className="w-4 h-4" />, count: projects.filter(p => p.category === 'ecommerce').length },
  { id: 'mobile', label: 'Mobile Apps', icon: <Smartphone className="w-4 h-4" />, count: projects.filter(p => p.category === 'mobile').length },
  { id: 'system', label: 'Sistemas', icon: <Server className="w-4 h-4" />, count: projects.filter(p => p.category === 'system').length },
];

const Portfolio: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [expandedProject, setExpandedProject] = useState<number | null>(null);
  const [viewMode] = useState<'grid' | 'list'>('grid'); // ← Cambiado a 'grid' por default (más visual)
  

  const filteredProjects = projects.filter(project => {
    const matchesFilter = filter === 'all' || project.category === filter;
    const matchesSearch = search === '' || 
      project.title.toLowerCase().includes(search.toLowerCase()) ||
      project.description.toLowerCase().includes(search.toLowerCase()) ||
      project.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  


const restaurantSystems = [
  {
    title: "Selección de Mesero",
    description: "Pantalla inicial intuitiva para que cada mesero inicie su turno rápidamente.",
    image: "/assets/restaurante-meseros-perfil.png", // ← Usa tu captura original aquí
    tags: ["UX Rápida", "Perfiles", "Dark Mode"]
  },
  {
    title: "Dashboard de Órdenes",
    description: "Vista principal con mesas, órdenes en curso y totales en tiempo real.",
    image: "/assets/restaurante-dashboard.png", // ← Agrega esta captura si la tienes
    tags: ["Real-time", "Mesas", "Órdenes"]
  },
  {
    title: "Gestión de Mesas",
    description: "Mapa interactivo de mesas con estado (libre, ocupada, cuenta abierta).",
    image: "/assets/restaurante-mesas.png",
    tags: ["Table Management", "Visual", "Touch Friendly"]
  },
  {
    title: "Cobro y Facturación",
    description: "Interfaz de pago rápida con división de cuentas y facturación electrónica.",
    image: "/assets/restaurante-cobro.png",
    tags: ["Pagos", "CFDI", "Split Bill"]
  },
  {
    title: "Órdenes en Cocina / Impresión",
    description: "Envío automático a cocina y tickets de comanda claros.",
    image: "/assets/restaurante-cocina.png",
    tags: ["Kitchen Display", "Printer", "Automatizado"]
  },
  // Agrega más si tienes otras pantallas
];


  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setExpandedProject(null);
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white"> {/* Fondo negro sólido en toda la página */}
      
      {/* Hero Section - más impactante */}
      <section className="relative pt-24 pb-16 overflow-hidden border-b border-gray-900">
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-5xl mx-auto text-center"
          >
            <h1 className="text-5xl md:text-7xl font-light mb-6 tracking-tight">
              Nuestro <span className="text-blue-400">Portafolio</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-10">
              Proyectos reales que impulsan negocios. Cada captura muestra el resultado final.
            </p>

            <div className="flex flex-wrap justify-center gap-8 text-lg">
              <div className="flex items-center gap-3">
                <Zap className="w-6 h-6 text-blue-400" />
                <span><strong className="text-white">{projects.length}</strong> Proyectos</span>
              </div>
              <div className="flex items-center gap-3">
                <Cpu className="w-6 h-6 text-cyan-400" />
                <span><strong className="text-white">{projects.filter(p => p.featured).length}</strong> Destacados</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters & Search - sticky */}
      <section className="sticky top-0 z-40 py-4 bg-black/90 backdrop-blur-xl border-b border-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex-1 max-w-xl">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-600" />
                <input
                  type="text"
                  placeholder="Buscar proyectos..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-900 border border-gray-800 rounded-xl focus:outline-none focus:border-blue-600 transition-colors"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setFilter(category.id)}
                  className={`group flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all text-sm font-medium ${
                    filter === category.id
                      ? 'bg-blue-900/40 text-blue-300 border border-blue-800/50'
                      : 'text-gray-400 hover:text-gray-200 hover:bg-gray-900/50 border border-gray-800'
                  }`}
                >
                  {category.icon}
                  {category.label}
                  <span className="text-xs px-2 py-0.5 rounded-full bg-gray-800/80">
                    {category.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects - Grid por default, imágenes grandes visibles inmediatamente */}
      <section className="py-12 pb-20">
        <div className="container mx-auto px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={filter + viewMode + search}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className={viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' 
                : 'space-y-10'}
            >
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="group"
                >
                  {viewMode === 'grid' ? (
                    // GRID VIEW - Imagen grande visible de inmediato
                    <div className="relative bg-gray-950 border border-gray-800 rounded-2xl overflow-hidden hover:border-blue-800/50 transition-all duration-300 shadow-xl shadow-black/40">
                      {/* Imagen principal - grande y visible siempre */}
                      <div className="relative aspect-video overflow-hidden">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                        
                        {/* Badges */}
                        {project.featured && (
                          <div className="absolute top-4 left-4 z-10">
                            <span className="px-3 py-1 bg-blue-600/80 backdrop-blur-sm rounded-full text-xs font-bold flex items-center gap-1.5">
                              <Zap className="w-3.5 h-3.5" /> Destacado
                            </span>
                          </div>
                        )}
                        <div className="absolute top-4 right-4 z-10">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${
                            project.status === 'active' ? 'bg-green-900/70 text-green-300' :
                            project.status === 'completed' ? 'bg-blue-900/70 text-blue-300' :
                            'bg-yellow-900/70 text-yellow-300'
                          }`}>
                            {project.status === 'active' ? 'Activo' : project.status === 'completed' ? 'Completado' : 'Mantenimiento'}
                          </span>
                        </div>
                      </div>

                      {/* Contenido */}
                      <div className="p-6">
                        <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-400 transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                          {project.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-5">
                          {project.tags.map((tag, i) => (
                            <span key={i} className="px-3 py-1 text-xs bg-gray-900 rounded-full border border-gray-800">
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center justify-between">
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium text-sm group/link"
                          >
                            Visitar proyecto
                            <ArrowUpRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1" />
                          </a>

                          <button
                            onClick={() => setExpandedProject(project.id === expandedProject ? null : project.id)}
                            className="text-gray-500 hover:text-gray-300"
                          >
                            <Eye className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    // LIST VIEW - también con imagen visible grande
                    <div className="grid md:grid-cols-12 gap-6 bg-gray-950 border border-gray-800 rounded-2xl overflow-hidden hover:border-blue-800/50 transition-all p-6">
                      <div className="md:col-span-5 lg:col-span-4">
                        <div className="relative rounded-xl overflow-hidden aspect-video">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      <div className="md:col-span-7 lg:col-span-8 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between mb-3">
                            <h3 className="text-2xl font-semibold group-hover:text-blue-400 transition-colors">
                              {project.title}
                            </h3>
                            <span className={`px-4 py-1.5 rounded-full text-sm font-medium ${
                              project.status === 'active' ? 'bg-green-900/60 text-green-300' : 
                              project.status === 'completed' ? 'bg-blue-900/60 text-blue-300' : 
                              'bg-yellow-900/60 text-yellow-300'
                            }`}>
                              {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                            </span>
                          </div>
                          <p className="text-gray-300 mb-4">{project.description}</p>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.tags.map((tag, i) => (
                            <span key={i} className="px-3 py-1 text-sm bg-gray-900 rounded-full border border-gray-800">
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center justify-between">
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-900/40 hover:bg-blue-800/50 rounded-xl transition-colors font-medium"
                          >
                            Visitar <ExternalLink className="w-4 h-4" />
                          </a>
                          <button
                            onClick={() => setExpandedProject(project.id === expandedProject ? null : project.id)}
                            className="text-gray-400 hover:text-white"
                          >
                            {expandedProject === project.id ? 'Ocultar detalles' : 'Ver detalles'}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredProjects.length === 0 && (
            <div className="text-center py-32">
              <Search className="w-16 h-16 mx-auto mb-6 text-gray-700" />
              <h3 className="text-3xl font-light mb-4">No se encontraron proyectos</h3>
              <p className="text-gray-500 mb-8">Prueba cambiando el filtro o limpiando la búsqueda</p>
              <button
                onClick={() => { setFilter('all'); setSearch(''); }}
                className="px-8 py-4 bg-blue-900/40 hover:bg-blue-800/50 rounded-xl transition-colors"
              >
                Ver todos los proyectos
              </button>
            </div>
          )}
        </div>
      </section>


      {/* NUEVA SECCIÓN: Sistemas para Restaurantes */}
      <section className="py-16 border-b border-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gray-900 rounded-full border border-gray-800 mb-6">
              <UtensilsCrossed className="w-6 h-6 text-green-400" />
              <h2 className="text-3xl md:text-4xl font-light">
                Sistemas para <span className="text-green-400">Restaurantes</span>
              </h2>
            </div>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Solución completa de Punto de Venta diseñada para optimizar el flujo de operaciones en restaurantes, con interfaz táctil rápida y dark mode para entornos con poca luz.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {restaurantSystems.map((sys, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-gray-950 border border-gray-800 rounded-2xl overflow-hidden hover:border-green-800/50 transition-all duration-300 shadow-xl shadow-black/40"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={sys.image}
                    alt={sys.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-green-400 transition-colors">
                    {sys.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    {sys.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {sys.tags.map((tag, i) => (
                      <span key={i} className="px-3 py-1 text-xs bg-gray-900 rounded-full border border-gray-800">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA para más info o contacto */}
          <div className="text-center mt-12">
            <a
              href="/contacto"
              className="inline-flex items-center gap-3 px-8 py-4 bg-green-900/40 hover:bg-green-800/50 rounded-xl border border-green-800/50 transition-all font-medium text-lg"
            >
              ¿Quieres este sistema en tu restaurante? <ArrowUpRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Botón volver arriba */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 p-4 bg-gray-900 border border-gray-800 rounded-full hover:border-blue-600 transition-colors z-50 shadow-2xl"
      >
        <ChevronRight className="w-6 h-6 transform -rotate-90" />
      </button>
    </div>
  );
};

export default Portfolio;