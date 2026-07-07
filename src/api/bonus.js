import { api } from './client';

export const bonusApi = {
  getBalance: async () => {
    const response = await api.get('/api/bonus');
    return response.data;
  },

  getHistory: async () => {
    const response = await api.get('/api/bonus/history');
    return response.data;
  },

  getFrozen: async () => {
    const response = await api.get('/api/bonus/frozen');
    return response.data;
  },
};
