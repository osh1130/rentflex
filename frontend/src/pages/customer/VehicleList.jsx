import React, { useState, useEffect } from 'react'
import { getAvailableVehicles } from '../../api/vehicle'
import VehicleCard from '../../components/vehicle/VehicleCard'
import DatePicker from '../../components/booking/DatePicker'
import Loader from '../../components/common/Loader'
import MainLayout from '../../components/layout/MainLayout'
import { validateDates } from '../../utils/validation'
import { formatDate } from '../../utils/date'

const VehicleListPage = () => {
  const [vehicles, setVehicles] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [dateError, setDateError] = useState('')
  const [dates, setDates] = useState({
    startDate: formatDate(new Date()),
    endDate: formatDate(new Date(Date.now() + 24 * 60 * 60 * 1000)) // tomorrow
  })

  const fetchVehicles = async () => {
    const dateValidation = validateDates(dates.startDate, dates.endDate)
    if (dateValidation) {
      setDateError(dateValidation)
      return
    }

    setLoading(true)
    setError('')
    setDateError('')

    try {
      const data = await getAvailableVehicles(dates.startDate, dates.endDate)
      setVehicles(data)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch vehicles')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchVehicles()
  }, [dates.startDate, dates.endDate])

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Available Vehicles
          </h1>
          
          <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
            <DatePicker
              startDate={dates.startDate}
              endDate={dates.endDate}
              onStartDateChange={(date) => setDates(prev => ({ ...prev, startDate: date }))}
              onEndDateChange={(date) => setDates(prev => ({ ...prev, endDate: date }))}
              error={dateError}
            />
          </div>

          {error && (
            <div className="bg-red-50 text-red-500 p-4 rounded-md mb-6">
              {error}
            </div>
          )}
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader size="lg" />
          </div>
        ) : vehicles.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {vehicles.map((vehicle) => (
              <VehicleCard
                key={vehicle.id}
                {...vehicle}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No vehicles available
            </h3>
            <p className="text-gray-500">
              Try different dates or check back later.
            </p>
          </div>
        )}
      </div>
    </MainLayout>
  )
}

export default VehicleListPage
