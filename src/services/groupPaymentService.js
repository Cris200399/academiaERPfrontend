import {api, API_URLS} from '@/config/config';


export const createGroupPaymentService = async (groupPaymentData) => {
    try {
        const response = await api.post(API_URLS.GROUP_PAYMENT, groupPaymentData);
        return response.data;
    } catch (error) {
        console.error("Error creating group payment:", error);
        throw error;
    }
}

export const getGroupPaymentsService = async () => {
    try {
        const response = await api.get(`${API_URLS.GROUP_PAYMENT}/students`);
        return response.data;
    } catch (error) {
        console.error("Error fetching group payments:", error);
        throw error;
    }
}

export const getGroupPaymentsPerStudentService = async (studentId) => {
    try {
        const response = await api.get(`${API_URLS.GROUP_PAYMENT}/students/${studentId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching group payments per student:", error);
        throw error;
    }
}

export const deleteGroupPaymentService = async (id) => {
    try {
        const response = await api.delete(`${API_URLS.GROUP_PAYMENT}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting group payment:", error);
        throw error;
    }
}

export const patchGroupPaymentService = async (id, groupPaymentData) => {
    try {
        const response = await api.patch(`${API_URLS.GROUP_PAYMENT}/${id}`, groupPaymentData);
        return response.data;
    } catch (error) {
        console.error("Error updating group payment:", error);
        throw error;
    }
}