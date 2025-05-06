import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000/api/v1';

const axiosInstance = axios.create({
    baseURL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    }
});

// Request interceptor for adding auth token
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor for handling errors
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle different error statuses (401, 403, 500, etc.)
        if (error.response?.status === 401) {
            // Handle unauthorized error (redirect to login, etc.)
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;