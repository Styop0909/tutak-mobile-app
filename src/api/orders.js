import { api } from './client';

export const ordersApi = {
  createOrder: async (orderData) => {
    const response = await api.post('/api/order', orderData);
    return response.data;
  },

  getOrders: async () => {
    const response = await api.get('/api/orders');
    return response.data;
  },

  getOrderDetails: async (id) => {
    const response = await api.get(`/api/orders/${id}`);
    return response.data;
  },

  cancelOrder: async (id) => {
    const response = await api.post(`/api/orders/${id}/cancel`);
    return response.data;
  },
};
