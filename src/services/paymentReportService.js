import getApiEndpoints from "@/config/apiEndpoints";
import API from "@/config/axiosConfig";

export const getLatest3MonthsGroupsReportsService = async () => {
    try {
        const response = await API.get(`${getApiEndpoints.PAYMENTS_REPORTS}/group-3-latest-months-payments`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
}

export const getTotalGroupsPaymentsForActualMonthService = async () => {
    try {
        const response = await API.get(`${getApiEndpoints.PAYMENTS_REPORTS}/group-total-payments-actual-month`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
}

export const getTotalGroupsPaymentsForAMonthService = async (month) => {
    try {
        const response = await API.get(`${getApiEndpoints.PAYMENTS_REPORTS}/group-total-payments-month/${month}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
}

export const get3LatestMonthsPrivateReportsService = async () => {
    try {
        const response = await API.get(`${getApiEndpoints.PAYMENTS_REPORTS}/private-3-latest-months-payments`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
}

export const getTotalPrivatePaymentsForActualMonthService = async () => {
    try {
        const response = await API.get(`${getApiEndpoints.PAYMENTS_REPORTS}/private-total-payments-actual-month`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
}

export const getTotalPrivatePaymentsForLastMonthService = async () => {
    try {
        const response = await API.get(`${getApiEndpoints.PAYMENTS_REPORTS}/private-total-payments-last-month`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
}

export const getTotalPrivatePaymentsForAMonthService = async (month) => {
    try {
        const response = await API.get(`${getApiEndpoints.PAYMENTS_REPORTS}/private-total-payments-month/${month}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
}
