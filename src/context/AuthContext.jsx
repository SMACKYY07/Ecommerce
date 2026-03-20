import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('kitchme_user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('kitchme_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('kitchme_user');
    }
  }, [user]);

  const login = ({ email, password }) => {
    if (!email || !password) throw new Error('Email & password required');
    const newUser = { name: email.split('@')[0], email };
    setUser(newUser);
    return newUser;
  };

  const signup = ({ name, email, password }) => {
    if (!name || !email || !password) throw new Error('Name, email, password required');
    const newUser = { name, email };
    setUser(newUser);
    return newUser;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
