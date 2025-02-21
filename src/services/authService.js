import {api, API_URLS} from '@/config/config';

// export const loginService = async (credentials) => {
//     try {
//         const response = await api.post(`${API_URLS.AUTH}/login`, credentials);
//         return response.data;
//     } catch (error) {
//         console.error("Error logging in:", error);
//         throw error;
//     }
// }


export const loginService = async (credentials) => {
    const response = await api.post('/auth/login', credentials, { withCredentials: true });
    return response.data.user;
};

export const fetchUser = async () => {
    const response = await api.get('/auth/me', { withCredentials: true });
    return response.data.user;
};

export const logoutService = async () => {
    await api.post('/auth/logout', {}, { withCredentials: true });
};