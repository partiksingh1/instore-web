import axios from 'axios';

const API_URL = 'http://localhost/api/v1/auth/register'; // Replace with your actual API URL

export const registerStore = async (formData: any) => {
  try {
    const response = await axios.post(API_URL, formData);
    return response.data; // Success response
  } catch (error) {
    console.error('Error during store registration:', error);
    throw error; // Propagate error to handle in UI
  }
};
