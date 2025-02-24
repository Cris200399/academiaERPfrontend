import getApiEndpoints from "@/config/apiEndpoints";
import API from "@/config/axiosConfig";

export const createPrivateClassPaymentService = async (privateClassPayment) => {
    try {
        const response = await API.post(getApiEndpoints.PRIVATE_CLASSES_PAYMENTS, privateClassPayment);
        return response.data;
    } catch (error) {
        console.error('Error creating private class payment:', error);
        throw error;
    }
}

export const getPrivateClassPaymentsService = async (query) => {
    try {
        const response = await API.get(getApiEndpoints.PRIVATE_CLASSES_PAYMENTS, {params: query});
        return response.data;
    } catch (error) {
        console.error('Error getting private class payments:', error);
        throw error;
    }
}

export const deletePrivateClassPaymentService = async (id) => {
    try {
        const response = await API.delete(`${getApiEndpoints.PRIVATE_CLASSES_PAYMENTS}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting private class payment:', error);
        throw error;
    }
}