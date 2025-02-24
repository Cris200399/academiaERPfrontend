import getApiEndpoints from "@/config/apiEndpoints";
import API from "@/config/axiosConfig";

export const getAssistanceService = async () => {
    try {
        const response = await API.get(getApiEndpoints.ASSISTANCE);
        return response.data;
    } catch (error) {
        console.error("Error fetching assistances:", error);
        throw error;
    }
}

export const deleteAssistanceService = async (assistanceId) => {
    try {
        const response = await API.delete(`${getApiEndpoints.ASSISTANCE}/${assistanceId}`);
        if (response.status === 204) {
            return {message: "Assistance deleted successfully"};
        } else {
            return {message: "Failed to delete assistance", status: response.status};
        }
    } catch (error) {
        console.error("Error deleting assistance:", error);
        throw error;
    }
}

export const createAssistanceService = async (assistanceData) => {
    try {
        const response = await API.post(getApiEndpoints.ASSISTANCE, assistanceData);
        return response.data;
    } catch (error) {
        console.error("Error creating assistance:", error);
        throw error;
    }
}

export const updateAssistanceService = async (assistanceId, assistanceData) => {
    try {
        const response = await API.put(`${getApiEndpoints.ASSISTANCE}/${assistanceId}`, assistanceData);
        return response.data;
    } catch (error) {
        console.error("Error updating assistance:", error);
        throw error;
    }
}

export const updateAssistanceStatus = async (assistanceId, status) => {
    try {
        const response = await API.patch(`${getApiEndpoints.ASSISTANCE}/${assistanceId}/status`, {status});
        return response.data;
    } catch (error) {
        console.error("Error updating assistance status:", error);
        throw error;
    }
}

export const getTodayAssistancePerStudentService = async (studentId, groupId) => {
    try {
        const response = await API.get(`${getApiEndpoints.ASSISTANCE}/today?studentId=${studentId}&groupId=${groupId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching today's assistance:", error);
        throw error;
    }
}

export const getAssistancesPerStudentIdService = async (studentId) => {
    try {
        const response = await API.get(`${getApiEndpoints.ASSISTANCE}/student/${studentId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching student's assistances:", error);
        throw error;
    }
}