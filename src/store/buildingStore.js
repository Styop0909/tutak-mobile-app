import { create } from 'zustand';
import { buildingApi } from '../api/building';

export const useBuildingStore = create((set, get) => ({
  materials: [],
  categories: [],
  isLoading: false,
  error: null,

  fetchMaterials: async () => {
    set({ isLoading: true, error: null });
    try {
      const [materials, categories] = await Promise.all([
        buildingApi.getMaterials(),
        buildingApi.getCategories(),
      ]);
      set({ 
        materials: materials || [],
        categories: categories || [],
        isLoading: false 
      });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },
}));
