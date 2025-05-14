import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import { UserContext } from '../contexts/UserContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await api.login(email, password);
      setUser(res.data);
      navigate(res.data.role === 'admin' ? '/admin' : '/vehicles');
    } catch {
      alert('Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold text-green-700 mb-4">Login</h2>
      <input type="email" placeholder="Email" value={email}
        onChange={e => setEmail(e.target.value)}
        className="w-full mb-3 p-2 border rounded" />
      <input type="password" placeholder="Password" value={password}
        onChange={e => setPassword(e.target.value)}
        className="w-full mb-3 p-2 border rounded" />
      <button type="submit" className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700">Login</button>
    </form>
  );
}
