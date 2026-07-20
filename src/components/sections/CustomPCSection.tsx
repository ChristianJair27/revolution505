// src/components/sections/CustomPCSection.tsx
import React from 'react';

const CustomPCSection: React.FC = () => {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-indigo-900 to-purple-900 text-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          En Revolution 505 creamos la PC ideal para ti
        </h2>

        <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-12 opacity-90">
          Armamos computadoras a medida con los mejores componentes según tus necesidades y presupuesto.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20">
            <div className="text-5xl mb-4">🎮</div>
            <h3 className="text-2xl font-bold mb-3">PC para Gaming</h3>
            <p>Alto rendimiento y gráficos impresionantes</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20">
            <div className="text-5xl mb-4">🎨</div>
            <h3 className="text-2xl font-bold mb-3">PC para Diseño</h3>
            <p>Potencia para edición y renderizado 3D</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20">
            <div className="text-5xl mb-4">👨‍💻</div>
            <h3 className="text-2xl font-bold mb-3">PC para Desarrollo</h3>
            <p>Optimizada para código y compilación</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20">
            <div className="text-5xl mb-4">🏢</div>
            <h3 className="text-2xl font-bold mb-3">PC Empresarial</h3>
            <p>Estabilidad y eficiencia para oficinas</p>
          </div>
        </div>

        <p className="text-2xl font-semibold mb-12">
          🎯 Elige tus componentes, nosotros la ensamblamos por ti. Garantía y soporte incluidos.
        </p>

        <img
          src="/assets/ARMANDO PC.png"
          alt="Armado de PC personalizada"
          className="rounded-2xl shadow-2xl mx-auto max-w-4xl w-full"
        />
      </div>
    </section>
  );
};

export default CustomPCSection;