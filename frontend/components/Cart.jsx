'use client';

import { useState } from 'react';

export default function Cart({ cartItems = [], onUpdateItem, onRemoveItem, onCheckout }) {
  // Calculate total amount
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 w-full max-w-md">
      <h2 className="text-xl font-bold mb-4">Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {cartItems.map((item, index) => (
            <li key={index} className="flex justify-between items-center py-2">
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">₹{item.price} x {item.quantity}</p>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onUpdateItem(item.id, item.quantity - 1)}
                  className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => onUpdateItem(item.id, item.quantity + 1)}
                  className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  +
                </button>

                <button
                  onClick={() => onRemoveItem(item.id)}
                  className="ml-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Total */}
      <div className="flex justify-between items-center mt-4 font-bold text-lg">
        <span>Total:</span>
        <span>₹{total.toFixed(2)}</span>
      </div>

      {/* Checkout Button */}
      <button
        onClick={onCheckout}
        disabled={cartItems.length === 0}
        className="mt-4 w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 disabled:opacity-50"
      >
        Checkout
      </button>
    </div>
  );
}
