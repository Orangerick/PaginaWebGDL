import React, { useState, useMemo, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Navbar } from '../components/layout/Navbar';
import { Hero } from '../components/sections/Hero';
import { About } from '../components/sections/About';
import { Services } from '../components/sections/Services';
import { Store } from '../components/sections/Store';
import { Booking } from '../components/sections/Booking';
import { Footer } from '../components/layout/Footer';
import { CartDrawer } from '../components/layout/CartDrawer';
import { pricingService, productService } from '../services/api';
import { CartItem, Product, ServicePackage, PeoplePricing } from '../types';
import { toast } from 'sonner';

export const Home: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const [packages, setPackages] = useState<ServicePackage[]>([]);
  const [peoplePricing, setPeoplePricing] = useState<PeoplePricing | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [formPeopleTier, setFormPeopleTier] = useState<keyof PeoplePricing>('tier1');
  const [formServiceId, setFormServiceId] = useState('servicio_dj');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pricingData, productsData] = await Promise.all([
          pricingService.getPricing(),
          productService.getProducts()
        ]);

        // Transform Pricing from DB to the frontend format
        const transformedPackages: ServicePackage[] = [
          {
            id: 'servicio_dj',
            name: 'Servicio Base',
            basePrice: pricingData.packages.servicio_dj,
            hours: 5,
            extraHourPrice: pricingData.extraHourRate,
            description: 'Perfecto para fiestas privadas y eventos medianos en CDMX.',
            features: ['Servicio DJ', 'Bocina', 'Cabina estándar', 'Luces básicas']
          },
          {
            id: 'premium',
            name: 'Servicio Premium',
            basePrice: pricingData.packages.premium,
            hours: 5,
            extraHourPrice: pricingData.extraHourRate,
            description: 'La experiencia completa de club nocturno para tu evento.',
            features: ['4 Bocinas', 'Pirotecnia / Chisperos', 'Máquinas CO2 / Humo', 'Lasers', 'Cabezas Robóticas']
          }
        ];

        setPackages(transformedPackages);
        setPeoplePricing(pricingData.peopleTiers);
        
        // Transform Products from DB
        const transformedProducts = productsData.map((p: any) => ({
          id: p._id,
          name: p.name,
          price: p.price,
          description: p.description,
          measurements: p.dimensions,
          tags: p.tags,
          color: p.color,
          imageUrl: p.photos[0] || 'https://via.placeholder.com/800x600?text=No+Image',
          deliveryMethod: p.deliveryMethod
        }));
        setProducts(transformedProducts);

      } catch (error) {
        console.error('Error fetching dynamic data:', error);
        toast.error('Error al cargar la información del servidor');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const estimatedTotal = useMemo(() => {
    if (!peoplePricing || packages.length === 0) return 0;
    const pkg = packages.find(p => p.id === formServiceId) || packages[0];
    return pkg.basePrice + (peoplePricing as any)[formPeopleTier];
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

  if (loading) return <div className="min-h-screen bg-background flex items-center justify-center text-white">Iniciando Experiencia Nocturna...</div>;

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
          products={products} 
          isAdmin={false} 
          addToCart={addToCart} 
        />
        {peoplePricing && (
          <Booking 
            faqs={[]} // FAQS can be moved to DB too if needed
            packages={packages}
            peoplePricing={peoplePricing}
            formServiceId={formServiceId}
            setFormServiceId={setFormServiceId}
            formPeopleTier={formPeopleTier}
            setFormPeopleTier={setFormPeopleTier}
            estimatedTotal={estimatedTotal}
          />
        )}
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
