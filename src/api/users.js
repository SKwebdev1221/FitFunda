import api from './axios';

export const usersAPI = {
    getProfile: async () => {
        const response = await api.get('/users/profile');
        return response.data;
    },

    updateProfile: async (data) => {
        const response = await api.put('/users/profile', data);
        return response.data;
    },

    getAll: async (params) => {
        const response = await api.get('/users', { params });
        return response.data;
    },

    getById: async (id) => {
        const response = await api.get(`/users/${id}`);
        return response.data;
    }
};
