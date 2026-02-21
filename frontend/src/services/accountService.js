
import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000/api',
});

// Add token to requests
API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const accountService = {
    async updateCardTheme(theme) {
        const response = await API.put('/accounts/card-theme', { theme });
        return response.data;
    }
};
