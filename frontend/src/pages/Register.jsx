import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await api.register(email, password, name);
      alert('Registration successful');
      navigate('/login');
    } catch (err) {
      alert(err.response.data.message || 'Register failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
      <h2 className="text-2xl mb-4">Register</h2>
      <input placeholder="Name" value={name} onChange={e => setName(e.target.value)}
        className="block w-full mb-3 p-2 border rounded" />
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}
        className="block w-full mb-3 p-2 border rounded" />
      <input type="password" placeholder="Password" value={password}
        onChange={e => setPassword(e.target.value)} className="block w-full mb-3 p-2 border rounded" />
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Register</button>
    </form>
  );
}
