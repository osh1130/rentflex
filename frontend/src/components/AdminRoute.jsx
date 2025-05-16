import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

export default function AdminRoute({ children }) {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) return;
    if (!user || user.role !== 'admin') {
      alert('Access denied');
      navigate('/');
    }
  }, [user, navigate]);

  return user?.role === 'admin' ? children : null;
}