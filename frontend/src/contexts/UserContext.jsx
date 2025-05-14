import React, { createContext, useState, useEffect } from 'react';
import { fetchMe } from '../api/api';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    if (!user) return;
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const value = { user, setUser, logout };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
