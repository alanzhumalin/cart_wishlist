import React, { useEffect, useState } from 'react';
import { createOrder } from '../services/orderService';
import { getPayload } from '../services/authService';
import Modal from '../components/Modal';
import { getCart, updateItemQuantity, removeItemFromCart } from '../services/cartService';

function Cart() {
  const [cart, setCart] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem('token');
      const payload = await getPayload(token);
      setUserId(payload.nameid);

      const cartData = await getCart(payload.nameid);
      setCart(cartData);
    };

    fetchCart();
  }, []);

  const handleQuantityChange = async (catalogItemId, quantity) => {
    try {
      await updateItemQuantity(userId, catalogItemId, quantity);
      const updatedCart = await getCart(userId);
      setCart(updatedCart);
    } catch (error) {
      console.error('Error updating item quantity:', error);
    }
  };

  const handleRemoveItem = async (catalogItemId) => {
    try {
      await removeItemFromCart(userId, catalogItemId);
      const updatedCart = await getCart(userId);
      setCart(updatedCart);
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const handleOrder = () => {
    setModalOpen(true);
  };

  if (!cart) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Shopping Cart</h1>
      {cart.items.length === 0 ? (
        <div className="text-center text-gray-500">Your cart is empty!</div>
      ) : (
        <div className="space-y-4">
          {cart.items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row items-center justify-between p-4 border rounded-lg shadow bg-white space-y-4 sm:space-y-0"
            >
              <img src={item.pictureUrl} alt={item.productName} className="w-20 h-20 rounded-lg" />
              <div className="text-center sm:text-left">
                <h2 className="text-lg font-semibold">{item.productName}</h2>
                <p>${item.unitPrice}</p>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => handleQuantityChange(item.catalogItemId, item.quantity - 1)}
                  className="bg-gray-200 px-3 py-1 rounded-lg"
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <p className="mx-4">{item.quantity}</p>
                <button
                  onClick={() => handleQuantityChange(item.catalogItemId, item.quantity + 1)}
                  className="bg-gray-200 px-3 py-1 rounded-lg"
                >
                  +
                </button>
              </div>
              <p className="font-semibold">Total: ${item.totalPrice}</p>
              <button
                onClick={() => handleRemoveItem(item.catalogItemId)}
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="text-right">
            <button
              onClick={handleOrder}
              className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600"
            >
              Continue
            </button>
          </div>
        </div>
      )}
      {isModalOpen && (
        <Modal
          items={cart.items}
          onClose={() => setModalOpen(false)}
          onOrder={(orderData) => createOrder(userId, orderData)}
          userId={userId}
          onCartClear={() => setCart({ items: [] })}
        />
      )}
    </div>
  );
}

export default Cart;
