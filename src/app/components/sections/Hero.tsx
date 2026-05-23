import React from 'react';
import { motion } from 'motion/react';
import { Calendar, MessageCircle } from 'lucide-react';

interface HeroProps {
  scrollTo: (id: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ scrollTo }) => {
  return (
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/80 to-background z-10" />
        <img src="https://images.unsplash.com/photo-1768885510237-9238a40a4f93?q=80&w=2000" alt="DJ Set" className="w-full h-full object-cover opacity-60" />
      </div>
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}>
          <h1 className="text-5xl md:text-7xl font-display font-black text-white mb-6 tracking-tight drop-shadow-[0_0_15px_rgba(0,240,255,0.5)]">
            LA EXPERIENCIA <br className="hidden md:block"/> <span className="text-primary">NOCTURNA</span>
          </h1>
          <p className="text-lg md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto font-light">
            Producción, música y servicio de DJ profesional por Gustavo Delgadillo. Elevamos tu evento al siguiente nivel.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={() => scrollTo('booking')} className="w-full sm:w-auto px-8 py-4 bg-primary text-primary-foreground font-display font-bold uppercase tracking-wider rounded-sm hover:bg-primary/90 transition-all hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] flex items-center justify-center gap-2">
              <Calendar className="w-5 h-5" />
              Reservar Fecha
            </button>
            <a href="https://wa.me/1234567890" target="_blank" rel="noreferrer" className="w-full sm:w-auto px-8 py-4 border border-white/20 bg-white/5 hover:bg-white/10 text-white font-display font-bold uppercase tracking-wider rounded-sm transition-all flex items-center justify-center gap-2">
              <MessageCircle className="w-5 h-5" />
              WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
