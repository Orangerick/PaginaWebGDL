import { ServicePackage, PeoplePricing, Product, FAQ } from '../types';

export const INITIAL_PACKAGES: ServicePackage[] = [
  {
    id: 'base',
    name: 'Servicio Base',
    basePrice: 5500,
    hours: 5,
    extraHourPrice: 1200,
    description: 'Perfecto para fiestas privadas y eventos medianos en CDMX.',
    features: ['Servicio DJ', 'Bocina', 'Cabina estándar', 'Luces básicas']
  },
  {
    id: 'premium',
    name: 'Servicio Premium',
    basePrice: 7500,
    hours: 5,
    extraHourPrice: 1200,
    description: 'La experiencia completa de club nocturno para tu evento.',
    features: ['4 Bocinas', 'Pirotecnia / Chisperos', 'Máquinas CO2 / Humo', 'Lasers', 'Cabezas Robóticas']
  }
];

export const INITIAL_PEOPLE_PRICING: PeoplePricing = {
  tier1: 0,
  tier2: 3000,
  tier3: 5500,
  tier4: 7500,
};

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Mesa DJ Profesional',
    price: 8500,
    description: 'Cabina de DJ resistente con acabado oscuro y detalles en neón.',
    measurements: '120cm x 60cm x 95cm',
    tags: ['Cabina', 'Premium', 'Neón'],
    color: 'Negro Mate',
    imageUrl: 'https://images.unsplash.com/photo-1571266028243-d220c6a7edbf?w=800&q=80',
  },
  {
    id: 'p2',
    name: 'Módulo de Luces LED',
    price: 3200,
    description: 'Barra de luces LED rítmicas para ambientar la cabina.',
    measurements: '100cm x 15cm x 10cm',
    tags: ['Iluminación', 'Accesorios'],
    color: 'Negro',
    amazonLink: 'https://amazon.com',
    imageUrl: 'https://images.unsplash.com/photo-1768885510237-9238a40a4f93?w=800&q=80',
  }
];

export const FAQS: FAQ[] = [
  { q: '¿Cuántas personas pueden asistir?', a: 'Ofrecemos paquetes escalables desde 10 hasta más de 300 personas. El precio se ajusta según la cantidad de invitados para garantizar la mejor cobertura de audio.' },
  { q: '¿Tienen servicio para espacios abiertos y cerrados?', a: 'Sí, adaptamos nuestro equipo según el tipo de espacio. Los espacios abiertos pueden requerir equipo de audio adicional para mantener la calidad.' },
  { q: '¿Qué tipo de eventos cubren?', a: 'Cubrimos desde fiestas privadas, cumpleaños y bodas, hasta eventos corporativos y activaciones de marca.' },
  { q: '¿Tienen cobertura fuera de CDMX?', a: 'Nuestros precios base son para CDMX. Para eventos al interior de la república, contáctanos por WhatsApp para una cotización personalizada.' },
];
