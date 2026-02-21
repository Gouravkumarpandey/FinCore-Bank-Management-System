import API from './api';

export const authService = {
    async login(email, password) {
        try {
            const response = await API.post('/auth/login', { email, password });
            if (response.data.success) {
                const { user, token } = response.data;
                localStorage.setItem('token', token);
                localStorage.setItem('currentUser', JSON.stringify(user));
                return user;
            }
        } catch (error) {
            throw new Error(error.response?.data?.error || 'Login failed');
        }
    },

    async signup(fullName, email, password, phone) {
        try {
            const response = await API.post('/auth/register', { fullName, email, password, phone });
            if (response.data.success) {
                const { user, token } = response.data;
                localStorage.setItem('token', token);
                localStorage.setItem('currentUser', JSON.stringify(user));
                return user;
            }
        } catch (error) {
            throw new Error(error.response?.data?.error || 'Signup failed');
        }
    },

    async logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('currentUser');
    },

    async updateProfile(formData) {
        try {
            const response = await API.put('/users/profile', formData);
            if (response.data.success) {
                const user = response.data.data;
                localStorage.setItem('currentUser', JSON.stringify(user));
                return user;
            }
        } catch (error) {
            throw new Error(error.response?.data?.error || 'Profile update failed');
        }
    },

    getCurrentUser() {
        const user = localStorage.getItem('currentUser');
        return user ? JSON.parse(user) : null;
    },

    async getMe() {
        try {
            const response = await API.get('/auth/me');
            if (response.data.success) {
                const user = response.data.data;
                localStorage.setItem('currentUser', JSON.stringify(user));
                return user;
            }
        } catch (error) {
            this.logout();
            throw error;
        }
    }
};
