import { Outlet } from 'react-router-dom';

export function AuthLayout() {
  return (
    <div className="auth-layout">
      <div className="auth-layout-grid" />
      <div style={{position: 'relative', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Outlet />
      </div>
    </div>
  );
}
