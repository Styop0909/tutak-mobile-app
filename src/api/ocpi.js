import { api } from './client';

export const ocpiApi = {
  getLocations: async () => {
    const response = await api.get('/ocpi/cpo/locations');
    return response.data;
  },

  getTariffs: async () => {
    const response = await api.get('/ocpi/cpo/tariffs');
    return response.data;
  },

  getLocationDetails: async (id) => {
    const response = await api.get(`/ocpi/cpo/locations/${id}`);
    return response.data;
  },

  getSessions: async () => {
    const response = await api.get('/ocpi/cpo/sessions');
    return response.data;
  },
};
