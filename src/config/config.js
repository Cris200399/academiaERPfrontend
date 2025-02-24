import createAxiosInstance from "@/config/axiosConfig";
import getApiEndpoints from "@/config/apiEndpoints";


// const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:5001/api';
const API_BASE_URL = 'http://localhost:5001/api';
// const API_BASE_URL = 'https://academiabackend-en0f.onrender.com/api';
export const API_URLS = getApiEndpoints(API_BASE_URL);