import axios from 'axios';

// Función para obtener el token desde localStorage
const getAuthToken = () => localStorage.getItem('authToken');

const createAxiosInstance = (baseURL) => {
    const instance = axios.create({
        baseURL: baseURL,
        withCredentials: false, // Ya no usamos cookies
    });

    // Interceptor de solicitud: Agregar el token a todas las peticiones
    instance.interceptors.request.use(
        (config) => {
            const token = getAuthToken();
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => Promise.reject(error)
    );

    return instance;
};

export default createAxiosInstance;
