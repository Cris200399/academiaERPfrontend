import {api} from '@/config/config';

export const loginService = async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
};

export const fetchUser = async () => {
    const response = await api.get('/auth/me');
    return response.data;
};

export const logoutService = async () => {
    await api.post('/auth/logout', {});
};