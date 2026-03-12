import React from 'react';
import { CartProvider } from './context/CartContext';
import { ProductList, Cart } from './components';
import { ShoppingBag } from 'lucide-react';
import Nav from './components/navigation/Nav';
import Footer from './components/navigation/Footer';

export default function App() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100">
        <Nav />

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Products Section */}
            <ProductList />

            {/* Cart Section */}
            <Cart />
          </div>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </CartProvider>
  );
}


