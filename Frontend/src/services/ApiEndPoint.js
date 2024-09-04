import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:5000',
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
});

// Request interceptor to include JWT token
instance.interceptors.request.use(
    function (config) {
        const token = localStorage.getItem('jwtToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
            console.log('Authorization header set:', config.headers['Authorization']); // Debug log
        } else {
            console.log('No token found');
        }
        return config;
    },
    function (error) {
        console.error('Request Error:', error);
        return Promise.reject(error);
    }
);

// Response interceptor to handle errors
instance.interceptors.response.use(
    function (response) {
        console.log('API Response:', response);
        return response;
    },
    function (error) {
        if (error.response) {
            console.log('API Error Status:', error.response.status);
            if (error.response.status === 401) {
                console.log('Unauthorized, redirecting to login...');
                // Implement a redirect to the login page if necessary
            }
        }
        console.error('API Error:', error.message);
        return Promise.reject(error);
    }
);

export const get = (url, params) => instance.get(url, { params });
export const post = (url, data) => instance.post(url, data);
export const put = (url, data) => instance.put(url, data);
export const delet = (url) => instance.delete(url);
