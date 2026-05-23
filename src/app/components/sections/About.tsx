import React from 'react';
import { Instagram, Music } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-white"><span className="text-accent">01.</span> Sobre Mí</h2>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Soy Gustavo Delgadillo, un apasionado de la música y la producción de eventos. Mi objetivo es transformar cualquier espacio en una experiencia inmersiva a través de audio de alta fidelidad, iluminación de vanguardia y una selección musical que conecta con el público.
            </p>
            <p className="text-gray-400 mb-8 leading-relaxed">
              Con años de experiencia en la escena de CDMX, ofrezco no solo un servicio de DJ, sino una producción completa que incluye desde cabinas personalizadas hasta efectos especiales para hacer de tu evento algo inolvidable.
            </p>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-white hover:text-accent transition-colors font-display uppercase tracking-wider text-sm border-b border-accent pb-1">
              <Instagram className="w-4 h-4" />
              Sígueme en Instagram
            </a>
          </div>
          <div className="relative">
            <div className="aspect-square bg-white/5 border border-white/10 p-2 rounded-sm transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <img src="https://images.unsplash.com/photo-1571266028243-d220c6a7edbf?q=80&w=800" alt="Gustavo DJ" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-background border border-white/10 p-6 rounded-sm shadow-xl">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                  <Music className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-white">500+</h4>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">Eventos Creados</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Google Reviews Placeholder */}
        <div className="bg-card/50 border border-white/10 p-8 rounded-sm text-center">
          <h3 className="text-xl font-display font-bold text-white mb-6">Lo que dicen nuestros clientes</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-background border border-white/5 p-6 rounded-sm text-left">
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex text-yellow-500">
                    {'★'.repeat(5)}
                  </div>
                  <span className="text-xs text-gray-500">hace 1 mes</span>
                </div>
                <p className="text-gray-400 text-sm mb-4">"Increíble set, la pista nunca estuvo vacía. El equipo de iluminación le dio un toque brutal a la fiesta. ¡Recomendadísimo!"</p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-white text-xs font-bold">C{i}</div>
                  <span className="text-white text-sm font-medium">Cliente Satisfecho</span>
                </div>
              </div>
            ))}
          </div>
          <a href="#" className="inline-block mt-8 text-sm text-gray-400 hover:text-white transition-colors border-b border-gray-600 pb-1">Ver más reseñas en Google</a>
        </div>
      </div>
    </section>
  );
};
