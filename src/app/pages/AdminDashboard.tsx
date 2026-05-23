import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/api';
import { Button } from '../components/ui/button';
import { LogOut, Settings, Package, DollarSign, Calendar } from 'lucide-react';
import { INITIAL_PACKAGES, PRODUCTS } from '../services/mockData';
import { EditablePrice } from '../components/ui/editable-price';
import { ServicePackage } from '../types';

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [packages, setPackages] = useState<ServicePackage[]>(INITIAL_PACKAGES);

  const handleLogout = () => {
    authService.logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background text-white font-sans">
      {/* Admin Sidebar/Header */}
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
        <Button 
          variant="destructive" 
          onClick={handleLogout}
          className="flex items-center gap-2"
        >
          <LogOut className="w-4 h-4" /> Salir
        </Button>
      </header>

      <main className="max-w-7xl mx-auto p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Quick Stats/Actions */}
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

        {/* Price Management */}
        <section className="lg:col-span-2 space-y-6">
          <h2 className="text-2xl font-display font-bold flex items-center gap-2">
            <DollarSign className="w-6 h-6 text-primary" /> Gestión de Precios
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {packages.map(pkg => (
              <div key={pkg.id} className="bg-card/50 border border-white/10 p-6 rounded-lg flex justify-between items-center group">
                <div>
                  <h4 className="font-bold text-lg">{pkg.name}</h4>
                  <p className="text-sm text-gray-500">{pkg.description}</p>
                </div>
                <div className="text-right">
                  <EditablePrice 
                    value={pkg.basePrice} 
                    isAdmin={true} 
                    onSave={(newVal) => {
                      setPackages(pkgs => pkgs.map(p => p.id === pkg.id ? { ...p, basePrice: newVal } : p));
                    }} 
                  />
                  <p className="text-[10px] text-primary uppercase mt-1">Haz clic para editar</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Product Management Sidebar */}
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
                <Button variant="ghost" size="icon" className="text-gray-500 hover:text-white">
                  <Settings className="w-4 h-4" />
                </Button>
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
