import { ThemeProvider } from '../providers/ThemeProvider';
import { AuthProvider } from '../providers/AuthProvider';
import { ToastProvider } from '../providers/ToastProvider';
import { WishlistProvider } from '../providers/WishlistProvider';
import { CartProvider } from '../providers/CartProvider';

export function AppProviders({ children }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ToastProvider>
          <WishlistProvider>
            <CartProvider>{children}</CartProvider>
          </WishlistProvider>
        </ToastProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
