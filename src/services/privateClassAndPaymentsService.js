import axios from "axios";

import {API_URLS} from "@/config/apiConfig";

export const getPrivateClassesAndPaymentsService = async (query = {}) => {
    try {
        const response = await axios.get(API_URLS.PRIVATE_CLASSES_AND_PAYMENTS, {params: query});
        return response.data;
    } catch (error) {
        console.error('Error getting private classes and payments:', error);
        throw error;
    }
}

export const deletePrivatePaymentService = async (privateClassId) => {
    try {
        const response = await axios.delete(`${API_URLS.PRIVATE_CLASSES_AND_PAYMENTS}/${privateClassId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting private payment:', error);
        throw error;
    }
}