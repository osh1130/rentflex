<<<<<<< HEAD
import { createContext, useContext, useState, useEffect } from 'react'
import { getMe } from '../api/auth'

export const UserContext = createContext()

export function UserProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [token, setToken] = useState(() => localStorage.getItem('token') || '')


  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      getMe(token)
        .then(userData => {
          setUser(userData)
        })
        .catch(() => {
          localStorage.removeItem('token')
          setUser(null)
        })
    }
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser, token, setToken, loading }}>
      {children}
    </UserContext.Provider>
  )
}
=======
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
>>>>>>> 28f00b8c764713a3f85a902a43d072ace3078ce0

  const value = { user, setUser, logout };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
