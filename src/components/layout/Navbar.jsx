import { Heart, Menu, Search, ShoppingBag, User, X } from 'lucide-react';
import { startTransition, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../hooks/useTheme';
import { useWishlist } from '../../hooks/useWishlist';
import { ThemeToggle } from '../ui/ThemeToggle';
import { Button } from '../ui/Button';
import { cn } from '../../utils/cn';

const navigation = [
  { label: 'Home', to: '/' },
  { label: 'Products', to: '/products' },
  { label: 'New arrivals', to: '/products?sort=popular' },
];

export function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { itemCount } = useCart();
  const { ids } = useWishlist();
  const { user, logout } = useAuth();
  const { theme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const routeSearchValue =
    location.pathname === '/products' ? new URLSearchParams(location.search).get('q') || '' : '';

  function handleSearchSubmit(event, submittedValue) {
    event.preventDefault();

    startTransition(() => {
      const params = new URLSearchParams();
      if (submittedValue.trim()) {
        params.set('q', submittedValue.trim());
      }

      navigate(`/products${params.toString() ? `?${params.toString()}` : ''}`);
	      setMobileMenuOpen(false);
    });
  }

  function handleLogout() {
    logout();
    setMobileMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-4 lg:px-6">
      <div className="mx-auto max-w-7xl rounded-[1.75rem] border border-black/5 bg-white/75 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/75">
        <div className="flex items-center gap-3 px-4 py-4 sm:px-5">
          <Link to="/" className="flex min-w-0 items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-sm font-semibold uppercase tracking-[0.28em] text-white shadow-lg shadow-slate-950/20 dark:bg-white dark:text-slate-950">
              AK
            </div>
            <div className="min-w-0">
              <p className="truncate font-heading text-lg font-semibold tracking-tight">Aurel Kitchen</p>
              <p className="hidden text-xs uppercase tracking-[0.26em] text-slate-400 sm:block">
                Premium D2C kitchenware
              </p>
            </div>
          </Link>

          <nav className="ml-4 hidden items-center gap-6 lg:flex">
            {navigation.map((item) => (
              <NavLink
                key={item.label}
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    'text-sm font-medium text-slate-500 transition hover:text-slate-950 dark:text-slate-300 dark:hover:text-white',
                    isActive && 'text-slate-950 dark:text-white',
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="ml-auto hidden flex-1 max-w-xl lg:block">
            <NavbarSearchForm
              key={`desktop-${location.pathname}-${location.search}`}
              initialValue={routeSearchValue}
              placeholder="Search cooktops, storage, and more"
              onSubmit={handleSearchSubmit}
            />
          </div>

          <div className="ml-auto flex items-center gap-2 lg:ml-4">
            <ThemeToggle />

            <Link
              to="/products"
              className="relative hidden h-11 w-11 items-center justify-center rounded-full border border-black/8 bg-white/70 text-slate-700 transition hover:border-emerald-500 hover:text-emerald-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:border-emerald-400 dark:hover:text-emerald-300 sm:inline-flex"
              aria-label="Wishlist"
            >
              <Heart className={cn('h-4 w-4', theme === 'dark' && 'stroke-[1.8]')} />
              {ids.length ? (
                <span className="absolute -right-0.5 -top-0.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-emerald-500 px-1 text-[10px] font-semibold text-white">
                  {ids.length}
                </span>
              ) : null}
            </Link>

            <Link
              to="/cart"
              className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/8 bg-white/70 text-slate-700 transition hover:border-emerald-500 hover:text-emerald-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:border-emerald-400 dark:hover:text-emerald-300"
              aria-label="Cart"
            >
              <ShoppingBag className="h-4 w-4" />
              {itemCount ? (
                <span className="absolute -right-0.5 -top-0.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-emerald-500 px-1 text-[10px] font-semibold text-white">
                  {itemCount}
                </span>
              ) : null}
            </Link>

            {user ? (
              <div className="hidden items-center gap-2 lg:flex">
                <div className="rounded-full border border-black/8 bg-white/70 px-4 py-2 text-sm text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
                  {user.name}
                </div>
                <Button variant="secondary" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            ) : (
              <div className="hidden items-center gap-2 lg:flex">
                <Link to="/login" className="text-sm font-medium text-slate-500 transition hover:text-slate-950 dark:text-slate-300 dark:hover:text-white">
                  Login
                </Link>
                <Button to="/signup" size="sm">
                  Create account
                </Button>
              </div>
            )}

            <button
              type="button"
              onClick={() => setMobileMenuOpen((open) => !open)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/8 bg-white/70 text-slate-700 transition hover:text-slate-950 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 lg:hidden"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen ? (
          <div className="border-t border-black/5 px-4 pb-4 pt-3 dark:border-white/10 lg:hidden">
            <NavbarSearchForm
              key={`mobile-${location.pathname}-${location.search}`}
              initialValue={routeSearchValue}
              placeholder="Search the collection"
              onSubmit={handleSearchSubmit}
            />

            <nav className="mt-4 grid gap-2">
              {navigation.map((item) => (
                <NavLink
                  key={item.label}
                  to={item.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      'rounded-2xl px-4 py-3 text-sm font-medium text-slate-500 transition hover:bg-black/5 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-white',
                      isActive && 'bg-black/5 text-slate-950 dark:bg-white/5 dark:text-white',
                    )
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <div className="mt-4 grid gap-3 rounded-3xl border border-black/5 bg-white/70 p-4 dark:border-white/10 dark:bg-white/5">
              <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                <User className="h-4 w-4" />
                {user ? `Signed in as ${user.name}` : 'Browse freely or sign in for checkout'}
              </div>
              {user ? (
                <Button variant="secondary" onClick={handleLogout}>
                  Logout
                </Button>
              ) : (
                <div className="grid gap-2 sm:grid-cols-2">
                  <Button to="/login" variant="secondary" onClick={() => setMobileMenuOpen(false)}>
                    Login
                  </Button>
                  <Button to="/signup" onClick={() => setMobileMenuOpen(false)}>
                    Sign up
                  </Button>
                </div>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
}

function NavbarSearchForm({ initialValue, placeholder, onSubmit }) {
  const [searchValue, setSearchValue] = useState(initialValue);

  return (
    <form onSubmit={(event) => onSubmit(event, searchValue)}>
      <label className="flex items-center gap-3 rounded-full border border-black/8 bg-white/80 px-4 py-3 text-sm shadow-inner shadow-white dark:border-white/10 dark:bg-white/5">
        <Search className="h-4 w-4 text-slate-400" />
        <input
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
          placeholder={placeholder}
          className="w-full bg-transparent text-sm text-slate-950 outline-none placeholder:text-slate-400 dark:text-white"
        />
      </label>
    </form>
  );
}
