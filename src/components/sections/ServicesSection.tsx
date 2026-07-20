// src/components/sections/ServicesSection.tsx
import React from 'react';

const ServicesSection: React.FC = () => {
  return (
    <section className="py-20 md:py-32 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* Desarrollo a Medida */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
          <div className="order-2 md:order-1">
            <img
              src="/assets/editor.png"
              alt="Desarrollo a medida"
              className="rounded-2xl shadow-2xl w-full"
            />
          </div>

          <div className="order-1 md:order-2 space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              Desarrollo a Medida
            </h2>
            <p className="text-xl text-gray-700 leading-relaxed">
              Creamos soluciones digitales optimizadas, desde sitios web hasta software empresarial, 
              completamente adaptadas a las necesidades y objetivos de tu negocio.
            </p>
            <div className="pt-4">
              <span className="text-blue-600 text-5xl">💻</span>
            </div>
          </div>
        </div>

        {/* Soporte IT */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              Soporte y Soluciones IT
            </h2>
            <p className="text-xl text-gray-700 leading-relaxed">
              Mantenemos y optimizamos servidores, redes y sistemas para garantizar 
              un rendimiento eficiente, seguro y sin interrupciones.
            </p>
            <div className="pt-4">
              <span className="text-blue-600 text-5xl">🔧</span>
            </div>
          </div>

          <div>
            <img
              src="/assets/tecnico.jpg"
              alt="Soporte Técnico IT"
              className="rounded-2xl shadow-2xl w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;