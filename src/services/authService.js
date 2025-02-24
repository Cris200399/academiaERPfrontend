import API from "@/config/axiosConfig";


export const loginService = async (credentials) => {
    const response = await API.post('/auth/login', credentials);
    return response.data;
};

export const fetchUser = async () => {
    const response = await API.get('/auth/me');
    return response.data;
};