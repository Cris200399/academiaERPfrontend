import axios from 'axios';

const createAxiosInstance = (baseURL) => {
    return axios.create({baseURL: baseURL, withCredentials: true});
};

export default createAxiosInstance;