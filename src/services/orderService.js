import api from './api';

export const createOrder = async (userId, orderData) => {
    try {
        const response = await api.post(`/Order/CreateOrder/${userId}`, orderData);
        return response.data;
    } catch (error) {
        console.error('Error creating order:', error);
        throw error;
    }
};
