import {API_URLS} from '@/config/config';
import API from "@/config/axiosConfig";

export const createPrivateClassPaymentService = async (privateClassPayment) => {
    try {
        const response = await API.post(API_URLS.PRIVATE_CLASSES_PAYMENTS, privateClassPayment);
        return response.data;
    } catch (error) {
        console.error('Error creating private class payment:', error);
        throw error;
    }
}

export const getPrivateClassPaymentsService = async (query) => {
    try {
        const response = await API.get(API_URLS.PRIVATE_CLASSES_PAYMENTS, {params: query});
        return response.data;
    } catch (error) {
        console.error('Error getting private class payments:', error);
        throw error;
    }
}

export const deletePrivateClassPaymentService = async (id) => {
    try {
        const response = await API.delete(`${API_URLS.PRIVATE_CLASSES_PAYMENTS}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting private class payment:', error);
        throw error;
    }
}