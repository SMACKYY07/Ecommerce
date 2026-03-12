import React from 'react';
import { useCart } from '../hooks/useCart';
import { ShoppingCart, Star } from 'lucide-react';

export const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
  };
   

  return (

    <div className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <img
          src={product.imageSrc}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-semibold">
          {product.category}
        </div>
      </div>

      <div className="p-4 flex flex-col">
        <h3 className="text-lg font-bold text-gray-900 mb-1 ">
          {product.name}
        </h3>

        <p className="text-sm text-gray-600 mb-3 grow ">
          {product.description}
        </p>

        <div className="flex items-center gap-1 mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={
                  i < Math.floor(product.rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                }
              />
            ))}
          </div>
          <span className="text-xs text-gray-600 ml-1">( ⭐ {product.ratings})</span>
        </div>

        <div className="flex items-center justify-between ">
          <span className="text-lg font-semibold text-gray-900">
            ${product?.price?.toFixed(2) || "0.00"}
          </span>
          <button
            onClick={handleAddToCart}
            className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors duration-200 flex items-center justify-center"
          > <p>Add to cart</p>
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
