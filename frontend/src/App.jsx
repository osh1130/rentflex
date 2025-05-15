import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import VehicleList from './pages/customer/VehicleList'
import Booking from './pages/customer/Booking'
import Orders from './pages/customer/Orders'
import Profile from './pages/customer/Profile'
import AdminPanel from './pages/admin/AdminPanel'


export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/vehicles" element={<VehicleList />} />
          <Route path="/booking/:id" element={<Booking />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/booking/:id" element={<Booking />} />
        </Routes>
      </div>
    </div>
  )
}