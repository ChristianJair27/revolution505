// src/pages/Home.tsx
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation, useInView } from 'framer-motion';
import { 
  ArrowRight, Sparkles, Cpu, Code2, Server, 
 Shield, Cloud,
   Bot,
  TrendingUp, Users, Clock, Award,
  ChevronDown, ExternalLink,
  CheckCircle, Star, Rocket, 
  
} from 'lucide-react';

// Importación del logo
import LogoR from '../assets/logo-r.png';

const Home: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);
  const isHeroInView = useInView(heroRef, { once: true });
  const controls = useAnimation();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (isHeroInView) {
      controls.start('visible');
    }
  }, [controls, isHeroInView]);

  // Partículas en canvas
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
    }> = [];

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.3 + 0.1,
      });
    }

    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, 'rgba(10, 10, 30, 0.1)');
      gradient.addColorStop(1, 'rgba(5, 5, 20, 0.1)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.opacity = 0.2 + Math.sin(Date.now() * 0.001 + p.x * 0.01) * 0.2;

        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(100, 200, 255, ${p.opacity})`;
        ctx.fill();

        particles.forEach(otherP => {
          const dx = p.x - otherP.x;
          const dy = p.y - otherP.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(otherP.x, otherP.y);
            ctx.strokeStyle = `rgba(100, 200, 255, ${0.05 * (1 - distance / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  const services = [
    {
      icon: <Code2 className="w-8 h-8" />,
      title: "Desarrollo Web & Apps",
      description: "Sitios web modernos y aplicaciones móviles con React, Next.js y tecnologías de vanguardia.",
      features: ["React/Next.js", "TypeScript", "PWA", "SEO Avanzado"],
      gradient: "from-blue-600 to-cyan-500",
      delay: 0.1
    },
    {
      icon: <Server className="w-8 h-8" />,
      title: "Sistemas POS & ERP",
      description: "Soluciones empresariales completas con inventario, facturación y reportes en tiempo real.",
      features: ["Facturación CFDI", "Inventario", "Dashboard", "Multi-sucursal"],
      gradient: "from-purple-600 to-pink-500",
      delay: 0.2
    },
    {
      icon: <Cpu className="w-8 h-8" />,
      title: "Hardware & PC Gaming",
      description: "Equipos personalizados con componentes de alta gama para gaming, diseño y desarrollo.",
      features: ["PC Gaming", "Workstations", "Mantenimiento", "Soporte"],
      gradient: "from-orange-600 to-red-500",
      delay: 0.3
    },
    {
      icon: <Cloud className="w-8 h-8" />,
      title: "Cloud & Hosting",
      description: "Infraestructura escalable en la nube con alta disponibilidad y seguridad empresarial.",
      features: ["AWS/Azure", "Backups", "SSL", "CDN"],
      gradient: "from-green-600 to-emerald-500",
      delay: 0.4
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Ciberseguridad",
      description: "Protección integral para tu negocio digital con monitoreo 24/7 y respaldos automáticos.",
      features: ["Firewalls", "Backup", "Antivirus", "VPN"],
      gradient: "from-cyan-600 to-blue-500",
      delay: 0.5
    },
    {
      icon: <Bot className="w-8 h-8" />,
      title: "Automatización con IA",
      description: "Implementación de inteligencia artificial para optimizar procesos y tomar decisiones inteligentes.",
      features: ["Chatbots", "Análisis", "Automatización", "Machine Learning"],
      gradient: "from-violet-600 to-purple-500",
      delay: 0.6
    }
  ];

  const stats = [
    { icon: <TrendingUp />, value: "150+", label: "Proyectos Completados" },
    { icon: <Users />, value: "98%", label: "Clientes Satisfechos" },
    { icon: <Clock />, value: "24/7", label: "Soporte Técnico" },
    { icon: <Award />, value: "5+", label: "Años de Experiencia" }
  ];

  const technologies = [
    { name: "React", icon: "⚛️", color: "text-cyan-400" },
    { name: "TypeScript", icon: "📘", color: "text-blue-400" },
    { name: "Node.js", icon: "🟢", color: "text-green-400" },
    { name: "AWS", icon: "☁️", color: "text-orange-400" },
    { name: "Docker", icon: "🐳", color: "text-blue-300" },
    { name: "PostgreSQL", icon: "🐘", color: "text-blue-500" },
    { name: "Tailwind", icon: "🎨", color: "text-cyan-300" },
    { name: "Python", icon: "🐍", color: "text-yellow-400" }
  ];

  const testimonials = [
    {
      name: "Alejandro Suarez",
      role: "AMQ Group",
      content: "Revolution505 transformó completamente nuestra presencia digital. Su sistema, mantenimiento y operaciones han optimizado nuestras operaciones.",
      rating: 5
    },
    {
      name: "Regina Rome",
      role: " FlyZZ Services",
      content: "Excelente equipo profesional. Desarrollaron nuestra plataforma con tecnología de punta y soporte constante.",
      rating: 5
    },
    {
      name: "Samir",
      role: "Spartan TV",
      content: "La implementación de su sistema de streaming fue impecable. Gran atención y resultados sobresalientes.",
      rating: 5
    }
  ];

  const processSteps = [
    { step: "01", title: "Consulta", description: "Analizamos tus necesidades y objetivos" },
    { step: "02", title: "Propuesta", description: "Diseñamos una solución personalizada" },
    { step: "03", title: "Desarrollo", description: "Implementamos con metodologías ágiles" },
    { step: "04", title: "Entrega", description: "Lanzamiento con soporte continuo" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-black to-gray-950 text-white overflow-hidden">
      {/* Fondo animado */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 0 }}
      />

      {/* Efecto de gradiente interactivo */}
      <div
        className="fixed inset-0 opacity-20 pointer-events-none"
        style={{
          background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(56, 189, 248, 0.15), transparent 80%)`,
          zIndex: 1,
        }}
      />

      {/* Contenido principal */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section 
          ref={heroRef}
          className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-cyan-900/10" />
          
          <div className="container mx-auto px-4 py-20">
            <motion.div
              initial="hidden"
              animate={controls}
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.2,
                    delayChildren: 0.3,
                  },
                },
              }}
              className="max-w-6xl mx-auto text-center"
            >
              {/* Badge */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-900/30 to-cyan-900/30 border border-blue-800/30 mb-8"
              >
                <Sparkles className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-medium text-blue-300">Tecnología de Vanguardia</span>
              </motion.div>

              {/* Logo + Título principal */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="mb-10"
              >
                <motion.img
                  src={LogoR}
                  alt="Revolution 505 Logo"
                  className="mx-auto w-48 sm:w-64 md:w-80 lg:w-96 h-auto drop-shadow-2xl"
                  initial={{ scale: 0.85, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                />
              </motion.div>

              <motion.h1
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="text-5xl md:text-7xl lg:text-8xl font-light mb-6 tracking-tight"
              >
                <span className="text-gray-300">Transformamos</span>
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  Ideas en Realidad
                </span>
              </motion.h1>

              {/* Descripción */}
              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed"
              >
                Soluciones tecnológicas integrales para impulsar tu negocio en la era digital.
                Desde desarrollo web hasta hardware especializado.
              </motion.p>

              {/* Botones */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
              >
                <Link
                  to="/contacto"
                  className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl font-semibold overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    Comenzar Proyecto
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
                
                <Link
                  to="/portafolio"
                  className="px-8 py-4 border border-gray-700 rounded-xl font-semibold hover:border-blue-500/50 hover:bg-gray-900/30 transition-all"
                >
                  Ver Nuestro Trabajo
                </Link>
              </motion.div>

              {/* Stats */}
              <motion.div
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { delay: 0.6 } },
                }}
                className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto"
              >
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold text-blue-400 mb-2">{stat.value}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            >
              <ChevronDown className="w-6 h-6 text-blue-400" />
            </motion.div>
          </div>
        </section>

        {/* Servicios */}
        <section className="py-20 md:py-32 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/5 to-transparent" />
          
          <div className="container mx-auto px-4 relative">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-light mb-6">
                <span className="text-gray-300">Soluciones</span>{' '}
                <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  Integrales
                </span>
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Ofrecemos un ecosistema completo de servicios tecnológicos para cada necesidad de tu negocio
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: service.delay }}
                  className="group"
                >
                  <div className="h-full p-6 bg-gradient-to-br from-gray-900/50 to-gray-900/30 backdrop-blur-sm border border-gray-800/30 rounded-2xl hover:border-blue-500/30 transition-all duration-300">
                    <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${service.gradient} mb-6`}>
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-200 group-hover:text-white transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-400 mb-6 leading-relaxed">
                      {service.description}
                    </p>
                    <div className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-3 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span className="text-gray-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-8 pt-6 border-t border-gray-800/30">
                      <Link
                        to="/servicios"
                        className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium text-sm"
                      >
                        Más información
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Proceso de Trabajo */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/5 via-transparent to-blue-900/5" />
          
          <div className="container mx-auto px-4 relative">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-light mb-6">
                  <span className="text-gray-300">Nuestro</span>{' '}
                  <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    Proceso
                  </span>
                </h2>
                <p className="text-xl text-gray-400">
                  Metodología probada para garantizar el éxito de cada proyecto
                </p>
              </div>

              <div className="relative">
                <div className="hidden md:block absolute left-0 right-0 top-12 h-0.5 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

                <div className="grid md:grid-cols-4 gap-8">
                  {processSteps.map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="relative text-center"
                    >
                      <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border border-blue-800/30 flex items-center justify-center">
                        <span className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                          {step.step}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold mb-3 text-gray-200">
                        {step.title}
                      </h3>
                      <p className="text-gray-400">
                        {step.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tecnologías */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-light mb-6">
                <span className="text-gray-300">Tecnologías</span>{' '}
                <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  de Vanguardia
                </span>
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Utilizamos las mejores herramientas y frameworks para entregar soluciones robustas y escalables
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
              {technologies.map((tech, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="group"
                >
                  <div className="aspect-square bg-gray-900/30 backdrop-blur-sm border border-gray-800/30 rounded-xl flex flex-col items-center justify-center p-4 hover:border-blue-500/30 transition-all">
                    <span className="text-2xl mb-2">{tech.icon}</span>
                    <span className={`text-sm font-medium ${tech.color}`}>
                      {tech.name}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonios */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 via-transparent to-cyan-900/5" />
          
          <div className="container mx-auto px-4 relative">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-light mb-6">
                <span className="text-gray-300">Lo que dicen</span>{' '}
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  nuestros clientes
                </span>
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="group"
                >
                  <div className="h-full p-6 bg-gradient-to-br from-gray-900/50 to-gray-900/30 backdrop-blur-sm border border-gray-800/30 rounded-2xl hover:border-blue-500/30 transition-all">
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-gray-300 mb-6 italic leading-relaxed">
                      "{testimonial.content}"
                    </p>
                    <div className="pt-6 border-t border-gray-800/30">
                      <div className="font-semibold text-gray-200">{testimonial.name}</div>
                      <div className="text-sm text-gray-400">{testimonial.role}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-20 md:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-cyan-900/10" />
          
          <div className="container mx-auto px-4 relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto text-center"
            >
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-blue-900/30 to-cyan-900/30 border border-blue-800/30 mb-8">
                <Rocket className="w-4 h-4 text-cyan-400" />
                <span className="text-sm font-medium text-cyan-300">¿Listo para comenzar?</span>
              </div>

              <h2 className="text-4xl md:text-6xl font-light mb-8">
                <span className="text-gray-300">Impulsa tu</span>
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  Negocio Digital
                </span>
              </h2>

              <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
                Transforma tu visión en una solución tecnológica exitosa. 
                Nuestro equipo está listo para crear algo extraordinario contigo.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/contacto"
                  className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl font-semibold text-lg"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    Solicitar Cotización
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
                
                <Link
                  to="/whatsapp"
                  className="px-8 py-4 bg-green-600 hover:bg-green-700 rounded-xl font-semibold text-lg transition-colors"
                >
                  <span className="flex items-center gap-3">
                    Chat por WhatsApp
                    <ExternalLink className="w-5 h-5" />
                  </span>
                </Link>
              </div>

              <div className="mt-12 pt-8 border-t border-gray-800/30">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
                  <div className="text-center">
                    <div className="text-blue-400 font-semibold">Respuesta en 24h</div>
                    <div className="text-gray-500">Tiempo máximo de respuesta</div>
                  </div>
                  <div className="text-center">
                    <div className="text-blue-400 font-semibold">Soporte 24/7</div>
                    <div className="text-gray-500">Asistencia técnica permanente</div>
                  </div>
                  <div className="text-center">
                    <div className="text-blue-400 font-semibold">Garantía incluida</div>
                    <div className="text-gray-500">En todos nuestros servicios</div>
                  </div>
                  <div className="text-center">
                    <div className="text-blue-400 font-semibold">Pagos flexibles</div>
                    <div className="text-gray-500">Planes adaptados a tu negocio</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>

      {/* Efectos adicionales */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-500/20 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [null, Math.random() * window.innerHeight],
              x: [null, Math.random() * window.innerWidth],
            }}
            transition={{
              duration: Math.random() * 15 + 15,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;