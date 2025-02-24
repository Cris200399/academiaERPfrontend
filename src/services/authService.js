import API from "@/config/axiosConfig";
import getApiEndpoints from "@/config/apiEndpoints";


export const loginService = async (credentials) => {
    const response = await API.post(`${getApiEndpoints.AUTH}/login`, credentials);
    return response.data;
};

export const fetchUser = async () => {
    const response = await API.get(`${getApiEndpoints.AUTH}/me`);
    return response.data;
};