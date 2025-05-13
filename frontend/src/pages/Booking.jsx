import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import api from '../api/api'
import Loader from '../components/Loader'

export default function Booking() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [vehicle, setVehicle] = useState(null)
  const [date, setDate] = useState('')

  useEffect(() => {
    api.get(`/vehicles/${id}`).then(res => setVehicle(res.data))
  }, [id])

  const handleBook = async () => {
    await api.post('/bookings', { vehicleId: id, date })
    navigate('/orders')
  }

  if (!vehicle) return <Loader />
  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-semibold text-primary mb-4">Booking: {vehicle.name}</h2>
      <label className="block mb-2">Select Date:</label>
      <input type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full mb-4 p-2 border rounded" />
      <button onClick={handleBook} className="w-full py-2 bg-primary text-white rounded">Confirm Booking</button>
    </div>
  )
}