import axios from 'axios';

import {API_URLS} from "@/config/apiConfig";

export const getLast3MonthsGroupsReportsService = async () => {
    try {
        const response = await axios.get(`${API_URLS.PAYMENTS_REPORTS}/3-latest-months-payments`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
}

export const getTotalPaymentsForActualMonthService = async () => {
    try {
        const response = await axios.get(`${API_URLS.PAYMENTS_REPORTS}/total-payments-actual-month`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
}
