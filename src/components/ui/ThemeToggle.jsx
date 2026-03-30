import { MoonStar, SunMedium } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="btn-icon"
      style={{
        width: '2.75rem',
        height: '2.75rem',
        borderRadius: '50%',
        backgroundColor: 'var(--bg-soft)',
        border: '1px solid var(--border)',
        color: 'var(--muted)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'all 0.3s ease'
      }}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? <SunMedium size={18} /> : <MoonStar size={18} />}
    </button>
  );
}
