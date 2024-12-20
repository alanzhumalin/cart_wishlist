import React, { useEffect, useState } from 'react';
import { getWishlist, removeItemFromWishlist } from '../services/wishlist';
import { getPayload } from '../services/authService';

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const fetchWishlist = async () => {
      const token = localStorage.getItem('token');
      const payload = await getPayload(token);
      setUserId(payload.nameid);

      const wishlistData = await getWishlist(payload.nameid);
      setWishlist(filterUniqueItems(wishlistData.items));
    };

    fetchWishlist();
  }, []);

  const filterUniqueItems = (items) => {
    const seen = new Set();
    return items.filter((item) => {
      if (seen.has(item.catalogItemId)) {
        return false;
      }
      seen.add(item.catalogItemId);
      return true;
    });
  };

  if (!wishlist || wishlist.length === 0) {
    return (
      <div className="container mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">Wishlist</h1>
        <p className="text-gray-500">Your wishlist is empty!</p>
      </div>
    );
  }

  const handleRemoveItem = async (catalogItemId) => {
    try {
      console.log('Removing item with ID:', catalogItemId);
      await removeItemFromWishlist(userId, catalogItemId);

      const updatedWishlist = await getWishlist(userId);
      console.log('Updated wishlist:', updatedWishlist);

      setWishlist(filterUniqueItems(updatedWishlist.items || []));
    } catch (error) {
      console.error('Error removing item from wishlist:', error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center sm:text-left">Wishlist</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlist.map((item) => (
          <div
            key={item.id}
            className="flex flex-col items-center sm:flex-row sm:justify-between p-4 border rounded-lg shadow bg-white"
          >
            <img
              src={item.pictureUrl}
              alt={item.productName}
              className="w-24 h-24 rounded-lg mb-4 sm:mb-0 sm:w-20 sm:h-20"
            />
            <div className="text-center sm:text-left">
              <h2 className="text-lg font-semibold">{item.productName}</h2>
            </div>
            <button
              onClick={() => handleRemoveItem(item.catalogItemId)}
              className="mt-4 sm:mt-0 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Wishlist;
