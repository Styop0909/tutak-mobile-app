import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useSettingsStore = create(
  persist(
    (set, get) => ({
      language: 'en',
      city: 'yerevan',
      notificationsEnabled: true,

      setLanguage: (language) => set({ language }),
      setCity: (city) => set({ city }),
      toggleNotifications: () => 
        set((state) => ({ 
          notificationsEnabled: !state.notificationsEnabled 
        })),
    }),
    {
      name: 'settings-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
