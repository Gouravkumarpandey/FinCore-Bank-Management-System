import API from './api';

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
