import getApiEndpoints from "@/config/apiEndpoints";
import API from "@/config/axiosConfig";

export const getGroupsService = async () => {
    try {
        const response = await API.get(getApiEndpoints.GROUPS);
        return response.data;
    } catch (error) {
        console.error('Error fetching groups:', error);
        throw error;
    }
}

export const getAvailableGroupsService = async () => {
    try {
        const response = await API.get(`${getApiEndpoints.GROUPS}/available`);
        return response.data;
    } catch (error) {
        console.error('Error fetching groups:', error);
        throw error;
    }
}

export const createGroupService = async (groupData) => {
    try {
        const response = await API.post(getApiEndpoints.GROUPS, groupData);
        return response.data;
    } catch (error) {
        console.error('Error creating group:', error);
        throw error;
    }
}

export const deleteGroupService = async (groupId) => {
    try {
        await API.delete(`${getApiEndpoints.GROUPS}/${groupId}`);
    } catch (error) {
        console.error('Error deleting group:', error);
        throw error;
    }
}

export const updateGroupService = async (groupId, groupData) => {
    try {
        const response = await API.put(`${getApiEndpoints.GROUPS}/${groupId}`, groupData);
        return response.data;
    } catch (error) {
        console.error('Error updating group:', error);
        throw error;
    }
}

export const getGroupInProgressService = async () => {
    try {
        const response = await API.get(`${getApiEndpoints.GROUPS}/in-progress`);
        return response.data;
    } catch (error) {
        console.error('Error fetching groups:', error);
        throw error;
    }
}

export const getGroupWithStudentsService = async (groupId) => {
    try {
        const response = await API.get(`${getApiEndpoints.GROUPS}/${groupId}/members`);
        return response.data;
    } catch (error) {
        console.error('Error fetching group:', error);
        throw error;
    }
}

export const getTodayGroupActivitiesService = async () => {
    try {
        const response = await API.get(`${getApiEndpoints.GROUPS}/today`);
        return response.data;
    } catch (error) {
        console.error('Error fetching activities:', error);
        throw error;
    }
}

export const getWeekGroupActivitiesService = async () => {
    try {
        const response = await API.get(`${getApiEndpoints.GROUPS}/week`);
        return response.data;
    } catch (error) {
        console.error('Error fetching activities:', error);
        throw error;
    }
}