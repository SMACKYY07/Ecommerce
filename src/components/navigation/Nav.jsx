import React, { useState } from 'react';
import { useCart } from '../../hooks/useCart';
import { useAuth } from '../../context/AuthContext';
import { useSearch } from '../../context/SearchContext';
import { ShoppingCart, X, LogOut } from 'lucide-react';
import { Cart } from '../Cart';

export default function Nav() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { getTotalItems } = useCart();
  const { user, logout } = useAuth();
  const { searchQuery, updateSearchQuery } = useSearch();

  const totalItems = getTotalItems();

  const handleSearch = (e) => {
    e.preventDefault();
    // Search is handled in real-time via onChange
  };

  return (
    <header className="sticky top-0 z-50 bg-transparent">
      <nav className="max-w-7xl mx-auto px-2 sm:px-4 backdrop-blur-xl bg-slate-900/35 border-b border-slate-700/40 shadow-xl">
        <div className="flex justify-between items-center h-14 sm:h-16">

          {/* Logo */}
          <div className="flex items-center space-x-1 sm:space-x-2">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-500 via-cyan-500 to-emerald-500 rounded-lg flex items-center justify-center text-white font-bold shadow-lg text-xs sm:text-sm">
                KIT
              </div>
              <span className="text-sm sm:text-xl font-bold text-white drop-shadow-md hidden xs:inline">
                KITCH ME
              </span>
            </div>
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <a href="#" className="text-white hover:text-cyan-200 transition">Home</a>
            <a href="#" className="text-white hover:text-cyan-200 transition">About</a>
            <a href="#" className="text-white hover:text-cyan-200 transition">Services</a>
            <a href="#" className="text-white hover:text-cyan-200 transition">Contact</a>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <form onSubmit={handleSearch} className="relative hidden md:block">
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => updateSearchQuery(e.target.value)}
                placeholder="Search kitchen items..."
                className="w-48 lg:w-64 rounded-full border border-white/50 bg-white/20 px-3 py-2 text-sm text-white placeholder:text-white/80 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:border-transparent backdrop-blur"
              />
              <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white/80 hover:text-white">
                🔍
              </button>
            </form>

            <button
              onClick={() => setIsCartOpen((open) => !open)}
              className="relative inline-flex items-center gap-1 sm:gap-2 text-white hover:text-cyan-200 font-medium transition text-sm sm:text-base"
            >
              <ShoppingCart size={18} className="sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Cart</span>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white font-bold">
                  {totalItems}
                </span>
              )}
            </button>

            {user ? (
              <button
                onClick={logout}
                className="inline-flex items-center gap-0.5 sm:gap-1 text-white/80 hover:text-white text-xs sm:text-sm"
              >
                <LogOut size={16} className="sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            ) : (
              <>
                <button className="text-white/90 hover:text-white font-medium transition text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2">
                  Login
                </button>
                <button className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-full shadow-lg hover:shadow-xl transition text-xs sm:text-sm">
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {isCartOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/50"
            onClick={() => setIsCartOpen(false)}
          />
          <div className="fixed inset-y-16 right-0 z-50 w-full sm:w-96 max-w-sm max-h-[calc(100vh-4rem)] overflow-auto rounded-l-2xl sm:rounded-2xl shadow-2xl bg-white">
            <div className="p-3 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white">
              <span className="font-semibold text-sm sm:text-base">Cart Preview</span>
              <button onClick={() => setIsCartOpen(false)} className="p-1 rounded-full hover:bg-gray-100">
                <X size={16} className="sm:w-5 sm:h-5" />
              </button>
            </div>
            <Cart />
          </div>
        </>
      )}
    </header>
  );
}
