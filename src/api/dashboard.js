import api from './axios';

export const dashboardAPI = {
    getStats: async () => {
        const response = await api.get('/dashboard/stats');
        return response.data;
    },

    getPredictions: async () => {
        const response = await api.get('/dashboard/predictions');
        return response.data;
    },

    getBeds: async () => {
        const response = await api.get('/dashboard/beds');
        return response.data;
    },

    getStaff: async () => {
        const response = await api.get('/dashboard/staff');
        return response.data;
    },

    getAlerts: async () => {
        const response = await api.get('/dashboard/alerts');
        return response.data;
    },

    getRecommendations: async () => {
        const response = await api.get('/dashboard/recommendations');
        return response.data;
    },

    getDoctorStats: async () => {
        const response = await api.get('/dashboard/doctor-stats');
        return response.data;
    }
};
