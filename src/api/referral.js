import { api } from './client';

export const referralApi = {
  getReferralData: async () => {
    const response = await api.get('/api/referral');
    return response.data;
  },

  getReferralLink: async () => {
    const response = await api.get('/api/referral/link');
    return response.data;
  },

  getReferralQR: async () => {
    const response = await api.get('/api/referral/qr');
    return response.data;
  },

  getReferrals: async () => {
    const response = await api.get('/api/referral/list');
    return response.data;
  },
};
