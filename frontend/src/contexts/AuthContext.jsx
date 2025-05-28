import React, { createContext, useContext, useState, useEffect } from 'react';
import { getMe } from '../api/auth';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setToken(token);
    if (token) {
      getMe(token)
        .then(userData => {
          setUser(userData);
        })
        .catch(err => {
          localStorage.removeItem('token');
          setError(err.message);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  // const login = async (token) => {
  //   const userData = await getMe(token);
  //   setUser(userData);
  //   localStorage.setItem('token', token);
  // };
  const login = async (token) => {
    try {
      const userData = await getMe(token);
      setUser(userData);
      setToken(token);
      localStorage.setItem('token', token);
      return userData;
    } catch (err) {
      console.error('[AuthContext] login error:', err);
      throw err;
    }
  };


  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  const value = {
    user,
    token,
    loading,
    error,
    login,
    logout,
    isAdmin: user?.role === 'admin',
    isAuthenticated: !!user,
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 