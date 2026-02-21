import API from './api';

export const userService = {
    async getUsers() {
        try {
            const response = await API.get('/users');
            return response.data;
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error;
        }
    }
};
