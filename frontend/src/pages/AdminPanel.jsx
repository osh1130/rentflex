import { useEffect, useState } from 'react'
import api from '../api/api'
import Loader from '../components/Loader'

export default function AdminPanel() {
  const [vehicles, setVehicles] = useState([])
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    const [vRes, oRes] = await Promise.all([api.get('/admin/vehicles'), api.get('/admin/orders')])
    setVehicles(vRes.data)
    setOrders(oRes.data)
    setLoading(false)
  }

  useEffect(() => { fetchData() }, [])

  if (loading) return <Loader />
  return (
    <div className="space-y-8">
      <section>
        <h3 className="text-xl font-semibold text-primary mb-4">Manage Vehicles</h3>
        <button className="mb-4 px-4 py-2 bg-primary text-white rounded">Add Vehicle</button>
        <ul className="space-y-2">
          {vehicles.map(v => (
            <li key={v.id} className="p-3 bg-white rounded shadow">
              {v.name} - {v.type} - ${v.price}
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h3 className="text-xl font-semibold text-primary mb-4">Manage Orders</h3>
        <ul className="space-y-2">
          {orders.map(o => (
            <li key={o.id} className="p-3 bg-white rounded shadow flex justify-between">
              <span>{o.vehicleName} - {o.date}</span>
              <button className="px-3 py-1 bg-primary text-white rounded">Approve</button>
            </li>
          ))}
        </ul>
      </section>
    </div>
)
}