import React from 'react';
import { useCart } from '../hooks/useCart';
import { Trash2, Plus, Minus } from 'lucide-react';

export const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleIncrement = () => {
    updateQuantity(item.id, item.quantity + 1);
  };

  const handleDecrement = () => {
    updateQuantity(item.id, item.quantity - 1);
  };

  const handleRemove = () => {
    removeFromCart(item.id);
  };

  const subtotal = item.price * item.quantity;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow duration-200">
      <div className="flex gap-4">
        {/* Product Image */}
        <div className="w-20 h-20 shrink-0">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-bold text-gray-900 truncate">{item.name}</h3>
          <p className="text-sm text-gray-600 mb-2">${item.price.toFixed(2)}</p>

          {/* Quantity Controls */}
          <div className="flex items-center gap-2 bg-gray-100 w-fit rounded-lg">
            <button
              onClick={handleDecrement}
              className="p-1 hover:bg-gray-200 transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus size={16} className="text-gray-700" />
            </button>
            <span className="px-3 py-1 font-semibold text-gray-900 min-w-8 text-center">
              {item.quantity}
            </span>
            <button
              onClick={handleIncrement}
              className="p-1 hover:bg-gray-200 transition-colors"
              aria-label="Increase quantity"
            >
              <Plus size={16} className="text-gray-700" />
            </button>
          </div>
        </div>

        {/* Price and Remove */}
        <div className="flex flex-col items-end justify-between">
          <button
            onClick={handleRemove}
            className="text-red-500 hover:text-red-700 transition-colors p-1"
            title="Remove from cart"
          >
            <Trash2 size={18} />
          </button>
          <div className="text-right">
            <p className="text-xs text-gray-600">Subtotal</p>
            <p className="text-lg font-bold text-gray-900">${subtotal.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
