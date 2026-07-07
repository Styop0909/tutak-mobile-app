import { create } from 'zustand';
import { bonusApi } from '../api/bonus';

export const useBonusStore = create((set, get) => ({
  balance: 0,
  frozenBalance: 0,
  history: [],
  isLoading: false,
  error: null,

  fetchBonusData: async () => {
    set({ isLoading: true, error: null });
    try {
      const [balance, frozen, history] = await Promise.all([
        bonusApi.getBalance(),
        bonusApi.getFrozen(),
        bonusApi.getHistory(),
      ]);
      set({ 
        balance: balance || 0,
        frozenBalance: frozen || 0,
        history: history || [],
        isLoading: false 
      });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  fetchBalance: async () => {
    try {
      const balance = await bonusApi.getBalance();
      set({ balance: balance || 0 });
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  },
}));
