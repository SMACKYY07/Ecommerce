import React from 'react';

export default function KitchenHero() {
  return (
    <section className="relative overflow-hidden bg-cover bg-center bg-no-repeat text-white py-10 sm:py-16 md:py-20 min-h-[50vh] sm:min-h-[60vh] md:min-h-[70vh]" style={{
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`
    }}>
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/30" />

      <div className="relative max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-full flex items-center">
        <div className="max-w-3xl">
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 sm:mb-6 drop-shadow-lg">
            Kitchen Essentials Hub
          </h1>
          <p className="text-sm sm:text-lg md:text-xl lg:text-2xl text-white/90 mb-6 sm:mb-8 max-w-2xl leading-relaxed drop-shadow-md">
            Discover top kitchen must-haves in one place. Cookware, appliances, utensils, and tools that make every meal better.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold transition-colors duration-200 shadow-lg transform hover:scale-105 text-sm sm:text-base">
              Shop Now
            </button>
            <button className="border-2 border-white text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold hover:bg-white/10 transition-colors duration-200 backdrop-blur-sm text-sm sm:text-base">
              Explore Categories
            </button>
          </div>

          <div className="mt-6 sm:mt-8">
            <span className="inline-flex items-center rounded-full bg-white/20 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white backdrop-blur-sm">
              ✨ Premium Kitchen Collection
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
