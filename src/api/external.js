import api from './axios';

export const externalAPI = {
    getWeather: async (city) => {
        const response = await api.get('/external/weather', { params: { city } });
        return response.data;
    },

    getAQI: async (city) => {
        const response = await api.get('/external/aqi', { params: { city } });
        return response.data;
    },

    getEvents: async (country, year) => {
        const response = await api.get('/external/events', { params: { country, year } });
        return response.data;
    }
};
