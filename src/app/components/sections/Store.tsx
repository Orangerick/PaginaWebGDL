import React from 'react';
import { Plus, ShoppingBag } from 'lucide-react';
import { Product } from '../../types';

interface StoreProps {
  products: Product[];
  isAdmin: boolean;
  addToCart: (product: Product) => void;
}

export const Store: React.FC<StoreProps> = ({
  products,
  isAdmin,
  addToCart
}) => {
  return (
    <section id="store" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-white"><span className="text-accent">03.</span> Catálogo de Cabinas</h2>
            <p className="text-gray-400 max-w-xl">Muebles a la medida y equipos profesionales. Entrega gratuita a 5km del Estadio Azteca (CDMX). $200 resto de CDMX.</p>
          </div>
          {isAdmin && (
            <button className="flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-sm hover:bg-white/20 transition-colors text-sm font-medium">
              <Plus className="w-4 h-4" /> Agregar Producto
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map(product => (
            <div key={product.id} className="group bg-card/30 border border-white/10 rounded-sm overflow-hidden flex flex-col">
              <div className="relative aspect-[4/3] overflow-hidden bg-white/5">
                <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 left-4 flex gap-2">
                  {product.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-display uppercase text-white tracking-wider">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-display font-bold text-lg text-white">{product.name}</h3>
                  <span className="font-display font-bold text-primary">${product.price.toLocaleString()}</span>
                </div>
                <p className="text-gray-400 text-sm mb-4 flex-grow">{product.description}</p>
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Medidas:</span>
                    <span className="text-gray-300">{product.measurements}</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Color:</span>
                    <span className="text-gray-300">{product.color}</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button 
                    onClick={() => addToCart(product)}
                    className="flex-1 py-3 bg-white/10 hover:bg-white/20 text-white font-display text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" /> Agregar
                  </button>
                  {product.amazonLink && (
                    <a 
                      href={product.amazonLink} 
                      target="_blank" 
                      rel="noreferrer"
                      className="px-4 py-3 border border-white/20 hover:bg-white/5 text-white flex items-center justify-center transition-colors"
                      title="Comprar en Amazon"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M14.07 11.23c-.15.42-.38.8-.68 1.12l-1.35 1.34c-.3.3-.68.53-1.1.68-.42.15-.87.23-1.34.23s-.92-.08-1.34-.23c-.42-.15-.8-.38-1.1-.68l-1.34-1.34c-.3-.3-.53-.68-.68-1.12-.15-.42-.23-.87-.23-1.34s.08-.92.23-1.34c.15-.42.38-.8.68-1.12l1.34-1.34c.3-.3.68-.53 1.1-.68.42-.15.87-.23 1.34-.23s.92.08 1.34.23c.42.15.8.38 1.1.68l1.35 1.34c.3.3.53.68.68 1.12.15.42.23.87.23 1.34s-.08.92-.23 1.34c.15.42.38.8.68 1.12l1.35 1.34c.3.3.68.53 1.1.68.42.15.87.23 1.34.23s.92-.08 1.34-.23c.42-.15.8-.38 1.1-.68l1.34-1.34c.3-.3.53-.68.68-1.12.15-.42.23-.87.23-1.34s-.08-.92-.23-1.34z"/>
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
