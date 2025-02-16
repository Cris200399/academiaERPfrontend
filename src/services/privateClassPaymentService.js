import axios from "axios";

import {API_URLS} from "@/config/apiConfig";


export const createPrivateClassPaymentService = async (privateClassPayment) => {
    try {
        const response = await axios.post(API_URLS.PRIVATE_CLASSES_PAYMENTS, privateClassPayment);
        return response.data;
    } catch (error) {
        console.error('Error creating private class payment:', error);
        throw error;
    }
}

export const getPrivateClassPaymentsService = async (query) => {
    try {
        const response = await axios.get(API_URLS.PRIVATE_CLASSES_PAYMENTS, {params: query});
        return response.data;
    } catch (error) {
        console.error('Error getting private class payments:', error);
        throw error;
    }
}