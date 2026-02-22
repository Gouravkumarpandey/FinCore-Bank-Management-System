import axios from 'axios';

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL || `http://${window.location.hostname}:5001/api`,
});

// Add a request interceptor to attach the auth token to every request
API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Add a response interceptor to handle 401 Unauthorized globally
API.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            const requestUrl = error.config?.url || '';
            // Don't redirect if the failing request was itself an auth route
            const isAuthRoute = requestUrl.includes('/auth/login') || requestUrl.includes('/auth/register');
            if (!isAuthRoute && !window.location.pathname.includes('/login') && !window.location.pathname.includes('/signup')) {
                // Token is invalid or expired — clear session and redirect to login
                localStorage.removeItem('token');
                localStorage.removeItem('currentUser');
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export default API;
