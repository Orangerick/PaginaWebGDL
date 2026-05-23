import { Schema, model, Document } from 'mongoose';

export interface IPricing extends Document {
  packages: {
    servicio_dj: number;
    premium: number;
  };
  extraHourRate: number;
  peopleTiers: {
    '10-100': number;
    '100-200': number;
    '200-300': number;
    '300+': number;
  };
  depositAmount: number;
  updatedAt: Date;
}

const pricingSchema = new Schema<IPricing>({
  packages: {
    servicio_dj: { type: Number, required: true, default: 5500 },
    premium: { type: Number, required: true, default: 7500 }
  },
  extraHourRate: { type: Number, required: true, default: 1200 },
  peopleTiers: {
    '10-100': { type: Number, required: true, default: 0 },
    '100-200': { type: Number, required: true, default: 3000 },
    '200-300': { type: Number, required: true, default: 5500 },
    '300+': { type: Number, required: true, default: 7500 }
  },
  depositAmount: { type: Number, required: true, default: 1500 },
  updatedAt: { type: Date, default: Date.now }
});

export const Pricing = model<IPricing>('Pricing', pricingSchema);
