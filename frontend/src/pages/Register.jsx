import { useState } from 'react'
import api from '../api/api'
import { useNavigate } from 'react-router-dom'

export default function Register() {
  const [email, setEmail] = useState('')  
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()
    await api.post('/register', { email, password })
    navigate('/login')
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-semibold text-primary mb-4">Register</h2>
      <input
        type="email" placeholder="Email" value={email}
        onChange={e => setEmail(e.target.value)}
        className="w-full mb-3 p-2 border rounded"
      />
      <input
        type="password" placeholder="Password" value={password}
        onChange={e => setPassword(e.target.value)}
        className="w-full mb-4 p-2 border rounded"
      />
      <button type="submit" className="w-full py-2 bg-primary text-white rounded">Register</button>
    </form>
  )
}