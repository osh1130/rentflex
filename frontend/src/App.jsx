import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/Register';
import VehicleListPage from './pages/customer/VehicleList';

import AdminVehicleList from './pages/admin/AdminVehicleList';
import ApproveOrders from './pages/admin/ApproveOrders';
import VehicleDetail from './pages/customer/VehicleDetail';
import OrdersPage from './pages/customer/Orders';

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      
      {/* Customer Routes */}
      <Route path="/vehicles" element={<VehicleListPage />} />
      <Route path="/vehicles/:id" element={<VehicleDetail />} />
      <Route path="/my-bookings" element={<OrdersPage />} />
      
      {/* Admin Routes */}
      <Route path="/admin/vehicles" element={<AdminVehicleList />} />
      <Route path="/admin/orders" element={<ApproveOrders />} />
      
      {/* Default Route */}
      <Route path="/" element={<Navigate to="/vehicles" />} />
    </Routes>
  );
}

export default App;
