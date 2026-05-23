import React from 'react';
import { ShoppingCart, ShoppingBag, Minus, Plus, Trash2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem } from '../../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  cartTotal: number;
  scrollTo: (id: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  setCart,
  cartTotal,
  scrollTo
}) => {
  const handleCheckout = () => {
    const phoneNumber = "525512345678"; // Reemplazar con el número real de Gustavo
    const productList = cart.map(item => `- ${item.product.name} (x${item.quantity}) - $${(item.product.price * item.quantity).toLocaleString()}`).join('%0A');
    const message = `Hola Gustavo! Me interesa comprar los siguientes productos de la tienda:%0A%0A${productList}%0A%0ATotal: $${cartTotal.toLocaleString()}%0A%0A¿Podrías darme seguimiento para el pago y la entrega?`;
    
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-card border-l border-white/10 z-50 flex flex-col shadow-2xl"
          >
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-background/50">
              <h2 className="font-display font-bold text-xl text-white flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-primary" /> Carrito
              </h2>
              <button onClick={onClose} className="text-gray-400 hover:text-white p-2">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-grow overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-500 space-y-4">
                  <ShoppingBag className="w-12 h-12 opacity-20" />
                  <p>Tu carrito está vacío.</p>
                  <button onClick={() => { onClose(); scrollTo('store'); }} className="px-6 py-2 border border-white/20 text-white rounded-sm hover:bg-white/5 transition-colors text-sm font-display uppercase tracking-wider mt-4">
                    Ver Catálogo
                  </button>
                </div>
              ) : (
                cart.map((item, idx) => (
                  <div key={idx} className="flex gap-4 items-center bg-white/5 p-4 rounded-sm border border-white/5">
                    <img src={item.product.imageUrl} alt={item.product.name} className="w-16 h-16 object-cover rounded-sm bg-black" />
                    <div className="flex-grow">
                      <h4 className="text-white text-sm font-bold">{item.product.name}</h4>
                      <p className="text-primary text-sm">${item.product.price.toLocaleString()}</p>
                    </div>
                    <div className="flex items-center gap-2 bg-black rounded-sm border border-white/10 px-2 py-1">
                      <button 
                        onClick={() => setCart(cart.map(c => c.product.id === item.product.id ? { ...c, quantity: Math.max(1, c.quantity - 1) } : c))}
                        className="text-gray-400 hover:text-white p-1"
                      ><Minus className="w-3 h-3" /></button>
                      <span className="text-white text-xs w-4 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => setCart(cart.map(c => c.product.id === item.product.id ? { ...c, quantity: c.quantity + 1 } : c))}
                        className="text-gray-400 hover:text-white p-1"
                      ><Plus className="w-3 h-3" /></button>
                    </div>
                    <button 
                      onClick={() => setCart(cart.filter(c => c.product.id !== item.product.id))}
                      className="text-gray-500 hover:text-destructive p-2"
                    ><Trash2 className="w-4 h-4" /></button>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 border-t border-white/10 bg-background/50">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-gray-400">Total</span>
                  <span className="text-2xl font-display font-bold text-white">${cartTotal.toLocaleString()}</span>
                </div>
                <button 
                  onClick={handleCheckout}
                  className="w-full py-4 bg-primary text-primary-foreground font-display font-bold uppercase tracking-wider rounded-sm hover:bg-primary/90 transition-all"
                >
                  Finalizar Pedido vía WhatsApp
                </button>
                <p className="text-xs text-gray-500 text-center mt-4">
                  Al finalizar tu pedido, serás redirigido a WhatsApp para coordinar el pago y la entrega con Gustavo directamente.
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
