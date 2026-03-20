import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { SearchProvider } from './context/SearchContext';
import Nav from './components/navigation/Nav';
import Footer from './components/navigation/Footer';
import LoginSignup from './components/auth/LoginSignup';
import Home from './pages/Home';

function AppContent() {
  const { user } = useAuth();

  if (!user) {
    return <LoginSignup />;
  }

  return (
    <div className="h-screen w-screen bg-linear-to-br from-slate-50 to-slate-100 flex flex-col overflow-hidden">
      <Nav />
      <div className="flex-1 overflow-y-auto">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <SearchProvider>
          <Router>
            <AppContent />
          </Router>
        </SearchProvider>
      </CartProvider>
    </AuthProvider>
  );
}


