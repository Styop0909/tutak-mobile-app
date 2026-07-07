import { create } from 'zustand';
import { statsApi } from '../api/stats';

export const useStatsStore = create((set, get) => ({
  stats: null,
  isLoading: false,
  error: null,

  fetchStats: async () => {
    set({ isLoading: true, error: null });
    try {
      const [stats, bonusStats, partnerStats] = await Promise.all([
        statsApi.getStats(),
        statsApi.getBonusStats(),
        statsApi.getPartnerStats(),
      ]);
      set({ 
        stats: {
          ...stats,
          ...bonusStats,
          partners: partnerStats || [],
        },
        isLoading: false 
      });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },
}));
