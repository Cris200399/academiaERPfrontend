import axios from 'axios';

import { API_URLS } from '@/config/apiConfig';

export const getGroups = async () => {
    try {
        const response = await axios.get(API_URLS.GROUPS);
        return response.data;
    } catch (error) {
        console.error('Error fetching groups:', error);
        throw error;
    }
}

