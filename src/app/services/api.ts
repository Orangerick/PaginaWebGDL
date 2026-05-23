import axios from 'axios';
import { INITIAL_PACKAGES, INITIAL_PEOPLE_PRICING, PRODUCTS } from './mockData';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  login: async (credentials: any) => {
    // Mock login para presentación
    if (credentials.username === 'admin' && credentials.password === 'admin') {
      const token = 'mock-token';
      localStorage.setItem('adminToken', token);
      return { token };
    }
    throw new Error('Credenciales inválidas');
  },
  logout: () => {
    localStorage.removeItem('adminToken');
  },
  isAuthenticated: () => {
    return !!localStorage.getItem('adminToken');
  }
};

export const reservationService = {
  getAvailability: async (month: number, year: number) => {
    // Retornar vacio para que todas las fechas estén disponibles en el demo
    return [];
  },
  
  createReservation: async (data: any) => {
    // Simular éxito de reserva
    return { success: true, message: 'Reserva enviada correctamente (Demo)' };
  }
};

export const pricingService = {
  getPricing: async () => {
    // Retornar datos estáticos para que el calculador funcione
    return {
      packages: {
        servicio_dj: INITIAL_PACKAGES[0].basePrice,
        premium: INITIAL_PACKAGES[1].basePrice
      },
      extraHourRate: INITIAL_PACKAGES[0].extraHourPrice,
      peopleTiers: {
        '10-100': INITIAL_PEOPLE_PRICING.tier1,
        '100-200': INITIAL_PEOPLE_PRICING.tier2,
        '200-300': INITIAL_PEOPLE_PRICING.tier3,
        '300+': INITIAL_PEOPLE_PRICING.tier4
      },
      depositAmount: 1500
    };
  },
  updatePricing: async (data: any) => {
    return { success: true, data };
  }
};

export const productService = {
  getProducts: async () => {
    // Retornar productos estáticos para que la tienda cargue
    return PRODUCTS.map(p => ({
      ...p,
      _id: p.id,
      photos: [p.imageUrl],
      dimensions: p.measurements,
    }));
  },
  createProduct: async (data: any) => {
    return { success: true };
  }
};

