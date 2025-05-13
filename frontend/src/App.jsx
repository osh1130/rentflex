import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import VehicleList from './pages/VehicleList'
import Booking from './pages/Booking'
import Orders from './pages/Orders'
import Profile from './pages/Profile'
import AdminPanel from './pages/AdminPanel'
import RequireAuth from './components/RequireAuth'
import RequireAdmin from './components/RequireAdmin'

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
          <Route path="/profile" element={<RequireAuth><Profile /></RequireAuth> } />
          <Route path="/admin" element={<RequireAdmin><AdminPanel /></RequireAdmin>} />
        </Routes>
      </div>
    </div>
  )
}