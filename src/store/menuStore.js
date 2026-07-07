import { create } from 'zustand';
import { menuApi } from '../api/menu';

export const useMenuStore = create((set, get) => ({
  menu: [],
  categories: [],
  isLoading: false,
  error: null,

  fetchMenu: async (city) => {
    set({ isLoading: true, error: null });
    try {
      const response = await menuApi.getMenu(city);
      const categories = [...new Set(response.map(item => item.category))].map(name => ({
        id: name.toLowerCase().replace(/\s+/g, '-'),
        name,
      }));
      set({ 
        menu: response, 
        categories,
        isLoading: false 
      });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },
}));
