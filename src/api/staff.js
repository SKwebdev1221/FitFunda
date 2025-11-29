import api from './axios';

export const staffAPI = {
    getAll: async (params) => {
        const response = await api.get('/staff/', { params });
        return response.data;
    },

    getById: async (id) => {
        const response = await api.get(`/staff/${id}`);
        return response.data;
    },

    getReadiness: async () => {
        const response = await api.get('/staff/readiness');
        return response.data;
    },

    create: async (data) => {
        const response = await api.post('/staff', data);
        return response.data;
    },

    update: async (id, data) => {
        const response = await api.put(`/staff/${id}`, data);
        return response.data;
    },

    delete: async (id) => {
        const response = await api.delete(`/staff/${id}`);
        return response.data;
    }
};
