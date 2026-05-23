import { Schema, model, Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  price: number;
  description: string;
  dimensions: string; // Medidas del mueble
  photos: string[];   // Array de URLs de las imágenes
  tags: string[];     // Etiquetas de búsqueda
  color: string;
  amazonLink?: string; // Por si el producto se vende directamente en Amazon
  deliveryMethod: 'gratis_5km' | 'cdmx_200' | 'cotizar_interior';
  createdAt: Date;
}

const productSchema = new Schema<IProduct>({
  name: { type: String, required: true, trim: true },
  price: { type: Number, required: true, min: 0 },
  description: { type: String, required: true, trim: true },
  dimensions: { type: String, required: true, trim: true },
  photos: [{ type: String }],
  tags: [{ type: String }],
  color: { type: String, required: true, trim: true },
  amazonLink: { type: String, trim: true },
  deliveryMethod: { 
    type: String, 
    enum: ['gratis_5km', 'cdmx_200', 'cotizar_interior'], 
    required: true 
  },
  createdAt: { type: Date, default: Date.now }
});

export const Product = model<IProduct>('Product', productSchema);
