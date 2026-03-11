import React from 'react';
import { useCart } from '../hooks/useCart';
import { CartItem } from './CartItem';
import { ShoppingCart, Trash2, Badge } from 'lucide-react';

export const Cart = () => {
  const { cart, getTotalPrice, getTotalItems, clearCart } = useCart();

  const totalPrice = getTotalPrice();
  const totalItems = getTotalItems();
  const taxAmount = totalPrice * 0.1; // 10% tax
  const finalTotal = totalPrice + taxAmount;

  return (
    <div className="w-full lg:w-96">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden sticky top-6">
        {/* Header */}
        <div className="bg-linear-to-r from-blue-600 to-blue-700 px-6 py-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <ShoppingCart size={28} />
              <h2 className="text-2xl font-bold">Shopping Cart</h2>
            </div>
            {cart.length > 0 && (
              <Badge className="bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                {cart.length}
              </Badge>
            )}
          </div>
          {totalItems > 0 && (
            <p className="text-blue-100 text-sm">{totalItems} item{totalItems !== 1 ? 's' : ''} in cart</p>
          )}
        </div>

        {/* Cart Items */}
        <div className="px-6 py-4">
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart size={48} className="mx-auto text-gray-300 mb-3" />
              <h3 className="text-lg font-semibold text-gray-700 mb-1">Your cart is empty</h3>
              <p className="text-gray-500 text-sm">Add products to get started!</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {cart.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>

        {/* Divider */}
        {cart.length > 0 && <div className="border-t border-gray-200"></div>}

        {/* Summary */}
        {cart.length > 0 && (
          <div className="px-6 py-6 space-y-2 bg-gray-50">
            <div className="flex justify-between text-gray-700">
              <span>Subtotal</span>
              <span className="font-semibold">${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Shipping</span>
              <span className="font-semibold text-green-600">Free</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Tax (10%)</span>
              <span className="font-semibold">${taxAmount.toFixed(2)}</span>
            </div>
            <div className="border-t border-gray-300 pt-2 flex justify-between text-lg font-bold text-gray-900">
              <span>Total</span>
              <span className="text-blue-600">${finalTotal.toFixed(2)}</span>
            </div>
          </div>
        )}

        {/* Actions */}
        {cart.length > 0 && (
          <div className="px-6 py-4 space-y-3 border-t border-gray-200 bg-white">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors duration-200">
              Proceed to Checkout
            </button>
            <button
              onClick={clearCart}
              className="w-full flex items-center justify-center gap-2 border border-red-500 text-red-500 hover:bg-red-50 font-semibold py-2 rounded-lg transition-colors duration-200"
            >
              <Trash2 size={18} />
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
