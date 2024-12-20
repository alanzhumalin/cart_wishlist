import api from './api';

export const getCart = async (userId) => {
    try {
        const response = await api.get(`/Cart/GetCart/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching catalog types:', error);
        throw error; 
    }
};


export const updateItemQuantity = async (userId, catalogItemId, quantity) =>{
    try{
        const response = await api.put(`/Cart/UpdateItemQuantity/${userId}`, {
            catalogItemId: catalogItemId,
            quantity: quantity
        });
        return response.data;
    }
    catch(error){
        console.error('Error updating the cart:', error);
        throw error;
    }
}

export const removeItemFromCart = async (userId, catalogItemId) =>{

    try{
        const response = await api.delete(`/Cart/RemoveItemFromCart/${userId}`, {
            data: {catalogItemId } 
        });
        return response.data;
    }
    catch(error){
        console.error('Error removing item from the cart:', error);
        throw error;
    }
}

export const removeCart = async (cartId) =>{
    try{
        const response = await api.delete(`/Cart/RemoveCart/${cartId}`);
        return response.data;
    }
    catch(error){
        console.error('Error removing cart:', error);
        throw error;
    }
}

export const removeCartByUserId = async (userId) =>{
    try{
        const response = await api.delete(`/Cart/RemoveCartByUserId/${userId}`);
        return response.data;
    }
    catch(error){
        console.error('Error removing cart from user:', error);
        throw error;
    }
}