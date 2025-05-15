import React, { useState, useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'
import { getAvailableVehicles } from '../../api/vehicle'
import VehicleCard from '../../components/VehicleCard'
import { useNavigate } from 'react-router-dom'


export default function VehicleList() {
  const { user } = useContext(UserContext)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [vehicles, setVehicles] = useState([])
  const navigate = useNavigate()


  const handleSearch = async () => {
    if (!startDate || !endDate) return alert('Please select both start and end dates')
    try {
      const result = await getAvailableVehicles(startDate, endDate)
      setVehicles(result)
    } catch (err) {
      alert('Failed to fetch vehicles')
    }
  }

 const handleBook = (vehicle) => {
  navigate(`/booking/${vehicle.id}`, {
    state: {
      startDate,
      endDate,
      price: vehicle.price,
      name: vehicle.name
    }
  })
}


  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-semibold text-primary mb-4">Find Your Vehicle</h2>

      {/* 日期选择区 */}
      <div className="flex gap-4 mb-4">
        <div className="flex flex-col">
          <label className="mb-1 font-medium">Start Date</label>
          <input
            type="date"
            className="border rounded px-3 py-2"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 font-medium">End Date</label>
          <input
            type="date"
            className="border rounded px-3 py-2"
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
          />
        </div>
        <button
          onClick={handleSearch}
          className="self-end px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          Search
        </button>
      </div>

      {/* 车辆展示区 */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        {vehicles.map(vehicle => (
          <VehicleCard
            key={vehicle.id}
            vehicle={vehicle}
            userRole={user?.role}
            onBook={()=>handleBook(vehicle)}
            onEdit={id => console.log('Edit', id)}
            onDelete={id => console.log('Delete', id)}
          />
        ))}
      </div>
    </div>
  )
}
