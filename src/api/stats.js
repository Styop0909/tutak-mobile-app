import { api } from './client';

export const statsApi = {
  getStats: async () => {
    const response = await api.get('/api/stats');
    return response.data;
  },

  getBonusStats: async () => {
    const response = await api.get('/api/stats/bonus');
    return response.data;
  },

  getPartnerStats: async () => {
    const response = await api.get('/api/stats/partners');
    return response.data;
  },
};
