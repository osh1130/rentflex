import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link to="/" className="text-2xl font-bold text-primary">RentFlex</Link>
        <div className="space-x-4">
          <Link to="/vehicles" className="hover:text-primary">Vehicles</Link>
          <Link to="/orders" className="hover:text-primary">My Orders</Link>
          <Link to="/profile" className="hover:text-primary">Profile</Link>
          <Link to="/admin" className="hover:text-primary">Admin</Link>
        </div>
      </div>
    </nav>
  )
}