import { BrowserRouter, Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import { StoreLayout } from './layouts/StoreLayout';
import { AuthLayout } from './layouts/AuthLayout';
import { HomePage } from '../pages/HomePage';
import { ProductsPage } from '../pages/ProductsPage';
import { ProductDetailsPage } from '../pages/ProductDetailsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { LoginPage } from '../pages/LoginPage';
import { SignupPage } from '../pages/SignupPage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { useAuth } from '../hooks/useAuth';

function RequireAuth() {
  const location = useLocation();
  const { user, requireAuth } = useAuth();

  if (!user) {
    const returnTo = `${location.pathname}${location.search}`;
    requireAuth(returnTo);
    return <Navigate replace to={`/login?returnTo=${encodeURIComponent(returnTo)}`} />;
  }

  return <Outlet />;
}

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<StoreLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:slug" element={<ProductDetailsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route element={<RequireAuth />}>
            <Route path="/checkout" element={<CheckoutPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
