import { api } from './client';

export const buildingApi = {
  getMaterials: async () => {
    const response = await api.get('/api/building-materials');
    return response.data;
  },

  getMaterialDetails: async (id) => {
    const response = await api.get(`/api/building-materials/${id}`);
    return response.data;
  },

  getCategories: async () => {
    const response = await api.get('/api/building-materials/categories');
    return response.data;
  },
};
