import api from './axios';

export const medicalRecordsAPI = {
    getAll: async (params) => {
        const response = await api.get('/records/', { params });
        return response.data;
    },

    getById: async (id) => {
        const response = await api.get(`/records/${id}`);
        return response.data;
    },

    create: async (data) => {
        const response = await api.post('/records', data);
        return response.data;
    },

    update: async (id, data) => {
        const response = await api.put(`/records/${id}`, data);
        return response.data;
    },

    getByPatientId: async (patientId) => {
        const response = await api.get(`/records/patient/${patientId}`);
        return response.data;
    }
};
