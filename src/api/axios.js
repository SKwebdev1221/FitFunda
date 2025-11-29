import axios from 'axios';
import { CONFIG } from '../config';

const api = axios.create({
    baseURL: CONFIG.API_BASE_URL,
});

// Add a request interceptor to attach the token and set default Content-Type
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        // Set default Content-Type only if not already set
        if (!config.headers['Content-Type'] && !config.headers['content-type']) {
            config.headers['Content-Type'] = 'application/json';
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor to handle 401 errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Clear invalid token
            const token = localStorage.getItem('authToken');
            if (token) {
                localStorage.removeItem('authToken');
                // Only redirect if we're not already on login/signup page
                if (!window.location.pathname.includes('/login') && 
                    !window.location.pathname.includes('/signup')) {
                    // Trigger a custom event that components can listen to
                    window.dispatchEvent(new CustomEvent('auth:logout'));
                }
            }
        }
        return Promise.reject(error);
    }
);

export default api;
