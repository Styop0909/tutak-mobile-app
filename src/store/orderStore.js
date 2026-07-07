import { create } from 'zustand';
import { ordersApi } from '../api/orders';

export const useOrderStore = create((set, get) => ({
  orders: [],
  isLoading: false,
  error: null,

  fetchOrders: async () => {
    set({ isLoading: true, error: null });
    try {
      const orders = await ordersApi.getOrders();
      set({ orders: orders || [], isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  createOrder: async (orderData) => {
    set({ isLoading: true, error: null });
    try {
      const order = await ordersApi.createOrder(orderData);
      const { orders } = get();
      set({ 
        orders: [order, ...orders],
        isLoading: false 
      });
      return order;
    } catch (error) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },
}));
