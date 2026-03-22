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
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-fg)]">
      <div className="relative isolate min-h-screen overflow-x-clip">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[28rem] bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.16),_transparent_38%),radial-gradient(circle_at_top_right,_rgba(15,23,42,0.12),_transparent_28%)]" />
        <Navbar />
        <main className="relative z-10 flex-1 pb-16">
          <div key={location.pathname} className="page-enter">
            <Outlet />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
