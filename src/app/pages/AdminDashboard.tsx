import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService, pricingService } from '../services/api';
import { Button } from '../components/ui/button';
import { LogOut, Settings, Package, DollarSign, Calendar } from 'lucide-react';
import { PRODUCTS } from '../services/mockData';
import { EditablePrice } from '../components/ui/editable-price';
import { toast } from 'sonner';

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [pricing, setPricing] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPricing = async () => {
      try {
        const data = await pricingService.getPricing();
        setPricing(data);
      } catch (error) {
        toast.error('Error al cargar precios');
      } finally {
        setLoading(false);
      }
    };
    fetchPricing();
  }, []);

  const handleLogout = () => {
    authService.logout();
    navigate('/');
  };

  const updatePrice = async (path: string, value: number) => {
    try {
      const updatedPricing = { ...pricing };
      const keys = path.split('.');
      let current = updatedPricing;
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;

      await pricingService.updatePricing(updatedPricing);
      setPricing(updatedPricing);
      toast.success('Precio actualizado en la base de datos');
    } catch (error) {
      toast.error('Error al actualizar precio');
    }
  };

  if (loading) return <div className="min-h-screen bg-background flex items-center justify-center text-white">Cargando...</div>;

  return (
    <div className="min-h-screen bg-background text-white font-sans">
      <header className="bg-card border-b border-white/10 p-6 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <Settings className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-display font-bold">Admin Dashboard</h1>
            <p className="text-xs text-gray-500 uppercase tracking-widest">Panel de Control GDL.DJ</p>
          </div>
        </div>
        <Button variant="destructive" onClick={handleLogout} className="flex items-center gap-2">
          <LogOut className="w-4 h-4" /> Salir
        </Button>
      </header>

      <main className="max-w-7xl mx-auto p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <section className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-card border border-white/10 p-6 rounded-xl flex items-center gap-4">
            <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
              <Calendar className="w-6 h-6 text-accent" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Próximos Eventos</p>
              <h3 className="text-2xl font-bold">12</h3>
            </div>
          </div>
          <div className="bg-card border border-white/10 p-6 rounded-xl flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
              <Package className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Productos en Catálogo</p>
              <h3 className="text-2xl font-bold">{PRODUCTS.length}</h3>
            </div>
          </div>
          <div className="bg-card border border-white/10 p-6 rounded-xl flex items-center gap-4">
            <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Ventas del Mes</p>
              <h3 className="text-2xl font-bold">$45,200</h3>
            </div>
          </div>
        </section>

        <section className="lg:col-span-2 space-y-6">
          <h2 className="text-2xl font-display font-bold flex items-center gap-2">
            <DollarSign className="w-6 h-6 text-primary" /> Gestión de Precios Dinámicos
          </h2>
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-card/50 border border-white/10 p-6 rounded-lg flex justify-between items-center group">
              <div>
                <h4 className="font-bold text-lg">Servicio Base</h4>
                <p className="text-sm text-gray-500">Precio base por 5 horas de servicio</p>
              </div>
              <div className="text-right">
                <EditablePrice value={pricing.packages.servicio_dj} isAdmin={true} onSave={(val) => updatePrice('packages.servicio_dj', val)} />
              </div>
            </div>
            <div className="bg-card/50 border border-white/10 p-6 rounded-lg flex justify-between items-center group">
              <div>
                <h4 className="font-bold text-lg">Servicio Premium</h4>
                <p className="text-sm text-gray-500">Experiencia completa de club nocturno</p>
              </div>
              <div className="text-right">
                <EditablePrice value={pricing.packages.premium} isAdmin={true} onSave={(val) => updatePrice('packages.premium', val)} />
              </div>
            </div>
            <div className="bg-card/50 border border-white/10 p-6 rounded-lg flex justify-between items-center group">
              <div>
                <h4 className="font-bold text-lg">Costo Hora Extra</h4>
                <p className="text-sm text-gray-500">Precio por cada hora adicional (después de las 5 iniciales)</p>
              </div>
              <div className="text-right">
                <EditablePrice value={pricing.extraHourRate} isAdmin={true} onSave={(val) => updatePrice('extraHourRate', val)} />
              </div>
            </div>
          </div>

          <h3 className="text-xl font-display font-bold mt-8 mb-4">Cargos por Volumen de Personas</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.keys(pricing.peopleTiers).map(tier => (
              <div key={tier} className="bg-card/50 border border-white/10 p-4 rounded-lg flex justify-between items-center">
                <span className="text-sm text-gray-400">Rango: {tier}</span>
                <EditablePrice value={pricing.peopleTiers[tier]} isAdmin={true} onSave={(val) => updatePrice(`peopleTiers.${tier}`, val)} />
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-display font-bold flex items-center gap-2">
            <Package className="w-6 h-6 text-accent" /> Productos
          </h2>
          <div className="space-y-4">
            {PRODUCTS.map(product => (
              <div key={product.id} className="bg-card/50 border border-white/10 p-4 rounded-lg flex items-center gap-4">
                <img src={product.imageUrl} alt={product.name} className="w-12 h-12 object-cover rounded" />
                <div className="flex-grow">
                  <h4 className="text-sm font-bold">{product.name}</h4>
                  <p className="text-xs text-primary">${product.price.toLocaleString()}</p>
                </div>
              </div>
            ))}
            <Button className="w-full bg-white/5 border border-white/10 hover:bg-white/10 text-white font-display text-xs uppercase tracking-widest">
              + Agregar Nuevo Producto
            </Button>
          </div>
        </section>

      </main>
    </div>
  );
};
