import {API_URLS} from '@/config/config';
import API from "@/config/axiosConfig";

export const getNextPrivateClassesAndPaymentsService = async (query = {}) => {
    try {
        const response = await API.get(`${API_URLS.PRIVATE_CLASSES_AND_PAYMENTS}/coming`, {params: query});
        return response.data;
    } catch (error) {
        console.error('Error getting private classes and payments:', error);
        throw error;
    }
}

export const deletePrivateClassAndPaymentService = async (privateClassId) => {
    try {
        const response = await API.delete(`${API_URLS.PRIVATE_CLASSES_AND_PAYMENTS}/${privateClassId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting private payment:', error);
        throw error;
    }
}