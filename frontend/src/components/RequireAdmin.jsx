import { useUser } from '../contexts/UserContext'
import { Navigate } from 'react-router-dom'

export default function RequireAdmin({ children }) {
  const { user, loading } = useUser()
  if (loading) return null
  if (user?.role !== 'admin') return <Navigate to="/" replace />
  return children
}
