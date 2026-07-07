import { api } from './client';

export const authApi = {
  requestOTP: async (phoneNumber) => {
    const response = await api.post('/api/auth/request-otp', { phoneNumber });
    return response.data;
  },

  verifyOTP: async (phoneNumber, code) => {
    const response = await api.post('/api/auth/verify-otp', { phoneNumber, code });
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await api.get('/api/user');
    return response.data;
  },

  loginWithTelegram: async (telegramData) => {
    const response = await api.post('/api/auth/telegram', telegramData);
    return response.data;
  },

  logout: async () => {
    const response = await api.post('/api/auth/logout');
    return response.data;
  },
};
