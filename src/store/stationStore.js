import { create } from 'zustand';
import { ocpiApi } from '../api/ocpi';

export const useStationStore = create((set, get) => ({
  stations: [],
  tariffs: [],
  isLoading: false,
  error: null,

  fetchStations: async () => {
    set({ isLoading: true, error: null });
    try {
      const [locations, tariffs] = await Promise.all([
        ocpiApi.getLocations(),
        ocpiApi.getTariffs(),
      ]);
      set({ 
        stations: locations || [],
        tariffs: tariffs || [],
        isLoading: false 
      });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },
}));
