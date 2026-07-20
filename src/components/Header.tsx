// src/components/Header.tsx
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';


import LogoR from '../assets/logo-r.png';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setServicesOpen(false);
  }, [location]);

  const navItems = [
    { name: 'Inicio', path: '/' },
    { name: 'Portafolio', path: '/portafolio' },
    { name: 'Clientes', path: '/clientes' },
    //{ name: 'Blog', path: '/blog' },
    { name: 'Contacto', path: '/contacto' },
  ];

  const serviceItems = [
    { name: 'Desarrollo Web', path: '/servicios/desarrollo-web', icon: '💻' },
    { name: 'Sistemas a Medida', path: '/servicios/sistemas', icon: '⚙️' },
    { name: 'Administración de Servers', path: '/servicios/servers', icon: '🖥️' },
    { name: 'PC Gaming', path: '/gaming', icon: '🎮' },
    { name: 'Hardware', path: '/hardware', icon: '🔧' },
    { name: 'Soporte IT', path: '/soporte', icon: '🛡️' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-gray-900/95 backdrop-blur-xl border-b border-gray-800/50 shadow-2xl shadow-black/50' 
          : 'bg-gradient-to-b from-black/90 via-gray-900/80 to-transparent'
      }`}
    >
      {/* Efecto de partículas en el header */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-1 h-1 bg-cyan-500/30 rounded-full animate-pulse" />
        <div className="absolute top-3 right-1/3 w-1 h-1 bg-blue-500/30 rounded-full animate-pulse delay-300" />
        <div className="absolute top-2 left-2/3 w-1 h-1 bg-cyan-500/30 rounded-full animate-pulse delay-500" />
      </div>

      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
         <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl blur opacity-70 group-hover:opacity-100 transition-opacity" />
              <div className="relative bg-gray-900 p-2 rounded-xl border border-gray-800">
                {/* Aquí va la imagen del logo */}
                <img 
                  src={LogoR} 
                  alt="Revolution 505 Logo" 
                  className="w-8 h-8 object-contain" // Ajusta el tamaño según necesites (ej: w-10 h-10)
                />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Revolution505
              </span>
              <span className="text-xs text-gray-400 font-medium tracking-widest">TECH SOLUTIONS</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <div className="relative"
                 onMouseEnter={() => setServicesOpen(true)}
                 onMouseLeave={() => setServicesOpen(false)}>
              <button className="flex items-center gap-2 text-gray-300 hover:text-cyan-400 transition-colors py-2">
                <span>Servicios</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 mt-2 w-64 bg-gray-900/95 backdrop-blur-xl border border-gray-800 rounded-xl shadow-2xl shadow-black/50 overflow-hidden"
                  >
                    <div className="p-2">
                      {serviceItems.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800/50 hover:text-white rounded-lg transition-all group"
                        >
                          <span className="text-lg">{item.icon}</span>
                          <span className="font-medium">{item.name}</span>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-gray-300 hover:text-cyan-400 transition-colors relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>

         

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg border border-gray-800 hover:border-cyan-500/50 transition-colors"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-gray-300" />
            ) : (
              <Menu className="w-6 h-6 text-gray-300" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="mt-4 pt-4 border-t border-gray-800/50 space-y-2">
                <div className="px-4 py-2">
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    Servicios
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {serviceItems.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        className="flex flex-col items-center justify-center p-3 bg-gray-900/50 rounded-lg border border-gray-800 hover:border-cyan-500/50 transition-colors"
                      >
                        <span className="text-xl mb-1">{item.icon}</span>
                        <span className="text-sm text-center">{item.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
                
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="block px-4 py-3 text-gray-300 hover:bg-gray-800/50 hover:text-white rounded-lg transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
                
               
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent">
        <motion.div
          className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
      </div>
    </header>
  );
};

export default Header;