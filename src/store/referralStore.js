import { create } from 'zustand';
import { referralApi } from '../api/referral';

export const useReferralStore = create((set, get) => ({
  referralData: null,
  isLoading: false,
  error: null,

  fetchReferralData: async () => {
    set({ isLoading: true, error: null });
    try {
      const [referral, link, qr, list] = await Promise.all([
        referralApi.getReferralData(),
        referralApi.getReferralLink(),
        referralApi.getReferralQR(),
        referralApi.getReferrals(),
      ]);
      set({ 
        referralData: {
          ...referral,
          link,
          qr,
          referredUsers: list || [],
        },
        isLoading: false 
      });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },
}));
