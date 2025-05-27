import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import VehicleListPage from './pages/customer/VehicleListPage';
import MyBookingsPage from './pages/customer/MyBookingsPage';
import BookingManagementPage from './pages/admin/BookingManagementPage';
import VehicleManagementPage from './pages/admin/VehicleManagementPage';
import UserManagementPage from './pages/admin/UserManagementPage';
import VehicleDetail from './pages/customer/VehicleDetail';

// Protected route wrapper
const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* Customer Routes */}
          <Route
            path="/vehicles"
            element={
              <ProtectedRoute>
                <VehicleListPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-bookings"
            element={
              <ProtectedRoute>
                <MyBookingsPage />
              </ProtectedRoute>
            }
          />
          
          {/* Admin Routes */}
          <Route
            path="/admin/bookings"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <BookingManagementPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/vehicles"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <VehicleManagementPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <UserManagementPage />
              </ProtectedRoute>
            }
          />
          
          {/* Default redirect */}
          <Route path="/" element={<Navigate to="/vehicles" />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
