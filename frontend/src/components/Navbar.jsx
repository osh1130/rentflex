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
          
          {!user && (
            <>
              <Link to="/login" className="hover:text-primary">Login</Link>
              <Link to="/register" className="hover:text-primary">Register</Link>
            </>
          )}

          {user?.role === 'customer' && (
            <>
              <Link to="/vehicles" className="hover:text-primary">Vehicles</Link>
              <Link to="/orders" className="hover:text-primary">My Orders</Link>
              <Link to="/profile" className="hover:text-primary">Profile</Link>
              <button onClick={handleLogout} className="hover:text-primary">Logout</button>
            </>
          )}

          {user?.role === 'admin' && (
            <>
              <Link to="/admin/vehicles" className="hover:text-primary">Vehicles</Link>
              <Link to="/admin/orders" className="hover:text-primary">Approve Orders</Link>
              <Link to="/admin/users" className="hover:text-primary">Manage Users</Link>
              <Link to="/profile" className="hover:text-primary">Profile</Link>
              <button onClick={handleLogout} className="hover:text-primary">Logout</button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}