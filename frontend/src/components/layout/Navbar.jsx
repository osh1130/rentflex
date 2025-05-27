import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-green-600 text-xl font-bold">RentFlex</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                {isAdmin ? (
                  <>
                    <Link to="/admin/bookings" className="text-gray-600 hover:text-green-600">
                      Bookings
                    </Link>
                    <Link to="/admin/vehicles" className="text-gray-600 hover:text-green-600">
                      Vehicles
                    </Link>
                    <Link to="/admin/users" className="text-gray-600 hover:text-green-600">
                      Users
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/vehicles" className="text-gray-600 hover:text-green-600">
                      Rent a Car
                    </Link>
                    <Link to="/my-bookings" className="text-gray-600 hover:text-green-600">
                      My Bookings
                    </Link>
                  </>
                )}
                <div className="flex items-center space-x-4">
                  <span className="text-gray-600">{user.name}</span>
                  <button
                    onClick={handleLogout}
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="space-x-4">
                <Link
                  to="/login"
                  className="text-green-600 hover:text-green-700"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 