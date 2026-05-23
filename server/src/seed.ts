import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Pricing } from './models/Pricing.js';
import { Product } from './models/Product.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/paginawebdj';

const initialPricing = {
  packages: {
    servicio_dj: 5500,
    premium: 7500
  },
  extraHourRate: 1200,
  peopleTiers: {
    '10-100': 0,
    '100-200': 3000,
    '200-300': 5500,
    '300+': 7500
  },
  depositAmount: 1500
};

const initialProducts = [
  {
    name: 'Mesa DJ Profesional "Neon Noir"',
    price: 8500,
    description: 'Cabina de DJ resistente con acabado oscuro, iluminación LED integrada y detalles en neón.',
    dimensions: '120cm x 60cm x 95cm',
    photos: ['https://images.unsplash.com/photo-1571266028243-d220c6a7edbf?w=800&q=80'],
    tags: ['Cabina', 'Premium', 'Neón'],
    color: 'Negro Mate',
    deliveryMethod: 'gratis_5km'
  },
  {
    name: 'Módulo de Luces LED Rítmicas',
    price: 3200,
    description: 'Barra de luces LED rítmicas para ambientar la cabina y la pista de baile.',
    dimensions: '100cm x 15cm x 10cm',
    photos: ['https://images.unsplash.com/photo-1768885510237-9238a40a4f93?w=800&q=80'],
    tags: ['Iluminación', 'Accesorios'],
    color: 'Negro',
    deliveryMethod: 'cdmx_200'
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB for seeding...');

    // Clear existing data
    await Pricing.deleteMany({});
    await Product.deleteMany({});

    // Insert new data
    await new Pricing(initialPricing).save();
    await Product.insertMany(initialProducts);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDB();
