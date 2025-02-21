import {api, API_URLS} from '@/config/config';

export const createPrivateClassService = async (privateClass) => {
    try {
        const response = await api.post(API_URLS.PRIVATE_CLASSES, privateClass);
        return response.data;
    } catch (error) {
        console.error('Error creating private class:', error);
        throw error;
    }
}

export const getPrivateClassesService = async (query = {}) => {
    try {
        const response = await api.get(API_URLS.PRIVATE_CLASSES, {params: query});
        return response.data;
    } catch (error) {
        console.error('Error getting private classes:', error);
        throw error;
    }
}

export const getPrivateClassesWithStudentsService = async (query = {}) => {
    try {
        const response = await api.get(`${API_URLS.PRIVATE_CLASSES}/students`, {params: query});
        return response.data;
    } catch (error) {
        console.error('Error getting private classes with students:', error);
        throw error;
    }
}

export const patchPrivateClassService = async (id, privateClass) => {
    try {
        const response = await api.patch(`${API_URLS.PRIVATE_CLASSES}/${id}`, privateClass);
        return response.data;
    } catch (error) {
        console.error('Error patching private class:', error);
        throw error;
    }
}

export const addStudentToPrivateClassService = async (privateClassId, studentId) => {
    try {
        const response = await api.patch(`${API_URLS.PRIVATE_CLASSES}/${privateClassId}/student/${studentId}`);
        return response.data;
    } catch (error) {
        console.error('Error adding student to private class:', error);
        throw error;
    }
}

export const deletePrivateClassService = async (id) => {
    try {
        const response = await api.delete(`${API_URLS.PRIVATE_CLASSES}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting private class:', error);
        throw error;
    }
}