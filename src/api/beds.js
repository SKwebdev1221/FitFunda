import api from './axios';

export const bedsAPI = {
    getAll: async (params) => {
        const response = await api.get('/beds/', { params });
        return response.data;
    },

    getById: async (id) => {
        const response = await api.get(`/beds/${id}`);
        return response.data;
    },

    getStats: async () => {
        const response = await api.get('/beds/stats');
        return response.data;
    },

    create: async (data) => {
        const response = await api.post('/beds', data);
        return response.data;
    },

    update: async (id, data) => {
        const response = await api.put(`/beds/${id}`, data);
        return response.data;
    },

    delete: async (id) => {
        const response = await api.delete(`/beds/${id}`);
        return response.data;
    }
};
