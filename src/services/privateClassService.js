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

export const getPrivateClassesService = async (query = {}) => {
    try {
        const response = await axios.get(API_URLS.PRIVATE_CLASSES, {params: query});
        return response.data;
    } catch (error) {
        console.error('Error getting private classes:', error);
        throw error;
    }
}

export const getPrivateClassesWithStudentsService = async (query = {}) => {
    try {
        const response = await axios.get(`${API_URLS.PRIVATE_CLASSES}/students`, {params: query});
        return response.data;
    } catch (error) {
        console.error('Error getting private classes with students:', error);
        throw error;
    }
}

export const patchPrivateClassService = async (id, privateClass) => {
    try {
        const response = await axios.patch(`${API_URLS.PRIVATE_CLASSES}/${id}`, privateClass);
        return response.data;
    } catch (error) {
        console.error('Error patching private class:', error);
        throw error;
    }
}