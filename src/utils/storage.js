export const STORAGE_KEYS = {
  user: 'aurel-kitchen:user',
  cart: 'aurel-kitchen:cart',
  wishlist: 'aurel-kitchen:wishlist',
  theme: 'aurel-kitchen:theme',
  returnTo: 'aurel-kitchen:return-to',
};

export function setReturnTo(path) {
  if (typeof window === 'undefined') {
    return;
  }

  window.sessionStorage.setItem(STORAGE_KEYS.returnTo, path);
}

export function getReturnTo() {
  if (typeof window === 'undefined') {
    return null;
  }

  return window.sessionStorage.getItem(STORAGE_KEYS.returnTo);
}

export function consumeReturnTo(fallback = '/') {
  if (typeof window === 'undefined') {
    return fallback;
  }

  const path = getReturnTo();
  window.sessionStorage.removeItem(STORAGE_KEYS.returnTo);
  return path || fallback;
}
