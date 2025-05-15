<<<<<<< HEAD
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../api/auth'
import { UserContext } from '../contexts/UserContext'

export default function Login() {
  const { setUser } = useContext(UserContext)
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const res = await login(email, password)
      // 保存 token
      localStorage.setItem('token', res.token)
      // 设置上下文用户
      setUser({ email: res.email, name: res.name, role: res.role })
      // 跳转到对应页面
      if (res.role === 'admin') {
        navigate('/admin')
      } else {
        navigate('/vehicles')
      }
    } catch (err) {
      setError('Login failed. Please check your credentials.')
    }
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <button type="submit" className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">
          Login
        </button>
      </form>
    </div>
  )
=======
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
>>>>>>> 28f00b8c764713a3f85a902a43d072ace3078ce0
}
