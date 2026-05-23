import { Schema, model, Document } from 'mongoose';

export interface IReservation extends Document {
  customerName: string;
  email: string;
  phone: string;
  eventDate: Date;
  eventType: string;
  packageId: string;
  peopleTier: string;
  isOutdoor: boolean;
  address: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  totalPrice: number;
  depositPaid: boolean;
  createdAt: Date;
}

const reservationSchema = new Schema<IReservation>({
  customerName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  eventDate: { type: Date, required: true, unique: true }, // Simple availability check: one event per day
  eventType: { type: String, required: true },
  packageId: { type: String, required: true },
  peopleTier: { type: String, required: true },
  isOutdoor: { type: Boolean, default: false },
  address: { type: String, required: true },
  status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' },
  totalPrice: { type: Number, required: true },
  depositPaid: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export const Reservation = model<IReservation>('Reservation', reservationSchema);
