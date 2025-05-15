<<<<<<< HEAD
import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../contexts/UserContext'

export default function Navbar() {
  const { user, setUser } = useContext(UserContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    setUser(null)
    navigate('/login')
  }

  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link to="/" className="text-2xl font-bold text-primary">RentFlex</Link>

        <div className="space-x-4">
          <Link to="/vehicles" className="hover:text-primary">Vehicles</Link>

          {!user && (
            <>
              <Link to="/login" className="hover:text-primary">Login</Link>
              <Link to="/register" className="hover:text-primary">Register</Link>
            </>
          )}

          {user?.role === 'customer' && (
            <>
              <Link to="/orders" className="hover:text-primary">My Orders</Link>
              <Link to="/profile" className="hover:text-primary">Profile</Link>
              <button onClick={handleLogout} className="hover:text-primary">Logout</button>
            </>
          )}

          {user?.role === 'admin' && (
            <>
              <Link to="/admin" className="hover:text-primary">Admin</Link>
              <Link to="/profile" className="hover:text-primary">Profile</Link>
              <button onClick={handleLogout} className="hover:text-primary">Logout</button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
=======
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

export default function Navbar() {
  const { user, logout } = useContext(UserContext);

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-white shadow-md">
      <Link to="/" className="text-2xl font-bold text-green-600">RentFlex</Link>
      <div className="space-x-4">
        {!user && (
          <>
            <Link to="/vehicles" className="text-gray-700 hover:text-green-600">Vehicles</Link>
            <Link to="/login" className="text-gray-700 hover:text-green-600">Login</Link>
            <Link to="/register" className="text-gray-700 hover:text-green-600">Register</Link>
          </>
        )}
        {user?.role === 'customer' && (
          <>
            <Link to="/vehicles" className="text-gray-700 hover:text-green-600">Vehicles</Link>
            <Link to="/orders" className="text-gray-700 hover:text-green-600">My Orders</Link>
            <Link to="/profile" className="text-gray-700 hover:text-green-600">Profile</Link>
            <button onClick={logout} className="text-red-500 hover:text-red-700">Logout</button>
          </>
        )}
        {user?.role === 'admin' && (
          <>
            <Link to="/admin" className="text-gray-700 hover:text-green-600">Admin</Link>
            <button onClick={logout} className="text-red-500 hover:text-red-700">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
>>>>>>> 28f00b8c764713a3f85a902a43d072ace3078ce0
}
