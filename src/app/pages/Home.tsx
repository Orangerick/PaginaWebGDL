import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Navbar } from '../components/layout/Navbar';
import { Hero } from '../components/sections/Hero';
import { About } from '../components/sections/About';
import { Services } from '../components/sections/Services';
import { Store } from '../components/sections/Store';
import { Booking } from '../components/sections/Booking';
import { Footer } from '../components/layout/Footer';
import { CartDrawer } from '../components/layout/CartDrawer';
import { AdminQuickMenu } from '../components/ui/admin-quick-menu';

import { 
  INITIAL_PACKAGES, 
  INITIAL_PEOPLE_PRICING, 
  PRODUCTS, 
  FAQS 
} from '../services/mockData';
import { CartItem, Product, ServicePackage, PeoplePricing } from '../types';

export const Home: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const [packages, setPackages] = useState<ServicePackage[]>(INITIAL_PACKAGES);
  const [peoplePricing] = useState<PeoplePricing>(INITIAL_PEOPLE_PRICING);
  
  const [formPeopleTier, setFormPeopleTier] = useState<keyof PeoplePricing>('tier1');
  const [formServiceId, setFormServiceId] = useState('base');

  const estimatedTotal = useMemo(() => {
    const pkg = packages.find(p => p.id === formServiceId) || packages[0];
    return pkg.basePrice + peoplePricing[formPeopleTier];
  }, [packages, formServiceId, formPeopleTier, peoplePricing]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const cartTotal = useMemo(() => cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0), [cart]);
  const cartCount = useMemo(() => cart.reduce((a, b) => a + b.quantity, 0), [cart]);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground overflow-x-hidden">
      <Helmet>
        <title>GDL.DJ | La Experiencia Nocturna en CDMX</title>
        <meta name="description" content="Servicio de DJ profesional, producción de eventos, audio e iluminación por Gustavo Delgadillo en CDMX. Reserva tu fecha hoy." />
      </Helmet>

      <Navbar 
        cartCount={cartCount} 
        setIsCartOpen={setIsCartOpen} 
        scrollTo={scrollTo}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      <main>
        <Hero scrollTo={scrollTo} />
        <About />
        <Services 
          packages={packages} 
          isAdmin={false} 
          setPackages={setPackages} 
          scrollTo={scrollTo} 
        />
        <Store 
          products={PRODUCTS} 
          isAdmin={false} 
          addToCart={addToCart} 
        />
        <Booking 
          faqs={FAQS}
          packages={packages}
          peoplePricing={peoplePricing}
          formServiceId={formServiceId}
          setFormServiceId={setFormServiceId}
          formPeopleTier={formPeopleTier}
          setFormPeopleTier={setFormPeopleTier}
          estimatedTotal={estimatedTotal}
        />
      </main>

      <Footer scrollTo={scrollTo} />

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cart={cart} 
        setCart={setCart} 
        cartTotal={cartTotal} 
        scrollTo={scrollTo}
      />
    </div>
  );
};
