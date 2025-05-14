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
}
