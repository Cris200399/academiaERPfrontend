import {api, API_URLS} from '@/config/config';

export const getAssistanceService = async () => {
    try {
        const response = await api.get(API_URLS.ASSISTANCE);
        return response.data;
    } catch (error) {
        console.error("Error fetching assistances:", error);
        throw error;
    }
}

export const deleteAssistanceService = async (assistanceId) => {
    try {
        const response = await api.delete(`${API_URLS.ASSISTANCE}/${assistanceId}`);
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
        const response = await api.post(API_URLS.ASSISTANCE, assistanceData);
        return response.data;
    } catch (error) {
        console.error("Error creating assistance:", error);
        throw error;
    }
}

export const updateAssistanceService = async (assistanceId, assistanceData) => {
    try {
        const response = await api.put(`${API_URLS.ASSISTANCE}/${assistanceId}`, assistanceData);
        return response.data;
    } catch (error) {
        console.error("Error updating assistance:", error);
        throw error;
    }
}

export const updateAssistanceStatus = async (assistanceId, status) => {
    try {
        const response = await api.patch(`${API_URLS.ASSISTANCE}/${assistanceId}/status`, {status});
        return response.data;
    } catch (error) {
        console.error("Error updating assistance status:", error);
        throw error;
    }
}

export const getTodayAssistancePerStudentService = async (studentId, groupId) => {
    try {
        const response = await api.get(`${API_URLS.ASSISTANCE}/today?studentId=${studentId}&groupId=${groupId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching today's assistance:", error);
        throw error;
    }
}

export const getAssistancesPerStudentIdService = async (studentId) => {
    try {
        const response = await api.get(`${API_URLS.ASSISTANCE}/student/${studentId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching student's assistances:", error);
        throw error;
    }
}