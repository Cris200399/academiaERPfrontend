import axios from "axios";

import {API_URLS} from "@/config/apiConfig";

export const getPrivateClassesAndPaymentsService = async () => {
    try {
        const response = await axios.get(API_URLS.PRIVATE_CLASSES_AND_PAYMENTS);
        return response.data;
    } catch (error) {
        console.error('Error getting private classes and payments:', error);
        throw error;
    }
}