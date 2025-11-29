import api from './axios';

export const reportsAPI = {
    getDepartmentPerformance: async () => {
        const response = await api.get('/reports/department-performance');
        return response.data;
    },

    getStaffReadiness: async () => {
        const response = await api.get('/reports/staff-readiness');
        return response.data;
    },

    getSurgeAnalysis: async () => {
        const response = await api.get('/reports/surge-analysis');
        return response.data;
    },

    getInventoryForecast: async () => {
        const response = await api.get('/reports/inventory-forecast');
        return response.data;
    },

    exportReport: async (type, format) => {
        const response = await api.get(`/reports/export/${type}`, { params: { format } });
        return response.data;
    }
};
