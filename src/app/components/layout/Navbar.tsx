import React from 'react';
import { ShoppingCart, Menu, X, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  isAdmin: boolean;
  setIsAdmin: (val: boolean) => void;
  cartCount: number;
  setIsCartOpen: (val: boolean) => void;
  scrollTo: (id: string) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (val: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  isAdmin,
  setIsAdmin,
  cartCount,
  setIsCartOpen,
  scrollTo,
  isMobileMenuOpen,
  setIsMobileMenuOpen
}) => {
  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => scrollTo('hero')}>
              <span className="font-display font-bold text-2xl tracking-tighter text-white">
                GDL<span className="text-primary">.DJ</span>
              </span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollTo('about')} className="text-sm font-medium text-gray-300 hover:text-primary transition-colors">Sobre Mí</button>
              <button onClick={() => scrollTo('services')} className="text-sm font-medium text-gray-300 hover:text-primary transition-colors">Servicios</button>
              <button onClick={() => scrollTo('store')} className="text-sm font-medium text-gray-300 hover:text-primary transition-colors">Tienda</button>
              <button onClick={() => scrollTo('booking')} className="text-sm font-medium text-gray-300 hover:text-primary transition-colors">Reserva</button>
              <button onClick={() => scrollTo('faq')} className="text-sm font-medium text-gray-300 hover:text-primary transition-colors">FAQ</button>
            </div>

            <div className="flex items-center space-x-4">
              <button onClick={() => setIsAdmin(!isAdmin)} className={`p-2 rounded-full transition-colors ${isAdmin ? 'bg-accent/20 text-accent' : 'text-gray-400 hover:text-white'}`} title="Admin Mode">
                <Settings className="w-5 h-5" />
              </button>
              <button onClick={() => setIsCartOpen(true)} className="relative p-2 text-gray-300 hover:text-primary transition-colors">
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden p-2 text-gray-300 hover:text-white">
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl pt-24 pb-6 px-4 md:hidden"
          >
            <div className="flex flex-col space-y-6 text-center">
              <button onClick={() => scrollTo('about')} className="text-xl font-display text-white">Sobre Mí</button>
              <button onClick={() => scrollTo('services')} className="text-xl font-display text-white">Servicios</button>
              <button onClick={() => scrollTo('store')} className="text-xl font-display text-white">Tienda</button>
              <button onClick={() => scrollTo('booking')} className="text-xl font-display text-white">Reserva</button>
              <button onClick={() => scrollTo('faq')} className="text-xl font-display text-white">FAQ</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
