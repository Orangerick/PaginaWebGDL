import React, { useState, useEffect } from 'react';
import { MessageCircle, ChevronDown, ArrowRight, Calendar as CalendarIcon } from 'lucide-react';
import { FAQ, ServicePackage, PeoplePricing } from '../../types';
import { Calendar } from '../ui/calendar';
import { reservationService } from '../../services/api';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { toast } from 'sonner';

interface BookingProps {
  faqs: FAQ[];
  packages: ServicePackage[];
  peoplePricing: PeoplePricing;
  formServiceId: string;
  setFormServiceId: (val: string) => void;
  formPeopleTier: keyof PeoplePricing;
  setFormPeopleTier: (val: keyof PeoplePricing) => void;
  formTotalHours: number;
  setFormTotalHours: (val: number) => void;
  estimatedTotal: number;
}

export const Booking: React.FC<BookingProps> = ({
  faqs,
  packages,
  peoplePricing,
  formServiceId,
  setFormServiceId,
  formPeopleTier,
  setFormPeopleTier,
  formTotalHours,
  setFormTotalHours,
  estimatedTotal
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [busyDates, setBusyDates] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    email: '',
    eventType: 'fiesta',
    address: ''
  });

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const dates = await reservationService.getAvailability(new Date().getMonth(), new Date().getFullYear());
        setBusyDates(dates);
      } catch (error) {
        console.error('Error fetching availability', error);
      }
    };
    fetchAvailability();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate) {
      toast.error('Por favor selecciona una fecha');
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        ...formData,
        totalHours: formTotalHours,
        eventDate: selectedDate,
        packageId: formServiceId,
        peopleTier: formPeopleTier,
      };
      
      const response = await reservationService.createReservation(payload);
      
      toast.success('¡Reserva creada! Redirigiendo a Mercado Pago...');
      
      // Redirect to Mercado Pago link
      if (response.init_point) {
        window.location.href = response.init_point;
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Error al crear la reserva');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isDateDisabled = (date: Date) => {
    const dateString = format(date, 'yyyy-MM-dd');
    return busyDates.includes(dateString) || date < new Date();
  };

  return (
    <section id="booking" className="py-24 bg-card/50 relative border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-white"><span className="text-primary">04.</span> Reserva tu Fecha</h2>
            <p className="text-gray-400 mb-8">Selecciona un día en el calendario y llena el formulario. Requerimos un anticipo de $1,500 MXN.</p>
            
            <div className="bg-background border border-white/10 p-4 rounded-sm inline-block mb-12">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={isDateDisabled}
                locale={es}
                className="rounded-md"
              />
            </div>

            <h3 className="text-xl font-display font-bold mb-6 text-white flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-accent" /> Preguntas Frecuentes
            </h3>
            <div className="space-y-4" id="faq">
              {faqs.map((faq, i) => (
                <details key={i} className="group bg-background border border-white/10 rounded-sm p-4 cursor-pointer">
                  <summary className="font-medium text-white flex justify-between items-center outline-none">
                    {faq.q}
                    <ChevronDown className="w-4 h-4 text-gray-500 group-open:rotate-180 transition-transform" />
                  </summary>
                  <p className="text-gray-400 text-sm mt-4 leading-relaxed">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>

          <div className="bg-background border border-white/10 p-8 md:p-10 rounded-sm shadow-2xl relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl rounded-full" />
            
            <form className="relative z-10 space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-display uppercase tracking-wider text-gray-400">Nombre Completo</label>
                  <input 
                    type="text" 
                    value={formData.customerName}
                    onChange={e => setFormData({...formData, customerName: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors" 
                    placeholder="Tu nombre" 
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-display uppercase tracking-wider text-gray-400">WhatsApp</label>
                  <input 
                    type="tel" 
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors" 
                    placeholder="10 dígitos" 
                    required 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-display uppercase tracking-wider text-gray-400">Correo Electrónico</label>
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors" 
                  placeholder="tu@email.com" 
                  required 
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-display uppercase tracking-wider text-gray-400 text-primary">Fecha Seleccionada</label>
                  <div className="w-full bg-primary/10 border border-primary/20 rounded-sm px-4 py-3 text-white flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4 text-primary" />
                    {selectedDate ? format(selectedDate, 'PPP', { locale: es }) : 'Selecciona en el calendario'}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-display uppercase tracking-wider text-gray-400">Tipo de Evento</label>
                  <select 
                    value={formData.eventType}
                    onChange={e => setFormData({...formData, eventType: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors appearance-none"
                  >
                    <option value="fiesta" className="bg-background">Fiesta Privada</option>
                    <option value="boda" className="bg-background">Boda</option>
                    <option value="corporativo" className="bg-background">Corporativo</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-display uppercase tracking-wider text-gray-400">Paquete</label>
                  <select 
                    value={formServiceId}
                    onChange={(e) => setFormServiceId(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors appearance-none"
                  >
                    {packages.map(p => (
                      <option key={p.id} value={p.id} className="bg-background">{p.name}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-display uppercase tracking-wider text-gray-400">Horas Totales</label>
                  <select 
                    value={formTotalHours}
                    onChange={e => setFormTotalHours(Number(e.target.value))}
                    className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors appearance-none"
                  >
                    {[5,6,7,8,9,10].map(h => <option key={h} value={h} className="bg-background">{h} horas</option>)}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-display uppercase tracking-wider text-gray-400">Personas</label>
                <select 
                  value={formPeopleTier}
                  onChange={(e) => setFormPeopleTier(e.target.value as keyof PeoplePricing)}
                  className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors appearance-none"
                >
                  <option value="tier1" className="bg-background">10 - 100</option>
                  <option value="tier2" className="bg-background">100 - 200</option>
                  <option value="tier3" className="bg-background">200 - 300</option>
                  <option value="tier4" className="bg-background">300+</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-display uppercase tracking-wider text-gray-400">Dirección del Evento</label>
                <textarea 
                  value={formData.address}
                  onChange={e => setFormData({...formData, address: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors h-20 resize-none" 
                  placeholder="Calle, Número, Colonia, Alcaldía..." 
                  required 
                />
              </div>

              <div className="pt-4 border-t border-white/10">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400 text-sm">Costo Estimado:</span>
                  <span className="text-2xl font-display font-bold text-white">${estimatedTotal.toLocaleString()} MXN</span>
                </div>
                <div className="flex justify-between items-center mb-6">
                  <span className="text-gray-400 text-sm italic">Anticipo requerido:</span>
                  <span className="text-xl font-display font-bold text-primary">$1,500 MXN</span>
                </div>
                <button 
                  type="submit" 
                  disabled={isSubmitting || !selectedDate}
                  className="w-full py-4 bg-primary text-primary-foreground font-display font-bold uppercase tracking-wider rounded-sm hover:bg-primary/90 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? 'Procesando...' : 'Pagar Anticipo en Mercado Pago'} <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
