
import API from './api';

export const adminService = {
    async getAnalytics() {
        const response = await API.get('/admin/analytics');
        return response.data.data;
    },

    async getUsers() {
        const response = await API.get('/admin/users');
        return response.data.data;
    },

    async toggleBlockUser(userId) {
        const response = await API.put(`/admin/users/${userId}/block`);
        return response.data.data;
    },

    async getAccounts() {
        const response = await API.get('/admin/accounts');
        return response.data.data;
    },

    async toggleFreezeAccount(accountId) {
        const response = await API.put(`/admin/accounts/${accountId}/freeze`);
        return response.data.data;
    },

    async getAllTransactions() {
        const response = await API.get('/admin/transactions');
        return response.data.data;
    },

    async createAdmin(adminData) {
        const response = await API.post('/admin/create', adminData);
        return response.data.data;
    }
};
