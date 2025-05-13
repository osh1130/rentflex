import { useEffect, useState } from 'react'
import api from '../api/api'
import Loader from '../components/Loader'

export default function Orders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/orders').then(res => {
      setOrders(res.data)
      setLoading(false)
    })
  }, [])

  if (loading) return <Loader />
  return (
    <div>
      <h2 className="text-2xl font-semibold text-primary mb-4">My Orders</h2>
      <ul className="space-y-3">
        {orders.map(o => (
          <li key={o.id} className="bg-white p-4 rounded shadow">
            <p>Vehicle: {o.vehicleName}</p>
            <p>Date: {o.date}</p>
            <p>Status: {o.status}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}