import {api, API_URLS} from '@/config/config';

export const getNextPrivateClassesAndPaymentsService = async (query = {}) => {
    try {
        const response = await api.get(`${API_URLS.PRIVATE_CLASSES_AND_PAYMENTS}/coming`, {params: query});
        return response.data;
    } catch (error) {
        console.error('Error getting private classes and payments:', error);
        throw error;
    }
}

export const deletePrivateClassAndPaymentService = async (privateClassId) => {
    try {
        const response = await api.delete(`${API_URLS.PRIVATE_CLASSES_AND_PAYMENTS}/${privateClassId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting private payment:', error);
        throw error;
    }
}