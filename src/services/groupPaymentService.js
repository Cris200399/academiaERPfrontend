import axios from "axios";

import {API_URLS} from "@/config/apiConfig";


export const createGroupPaymentService = async (groupPaymentData) => {
    try {
        const response = await axios.post(API_URLS.GROUP_PAYMENT, groupPaymentData);
        return response.data;
    } catch (error) {
        console.error("Error creating group payment:", error);
        throw error;
    }
}