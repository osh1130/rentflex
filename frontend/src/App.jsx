import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import AdminRoute from './components/AdminRoute';
import Home from './pages/auth/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import VehicleList from './pages/customer/VehicleList';
import Booking from './pages/customer/Booking';
import Orders from './pages/customer/Orders';
import Profile from './pages/customer/Profile';
import AdminUserList from './pages/admin/AdminUserList';
import ApproveOrders from './pages/admin/ApproveOrders';
import AdminVehicleList from './pages/admin/AdminVehicleList'
import VehicleDetail from './pages/customer/VehicleDetail';

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vehicles" element={<VehicleList />} />
        <Route path="/vehicle/:id" element={<VehicleDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/booking/:id" element={<Booking />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin/users" element={<AdminRoute><AdminUserList /></AdminRoute>} />
        <Route path="/admin/orders" element={<AdminRoute><ApproveOrders /></AdminRoute>} />
        <Route path="/admin/vehicles" element={<AdminRoute><AdminVehicleList /></AdminRoute>} />
        

      </Routes>
    </>
  );
}
