import { useEffect, useState } from 'react';

function resolveInitialValue(initialValue) {
  return typeof initialValue === 'function' ? initialValue() : initialValue;
}

export function useLocalStorageState(key, initialValue) {
  const [value, setValue] = useState(() => {
    if (typeof window === 'undefined') {
      return resolveInitialValue(initialValue);
    }

    try {
      const storedValue = window.localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : resolveInitialValue(initialValue);
    } catch {
      return resolveInitialValue(initialValue);
    }
  });

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    if (value === undefined || value === null) {
      window.localStorage.removeItem(key);
      return;
    }

    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
