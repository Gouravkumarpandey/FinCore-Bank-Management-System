
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

export const investmentService = {
    async getStocks() {
        const response = await API.get('/stocks');
        return response.data.data;
    },

    async getPortfolio() {
        const response = await API.get('/investments/portfolio');
        return response.data.data;
    },

    async getHistory() {
        const response = await API.get('/investments/history');
        return response.data.data;
    },

    async buyStock(symbol, quantity) {
        const response = await API.post('/investments/buy', { symbol, quantity });
        return response.data;
    },

    async sellStock(symbol, quantity) {
        const response = await API.post('/investments/sell', { symbol, quantity });
        return response.data;
    }
};
