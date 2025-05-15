import React from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { bookVehicle } from '../../api/booking'

export default function Booking() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { state } = useLocation()
  const { startDate, endDate, price, name } = state || {}

  const handleBook = async () => {
    try {
      const token = localStorage.getItem('token')
      await bookVehicle(id, { startDate, endDate }, token)
      alert('Booking successful!')
      navigate('/orders')
    } catch {
      alert('Booking failed. Please try again.')
    }
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-semibold text-primary mb-4">Confirm Booking</h2>

      <div className="mb-4 space-y-2">
        <p><span className="font-medium">Vehicle:</span> {name}</p>
        <p><span className="font-medium">Start Date:</span> {startDate}</p>
        <p><span className="font-medium">End Date:</span> {endDate}</p>
        <p><span className="font-medium">Price:</span> ${price}/day</p>
        <p><span className="font-medium">Total:</span> ${price * ((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24))}</p>
      </div>

      <button
        onClick={handleBook}
        className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
      >
        Confirm Booking
      </button>
    </div>
  )
}
