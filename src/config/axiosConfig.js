import axios from 'axios';
import {useUserStore} from '@/stores/userStore';

const API = axios.create({
    baseURL: 'https://academiabackend-en0f.onrender.com/api',
    withCredentials: false
});

// Interceptor para agregar el token automáticamente
API.interceptors.request.use(
    (config) => {
        const userStore = useUserStore();
        if (userStore.token) {
            config.headers.Authorization = `Bearer ${userStore.token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default API;
