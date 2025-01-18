import axios from 'axios';

import {API_URLS} from '@/config/apiConfig';

export const getGroupsService = async () => {
    try {
        const response = await axios.get(API_URLS.GROUPS);
        return response.data;
    } catch (error) {
        console.error('Error fetching groups:', error);
        throw error;
    }
}

export const getAvailableGroupsService = async () => {
    try {
        const response = await axios.get(`${API_URLS.GROUPS}/available`);
        return response.data;
    } catch (error) {
        console.error('Error fetching groups:', error);
        throw error;
    }
}

export const createGroupService = async (groupData) => {
    try {
        const response = await axios.post(API_URLS.GROUPS, groupData);
        return response.data;
    } catch (error) {
        console.error('Error creating group:', error);
        throw error;
    }
}

export const deleteGroupService = async (groupId) => {
    try {
        await axios.delete(`${API_URLS.GROUPS}/${groupId}`);
    } catch (error) {
        console.error('Error deleting group:', error);
        throw error;
    }
}

export const updateGroupService = async (groupId, groupData) => {
    try {
        const response = await axios.put(`${API_URLS.GROUPS}/${groupId}`, groupData);
        return response.data;
    } catch (error) {
        console.error('Error updating group:', error);
        throw error;
    }
}