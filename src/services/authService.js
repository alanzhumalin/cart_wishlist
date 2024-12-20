import api from './api';

export const getPayload = async (token) => {
    try {
        const response = await api.get(`/Auth/GetPayload/${token}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; 
    }
};