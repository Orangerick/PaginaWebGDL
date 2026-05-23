import { Schema, model, Document } from 'mongoose';

export interface IReservation extends Document {
  customerName: string;
  email: string;
  phone: string;
  eventDate: Date;
  eventType: string;
  packageId: 'servicio_dj' | 'premium';
  totalHours: number;        // Requisito del concurso (Base 5hrs + extras)
  peopleTier: '10-100' | '100-200' | '200-300' | '300+'; // Rangos del tabulador
  isOutdoor: boolean;
  address: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  totalPrice: number;        // Precio final calculado matemáticamente
  depositPaid: boolean;      // Control del anticipo de $1,500
  mercadoPagoPreferenceId?: string; // Para la integración de la Fase 3
  createdAt: Date;
}

const reservationSchema = new Schema<IReservation>({
  customerName: { type: String, required: true, trim: true },
  email: { 
    type: String, 
    required: true, 
    trim: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Por favor ingresa un correo electrónico válido']
  },
  phone: { 
    type: String, 
    required: true,
    match: [/^\d{10}$/, 'El teléfono debe tener 10 dígitos']
  },
  eventDate: { type: Date, required: true }, 
  eventType: { type: String, required: true, trim: true },
  packageId: { type: String, enum: ['servicio_dj', 'premium'], required: true },
  totalHours: { type: Number, required: true, default: 5, min: 5 },
  peopleTier: { type: String, enum: ['10-100', '100-200', '200-300', '300+'], required: true },
  isOutdoor: { type: Boolean, default: false },
  address: { type: String, required: true, trim: true },
  status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' },
  totalPrice: { type: Number, required: true, min: 0 },
  depositPaid: { type: Boolean, default: false },
  mercadoPagoPreferenceId: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export const Reservation = model<IReservation>('Reservation', reservationSchema);
