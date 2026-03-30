import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';

export function StoreLayout() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [location.pathname]);

  return (
    <div className="store-layout">
      <div className="layout-bg" />
      <Navbar />
      <main style={{flex: 1, position: 'relative', zIndex: 10, paddingBottom: 'var(--s-16)'}}>
        <div key={location.pathname} className="page-enter">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}
