import axios from "axios";

import {API_URLS} from "@/config/apiConfig";

export const createPrivateClassService = async (privateClass) => {
    try {
        const response = await axios.post(API_URLS.PRIVATE_CLASSES, privateClass);
        return response.data;
    } catch (error) {
        console.error('Error creating private class:', error);
        throw error;
    }
}

export const getPrivateClassesService = async (query) => {
    try {
        const response = await axios.get(API_URLS.PRIVATE_CLASSES, {params: query});
        return response.data;
    } catch (error) {
        console.error('Error getting private classes:', error);
        throw error;
    }
}

export const getPrivateClassesWithStudentsService = async () => {
    try {
        const response = await axios.get(`${API_URLS.PRIVATE_CLASSES}/students`);
        return response.data;
    } catch (error) {
        console.error('Error getting private classes with students:', error);
        throw error;
    }
}