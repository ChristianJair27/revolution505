// src/components/sections/ClientsCarousel.tsx
import React from 'react';

const logos = [
  '/assets/amq-logo.png',
  '/assets/FLYZZ-logo.png',
  '/assets/pena-logo.png',
  '/assets/iptv-logo.png',
  // Agrega más si tienes
];

const ClientsCarousel: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-900 text-white">
      <div className="container mx-auto px-6 text-center">
        <h3 className="text-3xl md:text-4xl font-bold mb-4">
          Nuestros Clientes
        </h3>
        <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
          Empresas que confían en Revolution 505 para hosting, diseño web y soporte técnico.
        </p>

        {/* Carrusel infinito con animación CSS */}
        <div className="relative overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap">
            {logos.concat(logos).map((logo, index) => (  // duplicamos para efecto infinito
              <div
                key={index}
                className="flex-shrink-0 mx-6 md:mx-12 h-16 md:h-24 flex items-center justify-center"
              >
                <img
                  src={logo}
                  alt="Cliente"
                  className="max-h-full max-w-[180px] object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CSS animation - agrégalo en tu index.css o en un <style> global */}
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default ClientsCarousel;