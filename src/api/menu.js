import { api } from './client';

export const menuApi = {
  getMenu: async (city) => {
    const response = await api.get('/api/menu', { city });
    return response.data;
  },

  getCategories: async () => {
    const response = await api.get('/api/menu/categories');
    return response.data;
  },

  getMenuItem: async (id) => {
    const response = await api.get(`/api/menu/${id}`);
    return response.data;
  },
};
