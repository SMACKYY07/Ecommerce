import React, { useState } from 'react';
import { useCart } from '../hooks/useCart';
import { CartItem } from './CartItem';
import { CheckoutModal } from './CheckoutModal';
import { ShoppingCart, Trash2, Badge } from 'lucide-react';

export const Cart = () => {
  const { cart, getTotalPrice, getTotalItems, clearCart } = useCart();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const totalPrice = getTotalPrice();
  const totalItems = getTotalItems();
  const deliveryCharges = 40; // 40 Rs delivery charges
  const finalTotal = totalPrice + deliveryCharges;

  const handleProceedToCheckout = () => {
    setIsCheckoutOpen(true);
  };

  const handleOrderComplete = (orderData) => {
    // Handle successful order
    alert(`🎉 Order placed successfully!\nOrder ID: ${orderData.orderId}\nThank you for your purchase!`);
    clearCart(); // Clear the cart after successful order
  };

  return (
    <div className="w-full sm:w-80">
      <div className="bg-white/90 backdrop-blur-md rounded-none sm:rounded-2xl shadow-2xl border border-white/20 overflow-hidden sticky top-0 sm:top-6 transform transition-all duration-300 hover:shadow-3xl h-full">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-3 sm:px-5 py-3 sm:py-5 text-white shrink-0">
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <ShoppingCart size={20} className="sm:w-6 sm:h-6" />
              <h2 className="text-lg sm:text-xl font-bold">Shopping Cart</h2>
            </div>
            {cart.length > 0 && (
              <Badge className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
                {cart.length}
              </Badge>
            )}
          </div>
          {totalItems > 0 && (
            <p className="text-blue-100 text-xs">{totalItems} item{totalItems !== 1 ? 's' : ''} in cart</p>
          )}
        </div>

        {/* Cart Items */}
        <div className="px-3 sm:px-5 py-3 sm:py-4 flex-1 overflow-y-auto">
          {cart.length === 0 ? (
            <div className="text-center py-6 sm:py-8">
              <ShoppingCart size={32} className="mx-auto text-gray-300 mb-2 sm:mb-3" />
              <h3 className="text-sm sm:text-base font-semibold text-gray-700 mb-1">Your cart is empty</h3>
              <p className="text-gray-500 text-xs sm:text-sm">Add products to get started!</p>
            </div>
          ) : (
            <div className="space-y-1.5 sm:space-y-2">
              {cart.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>

        {/* Divider */}
        {cart.length > 0 && <div className="border-t border-gray-200/50"></div>}

        {/* Summary */}
        {cart.length > 0 && (
          <div className="px-3 sm:px-5 py-3 sm:py-4 space-y-0.5 sm:space-y-1 bg-gray-50/80 shrink-0">
            <div className="flex justify-between text-gray-700 text-xs sm:text-sm">
              <span>Subtotal</span>
              <span className="font-semibold">Rs {totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-700 text-xs sm:text-sm">
              <span>Delivery Charges</span>
              <span className="font-semibold">Rs {deliveryCharges.toFixed(2)}</span>
            </div>
            <div className="border-t border-gray-300/50 pt-1.5 sm:pt-2 flex justify-between text-sm sm:text-base font-bold text-gray-900">
              <span>Total</span>
              <span className="text-blue-600">Rs {finalTotal.toFixed(2)}</span>
            </div>
          </div>
        )}

        {/* Actions */}
        {cart.length > 0 && (
          <div className="px-3 sm:px-5 py-3 sm:py-4 space-y-1.5 sm:space-y-2 border-t border-gray-200/50 bg-white/50 shrink-0">
            <button 
              onClick={handleProceedToCheckout}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-2 sm:py-2.5 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md text-xs sm:text-base"
            >
              Proceed to Checkout
            </button>
            <button
              onClick={clearCart}
              className="w-full flex items-center justify-center gap-2 border border-red-500/50 text-red-500 hover:bg-red-50/80 font-semibold py-1.5 sm:py-2 rounded-lg transition-all duration-200 hover:border-red-600 text-xs sm:text-base"
            >
              <Trash2 size={14} className="sm:w-4 sm:h-4" />
              Clear Cart
            </button>
          </div>
        )}
      </div>

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cart}
        cartTotal={finalTotal}
        onOrderComplete={handleOrderComplete}
      />
    </div>
  );
};
