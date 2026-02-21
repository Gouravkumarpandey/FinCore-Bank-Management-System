import API from './api';

export const bankService = {
    async getTransactions() {
        try {
            const response = await API.get('/transactions');
            return response.data.data;
        } catch (error) {
            console.error('Error fetching transactions:', error);
            return [];
        }
    },

    async deposit(amount) {
        try {
            const response = await API.post('/transactions/deposit', { amount: parseFloat(amount) });
            // After deposit, we need to fetch updated user data or return new balance
            // The backend returns the transaction, but maybe not the new balance in the same object
            return response.data.data;
        } catch (error) {
            throw new Error(error.response?.data?.error || 'Deposit failed');
        }
    },

    async withdraw(amount) {
        try {
            const response = await API.post('/transactions/withdraw', { amount: parseFloat(amount) });
            return response.data.data;
        } catch (error) {
            throw new Error(error.response?.data?.error || 'Withdrawal failed');
        }
    },

    async transfer(recipientAccountNumber, amount, description) {
        try {
            const response = await API.post('/transactions/transfer', {
                recipientAccountNumber,
                amount: parseFloat(amount),
                description
            });
            return response.data.data;
        } catch (error) {
            throw new Error(error.response?.data?.error || 'Transfer failed');
        }
    },

    async upiTransfer({ receiverUpiId, amount, upiPin, description }) {
        try {
            const response = await API.post('/transactions/upi-transfer', {
                receiverUpiId,
                amount: parseFloat(amount),
                upiPin,
                description
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};
