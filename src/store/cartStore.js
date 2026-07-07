import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      totalPrice: 0,
      bonusUsed: 0,

      addItem: (item, quantity = 1) => {
        set((state) => {
          const existingItem = state.items.find((i) => i.id === item.id);
          let newItems;
          if (existingItem) {
            newItems = state.items.map((i) =>
              i.id === item.id
                ? { ...i, quantity: i.quantity + quantity }
                : i
            );
          } else {
            newItems = [...state.items, { ...item, quantity }];
          }
          const totalItems = newItems.reduce((sum, i) => sum + i.quantity, 0);
          const totalPrice = newItems.reduce(
            (sum, i) => sum + i.price * i.quantity,
            0
          );
          return { items: newItems, totalItems, totalPrice };
        });
      },

      removeItem: (itemId) => {
        set((state) => {
          const newItems = state.items.filter((i) => i.id !== itemId);
          const totalItems = newItems.reduce((sum, i) => sum + i.quantity, 0);
          const totalPrice = newItems.reduce(
            (sum, i) => sum + i.price * i.quantity,
            0
          );
          return { items: newItems, totalItems, totalPrice };
        });
      },

      updateQuantity: (itemId, quantity) => {
        set((state) => {
          if (quantity <= 0) {
            return get().removeItem(itemId);
          }
          const newItems = state.items.map((i) =>
            i.id === itemId ? { ...i, quantity } : i
          );
          const totalItems = newItems.reduce((sum, i) => sum + i.quantity, 0);
          const totalPrice = newItems.reduce(
            (sum, i) => sum + i.price * i.quantity,
            0
          );
          return { items: newItems, totalItems, totalPrice };
        });
      },

      clearCart: () => {
        set({ items: [], totalItems: 0, totalPrice: 0, bonusUsed: 0 });
      },

      applyBonus: (bonusAmount) => {
        set({ bonusUsed: bonusAmount });
      },

      getTotalWithBonus: () => {
        const state = get();
        return Math.max(0, state.totalPrice - state.bonusUsed);
      },
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
