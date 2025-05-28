import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/Register';
import VehicleListPage from './pages/customer/VehicleList';
import Booking from './pages/customer/Booking';
import AdminVehicleList from './pages/admin/AdminVehicleList';
import ApproveOrders from './pages/admin/ApproveOrders';

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      
      {/* Customer Routes */}
      <Route path="/vehicles" element={<VehicleListPage />} />
      <Route path="/bookings" element={<Booking />} />
      
      {/* Admin Routes */}
      <Route path="/admin/vehicles" element={<AdminVehicleList />} />
      <Route path="/admin/orders" element={<ApproveOrders />} />
      
      {/* Default Route */}
      <Route path="/" element={<Navigate to="/vehicles" />} />
    </Routes>
  );
}

export default App;
