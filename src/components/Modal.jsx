import React, { useState } from 'react';
import { removeCartByUserId } from '../services/cartService';

function Modal({ items, onClose, onOrder, userId, onCartClear }) {
  const [delivery, setDelivery] = useState({
    deliveryName: '',
    deliveryCost: 0,
    deliveryTime: 0,
    addressToShip: '',
    phoneNumber: '',
  });

  const [errors, setErrors] = useState({});

  const deliveryOptions = [
    { name: 'Yandex', cost: 10, time: 120 },
    { name: 'Kaspi', cost: 20, time: 60 },
    { name: 'Indrive', cost: 15, time: 50 },
  ];

  const handleValidation = () => {
    const newErrors = {};
    if (!delivery.deliveryName) newErrors.deliveryName = 'Please select a delivery option.';
    if (!delivery.addressToShip.trim()) newErrors.addressToShip = 'Address is required.';
    if (!delivery.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required.';
    return newErrors;
  };

  const handleSubmit = async () => {
    const validationErrors = handleValidation();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});

    try {
      await onOrder(delivery);
      await removeCartByUserId(userId);
      onCartClear();
      onClose();
    } catch (error) {
      console.error('Error during order creation or cart removal:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-6 text-center">Order Summary</h2>
        <div className="space-y-4 mb-6">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between">
              <span>{item.productName}</span>
              <span>${item.totalPrice}</span>
            </div>
          ))}
        </div>
        <h3 className="text-lg font-semibold mb-4">Choose Delivery</h3>
        <div className="space-y-2">
          {deliveryOptions.map((option, index) => (
            <label key={index} className="flex items-center">
              <input
                type="radio"
                name="delivery"
                value={option.name}
                checked={delivery.deliveryName === option.name}
                onChange={() =>
                  setDelivery({
                    ...delivery,
                    deliveryName: option.name,
                    deliveryCost: option.cost,
                    deliveryTime: option.time,
                  })
                }
                className="mr-2"
              />
              {option.name} - ${option.cost} ({option.time} min)
            </label>
          ))}
          {errors.deliveryName && <p className="text-red-500 text-sm">{errors.deliveryName}</p>}
        </div>
        <input
          type="text"
          placeholder="Address"
          value={delivery.addressToShip}
          onChange={(e) =>
            setDelivery({ ...delivery, addressToShip: e.target.value })
          }
          className="border p-3 w-full rounded-lg mt-4"
        />
        {errors.addressToShip && <p className="text-red-500 text-sm">{errors.addressToShip}</p>}
        <input
          type="text"
          placeholder="Phone Number"
          value={delivery.phoneNumber}
          onChange={(e) =>
            setDelivery({ ...delivery, phoneNumber: e.target.value })
          }
          className="border p-3 w-full rounded-lg mt-4"
        />
        {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="bg-gray-300 py-2 px-4 rounded-lg mr-2 hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          >
            Order
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
