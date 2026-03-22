import { useLocalStorageState } from '../hooks/useLocalStorageState';
import { STORAGE_KEYS } from '../utils/storage';
import { WishlistContext } from './contexts';

export function WishlistProvider({ children }) {
  const [ids, setIds] = useLocalStorageState(STORAGE_KEYS.wishlist, []);

  function toggle(id) {
    setIds((currentIds) =>
      currentIds.includes(id) ? currentIds.filter((itemId) => itemId !== id) : [...currentIds, id],
    );
  }

  function has(id) {
    return ids.includes(id);
  }

  return <WishlistContext.Provider value={{ ids, toggle, has }}>{children}</WishlistContext.Provider>;
}
