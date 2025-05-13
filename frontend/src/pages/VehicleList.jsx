import { useEffect, useState } from 'react'
import api from '../api/api'
import VehicleCard from '../components/VehicleCard'
import Loader from '../components/Loader'

export default function VehicleList() {
  const [vehicles, setVehicles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/vehicles').then(res => {
      setVehicles(res.data)
      setLoading(false)
    })
  }, [])

  if (loading) return <Loader />
  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
      {vehicles.map(v => <VehicleCard key={v.id} vehicle={v} />)}
    </div>
  )
}