import axios from 'axios';

export const apiInstance = axios.create({
    baseURL: import.meta.env.VITE_API_HOST,
    withCredentials: true,
});

apiInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error(error);
        return Promise.reject(error);
    }
);
