import React, { useEffect, useState, useContext } from 'react'
import { getMyBookings, cancelBooking } from '../../api/booking'
import { UserContext } from '../../contexts/UserContext'

export default function Orders() {
  const [orders, setOrders] = useState([])
  const { token } = useContext(UserContext)

  useEffect(() => {
    getMyBookings(token).then(setOrders)
  }, [token])

  const handleCancel = async (id) => {
    await cancelBooking(id, token)
    setOrders(orders.filter(o => o.id !== id))
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold text-primary mb-4">My Orders</h2>
      <ul className="space-y-2">
        {orders.map(o => (
          <li key={o.id} className="p-4 border rounded-lg flex justify-between items-center">
            <div>
              <p><span className="font-medium">Vehicle:</span> {o.vehicleName}</p>
              <p><span className="font-medium">Date:</span> {o.startDate} to {o.endDate}</p>
              <p><span className="font-medium">Status:</span> {o.status}</p>
            </div>
            {o.status === 'pending' && (
              <button
                onClick={() => handleCancel(o.id)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Cancel
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
