import React, { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'

export default function Profile() {
  const { user } = useContext(AuthContext)

  if (!user) {
    return <p className="p-4 text-gray-500">Loading user info...</p>
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold text-primary mb-4">Profile</h2>
      <p><span className="font-medium">Name:</span> {user.name}</p>
      <p><span className="font-medium">Email:</span> {user.email}</p>
    </div>
  )
}
