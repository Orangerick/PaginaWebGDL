import axios from 'axios';

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
    const response = await api.post('/auth/login', credentials);
    if (response.data.token) {
      localStorage.setItem('adminToken', response.data.token);
    }
    return response.data;
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
    const response = await api.get(`/reservations/availability?month=${month}&year=${year}`);
    return response.data.busyDates;
  },
  
  createReservation: async (data: any) => {
    const response = await api.post('/reservations', data);
    return response.data;
  }
};

export const pricingService = {
  getPricing: async () => {
    const response = await api.get('/pricing');
    return response.data;
  },
  updatePricing: async (data: any) => {
    const response = await api.post('/pricing', data);
    return response.data;
  }
};

export const productService = {
  getProducts: async () => {
    const response = await api.get('/products');
    return response.data;
  },
  createProduct: async (data: any) => {
    const response = await api.post('/products', data);
    return response.data;
  }
};
