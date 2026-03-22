import { useEffect } from 'react';
import { useLocalStorageState } from '../hooks/useLocalStorageState';
import { STORAGE_KEYS } from '../utils/storage';
import { ThemeContext } from './contexts';

function getInitialTheme() {
  if (typeof window === 'undefined') {
    return 'light';
  }

  const storedValue = window.localStorage.getItem(STORAGE_KEYS.theme);

  if (storedValue) {
    return JSON.parse(storedValue);
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useLocalStorageState(STORAGE_KEYS.theme, getInitialTheme);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  function toggleTheme() {
    setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'));
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
