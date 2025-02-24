import { API_URLS} from '@/config/config';
import API from "@/config/axiosConfig";

export const createPrivateClassService = async (privateClass) => {
    try {
        const response = await API.post(API_URLS.PRIVATE_CLASSES, privateClass);
        return response.data;
    } catch (error) {
        console.error('Error creating private class:', error);
        throw error;
    }
}

export const getPrivateClassesService = async (query = {}) => {
    try {
        const response = await API.get(API_URLS.PRIVATE_CLASSES, {params: query});
        return response.data;
    } catch (error) {
        console.error('Error getting private classes:', error);
        throw error;
    }
}

export const getPrivateClassesWithStudentsService = async (query = {}) => {
    try {
        const response = await API.get(`${API_URLS.PRIVATE_CLASSES}/students`, {params: query});
        return response.data;
    } catch (error) {
        console.error('Error getting private classes with students:', error);
        throw error;
    }
}

export const patchPrivateClassService = async (id, privateClass) => {
    try {
        const response = await API.patch(`${API_URLS.PRIVATE_CLASSES}/${id}`, privateClass);
        return response.data;
    } catch (error) {
        console.error('Error patching private class:', error);
        throw error;
    }
}

export const addStudentToPrivateClassService = async (privateClassId, studentId) => {
    try {
        const response = await API.patch(`${API_URLS.PRIVATE_CLASSES}/${privateClassId}/student/${studentId}`);
        return response.data;
    } catch (error) {
        console.error('Error adding student to private class:', error);
        throw error;
    }
}

export const deletePrivateClassService = async (id) => {
    try {
        const response = await API.delete(`${API_URLS.PRIVATE_CLASSES}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting private class:', error);
        throw error;
    }
}