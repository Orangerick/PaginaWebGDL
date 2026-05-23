import { ServicePackage, PeoplePricing, Product, FAQ } from '../types';

export const INITIAL_PACKAGES: ServicePackage[] = [
  {
    id: 'servicio_dj',
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
    name: 'Cabina DJ Blanca Diamante',
    price: 12500,
    description: 'Cabina de diseño premium con acabado diamante blanco y retroiluminación.',
    measurements: '150cm x 60cm x 100cm',
    tags: ['Cabina', 'Premium', 'Blanca'],
    color: 'Blanco Diamante',
    imageUrl: '/gallery/Cabina DJ Blanca Diamante Frente.jpeg',
  },
  {
    id: 'p2',
    name: 'Cabina DJ Negra Diamante',
    price: 11500,
    description: 'Diseño elegante y moderno con acabado diamante negro mate.',
    measurements: '150cm x 60cm x 100cm',
    tags: ['Cabina', 'Moderna', 'Negra'],
    color: 'Negro Diamante',
    imageUrl: '/gallery/Cabina DJ Negra Diamante frente.jpeg',
  },
  {
    id: 'p3',
    name: 'Cabina DJ Blanca Triángulos',
    price: 10500,
    description: 'Estructura geométrica vanguardista con patrones de triángulos.',
    measurements: '150cm x 60cm x 100cm',
    tags: ['Cabina', 'Vanguardia'],
    color: 'Blanco Satín',
    imageUrl: '/gallery/Cabina DJ Blanca Triangulos.jpeg',
  },
  {
    id: 'p4',
    name: 'Cabina DJ Negra Rayado',
    price: 9500,
    description: 'Acabado minimalista con textura rayada profesional.',
    measurements: '120cm x 60cm x 95cm',
    tags: ['Cabina', 'Minimalista'],
    color: 'Negro Rayado',
    imageUrl: '/gallery/Cabina DJ Negra Rayado.jpeg',
  }
];

export const FAQS: FAQ[] = [
  { q: '¿Cuántas personas pueden asistir?', a: 'Ofrecemos paquetes escalables desde 10 hasta más de 300 personas. El precio se ajusta según la cantidad de invitados para garantizar la mejor cobertura de audio.' },
  { q: '¿Tienen servicio para espacios abiertos y cerrados?', a: 'Sí, adaptamos nuestro equipo según el tipo de espacio. Los espacios abiertos pueden requerir equipo de audio adicional para mantener la calidad.' },
  { q: '¿Qué tipo de eventos cubren?', a: 'Cubrimos desde fiestas privadas, cumpleaños y bodas, hasta eventos corporativos y activaciones de marca.' },
  { q: '¿Tienen cobertura fuera de CDMX?', a: 'Nuestros precios base son para CDMX. Para eventos al interior de la república, contáctanos por WhatsApp para una cotización personalizada.' },
];
