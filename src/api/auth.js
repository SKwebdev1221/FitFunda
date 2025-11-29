import api from './axios';

export const authAPI = {
    login: async (email, password) => {
        // OAuth2PasswordRequestForm expects application/x-www-form-urlencoded
        const params = new URLSearchParams();
        params.append('username', email);
        params.append('password', password);
        
        const response = await api.post('/auth/login', params.toString(), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        return response.data;
    },

    register: async (userData) => {
        // Remove confirmPassword if present, backend doesn't need it
        const { confirmPassword, ...registrationData } = userData;
        const response = await api.post('/auth/register', registrationData);
        return response.data;
    },

    validateToken: async () => {
        const response = await api.get('/auth/validate');
        return response.data;
    },

    getProfile: async () => {
        const response = await api.get('/users/profile');
        return response.data;
    }
};
