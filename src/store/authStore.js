import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authApi } from '../api/auth';
import { saveToken, getToken, clearToken, saveUser, getUser, clearUser } from '../utils/storage';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isLoading: false,
      isAuthenticated: false,
      error: null,

      initialize: async () => {
        const token = await getToken();
        const user = await getUser();
        if (token && user) {
          set({ user, isAuthenticated: true });
        }
      },

      requestOTP: async (phoneNumber) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authApi.requestOTP(phoneNumber);
          set({ isLoading: false });
          return response;
        } catch (error) {
          set({ error: error.message, isLoading: false });
          throw error;
        }
      },

      verifyOTP: async (phoneNumber, code) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authApi.verifyOTP(phoneNumber, code);
          const { token, user } = response;
          await saveToken(token);
          await saveUser(user);
          set({ user, isAuthenticated: true, isLoading: false });
          return response;
        } catch (error) {
          set({ error: error.message, isLoading: false });
          throw error;
        }
      },

      logout: async () => {
        try {
          await authApi.logout();
        } finally {
          await clearToken();
          await clearUser();
          set({ user: null, isAuthenticated: false });
        }
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
