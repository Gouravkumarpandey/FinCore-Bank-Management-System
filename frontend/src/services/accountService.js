import API from './api';

export const accountService = {
    async updateCardTheme(theme) {
        const response = await API.put('/accounts/card-theme', { theme });
        return response.data;
    }
};
