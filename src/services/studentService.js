import axios from 'axios';

import {API_URLS} from '@/config/apiConfig';

export const getStudentsService = async () => {
    try {
        const response = await axios.get(API_URLS.STUDENTS);
        return response.data;
    } catch (error) {
        console.error('Error fetching students:', error);
        throw error;
    }
};

export const createStudentService = async (student) => {
    try {
        const response = await axios.post(API_URLS.STUDENTS, student);
        return response.data;
    } catch (error) {
        console.error('Error adding student:', error);
        throw error;
    }
};

export const deleteStudentService = async (id) => {
    try {
        await axios.delete(`${API_URLS.STUDENTS}/${id}`);
    } catch (error) {
        console.error('Error deleting student:', error);
        throw error;
    }
}

export const getTotalStudentsService = async () => {
    try {
        const response = await axios.get(`${API_URLS.STUDENTS}/total`);
        return response.data;
    } catch (error) {
        console.error('Error fetching total students:', error);
        throw error;
    }
}

export const updateStudentService = async (id, student) => {
    try {
        const response = await axios.put(`${API_URLS.STUDENTS}/${id}`, student);
        return response.data;
    } catch (error) {
        console.error('Error updating student:', error);
        throw error;
    }
}

export const getStudentProfileImageService = async (id) => {
    try {
        const response = await axios.get(`${API_URLS.STUDENTS}/${id}/profile-image`,
            {
                responseType: 'blob'
            });
        return response.data;
    } catch (error) {
        console.error('Error fetching student profile image:', error);
        throw error;
    }
}

export const updateStudentProfileImageService = async (id, image) => {
    try {
        const formData = new FormData();
        formData.append('image', image, image.name);

        const response = await axios.put(
            `${API_URLS.STUDENTS}/${id}/profile-image`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error updating student profile image:', error);
        throw error;
    }
}