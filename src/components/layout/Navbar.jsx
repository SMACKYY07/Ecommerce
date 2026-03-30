import { Heart, Menu, Search, ShoppingBag, User, X } from 'lucide-react';
import { startTransition, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../hooks/useTheme';
import { useWishlist } from '../../hooks/useWishlist';
import { ThemeToggle } from '../ui/ThemeToggle';
import { Button } from '../ui/Button';

const navigation = [
  { label: 'Collection', to: '/products' },
  { label: 'About', to: '/about' },
];

export function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { itemCount } = useCart();
  const { ids } = useWishlist();
  const { user, logout } = useAuth();
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
    <header className="navbar">
      <div className="navbar-top">
        <div className="container">
          Free shipping on all orders over $300 • 30-day premium returns
        </div>
      </div>
      
      <div className="glass-panel">
        <div className="container navbar-main">
          <Link to="/" className="nav-logo" style={{display: 'flex', alignItems: 'center', gap: 'var(--s-3)', textDecoration: 'none'}}>
             <div className="btn-icon" style={{background: 'var(--fg)', color: 'var(--bg)', borderRadius: 'var(--r-lg)', overflow: 'hidden', width: '2.5rem', height: '2.5rem'}}>
                <img src="/logo.png" alt="KM" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
             </div>
             <div className="hidden-mobile">
               <span style={{fontSize: '1.25rem', fontWeight: '800'}}>KITCH ME</span>
             </div>
          </Link>

          <nav className="nav-links">
            {navigation.map((item) => (
              <NavLink
                key={item.label}
                to={item.to}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="nav-actions">
            <div className="hidden-mobile" style={{minWidth: '200px'}}>
               <NavbarSearchForm
                  initialValue={routeSearchValue}
                  placeholder="Search..."
                  onSubmit={handleSearchSubmit}
                />
            </div>
            
            <ThemeToggle />

            <Link to="/cart" className="nav-link-icon" style={{position: 'relative'}}>
              <ShoppingBag size={20} />
              {itemCount > 0 && (
                <span className="cart-badge">{itemCount}</span>
              )}
            </Link>

            {user ? (
              <Button variant="secondary" size="sm" onClick={handleLogout} className="hidden-mobile">
                Sign Out
              </Button>
            ) : (
              <Button to="/login" variant="primary" size="sm" className="hidden-mobile">
                Sign In
              </Button>
            )}

            <Button variant="ghost" size="icon" className="mobile-only" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="container" style={{marginTop: 'var(--s-2)'}}>
           <div className="glass-panel" style={{padding: 'var(--s-8)'}}>
              <nav className="flex flex-col gap-6">
                {navigation.map((item) => (
                  <Link key={item.label} to={item.to} className="nav-link" onClick={() => setMobileMenuOpen(false)}>
                    {item.label}
                  </Link>
                ))}
                <div style={{marginTop: 'var(--s-4)', paddingTop: 'var(--s-4)', borderTop: '1px solid var(--border)'}}>
                   {!user ? (
                      <div className="flex flex-col gap-4">
                        <Button to="/login" variant="primary" onClick={() => setMobileMenuOpen(false)}>Sign In</Button>
                        <Button to="/signup" variant="secondary" onClick={() => setMobileMenuOpen(false)}>Create Account</Button>
                      </div>
                   ) : (
                      <Button onClick={handleLogout} variant="ghost">Logout</Button>
                   )}
                </div>
              </nav>
           </div>
        </div>
      )}
    </header>
  );
}

function NavbarSearchForm({ initialValue, placeholder, onSubmit }) {
  const [searchValue, setSearchValue] = useState(initialValue);

  return (
    <form onSubmit={(event) => onSubmit(event, searchValue)} style={{width: '100%'}}>
      <label style={{
        display: 'flex',
        height: '2.5rem',
        alignItems: 'center',
        gap: 'var(--s-3)',
        borderRadius: 'var(--r-xl)',
        border: '1px solid var(--border)',
        background: 'var(--bg-soft)',
        padding: '0 var(--s-4)',
        transition: 'all 0.3s ease'
      }}>
        <Search size={16} style={{color: 'var(--muted)'}} />
        <input
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
          placeholder={placeholder}
          style={{
            width: '100%',
            background: 'transparent',
            border: 'none',
            fontSize: '0.75rem',
            fontWeight: 500,
            color: 'var(--fg)',
            outline: 'none'
          }}
        />
      </label>
    </form>
  );
}
