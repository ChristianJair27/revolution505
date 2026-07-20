// src/pages/Blog.tsx
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, Clock,  User, Search, 
  ChevronRight,  BookOpen, 
  Code2,  Cpu, Layers,  X,
  ShoppingCart, Briefcase,  Brain,
  TrendingUp, MessageSquare, Sparkles,
   Eye, Bookmark, Share2,
   Bot,  Server,
   Shield, 
  
  RefreshCw, BookText
} from 'lucide-react';

interface Post {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  readTime: string;
  author: string;
  authorRole: string;
  category: 'tecnologia' | 'desarrollo' | 'pos' | 'negocios' | 'tutorial' | 'ia' | 'hardware' | 'seguridad';
  tags: string[];
  slug: string;
  featured: boolean;
  aiGenerated: boolean;
  views: number;
  likes: number;
  comments: number;
  difficulty: 'principiante' | 'intermedio' | 'avanzado';
  content?: string[];
}

const posts: Post[] = [
  {
    id: 1,
    title: 'Revolución en el Desarrollo Web 2026: IA, Edge Computing y Realidad Mixta',
    excerpt: 'Cómo las nuevas tecnologías están transformando la creación de aplicaciones web y qué significa para tu negocio.',
    image: '/assets/blog/future-web-2026.jpg',
    date: '15 Ene 2026',
    readTime: '12 min',
    author: 'Alex Rivera',
    authorRole: 'Lead Developer',
    category: 'desarrollo',
    tags: ['IA', 'Edge Computing', 'React 19', 'Web3'],
    slug: 'revolucion-desarrollo-web-2026',
    featured: true,
    aiGenerated: true,
    views: 2450,
    likes: 156,
    comments: 42,
    difficulty: 'intermedio',
    content: [
      'Edge Computing y su impacto en el rendimiento web',
      'Integración de IA en tiempo real con WebAssembly',
      'Nuevas APIs de React 19 y optimizaciones',
      'Preparación para la Web3 y aplicaciones descentralizadas'
    ]
  },
  {
    id: 2,
    title: 'Sistemas POS del Futuro: Automatización Inteligente con IA',
    excerpt: 'Cómo implementar sistemas de punto de venta que aprenden de tus clientes y optimizan inventario automáticamente.',
    image: '/assets/blog/ai-pos-systems.jpg',
    date: '12 Ene 2026',
    readTime: '10 min',
    author: 'María Gómez',
    authorRole: 'Product Manager',
    category: 'pos',
    tags: ['IA', 'Automatización', 'Inventario', 'React', 'Node.js'],
    slug: 'sistemas-pos-ia-automatizacion',
    featured: true,
    aiGenerated: true,
    views: 1890,
    likes: 203,
    comments: 67,
    difficulty: 'intermedio',
    content: [
      'Análisis predictivo de inventario con machine learning',
      'Sistemas de recomendación personalizados',
      'Automatización de reposición inteligente',
      'Integración con APIs de pago avanzadas'
    ]
  },
  {
    id: 3,
    title: 'Ciberseguridad para PYMES 2026: Estrategias que Realmente Funcionan',
    excerpt: 'Guía práctica para proteger tu negocio digital sin necesidad de ser un experto en seguridad.',
    image: '/assets/blog/cyber-security-2026.jpg',
    date: '8 Ene 2026',
    readTime: '8 min',
    author: 'Carlos Security',
    authorRole: 'Security Analyst',
    category: 'seguridad',
    tags: ['Ciberseguridad', 'SSL/TLS', 'Firewalls', 'Backup'],
    slug: 'ciberseguridad-pymes-2026',
    featured: false,
    aiGenerated: false,
    views: 3120,
    likes: 189,
    comments: 54,
    difficulty: 'principiante',
    content: [
      'Configuración básica de firewalls empresariales',
      'Gestión segura de contraseñas y autenticación',
      'Protocolos SSL/TLS y certificados digitales',
      'Estrategias de backup y recuperación ante desastres'
    ]
  },
  {
    id: 4,
    title: 'Migración a la Nube: AWS vs Azure vs Google Cloud en 2026',
    excerpt: 'Análisis comparativo de las principales plataformas cloud para empresas mexicanas.',
    image: '/assets/blog/cloud-comparison-2026.jpg',
    date: '5 Ene 2026',
    readTime: '15 min',
    author: 'Laura Cloud',
    authorRole: 'Cloud Architect',
    category: 'tecnologia',
    tags: ['AWS', 'Azure', 'Google Cloud', 'Migración'],
    slug: 'migracion-cloud-comparacion-2026',
    featured: true,
    aiGenerated: true,
    views: 2780,
    likes: 145,
    comments: 38,
    difficulty: 'avanzado',
    content: [
      'Análisis de costos y ROI por plataforma',
      'Servicios específicos para empresas mexicanas',
      'Estrategias de migración paso a paso',
      'Optimización de recursos y ahorro de costos'
    ]
  },
  {
    id: 5,
    title: 'Tutorial: Crear tu Primer Asistente de IA con n8n y OpenAI',
    excerpt: 'Guía paso a paso para implementar un chatbot inteligente en tu sitio web usando herramientas low-code.',
    image: '/assets/blog/n8n-openai-tutorial.jpg',
    date: '3 Ene 2026',
    readTime: '20 min',
    author: 'David AI',
    authorRole: 'AI Specialist',
    category: 'ia',
    tags: ['n8n', 'OpenAI', 'Chatbot', 'Automatización'],
    slug: 'tutorial-asistente-ia-n8n-openai',
    featured: true,
    aiGenerated: true,
    views: 4250,
    likes: 312,
    comments: 89,
    difficulty: 'intermedio',
    content: [
      'Configuración inicial de n8n y OpenAI API',
      'Creación de flujos de trabajo automatizados',
      'Integración con WhatsApp y Messenger',
      'Métricas y mejora continua del asistente'
    ]
  },
  {
    id: 6,
    title: 'Hardware Gaming 2026: Componentes y Configuraciones Óptimas',
    excerpt: 'Guía actualizada para armar la PC gaming perfecta según presupuesto y necesidades específicas.',
    image: '/assets/blog/gaming-hardware-2026.jpg',
    date: '28 Dic 2025',
    readTime: '14 min',
    author: 'Gamer Pro',
    authorRole: 'Hardware Specialist',
    category: 'hardware',
    tags: ['Gaming', 'RTX 5000', 'AMD Ryzen', 'Overclocking'],
    slug: 'hardware-gaming-configuraciones-2026',
    featured: false,
    aiGenerated: false,
    views: 1980,
    likes: 167,
    comments: 45,
    difficulty: 'intermedio',
    content: [
      'Comparativa de nuevas generaciones de GPU y CPU',
      'Configuraciones optimizadas por presupuesto',
      'Técnicas de overclocking seguras',
      'Mantenimiento y actualización de componentes'
    ]
  },
  {
    id: 7,
    title: 'Transformación Digital: Cómo las PYMES Mexicanas Pueden Competir',
    excerpt: 'Estrategias reales y casos de éxito de empresas que lograron digitalizarse exitosamente.',
    image: '/assets/blog/digital-transformation-mx.jpg',
    date: '25 Dic 2025',
    readTime: '11 min',
    author: 'Empresa MX',
    authorRole: 'Business Consultant',
    category: 'negocios',
    tags: ['Transformación Digital', 'PYMES', 'Estrategia', 'Caso de Éxito'],
    slug: 'transformacion-digital-pymes-mexicanas',
    featured: false,
    aiGenerated: true,
    views: 1560,
    likes: 98,
    comments: 32,
    difficulty: 'principiante',
    content: [
      'Diagnóstico del nivel de digitalización actual',
      'Selección de herramientas adecuadas al negocio',
      'Capacitación del equipo y adopción tecnológica',
      'Métricas de éxito y mejora continua'
    ]
  },
  {
    id: 8,
    title: 'DevOps 2026: Automatización y CI/CD para Equipos Pequeños',
    excerpt: 'Implementación de prácticas DevOps en startups y equipos reducidos sin sobrecarga operativa.',
    image: '/assets/blog/devops-small-teams.jpg',
    date: '20 Dic 2025',
    readTime: '18 min',
    author: 'DevOps Master',
    authorRole: 'DevOps Engineer',
    category: 'desarrollo',
    tags: ['DevOps', 'CI/CD', 'Docker', 'Kubernetes'],
    slug: 'devops-automatizacion-equipos-pequenos',
    featured: true,
    aiGenerated: false,
    views: 2340,
    likes: 178,
    comments: 51,
    difficulty: 'avanzado',
    content: [
      'Automatización de pipelines con GitHub Actions',
      'Contenedores Docker para desarrollo local',
      'Orquestación básica con Kubernetes',
      'Monitorización y alertas automáticas'
    ]
  },
  {
    id: 9,
    title: 'SEO Técnico 2026: Más Allá de las Palabras Clave',
    excerpt: 'Optimizaciones técnicas que realmente importan en los algoritmos de búsqueda actuales.',
    image: '/assets/blog/technical-seo-2026.jpg',
    date: '18 Dic 2025',
    readTime: '9 min',
    author: 'SEO Expert',
    authorRole: 'SEO Specialist',
    category: 'tutorial',
    tags: ['SEO', 'Performance', 'Core Web Vitals', 'Structured Data'],
    slug: 'seo-tecnico-optimizacion-2026',
    featured: false,
    aiGenerated: true,
    views: 2890,
    likes: 145,
    comments: 41,
    difficulty: 'intermedio',
    content: [
      'Optimización de Core Web Vitals',
      'Estructuración de datos para rich snippets',
      'Rendimiento mobile-first',
      'Estrategias de link building modernas'
    ]
  },
  {
    id: 10,
    title: 'Inteligencia Artificial Generativa: Herramientas Prácticas para Desarrolladores',
    excerpt: 'Recursos y herramientas de IA generativa que puedes implementar hoy en tus proyectos.',
    image: '/assets/blog/generative-ai-tools.jpg',
    date: '15 Dic 2025',
    readTime: '16 min',
    author: 'AI Developer',
    authorRole: 'AI Developer',
    category: 'ia',
    tags: ['Generative AI', 'GPT-4', 'DALL-E', 'Midjourney'],
    slug: 'ia-generativa-herramientas-desarrolladores',
    featured: true,
    aiGenerated: true,
    views: 3670,
    likes: 245,
    comments: 78,
    difficulty: 'avanzado',
    content: [
      'Integración de APIs de OpenAI y Google AI',
      'Generación de contenido automático',
      'Creación de imágenes con IA',
      'Optimización de prompts para mejores resultados'
    ]
  }
];

const categories = [
  { id: 'all', label: 'Todos', icon: <Layers className="w-4 h-4" />, count: posts.length, color: 'from-gray-600 to-gray-400' },
  { id: 'ia', label: 'Inteligencia Artificial', icon: <Brain className="w-4 h-4" />, count: posts.filter(p => p.category === 'ia').length, color: 'from-purple-600 to-pink-500' },
  { id: 'desarrollo', label: 'Desarrollo', icon: <Code2 className="w-4 h-4" />, count: posts.filter(p => p.category === 'desarrollo').length, color: 'from-cyan-600 to-blue-500' },
  { id: 'pos', label: 'Sistemas POS', icon: <ShoppingCart className="w-4 h-4" />, count: posts.filter(p => p.category === 'pos').length, color: 'from-green-600 to-emerald-500' },
  { id: 'tecnologia', label: 'Tecnología', icon: <Cpu className="w-4 h-4" />, count: posts.filter(p => p.category === 'tecnologia').length, color: 'from-blue-600 to-cyan-500' },
  { id: 'seguridad', label: 'Seguridad', icon: <Shield className="w-4 h-4" />, count: posts.filter(p => p.category === 'seguridad').length, color: 'from-red-600 to-orange-500' },
  { id: 'negocios', label: 'Negocios', icon: <Briefcase className="w-4 h-4" />, count: posts.filter(p => p.category === 'negocios').length, color: 'from-indigo-600 to-purple-500' },
  { id: 'hardware', label: 'Hardware', icon: <Server className="w-4 h-4" />, count: posts.filter(p => p.category === 'hardware').length, color: 'from-yellow-600 to-amber-500' },
  { id: 'tutorial', label: 'Tutoriales', icon: <BookOpen className="w-4 h-4" />, count: posts.filter(p => p.category === 'tutorial').length, color: 'from-teal-600 to-green-500' },
];

const Blog: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const filteredPosts = posts.filter(post => {
    const matchesFilter = filter === 'all' || post.category === filter;
    const matchesSearch = search === '' || 
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(search.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase())) ||
      post.author.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

 
  const trendingPosts = [...posts].sort((a, b) => b.views - a.views).slice(0, 3);
  const aiGeneratedPosts = posts.filter(p => p.aiGenerated);

  const categoryIcons = {
    ia: <Brain className="w-5 h-5" />,
    desarrollo: <Code2 className="w-5 h-5" />,
    pos: <ShoppingCart className="w-5 h-5" />,
    tecnologia: <Cpu className="w-5 h-5" />,
    seguridad: <Shield className="w-5 h-5" />,
    negocios: <Briefcase className="w-5 h-5" />,
    hardware: <Server className="w-5 h-5" />,
    tutorial: <BookOpen className="w-5 h-5" />,
  };

  const difficultyColors = {
    principiante: 'bg-green-900/30 text-green-400 border-green-800/30',
    intermedio: 'bg-blue-900/30 text-blue-400 border-blue-800/30',
    avanzado: 'bg-purple-900/30 text-purple-400 border-purple-800/30'
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedPost(null);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-black to-gray-950 text-white">
      {/* Hero Section */}
      <section className="relative pt-24 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-cyan-900/10" />
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            <div className="flex flex-col lg:flex-row items-start justify-between gap-8 mb-12">
              <div className="flex-1">
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-800/30 mb-6">
                  <Brain className="w-4 h-4 text-purple-400" />
                  <span className="text-sm font-medium text-purple-300">Blog con IA Integrada</span>
                </div>

                <h1 className="text-5xl md:text-6xl font-light mb-6 tracking-tight">
                  <span className="text-gray-300">Blog</span>
                  <br />
                  <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    Revolution505
                  </span>
                </h1>

                <p className="text-xl text-gray-400 max-w-3xl leading-relaxed mb-8">
                  Descubre las últimas tendencias en tecnología, desarrollo web, IA y negocios. 
                  Contenido generado y analizado con inteligencia artificial para ofrecerte insights valiosos.
                </p>

                <div className="flex flex-wrap items-center gap-6">
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      {['A', 'B', 'C'].map((letter, idx) => (
                        <div key={idx} className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-600 to-blue-600 flex items-center justify-center text-xs font-bold">
                          {letter}
                        </div>
                      ))}
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Escrito por expertos</div>
                      <div className="text-sm text-gray-300">+15 especialistas</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 text-sm">
                    <div className="text-center">
                      <div className="text-2xl font-light text-cyan-400">{posts.length}+</div>
                      <div className="text-gray-400">Artículos</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-light text-cyan-400">AI</div>
                      <div className="text-gray-400">Powered</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* AI Assistant Preview */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="lg:w-96"
              >
                <div className="bg-gradient-to-br from-gray-900/50 to-gray-900/30 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl">
                      <Bot className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Asistente de IA</h3>
                      <p className="text-sm text-gray-400">Próximamente con n8n</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center flex-shrink-0">
                        <Brain className="w-4 h-4 text-purple-400" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-300">Generación automática de contenido</div>
                        <div className="text-xs text-gray-500">Basado en tendencias actuales</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center flex-shrink-0">
                        <RefreshCw className="w-4 h-4 text-blue-400" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-300">Actualización en tiempo real</div>
                        <div className="text-xs text-gray-500">Contenido siempre relevante</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center flex-shrink-0">
                        <TrendingUp className="w-4 h-4 text-green-400" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-300">Análisis de engagement</div>
                        <div className="text-xs text-gray-500">Optimización basada en datos</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-800/50">
                    <button className="w-full py-3 bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-800/30 rounded-lg hover:border-purple-700/50 transition-colors text-sm font-medium">
                      Notificarme cuando esté disponible
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Search Bar */}
            <div className="relative max-w-2xl">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                ref={searchRef}
                type="text"
                placeholder="Buscar artículos sobre IA, desarrollo web, negocios..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-gray-900/50 border border-gray-800 rounded-xl focus:outline-none focus:border-blue-500/50 transition-colors text-lg"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-6 border-y border-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setFilter(cat.id)}
                  className={`group flex items-center gap-3 px-5 py-3 rounded-xl transition-all ${
                    filter === cat.id
                      ? `bg-gradient-to-r ${cat.color} text-white shadow-lg`
                      : 'bg-gray-900/30 text-gray-400 hover:text-gray-300 hover:bg-gray-800/50'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span className="font-medium">{cat.label}</span>
                  <span className={`text-xs px-2 py-1 rounded ${
                    filter === cat.id ? 'bg-white/20 text-white' : 'bg-gray-800 text-gray-400'
                  }`}>
                    {cat.count}
                  </span>
                </button>
              ))}
            </div>

            <div className="hidden lg:flex items-center gap-3">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-blue-900/30 text-blue-400' : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                <Layers className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-blue-900/30 text-blue-400' : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                <BookText className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Featured Posts */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-yellow-400" />
                  <h2 className="text-2xl font-semibold">
                    {filter === 'all' ? 'Artículos Destacados' : `Artículos de ${categories.find(c => c.id === filter)?.label}`}
                  </h2>
                </div>
                <div className="text-sm text-gray-500">
                  Mostrando {filteredPosts.length} de {posts.length} artículos
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={filter + viewMode}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-6' : 'space-y-6'}
                >
                  {filteredPosts.map((post, index) => (
                    <motion.article
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      className={viewMode === 'list' 
                        ? 'group flex flex-col lg:flex-row gap-6 p-6 bg-gray-900/30 border border-gray-800/30 rounded-2xl hover:border-blue-800/30 transition-all'
                        : 'group bg-gray-900/30 border border-gray-800/30 rounded-2xl overflow-hidden hover:border-blue-800/30 transition-all'
                      }
                    >
                      {viewMode === 'list' ? (
                        <>
                          {/* List View */}
                          <div className="lg:w-64 flex-shrink-0">
                            <div className="relative aspect-video rounded-xl overflow-hidden">
                              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-cyan-900/20 z-10" />
                              <img
                                src={post.image}
                                alt={post.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </div>

                          <div className="flex-1">
                            <div className="flex items-center gap-4 mb-4">
                              <div className="flex items-center gap-2">
                                {categoryIcons[post.category]}
                                <span className="text-sm text-gray-400">{categories.find(c => c.id === post.category)?.label}</span>
                              </div>
                              <div className={`text-xs px-3 py-1 rounded-full ${difficultyColors[post.difficulty]}`}>
                                {post.difficulty}
                              </div>
                              {post.aiGenerated && (
                                <div className="flex items-center gap-1.5 text-xs px-3 py-1 rounded-full bg-purple-900/30 text-purple-400 border border-purple-800/30">
                                  <Brain className="w-3 h-3" />
                                  IA
                                </div>
                              )}
                            </div>

                            <h3 className="text-xl font-semibold mb-3 text-gray-200 group-hover:text-white transition-colors">
                              {post.title}
                            </h3>

                            <p className="text-gray-400 mb-4 leading-relaxed">
                              {post.excerpt}
                            </p>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4 text-sm text-gray-500">
                                <div className="flex items-center gap-1.5">
                                  <Calendar className="w-4 h-4" />
                                  {post.date}
                                </div>
                                <div className="flex items-center gap-1.5">
                                  <Clock className="w-4 h-4" />
                                  {post.readTime}
                                </div>
                                <div className="flex items-center gap-1.5">
                                  <Eye className="w-4 h-4" />
                                  {post.views.toLocaleString()}
                                </div>
                              </div>

                              <div className="flex items-center gap-3">
                                <button
                                  onClick={() => setSelectedPost(post)}
                                  className="text-blue-400 hover:text-blue-300 text-sm font-medium"
                                >
                                  Leer más
                                </button>
                                <button className="p-2 text-gray-500 hover:text-gray-300">
                                  <Bookmark className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          {/* Grid View */}
                          <div className="relative h-48 overflow-hidden">
                            <img
                              src={post.image}
                              alt={post.title}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/20 to-transparent" />
                            
                            <div className="absolute top-4 left-4 flex items-center gap-2">
                              {post.aiGenerated && (
                                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-900/80 backdrop-blur-sm text-xs text-purple-300 border border-purple-700/30">
                                  <Brain className="w-3 h-3" />
                                  IA
                                </div>
                              )}
                              {post.featured && (
                                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-900/80 backdrop-blur-sm text-xs text-yellow-300 border border-yellow-700/30">
                                  <Sparkles className="w-3 h-3" />
                                  Destacado
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="p-6">
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center gap-2">
                                {categoryIcons[post.category]}
                                <span className="text-sm text-gray-400">{categories.find(c => c.id === post.category)?.label}</span>
                              </div>
                              <div className={`text-xs px-2 py-1 rounded ${difficultyColors[post.difficulty]}`}>
                                {post.difficulty}
                              </div>
                            </div>

                            <h3 className="text-lg font-semibold mb-3 text-gray-200 group-hover:text-white transition-colors line-clamp-2">
                              {post.title}
                            </h3>

                            <p className="text-sm text-gray-400 mb-4 line-clamp-3">
                              {post.excerpt}
                            </p>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3 text-sm text-gray-500">
                                <div className="flex items-center gap-1.5">
                                  <Calendar className="w-3.5 h-3.5" />
                                  {post.date}
                                </div>
                                <div className="flex items-center gap-1.5">
                                  <Eye className="w-3.5 h-3.5" />
                                  {post.views.toLocaleString()}
                                </div>
                              </div>

                              <button
                                onClick={() => setSelectedPost(post)}
                                className="text-blue-400 hover:text-blue-300 text-sm font-medium"
                              >
                                Ver artículo
                              </button>
                            </div>
                          </div>
                        </>
                      )}
                    </motion.article>
                  ))}
                </motion.div>
              </AnimatePresence>

              {filteredPosts.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-20"
                >
                  <div className="w-24 h-24 mx-auto mb-6 bg-gray-900/50 rounded-full flex items-center justify-center border border-gray-800/50">
                    <Search className="w-12 h-12 text-gray-700" />
                  </div>
                  <h3 className="text-2xl font-light mb-3 text-gray-300">No se encontraron artículos</h3>
                  <p className="text-gray-500 mb-8">Intenta con otros términos de búsqueda o categorías</p>
                  <button
                    onClick={() => {
                      setFilter('all');
                      setSearch('');
                    }}
                    className="px-6 py-3 bg-gradient-to-r from-blue-900/30 to-cyan-900/30 border border-blue-800/30 rounded-lg hover:border-blue-700/50 transition-colors"
                  >
                    Mostrar todos los artículos
                  </button>
                </motion.div>
              )}
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-8">
              {/* Trending Posts */}
              <div className="bg-gray-900/30 border border-gray-800/30 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <TrendingUp className="w-5 h-5 text-orange-400" />
                  <h3 className="text-lg font-semibold">Trending Now</h3>
                </div>

                <div className="space-y-4">
                  {trendingPosts.map((post, idx) => (
                    <div key={post.id} className="group">
                      <div className="flex items-start gap-3">
                        <div className="text-2xl font-bold text-gray-700 group-hover:text-gray-600 transition-colors">
                          {idx + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors mb-1 line-clamp-2">
                            {post.title}
                          </h4>
                          <div className="flex items-center gap-3 text-xs text-gray-500">
                            <span>{post.views.toLocaleString()} views</span>
                            <span>•</span>
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Generated Content */}
              <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-800/30 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Brain className="w-5 h-5 text-purple-400" />
                  <h3 className="text-lg font-semibold">Generado por IA</h3>
                </div>

                <div className="space-y-4">
                  {aiGeneratedPosts.slice(0, 3).map((post) => (
                    <div key={post.id} className="group flex items-center gap-3 p-3 rounded-lg bg-purple-900/10 hover:bg-purple-900/20 transition-colors">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center flex-shrink-0">
                        <Brain className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors line-clamp-2">
                          {post.title}
                        </h4>
                        <div className="text-xs text-gray-400 mt-1">{post.date}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-purple-800/30">
                  <p className="text-sm text-gray-400">
                    <span className="text-purple-400 font-medium">Nota:</span> Los artículos generados por IA son revisados y optimizados por nuestro equipo editorial.
                  </p>
                </div>
              </div>

              {/* Newsletter */}
              <div className="bg-gradient-to-br from-gray-900/50 to-gray-900/30 border border-gray-800/30 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <MessageSquare className="w-5 h-5 text-cyan-400" />
                  <h3 className="text-lg font-semibold">Newsletter IA</h3>
                </div>

                <p className="text-sm text-gray-400 mb-6">
                  Recibe análisis generados por IA sobre las últimas tendencias tecnológicas directamente en tu correo.
                </p>

                <div className="space-y-4">
                  <input
                    type="email"
                    placeholder="tu@email.com"
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-800 rounded-lg focus:outline-none focus:border-cyan-500/50 transition-colors"
                  />
                  <button className="w-full py-3 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg hover:from-cyan-700 hover:to-blue-700 transition-all font-medium">
                    Suscribirme
                  </button>
                </div>

                <p className="text-xs text-gray-500 mt-4">
                  Sin spam. Puedes cancelar en cualquier momento.
                </p>
              </div>

              {/* Categories Stats */}
              <div className="bg-gray-900/30 border border-gray-800/30 rounded-2xl p-6">
                <h3 className="text-lg font-semibold mb-6">Categorías</h3>
                <div className="space-y-3">
                  {categories.slice(1).map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setFilter(cat.id)}
                      className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-800/30 transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg bg-gradient-to-br ${cat.color} bg-opacity-20`}>
                          {cat.icon}
                        </div>
                        <span className="text-sm font-medium group-hover:text-white transition-colors">
                          {cat.label}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500">{cat.count}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Modal */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start justify-center p-4 bg-black/90 backdrop-blur-sm overflow-y-auto"
            onClick={() => setSelectedPost(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-4xl bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden my-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-4 right-4 z-10 p-3 bg-gray-800/80 backdrop-blur-sm rounded-lg hover:bg-gray-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal content */}
              <div className="max-h-[90vh] overflow-y-auto custom-scrollbar">
                {/* Article header */}
                <div className="relative h-64 md:h-80">
                  <img
                    src={selectedPost.image}
                    alt={selectedPost.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-900/80 backdrop-blur-sm rounded-lg border border-gray-800">
                        {categoryIcons[selectedPost.category]}
                        <span className="text-sm">
                          {categories.find(c => c.id === selectedPost.category)?.label}
                        </span>
                      </div>
                      {selectedPost.aiGenerated && (
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-900/80 backdrop-blur-sm rounded-lg border border-purple-800">
                          <Brain className="w-4 h-4" />
                          <span className="text-sm text-purple-300">Generado por IA</span>
                        </div>
                      )}
                      <div className={`px-3 py-1.5 rounded-lg text-sm ${difficultyColors[selectedPost.difficulty]}`}>
                        {selectedPost.difficulty}
                      </div>
                    </div>
                    
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">{selectedPost.title}</h2>
                    
                    <div className="flex flex-wrap items-center gap-6 text-sm text-gray-300">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>{selectedPost.author}</span>
                        <span className="text-gray-500">• {selectedPost.authorRole}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{selectedPost.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{selectedPost.readTime} de lectura</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Article content */}
                <div className="p-8">
                  {/* Stats */}
                  <div className="flex items-center gap-6 mb-8 pb-8 border-b border-gray-800">
                    <div className="flex items-center gap-2">
                      <Eye className="w-5 h-5 text-blue-400" />
                      <span className="text-lg font-semibold">{selectedPost.views.toLocaleString()}</span>
                      <span className="text-gray-400">vistas</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-5 h-5 text-green-400" />
                      <span className="text-lg font-semibold">{selectedPost.comments}</span>
                      <span className="text-gray-400">comentarios</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-yellow-400" />
                      <span className="text-lg font-semibold">{selectedPost.likes}</span>
                      <span className="text-gray-400">likes</span>
                    </div>
                  </div>

                  {/* Excerpt */}
                  <div className="mb-8">
                    <p className="text-xl text-gray-300 leading-relaxed">{selectedPost.excerpt}</p>
                  </div>

                  {/* Content outline */}
                  {selectedPost.content && (
                    <div className="mb-8">
                      <h3 className="text-2xl font-bold mb-4">En este artículo</h3>
                      <div className="space-y-3">
                        {selectedPost.content.map((item, idx) => (
                          <div key={idx} className="flex items-start gap-3 p-4 bg-gray-800/30 rounded-lg border border-gray-700/30">
                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center text-sm font-bold flex-shrink-0">
                              {idx + 1}
                            </div>
                            <span className="text-gray-300">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tags */}
                  <div className="mb-8">
                    <h4 className="text-lg font-semibold mb-3">Tags relacionados</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedPost.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-4 py-2 bg-gray-800/50 text-cyan-400 rounded-lg border border-gray-700"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex flex-wrap gap-4 pt-8 border-t border-gray-800">
                    <button className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg hover:from-cyan-700 hover:to-blue-700 transition-all">
                      Leer artículo completo
                    </button>
                    <button className="px-6 py-3 border border-gray-700 rounded-lg hover:border-cyan-500/50 transition-colors">
                      <Bookmark className="w-4 h-4 inline mr-2" />
                      Guardar
                    </button>
                    <button className="px-6 py-3 border border-gray-700 rounded-lg hover:border-cyan-500/50 transition-colors">
                      <Share2 className="w-4 h-4 inline mr-2" />
                      Compartir
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Back to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 p-3 bg-gray-900/80 backdrop-blur-sm border border-gray-800/50 rounded-lg hover:border-cyan-500/50 transition-colors z-40"
      >
        <ChevronRight className="w-5 h-5 transform -rotate-90" />
      </button>
    </div>
  );
};

export default Blog;