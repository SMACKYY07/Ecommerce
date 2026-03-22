import { useLocalStorageState } from '../hooks/useLocalStorageState';
import { STORAGE_KEYS, setReturnTo } from '../utils/storage';
import { AuthContext } from './contexts';

function createUserProfile({ email, name }) {
  return {
    id: email.toLowerCase(),
    email,
    name: name || email.split('@')[0],
  };
}

export function AuthProvider({ children }) {
  const [user, setUser] = useLocalStorageState(STORAGE_KEYS.user, null);

  function login({ email, password }) {
    if (!email?.trim() || !password?.trim()) {
      throw new Error('Email and password are required.');
    }

    const nextUser = createUserProfile({ email: email.trim() });
    setUser(nextUser);
    return nextUser;
  }

  function signup({ name, email, password }) {
    if (!name?.trim() || !email?.trim() || !password?.trim()) {
      throw new Error('Name, email, and password are required.');
    }

    const nextUser = createUserProfile({ name: name.trim(), email: email.trim() });
    setUser(nextUser);
    return nextUser;
  }

  function logout() {
    setUser(null);
  }

  function requireAuth(path = '/checkout') {
    if (user) {
      return true;
    }

    setReturnTo(path);
    return false;
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, requireAuth }}>
      {children}
    </AuthContext.Provider>
  );
}
