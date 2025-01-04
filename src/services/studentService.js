import axios from 'axios';

import { API_URLS } from '@/config/apiConfig';

export const getStudents = async () => {
  try {
    const response = await axios.get(API_URLS.STUDENTS);
    return response.data;
  } catch (error) {
    console.error('Error fetching students:', error);
    throw error;
  }
};

export const addStudent = async (student) => {
  try {
    const response = await axios.post(API_URLS.STUDENTS, student);
    return response.data;
  } catch (error) {
    console.error('Error adding student:', error);
    throw error;
  }
};

// Add more functions as needed