// src/components/Footer.tsx

import { Link } from 'react-router-dom';
import { 
  Cpu, Zap, Mail, Phone, MapPin, Globe, 
  Code2, Server, Gamepad2, Shield, 
  Facebook, Twitter, Instagram, Linkedin, Github,
  Send, ArrowRight, Heart
} from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const services = [
    { name: 'Desarrollo Web', icon: <Code2 className="w-4 h-4" />, path: '/servicios/desarrollo-web' },
    { name: 'Sistemas a Medida', icon: <Cpu className="w-4 h-4" />, path: '/servicios/sistemas' },
    { name: 'Administración de Servers', icon: <Server className="w-4 h-4" />, path: '/servicios/servers' },
    { name: 'PC Gaming & Hardware', icon: <Gamepad2 className="w-4 h-4" />, path: '/gaming' },
    { name: 'Soporte IT', icon: <Shield className="w-4 h-4" />, path: '/soporte' },
    { name: 'Hosting & Cloud', icon: <Globe className="w-4 h-4" />, path: '/servicios/cloud' },
  ];

  const quickLinks = [
    { name: 'Inicio', path: '/' },
    { name: 'Portafolio', path: '/portafolio' },
    { name: 'Clientes', path: '/clientes' },
    { name: 'Blog', path: '/blog' },
    { name: 'Precios', path: '/precios' },
    { name: 'Contacto', path: '/contacto' },
  ];

  const legalLinks = [
    { name: 'Términos y Condiciones', path: '/terminos' },
    { name: 'Política de Privacidad', path: '/privacidad' },
    { name: 'Cookies', path: '/cookies' },
    { name: 'Aviso Legal', path: '/legal' },
  ];

  const socialLinks = [
    { icon: <Facebook className="w-5 h-5" />, name: 'Facebook', url: '#' },
    { icon: <Twitter className="w-5 h-5" />, name: 'Twitter', url: '#' },
    { icon: <Instagram className="w-5 h-5" />, name: 'Instagram', url: '#' },
    { icon: <Linkedin className="w-5 h-5" />, name: 'LinkedIn', url: '#' },
    { icon: <Github className="w-5 h-5" />, name: 'GitHub', url: '#' },
  ];

  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-gray-900 via-black to-gray-950 text-gray-300">
      {/* Efecto de partículas en el fondo */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-1 h-1 bg-cyan-500/20 rounded-full animate-pulse" />
        <div className="absolute top-20 right-1/3 w-1 h-1 bg-blue-500/20 rounded-full animate-pulse delay-300" />
        <div className="absolute top-40 left-2/3 w-1 h-1 bg-cyan-500/20 rounded-full animate-pulse delay-500" />
        <div className="absolute bottom-20 left-1/3 w-1 h-1 bg-blue-500/20 rounded-full animate-pulse delay-700" />
      </div>

      {/* Patrón de circuitos */}
      <div className="absolute inset-0 opacity-10 circuit-grid" />

      {/* Contenido principal */}
      <div className="relative container mx-auto px-4 py-16 md:py-24">
        <div className="grid lg:grid-cols-4 gap-10 md:gap-12">
          {/* Columna 1: Logo y descripción */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl blur opacity-70" />
                <div className="relative bg-gray-900 p-2 rounded-xl border border-gray-800">
                  <div className="flex items-center gap-2">
                    <Cpu className="w-6 h-6 text-cyan-400" />
                    <Zap className="w-5 h-5 text-blue-400" />
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Revolution505
                </h3>
                <p className="text-xs text-gray-400 font-medium tracking-widest">TECH SOLUTIONS</p>
              </div>
            </div>

            <p className="mb-8 text-gray-400 leading-relaxed">
              Transformamos ideas en soluciones tecnológicas innovadoras. Desde desarrollo de software 
              hasta hardware de última generación, potenciamos tu visión digital.
            </p>

            {/* Newsletter */}
            <div className="mb-8">
              <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Send className="w-4 h-4" />
                Suscríbete a nuestro newsletter
              </h4>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="tu@email.com"
                  className="flex-1 px-4 py-3 bg-gray-900/50 border border-gray-800 rounded-lg focus:outline-none focus:border-cyan-500/50 transition-colors"
                />
                <button className="px-4 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 rounded-lg transition-all">
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Contacto directo */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-900/50 rounded-lg">
                  <Phone className="w-4 h-4 text-cyan-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">WhatsApp</p>
                  <p className="font-medium">+52 442 433 9336</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-900/50 rounded-lg">
                  <Mail className="w-4 h-4 text-cyan-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Email</p>
                  <p className="font-medium">contacto@revolution505.com</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-900/50 rounded-lg">
                  <MapPin className="w-4 h-4 text-cyan-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Ubicación</p>
                  <p className="font-medium">México</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Columna 2: Servicios */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="text-white text-lg font-bold mb-6 pb-3 border-b border-gray-800/50">
              Nuestros Servicios
            </h4>
            <ul className="space-y-3">
              {services.map((service, idx) => (
                <li key={idx}>
                  <Link
                    to={service.path}
                    className="flex items-center gap-3 text-gray-400 hover:text-cyan-400 hover:translate-x-1 transition-all group"
                  >
                    <span className="text-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                    <span className="text-cyan-400">{service.icon}</span>
                    <span>{service.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Columna 3: Enlaces rápidos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="text-white text-lg font-bold mb-6 pb-3 border-b border-gray-800/50">
              Enlaces Rápidos
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, idx) => (
                <li key={idx}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-cyan-400 hover:translate-x-1 transition-all flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-cyan-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-10">
              <h4 className="text-white text-lg font-bold mb-6 pb-3 border-b border-gray-800/50">
                Legal
              </h4>
              <ul className="space-y-3">
                {legalLinks.map((link, idx) => (
                  <li key={idx}>
                    <Link
                      to={link.path}
                      className="text-gray-400 hover:text-cyan-400 hover:translate-x-1 transition-all flex items-center gap-2 group"
                    >
                      <span className="w-1 h-1 bg-cyan-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Columna 4: Redes sociales y certificaciones */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="text-white text-lg font-bold mb-6 pb-3 border-b border-gray-800/50">
              Conéctate con Nosotros
            </h4>
            
            {/* Redes sociales */}
            <div className="mb-8">
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social, idx) => (
                  <a
                    key={idx}
                    href={social.url}
                    className="p-3 bg-gray-900/50 border border-gray-800 rounded-lg hover:border-cyan-500/50 hover:bg-cyan-900/20 hover:text-cyan-400 transition-all group"
                    aria-label={social.name}
                  >
                    <div className="group-hover:scale-110 transition-transform">
                      {social.icon}
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Certificaciones */}
            <div className="mb-8">
              <h5 className="text-white font-semibold mb-4">Certificaciones</h5>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-gray-900/30 border border-gray-800 rounded-lg text-center">
                  <div className="text-cyan-400 font-bold text-sm">ISO 27001</div>
                  <div className="text-xs text-gray-400">Seguridad</div>
                </div>
                <div className="p-3 bg-gray-900/30 border border-gray-800 rounded-lg text-center">
                  <div className="text-cyan-400 font-bold text-sm">AWS</div>
                  <div className="text-xs text-gray-400">Partner</div>
                </div>
              </div>
            </div>

            {/* Horarios */}
            <div>
              <h5 className="text-white font-semibold mb-3">Horarios de Atención</h5>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Lun - Vie</span>
                  <span className="text-cyan-400">9:00 - 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Sábados</span>
                  <span className="text-cyan-400">10:00 - 14:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Soporte 24/7</span>
                  <span className="text-cyan-400">Emergencias</span>
                </div>
              </div>
            </div>

            {/* Métodos de pago */}
            <div className="mt-8">
              <h5 className="text-white font-semibold mb-3">Métodos de Pago</h5>
              <div className="flex flex-wrap gap-2">
                {['Visa', 'Mastercard', 'PayPal', 'Transferencia'].map((method, idx) => (
                  <div
                    key={idx}
                    className="px-3 py-1 bg-gray-900/50 border border-gray-800 rounded-lg text-sm"
                  >
                    {method}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Línea divisoria con efecto */}
        <div className="relative my-12">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-800"></div>
          </div>
          <div className="relative flex justify-center">
            <div className="px-4 bg-black">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-900/30 to-blue-900/30 rounded-full border border-gray-800 flex items-center justify-center">
                <Cpu className="w-6 h-6 text-cyan-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Copyright y pie final */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-gray-400 text-sm">
              <p>
                © 2025 - {currentYear} Revolution505 Tech Solutions. Todos los derechos reservados.
              </p>
              <p className="mt-1">
                Registro de marca: Revolution 505® 
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <Link
                to="/sitemap"
                className="text-gray-400 hover:text-cyan-400 text-sm transition-colors"
              >
                Mapa del sitio
              </Link>
              <span className="text-gray-600">•</span>
              <Link
                to="/politica-cookies"
                className="text-gray-400 hover:text-cyan-400 text-sm transition-colors"
              >
                Configurar cookies
              </Link>
              <span className="text-gray-600">•</span>
              <Link
                to="/contacto"
                className="text-gray-400 hover:text-cyan-400 text-sm transition-colors"
              >
                Reportar problema
              </Link>
            </div>
          </div>

          {/* Mensaje final */}
          <div className="mt-8 pt-6 border-t border-gray-800/30">
            <p className="text-gray-500 text-sm flex items-center justify-center gap-2">
              <span>Hecho con</span>
              <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
              <span>en México •</span>
              <span className="text-cyan-400">#TechForFuture</span>
            </p>
            <p className="text-gray-600 text-xs mt-2">
              v2.5.0 • Build: REV505-{currentYear} • Última actualización: {new Date().toLocaleDateString('es-MX')}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Botón de volver arriba */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 p-3 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl shadow-lg hover:shadow-cyan-500/30 transition-all z-50 group"
        aria-label="Volver arriba"
      >
        <ArrowRight className="w-5 h-5 transform -rotate-90 group-hover:-translate-y-1 transition-transform" />
      </button>
    </footer>
  );
};

export default Footer;