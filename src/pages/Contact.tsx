// src/pages/Contact.tsx
import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { AnimatePresence, motion } from 'framer-motion';
import { 
  Mail, MapPin, Send, 
  ChevronRight, MessageSquare, Clock, 
  CheckCircle2, AlertCircle, Loader2,
  Users,
  Zap
} from 'lucide-react';

const Contact: React.FC = () => {
  const form = useRef<HTMLFormElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validación básica
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMsg('Por favor completa los campos obligatorios');
      setStatus('error');
      return;
    }

    setStatus('sending');
    setErrorMsg('');

    try {
      // Envío REAL con EmailJS - usa los valores que ya tenías
      const result = await emailjs.sendForm(
        'service_st52ayv',           // Service ID (Hostinger)
        'template_h4veq8y',          // Template ID (tu plantilla "Contact Us")
        form.current!,               // Referencia al <form>
        'mPfd5fGP4bZFJsGIr'          // Public Key
      );

      console.log('¡Email enviado con éxito!', result.text, result.status);
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' }); // Limpia el formulario
    } catch (err: any) {
      console.error('Error completo al enviar email:', err);
      setStatus('error');
      
      // Muestra mensaje más útil según el error común de EmailJS
      let msg = 'Hubo un error al enviar. Intenta de nuevo.';
      if (err.text) {
        msg = err.text; // Mensaje detallado de EmailJS (ej: "authentication failed")
      } else if (err.message) {
        msg = err.message;
      }
      setErrorMsg(msg);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-black to-gray-950 text-white">
      {/* Hero Section */}
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
              <span className="text-gray-300">Contacto</span>{' '}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Revolution505
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              ¿Tienes un proyecto en mente? ¿Necesitas soporte técnico o cotización? 
              Estamos listos para ayudarte a llevar tu idea al siguiente nivel.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contenido principal */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Formulario */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gray-900/30 border border-gray-800/40 rounded-2xl p-8 backdrop-blur-sm"
            >
              <h2 className="text-3xl font-light mb-8 text-gray-100">
                Envíanos un mensaje
              </h2>

              <form ref={form} onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm text-gray-400 mb-2">
                      Nombre completo *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-950 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500/50 transition-colors"
                      placeholder="Tu nombre"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm text-gray-400 mb-2">
                      Correo electrónico *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-950 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500/50 transition-colors"
                      placeholder="tu@correo.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm text-gray-400 mb-2">
                    Asunto
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-950 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500/50 transition-colors"
                    placeholder="Ej: Cotización de sitio web"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm text-gray-400 mb-2">
                    Mensaje *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-gray-950 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500/50 transition-colors resize-none"
                    placeholder="Cuéntanos sobre tu proyecto o consulta..."
                  />
                </div>

                {/* Estado del envío */}
                <AnimatePresence>
                  {status !== 'idle' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className={`p-4 rounded-lg flex items-center gap-3 ${
                        status === 'success' ? 'bg-green-900/30 border border-green-800/50' :
                        status === 'error' ? 'bg-red-900/30 border border-red-800/50' :
                        'bg-blue-900/30 border border-blue-800/50'
                      }`}
                    >
                      {status === 'sending' && <Loader2 className="w-5 h-5 animate-spin text-blue-400" />}
                      {status === 'success' && <CheckCircle2 className="w-5 h-5 text-green-400" />}
                      {status === 'error' && <AlertCircle className="w-5 h-5 text-red-400" />}
                      
                      <span className={`text-sm ${
                        status === 'success' ? 'text-green-300' :
                        status === 'error' ? 'text-red-300' : 'text-blue-300'
                      }`}>
                        {status === 'sending' ? 'Enviando...' :
                         status === 'success' ? '¡Mensaje enviado con éxito! Te contactaremos pronto.' :
                         errorMsg || 'Ocurrió un error inesperado. Revisa la consola (F12) para más detalles.'}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className={`w-full py-4 px-6 rounded-lg font-medium flex items-center justify-center gap-3 transition-all ${
                    status === 'sending' 
                      ? 'bg-gray-700 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 shadow-lg hover:shadow-blue-900/30'
                  }`}
                >
                  {status === 'sending' ? (
                    <>Enviando <Loader2 className="w-5 h-5 animate-spin" /></>
                  ) : (
                    <>Enviar mensaje <Send className="w-5 h-5" /></>
                  )}
                </button>
              </form>
            </motion.div>

            {/* Información de contacto - sin cambios */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-8"
            >
              <div className="bg-gray-900/30 border border-gray-800/40 rounded-2xl p-8 backdrop-blur-sm">
                <h2 className="text-3xl font-light mb-8 text-gray-100">
                  Información de contacto
                </h2>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-900/30 rounded-lg text-blue-400">
                      <MessageSquare className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-200 mb-1">WhatsApp / Teléfono</h3>
                      <p className="text-gray-400">+52 442 433 9336</p>
                      <p className="text-sm text-gray-500 mt-1">Respuesta en menos de 30 minutos (horario laboral)</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-cyan-900/30 rounded-lg text-cyan-400">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-200 mb-1">Correo electrónico</h3>
                      <p className="text-gray-400">contacto@revolution505.com</p>
                      <p className="text-sm text-gray-500 mt-1">Respuesta en 24-48 horas</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-purple-900/30 rounded-lg text-purple-400">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-200 mb-1">Horario de atención</h3>
                      <p className="text-gray-400">Lunes a Viernes: 9:00 - 18:00 hrs</p>
                      <p className="text-gray-400">Sábados: 10:00 - 14:00 hrs</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mapa o ubicación */}
              <div className="bg-gray-900/30 border border-gray-800/40 rounded-2xl overflow-hidden">
                <div className="h-64 bg-gray-950 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                    <p className="text-gray-400">Querétaro, México</p>
                    <p className="text-sm text-gray-500">(Ubicación aproximada)</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Estadísticas rápidas */}
      <section className="py-20 border-t border-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: <MessageSquare className="w-8 h-8" />, value: '24h', label: 'Respuesta máxima' },
              { icon: <Users className="w-8 h-8" />, value: '100%', label: 'Atención personalizada' },
              { icon: <Zap className="w-8 h-8" />, value: '98%', label: 'Satisfacción' },
              { icon: <CheckCircle2 className="w-8 h-8" />, value: '∞', label: 'Proyectos exitosos' },
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

export default Contact;