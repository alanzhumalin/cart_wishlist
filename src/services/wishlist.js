import api from './api';

export const getWishlist = async (userId) => {
    try {
        const response = await api.get(`/Wishlist/GetWishlist/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching wishlist:', error);
        throw error; 
    }
};



export const removeItemFromWishlist = async (userId,catalogItemId) => {
    try{
        const response = await api.delete(`/Wishlist/RemoveItemFromWishlist/${userId}`, {
            data: {catalogItemId}
        });
        return response.data;
    }
    catch(error){
        console.error('Error removing item from the wishlist:', error);
        throw error;
    }
};

export const removeWishlist = async (wishlistId) => {
    try {
        const response = await api.delete(`/Wishlist/RemoveWishlist/${wishlistId}`);
        return response.data;
    } catch (error) {
        console.error('Error removing wishlist:', error);
        throw error; 
    }
};

export const removeWishlistByUserId = async (userId) => {
    try {
        const response = await api.delete(`/Wishlist/RemoveWishlistByUserId/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error removing wishlist from user:', error);
        throw error; 
    }
};