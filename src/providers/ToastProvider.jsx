import { useState } from 'react';
import { ToastContext } from './contexts';

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  function removeToast(id) {
    setToasts((currentToasts) => currentToasts.filter((toast) => toast.id !== id));
  }

  function pushToast({ title, tone = 'neutral', description = '', duration = 2800 }) {
    const id = window.crypto?.randomUUID?.() || `${Date.now()}-${Math.random()}`;
    const nextToast = { id, title, tone, description };

    setToasts((currentToasts) => [...currentToasts, nextToast]);

    window.setTimeout(() => {
      removeToast(id);
    }, duration);

    return id;
  }

  return (
    <ToastContext.Provider value={{ toasts, pushToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
}
