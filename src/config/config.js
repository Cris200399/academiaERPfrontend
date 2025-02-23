import createAxiosInstance from "@/config/axiosConfig";
import getApiEndpoints from "@/config/apiEndpoints";


const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:5001/api';
// const API_BASE_URL = 'http://localhost:5001/api';
export const API_URLS = getApiEndpoints(API_BASE_URL);
export const api = createAxiosInstance(API_BASE_URL);