import { Instagram, Twitter, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';

const footerColumns = [
  {
    title: 'Archive',
    links: [
      { label: 'All Products', to: '/products' },
      { label: 'Cooktops', to: '/products?category=Cooktops' },
      { label: 'Appliances', to: '/products?category=Appliances' },
      { label: 'Storage', to: '/products?category=Storage' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Our Story', to: '/about' },
      { label: 'Journal', to: '/journal' },
      { label: 'Stockists', to: '/stockists' },
      { label: 'Contact', to: '/contact' },
    ],
  },
  {
    title: 'Assistance',
    links: [
      { label: 'Shipping Info', to: '/shipping' },
      { label: 'Returns', to: '/returns' },
      { label: 'Cart', to: '/cart' },
      { label: 'Support', to: '/support' },
    ],
  },
];

const socialLinks = [
  { label: 'Instagram', href: '#', icon: Instagram },
  { label: 'Twitter', href: '#', icon: Twitter },
  { label: 'YouTube', href: '#', icon: Youtube },
];

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-logo-section">
            <Link to="/" style={{display: 'flex', alignItems: 'center', gap: 'var(--s-3)', textDecoration: 'none'}}>
              <div className="btn-icon" style={{width: '3rem', height: '3rem', background: 'var(--fg)', borderRadius: 'var(--r-2xl)', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <img src="/logo.png" alt="KM Logo" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
              </div>
              <div>
                <p style={{fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--fg)', textTransform: 'uppercase', margin: 0}}>KITCH ME</p>
                <p style={{fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.3em', color: 'var(--muted)', margin: 0}}>Kitch Me Studio</p>
              </div>
            </Link>
            
            <p style={{maxWidth: '320px', fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--muted)'}}>
              Quiet tools for considered homes. Premium kitchen objects designed with an architectural point of view.
            </p>

            <div className="footer-socials">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    className="social-btn"
                    aria-label={social.label}
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          </div>

          {footerColumns.map((column) => (
            <div key={column.title}>
              <h3 className="footer-title">{column.title}</h3>
              <ul className="footer-links">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="footer-link">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer-journal">
          <div className="footer-journal-grid">
            <div>
              <h2 style={{fontFamily: 'var(--font-heading)', fontSize: '1.875rem', fontWeight: 700, margin: 0}}>
                Kitch Me.
              </h2>
              <p style={{marginTop: 'var(--s-4)', opacity: 0.7}}>
                Sign up for early access to new collections and studio stories.
              </p>
            </div>
            <form style={{display: 'flex', width: '100%', maxWidth: '400px', gap: 'var(--s-3)'}}>
              <input
                type="email"
                placeholder="Enter your email"
                style={{flex: 1, borderRadius: 'var(--r-xl)', border: 'none', background: 'rgba(255,255,255,0.1)', padding: 'var(--s-4) var(--s-6)', color: 'inherit'}}
                required
              />
              <button
                type="submit"
                className="btn btn-primary"
                style={{backgroundColor: 'var(--bg)', color: 'var(--fg)'}}
              >
                Join
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p style={{fontSize: '0.6875rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--muted)'}}>
            © 2026 Kitch Me. All rights reserved.
          </p>
          <div className="footer-legal">
            <Link to="/privacy" className="footer-link">Privacy</Link>
            <Link to="/terms" className="footer-link">Terms</Link>
            <Link to="/accessibility" className="footer-link">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
