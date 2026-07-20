// src/pages/Clients.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
   Globe, Zap, Users, 
  Briefcase, Server, ShoppingCart, 
  Gamepad2, ChevronRight, Search, 
   ArrowUpRight, Star
} from 'lucide-react';

interface Client {
  id: number;
  name: string;
  logo?: string;           // Ruta a logo si tienes (/assets/amq-logo.png, etc.)
  description: string;
  industry: string;
  services: string[];      // Ej: ['Diseño Web', 'POS', 'Hosting']
  link?: string;
  featured: boolean;
  testimonial?: string;
  year: number;
}

const clients: Client[] = [
  {
    id: 1,
    name: 'Automanufacturas de Querétaro',
    logo: '/assets/amq-logo.png',
    description: 'Líder en manufactura automotriz en Querétaro. Plataforma B2B con e-commerce y gestión de inventario.',
    industry: 'Manufactura / Industrial',
    services: ['Sitio Web Corporativo', 'E-commerce', 'Mantenimiento'],
    link: 'https://www.amq.com.mx/',
    featured: true,
    testimonial: 'Revolution 505 transformó nuestra presencia digital. Excelente atención y resultados rápidos.',
    year: 2023
  },
  {
    id: 2,
    name: 'FlyZZ Services',
    logo: '/assets/FLYZZ-logo.png',
    description: 'Empresa de servicios digitales con enfoque en experiencia de usuario y rendimiento óptimo.',
    industry: 'Servicios Digitales',
    services: ['Diseño Web', 'Optimización SEO', 'Hosting'],
    link: 'https://flyzz.com.mx/',
    featured: true,
    year: 2023
  },
  {
    id: 3,
    name: 'League Querétaro Championship (LQC)',
    logo: '/assets/lqc-logo.png', // ← agrega el logo si lo tienes
    description: 'Plataforma oficial de torneos gaming en Querétaro con sistema POS y gestión de eventos.',
    industry: 'Gaming / eSports',
    services: ['Sistema POS', 'Desarrollo Web', 'Streaming Integrado'],
    link: 'https://lqc.revolution505.com',
    featured: true,
    year: 2024
  },
  {
    id: 4,
    name: 'ATAKGG Business',
    logo: '/assets/atakgg-logo.png', // ← placeholder o tu logo real
    description: 'Stats con RIOT API',
    industry: 'Retail / Punto de Venta',
    services: ['Sistema POS', 'Facturación CFDI', 'Reportes Avanzados'],
    link: 'https://atakgg.revolution505.com',
    featured: true,
    year: 2024
  },
  {
    id: 5,
    name: 'La Peña de Santiago',
    logo: '/assets/pena-logo.png',
    description: 'Atracción turística con portal de reservas y contenido multimedia.',
    industry: 'Turismo / Hospitalidad',
    services: ['Sitio Web', 'Sistema de Reservas', 'SEO Local'],
    link: 'https://xn--lapeadesantiago-1qb.com/',
    featured: false,
    year: 2023
  },
  {
    id: 6,
    name: 'Spartan TV Plus',
    description: 'Plataforma de streaming con contenido exclusivo y recomendaciones inteligentes.',
    industry: 'Entretenimiento / Media',
    services: ['Desarrollo Web', 'Streaming', 'Panel Admin'],
    link: 'https://spartantvplus.com/',
    featured: false,
    year: 2024
  },
  // Puedes agregar más clientes aquí...
];

const serviceTypes = [
  { id: 'all', label: 'Todos', icon: <Users className="w-4 h-4" /> },
  { id: 'web', label: 'Sitios Web', icon: <Globe className="w-4 h-4" /> },
  { id: 'pos', label: 'Sistemas POS', icon: <ShoppingCart className="w-4 h-4" /> },
  { id: 'hosting', label: 'Hosting', icon: <Server className="w-4 h-4" /> },
  { id: 'gaming', label: 'Gaming/eSports', icon: <Gamepad2 className="w-4 h-4" /> },
];

const Clients: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');
  const [search, setSearch] = useState('');

  const filteredClients = clients.filter(client => {
    const matchesFilter = filter === 'all' || client.services.some(s => s.toLowerCase().includes(filter));
    const matchesSearch = search === '' || 
      client.name.toLowerCase().includes(search.toLowerCase()) ||
      client.industry.toLowerCase().includes(search.toLowerCase()) ||
      client.description.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-black to-gray-950 text-white">
      {/* Hero Section - igual estilo que Portfolio */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 via-transparent to-cyan-900/5" />
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-5xl md:text-6xl font-light mb-6 tracking-tight">
              <span className="text-gray-300">Nuestros</span>{' '}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Clientes
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Empresas y proyectos que confían en Revolution 505 para transformar su presencia digital 
              y optimizar sus operaciones con tecnología de vanguardia.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filtros y búsqueda - mismo estilo que Portfolio */}
      <section className="sticky top-0 z-40 py-4 bg-black/80 backdrop-blur-xl border-b border-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex-1 max-w-xl">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  placeholder="Buscar clientes por nombre o industria..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-900/50 border border-gray-800 rounded-lg focus:outline-none focus:border-blue-500/50 transition-colors"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {serviceTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setFilter(type.id)}
                  className={`group flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    filter === type.id
                      ? 'bg-gradient-to-r from-blue-900/30 to-cyan-900/30 text-blue-400 border border-blue-800/30'
                      : 'text-gray-500 hover:text-gray-300 hover:bg-gray-900/50'
                  }`}
                >
                  <span>{type.icon}</span>
                  <span className="text-sm font-medium">{type.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Lista de clientes */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={filter + search}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredClients.map((client, index) => (
                <motion.div
                  key={client.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="group relative bg-gray-900/30 border border-gray-800/40 rounded-2xl overflow-hidden hover:border-blue-800/40 hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-300"
                >
                  {/* Featured badge */}
                  {client.featured && (
                    <div className="absolute top-4 left-4 z-10">
                      <div className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-yellow-600/80 to-amber-600/80 backdrop-blur-sm rounded-full border border-yellow-500/30 text-xs font-medium">
                        <Star className="w-3.5 h-3.5 fill-yellow-300 text-yellow-300" />
                        Destacado
                      </div>
                    </div>
                  )}

                  {/* Logo / Imagen */}
                  <div className="h-48 bg-gradient-to-br from-gray-950 to-black flex items-center justify-center p-8 border-b border-gray-800/50">
                    {client.logo ? (
                      <img 
                        src={client.logo} 
                        alt={client.name} 
                        className="max-h-28 max-w-[80%] object-contain opacity-90 group-hover:opacity-100 transition-opacity"
                      />
                    ) : (
                      <div className="text-6xl text-blue-900/30 font-light">
                        {client.name.charAt(0)}
                      </div>
                    )}
                  </div>

                  {/* Contenido */}
                  <div className="p-6">
                    <h3 className="text-xl font-light text-gray-100 mb-2 group-hover:text-white transition-colors">
                      {client.name}
                    </h3>
                    
                    <p className="text-sm text-gray-400 mb-4 line-clamp-3">
                      {client.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {client.services.map((service, idx) => (
                        <span 
                          key={idx}
                          className="px-3 py-1 text-xs bg-gray-800/50 text-blue-300 rounded-full border border-gray-700/50"
                        >
                          {service}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="text-gray-500">
                        {client.industry} • {client.year}
                      </div>
                      
                      {client.link && (
                        <a
                          href={client.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-blue-400 hover:text-blue-300 transition-colors"
                        >
                          Visitar <ArrowUpRight className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Testimonial si existe */}
                  {client.testimonial && (
                    <div className="px-6 pb-6 pt-2 border-t border-gray-800/40 bg-gray-950/30">
                      <p className="text-sm italic text-gray-300 opacity-80">
                        "{client.testimonial}"
                      </p>
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredClients.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24"
            >
              <div className="w-20 h-20 mx-auto mb-6 bg-gray-800/50 rounded-full flex items-center justify-center">
                <Search className="w-10 h-10 text-gray-600" />
              </div>
              <h3 className="text-2xl font-light mb-3 text-gray-300">No se encontraron clientes</h3>
              <p className="text-gray-500 mb-8">Prueba con otros filtros o términos de búsqueda</p>
              <button
                onClick={() => {
                  setFilter('all');
                  setSearch('');
                }}
                className="px-6 py-3 bg-gradient-to-r from-blue-900/30 to-cyan-900/30 border border-blue-800/30 rounded-lg hover:border-blue-700/50 transition-colors"
              >
                Limpiar filtros
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Estadísticas (similar a Portfolio) */}
      <section className="py-20 border-t border-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: <Users className="w-8 h-8" />, value: '20+', label: 'Clientes Activos' },
              { icon: <Briefcase className="w-8 h-8" />, value: '5+', label: 'Industrias' },
              { icon: <Zap className="w-8 h-8" />, value: '98%', label: 'Satisfacción' },
              { icon: <Star className="w-8 h-8" />, value: '4.9/5', label: 'Calificación' },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="inline-flex p-4 bg-gray-900/50 rounded-xl border border-gray-800/50 mb-4 text-cyan-400">
                  {stat.icon}
                </div>
                <div className="text-3xl font-light text-gray-100 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Botón volver arriba */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 p-3 bg-gray-900/80 backdrop-blur-sm border border-gray-800/50 rounded-lg hover:border-cyan-500/50 transition-colors z-40"
      >
        <ChevronRight className="w-5 h-5 transform -rotate-90" />
      </button>
    </div>
  );
};

export default Clients;