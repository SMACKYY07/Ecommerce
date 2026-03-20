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
    <div className="bg-white/70 rounded-lg border border-gray-200/50 p-3 hover:shadow-md transition-all duration-200 backdrop-blur-sm">
      <div className="flex gap-3">
        {/* Product Image */}
        <div className="w-16 h-16 shrink-0">
          <img
            src={item.imageSrc}
            alt={item.name}
            className="w-full h-full object-cover rounded-md"
          />
        </div>

        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <h3 className="text-xs font-bold text-gray-900 truncate">{item.name}</h3>
          <p className="text-xs text-gray-600 mb-1">Rs {item.price.toFixed(2)}</p>

          {/* Quantity Controls */}
          <div className="flex items-center gap-1 bg-gray-100 w-fit rounded-md">
            <button
              onClick={handleDecrement}
              className="p-0.5 hover:bg-gray-200 transition-colors rounded"
              aria-label="Decrease quantity"
            >
              <Minus size={12} className="text-gray-700" />
            </button>
            <span className="px-2 py-0.5 font-semibold text-gray-900 min-w-6 text-center text-xs">
              {item.quantity}
            </span>
            <button
              onClick={handleIncrement}
              className="p-0.5 hover:bg-gray-200 transition-colors rounded"
              aria-label="Increase quantity"
            >
              <Plus size={12} className="text-gray-700" />
            </button>
          </div>
        </div>

        {/* Price and Remove */}
        <div className="flex flex-col items-end justify-between">
          <button
            onClick={handleRemove}
            className="text-red-500 hover:text-red-700 transition-colors p-0.5"
            title="Remove from cart"
          >
            <Trash2 size={14} />
          </button>
          <div className="text-right">
            <p className="text-xs text-gray-600">Subtotal</p>
            <p className="text-sm font-bold text-gray-900">Rs {subtotal.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
