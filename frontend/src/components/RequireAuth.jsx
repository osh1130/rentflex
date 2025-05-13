import { useUser } from '../contexts/UserContext'
import { Navigate } from 'react-router-dom'

export default function RequireAuth({ children }) {
  const { user, loading } = useUser()
  if (loading) return null
  if (!user) return <Navigate to="/login" replace />
  return children
}
