import React from 'react';
import { Instagram, MessageCircle } from 'lucide-react';

interface FooterProps {
  scrollTo: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ scrollTo }) => {
  return (
    <footer className="bg-black py-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <span className="font-display font-bold text-2xl tracking-tighter text-white mb-4 block">
              GDL<span className="text-primary">.DJ</span>
            </span>
            <p className="text-gray-500 text-sm max-w-sm">Elevando la cultura nocturna. Producción, audio e iluminación profesional para eventos en Ciudad de México.</p>
          </div>
          <div>
            <h4 className="font-display font-bold text-white mb-4 uppercase tracking-wider text-sm">Enlaces</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><button onClick={() => scrollTo('about')} className="hover:text-primary transition-colors">Sobre Mí</button></li>
              <li><button onClick={() => scrollTo('services')} className="hover:text-primary transition-colors">Servicios</button></li>
              <li><button onClick={() => scrollTo('store')} className="hover:text-primary transition-colors">Tienda</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display font-bold text-white mb-4 uppercase tracking-wider text-sm">Contacto</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="https://wa.me/1234567890" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors flex items-center gap-2"><MessageCircle className="w-4 h-4"/> WhatsApp</a></li>
              <li><a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors flex items-center gap-2"><Instagram className="w-4 h-4"/> Instagram</a></li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-xs text-gray-600">
          <p>&copy; {new Date().getFullYear()} Gustavo Delgadillo GDL. Todos los derechos reservados.</p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Términos y Condiciones</a>
            <a href="#" className="hover:text-white transition-colors">Aviso de Privacidad</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
