import React from 'react';
import { useCart } from '../hooks/useCart';
import { ShoppingCart, Star } from 'lucide-react';
import { CheckoutModal } from './CheckoutModal';

export const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [isCheckoutOpen, setIsCheckoutOpen] = React.useState(false);

  const discountPercent = product.discount || 0; // Use product-specific discount or 0 if not set
  const originalPrice = product.price;
  const discountedPrice = originalPrice * (1 - discountPercent / 100);

  const handleAddToCart = () => {
    // Add product with discounted price
    const productWithDiscount = { ...product, price: discountedPrice };
    addToCart(productWithDiscount);
  };

  const handleBuyNow = () => {
    // Open checkout modal with product details
    setIsCheckoutOpen(true);
  };

  const handleOrderComplete = (orderData) => {
    // Handle successful order
    alert(`🎉 Order placed successfully!\nOrder ID: ${orderData.orderId}\nThank you for your purchase!`);
  };

  // Function to get the correct image path
  const getImagePath = (imageSrc) => {
    // If it's already a full URL, return as is
    if (imageSrc.startsWith('http')) return imageSrc;
    // For local images, ensure correct path
    return imageSrc.startsWith('/') ? imageSrc : `/${imageSrc}`;
  };
   

  return (

    <div className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      <div className="relative h-40 sm:h-48 md:h-60 lg:h-64 xl:h-72 overflow-hidden bg-gray-100">
        <img
          src={getImagePath(product.imageSrc)}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
          style={{ minHeight: '100%', display: 'block' }}
          onError={(e) => {
            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJDMTMuMSAyIDE0IDIuOSAxNCA0VjE2QzE0IDE3LjEgMTMuMSAxOCA5LjUgMTJIMTQuNUMxNS4zIDE4IDE2IDE3LjEgMTYgMTZWNFoiIGZpbGw9IiM5Q0E0QUYiLz4KPHBhdGggZD0iTTEyIDIyQzE3LjUgMjIgMjIgMTcuNSAyMiAxMUMyMiA0LjUgMTcuNSA0IDEyIDRDNi41IDQgMiA0LjUgMiAxMUMyIDE3LjUgNi41IDIyIDEyIDIyWiIgc3Ryb2tlPSIjOUNBNEFBIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4K';
            console.log('Image failed to load, showing placeholder:', product.imageSrc);
          }}
          onLoad={() => console.log('Image loaded successfully:', product.imageSrc)}
        />
        <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-red-500 text-white px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-lg text-xs font-semibold">
          {product.category}
        </div>
        {discountPercent > 0 && (
          <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-green-500 text-white px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-lg text-xs font-semibold">
            {discountPercent}% OFF
          </div>
        )}
      </div>

      <div className="p-2.5 sm:p-4 flex flex-col">
        <h3 className="text-sm sm:text-lg font-bold text-gray-900 mb-1 line-clamp-2 ">
          {product.name}
        </h3>

        <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3 grow line-clamp-2 ">
          {product.description}
        </p>

        <div className="flex items-center gap-1 mb-2 sm:mb-3 text-xs sm:text-sm">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={12}
                className={`sm:w-3.5 sm:h-3.5 ${
                  i < 4
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-600 ml-1 hidden sm:inline">( ⭐ {product.ratings})</span>
        </div>

        <div className="flex items-center justify-between flex-wrap gap-1.5 sm:gap-2">
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {discountPercent > 0 && (
              <span className="text-xs sm:text-sm text-gray-500 line-through">
                Rs {originalPrice?.toFixed(2)}
              </span>
            )}
            <span className={`text-base sm:text-lg font-semibold ${discountPercent > 0 ? 'text-green-600' : 'text-gray-900'}`}>
              Rs {discountPercent > 0 ? discountedPrice?.toFixed(2) : originalPrice?.toFixed(2)}
            </span>
          </div>
          <div className="flex gap-1 sm:gap-2 shrink-0">
            <button
              onClick={handleBuyNow}
              className="bg-green-600 hover:bg-green-700 text-white px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg transition-colors duration-200 text-xs sm:text-sm font-medium whitespace-nowrap shrink-0"
              title="Buy Now"
            >
              <span className="hidden sm:inline">Buy Now</span>
              <span className="sm:hidden">Buy</span>
            </button>
            <button
              onClick={handleAddToCart}
              className="bg-blue-600 hover:bg-blue-700 text-white px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg transition-colors duration-200 flex items-center justify-center shrink-0 gap-0.5 sm:gap-1"
              title="Add to Cart"
            >
              <ShoppingCart size={14} className="sm:w-4 sm:h-4" />
              <span className="text-xs sm:text-sm font-medium hidden sm:inline">Add to Cart</span>
            </button>
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        product={{ ...product, price: discountedPrice }}
        onOrderComplete={handleOrderComplete}
      />
    </div>
  );
};
