import { Schema, model, Document } from 'mongoose';

export interface ILead extends Document {
  name: string;
  phone: string;
  email: string;
  peopleCount: string;
  spaceType: 'abierto' | 'cerrado';
  eventType: string;
  createdAt: Date;
}

const leadSchema = new Schema<ILead>({
  name: { type: String, required: true, trim: true },
  phone: { 
    type: String, 
    required: true,
    match: [/^\d{10}$/, 'El teléfono debe tener 10 dígitos']
  },
  email: { 
    type: String, 
    required: true, 
    trim: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Por favor ingresa un correo electrónico válido']
  },
  peopleCount: { type: String, required: true, trim: true },
  spaceType: { type: String, enum: ['abierto', 'cerrado'], required: true },
  eventType: { type: String, required: true, trim: true },
  createdAt: { type: Date, default: Date.now }
});

export const Lead = model<ILead>('Lead', leadSchema);
