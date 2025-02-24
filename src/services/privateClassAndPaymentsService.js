import getApiEndpoints from "@/config/apiEndpoints";
import API from "@/config/axiosConfig";

export const getNextPrivateClassesAndPaymentsService = async (query = {}) => {
    try {
        const response = await API.get(`${getApiEndpoints.PRIVATE_CLASSES_AND_PAYMENTS}/coming`, {params: query});
        return response.data;
    } catch (error) {
        console.error('Error getting private classes and payments:', error);
        throw error;
    }
}

export const deletePrivateClassAndPaymentService = async (privateClassId) => {
    try {
        const response = await API.delete(`${getApiEndpoints.PRIVATE_CLASSES_AND_PAYMENTS}/${privateClassId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting private payment:', error);
        throw error;
    }
}