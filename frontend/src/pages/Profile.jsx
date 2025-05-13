import { useEffect, useState } from 'react'
import api from '../api/api'
import Loader from '../components/Loader'

export default function Profile() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    api.get('/me').then(res => setUser(res.data))
  }, [])

  if (!user) return <Loader />
  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-semibold text-primary mb-4">Profile</h2>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Name:</strong> {user.name}</p>
    </div>
  )
}