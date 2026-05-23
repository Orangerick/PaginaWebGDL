import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

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
