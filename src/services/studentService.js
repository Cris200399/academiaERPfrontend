import getApiEndpoints from '@/config/apiEndpoints';
import API from "@/config/axiosConfig";

export const getStudentsService = async () => {
    try {
        const response = await API.get(getApiEndpoints.STUDENTS);
        return response.data;
    } catch (error) {
        console.error('Error fetching students:', error);
        throw error;
    }
};

export const getStudentService = async (id) => {
    try {
        const response = await API.get(`${getApiEndpoints.STUDENTS}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching student:', error);
        throw error;
    }
}

export const createStudentService = async (student) => {
    try {
        const response = await API.post(getApiEndpoints.STUDENTS, student);
        return response.data;
    } catch (error) {
        console.error('Error adding student:', error);
        throw error;
    }
};

export const changeStudentStatusService = async (id, status) => {
    try {
        const response = await API.patch(`${getApiEndpoints.STUDENTS}/${id}/status`, {status});
        return response.data;
    } catch (error) {
        console.error('Error changing student status:', error);
        throw error;
    }
}

export const getTotalStudentsService = async () => {
    try {
        const response = await API.get(`${getApiEndpoints.STUDENTS}/total`);
        return response.data;
    } catch (error) {
        console.error('Error fetching total students:', error);
        throw error;
    }
}

export const updateStudentService = async (id, student) => {
    try {
        const response = await API.put(`${getApiEndpoints.STUDENTS}/${id}`, student);
        return response.data;
    } catch (error) {
        console.error('Error updating student:', error);
        throw error;
    }
}

export const getStudentProfileImageService = async (id) => {
    try {
        const response = await API.get(`${getApiEndpoints.STUDENTS}/${id}/profile-image`,
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

        const response = await API.put(
            `${getApiEndpoints.STUDENTS}/${id}/profile-image`,
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

export const getDocumentService = async (studentId) => {
    try {
        const response = await API.get(
            `${getApiEndpoints.STUDENTS}/${studentId}/document`,
            {responseType: 'blob'}
        );
        return URL.createObjectURL(response.data);
    } catch (error) {
        if (error.response && error.response.status === 404) {
            return null; // o cualquier valor que consideres adecuado
        } else {
            console.error('Error fetching document:', error);
            return null; // o cualquier valor que consideres adecuado
        }
    }
}

export const updateDocumentService = async (studentId, document) => {
    try {
        const formData = new FormData();
        formData.append('document', document);

        const response = await API.put(
            `${getApiEndpoints.STUDENTS}/${studentId}/document`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        );
        return response.data;
    } catch (error) {
        console.log('Error al actualizar el documento:', error)
        throw new Error('Error al actualizar el documento');
    }
}

export const getTotalOverdueStudentsService = async () => {
    try {
        const response = await API.get(`${getApiEndpoints.STUDENTS}/total-overdue-students`);
        return response.data;
    } catch (error) {
        console.error('Error fetching total overdue students:', error);
        throw error;
    }
}

export const getTotalToExpireStudentsService = async () => {
    try {
        const response = await API.get(`${getApiEndpoints.STUDENTS}/total-about-to-expire`);
        return response.data;
    } catch (error) {
        console.error('Error fetching total to expire students:', error);
        throw error;
    }
}