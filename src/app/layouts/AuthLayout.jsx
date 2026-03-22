import { Outlet } from 'react-router-dom';

export function AuthLayout() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.15),_transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(15,23,42,0.2),_transparent_28%)] px-4 py-8 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 opacity-70 [background-image:linear-gradient(rgba(15,23,42,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.05)_1px,transparent_1px)] [background-size:48px_48px]" />
      <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl items-center justify-center">
        <Outlet />
      </div>
    </div>
  );
}
