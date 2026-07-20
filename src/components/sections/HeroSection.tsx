// src/components/sections/HeroSection.tsx
import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-indigo-950 via-purple-950 to-blue-950 text-white overflow-hidden">
      {/* Fondo opcional con overlay sutil */}
      <div className="absolute inset-0 bg-black/30"></div>

      <div className="relative container mx-auto px-6 py-24 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Columna izquierda - texto */}
          <div className="space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Revolution 505
              <br />
              <span className="text-blue-400">Soluciones en Tecnología</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl">
              Expertos en diseño web, desarrollo de software, servicios IT y venta de equipos de cómputo.
            </p>

            <ul className="space-y-4 text-lg">
              <li className="flex items-center gap-3">
                <span className="text-green-400 text-2xl">✓</span>
                Desarrollo y diseño web
              </li>
              <li className="flex items-center gap-3">
                <span className="text-green-400 text-2xl">✓</span>
                Soluciones de software a medida
              </li>
              <li className="flex items-center gap-3">
                <span className="text-green-400 text-2xl">✓</span>
                Servicios de IT y soporte técnico
              </li>
              <li className="flex items-center gap-3">
                <span className="text-green-400 text-2xl">✓</span>
                Venta de PCs y hardware especializado
              </li>
            </ul>

            {/* Botones CTA */}
            <div className="flex flex-wrap gap-4 pt-6">
              <a
                href="#contacto"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg transition-all transform hover:scale-105 shadow-lg"
              >
                Contáctanos ahora
              </a>
              <a
                href="/portafolio"
                className="inline-block border-2 border-white/40 hover:bg-white/10 text-white font-semibold py-4 px-8 rounded-lg transition-all"
              >
                Ver portafolio
              </a>
            </div>
          </div>

          {/* Columna derecha - imagen */}
          <div className="flex justify-center">
            <img
              src="/assets/hero-illustration.png" // ← copia tu imagen aquí
              alt="Revolution 505 Tecnología"
              className="w-full max-w-md md:max-w-lg drop-shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;