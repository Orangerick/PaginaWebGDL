import React from 'react';
import { Check, MapPin } from 'lucide-react';
import { ServicePackage } from '../../types';
import { EditablePrice } from '../ui/editable-price';

interface ServicesProps {
  packages: ServicePackage[];
  isAdmin: boolean;
  setPackages: React.Dispatch<React.SetStateAction<ServicePackage[]>>;
  scrollTo: (id: string) => void;
}

export const Services: React.FC<ServicesProps> = ({
  packages,
  isAdmin,
  setPackages,
  scrollTo
}) => {
  return (
    <section id="services" className="py-24 bg-card/50 relative border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-white"><span className="text-primary">02.</span> Servicios & Precios</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Precios base para CDMX. Para eventos al interior de la república, por favor contáctanos para cotizar.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {packages.map((pkg) => (
            <div key={pkg.id} className="bg-background border border-white/10 p-8 rounded-sm hover:border-primary/50 transition-colors relative group">
              <h3 className="text-2xl font-display font-bold text-white mb-2">{pkg.name}</h3>
              <p className="text-gray-400 text-sm mb-6 h-10">{pkg.description}</p>
              
              <div className="mb-8">
                <EditablePrice 
                  value={pkg.basePrice} 
                  isAdmin={isAdmin} 
                  onSave={(newVal) => {
                    setPackages(pkgs => pkgs.map(p => p.id === pkg.id ? { ...p, basePrice: newVal } : p));
                  }} 
                />
                <span className="text-gray-500 text-sm ml-2">x {pkg.hours} hrs</span>
                <p className="text-xs text-primary mt-2">Hora extra: ${pkg.extraHourPrice}</p>
              </div>

              <ul className="space-y-3 mb-8">
                {pkg.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <button onClick={() => scrollTo('booking')} className="w-full py-4 border border-white/20 hover:bg-white/5 text-white font-display font-bold uppercase tracking-wider text-sm transition-colors">
                Elegir Paquete
              </button>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a href="https://wa.me/1234567890" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-display uppercase tracking-wider text-sm">
            <MapPin className="w-4 h-4" />
            Cotizar fuera de CDMX
          </a>
        </div>
      </div>
    </section>
  );
};
