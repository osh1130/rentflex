import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getVehicleById } from '../../api/vehicle';
import { calculateBookingFee } from '../../api/booking';
import DatePicker from '../../components/booking/DatePicker';
import ServiceSelector from '../../components/booking/ServiceSelector';
import Button from '../../components/common/Button';
import Loader from '../../components/common/Loader';
import MainLayout from '../../components/layout/MainLayout';
import { validateDates } from '../../utils/validation';
import { formatDate, calculateDays } from '../../utils/date';

const VehicleDetailPage = () => {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedServices, setSelectedServices] = useState([]);
  const [bookingDetails, setBookingDetails] = useState({
    startDate: formatDate(new Date()),
    endDate: formatDate(new Date(Date.now() + 24 * 60 * 60 * 1000)),
    totalPrice: 0
  });
  const [dateError, setDateError] = useState('');
  const [calculating, setCalculating] = useState(false);

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const data = await getVehicleById(id);
        setVehicle(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch vehicle details');
      } finally {
        setLoading(false);
      }
    };

    fetchVehicle();
  }, [id]);

  useEffect(() => {
    const calculatePrice = async () => {
      const dateValidation = validateDates(bookingDetails.startDate, bookingDetails.endDate);
      if (dateValidation) {
        setDateError(dateValidation);
        return;
      }

      setCalculating(true);
      try {
        const data = await calculateBookingFee({
          vehicleId: id,
          startDate: bookingDetails.startDate,
          endDate: bookingDetails.endDate,
          services: selectedServices
        });
        setBookingDetails(prev => ({
          ...prev,
          totalPrice: data.totalPrice
        }));
        setDateError('');
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to calculate price');
      } finally {
        setCalculating(false);
      }
    };

    if (vehicle) {
      calculatePrice();
    }
  }, [id, bookingDetails.startDate, bookingDetails.endDate, selectedServices]);

  if (loading) {
    return (
      <MainLayout>
        <div className="flex justify-center py-12">
          <Loader size="lg" />
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-red-50 text-red-500 p-4 rounded-md">
            {error}
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8">
          {/* Vehicle Image and Details */}
          <div>
            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
              <img
                src={vehicle.image || 'https://via.placeholder.com/800x450?text=No+Image'}
                alt={vehicle.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="mt-6">
              <h1 className="text-3xl font-bold text-gray-900">{vehicle.name}</h1>
              <div className="mt-4 space-y-4">
                <div className="flex items-center text-gray-500">
                  <span className="mr-4">
                    <i className="fas fa-car mr-1"></i> {vehicle.type}
                  </span>
                  <span className="mr-4">
                    <i className="fas fa-users mr-1"></i> {vehicle.seats} seats
                  </span>
                  <span>
                    <i className="fas fa-cog mr-1"></i> {vehicle.transmission}
                  </span>
                </div>
                <p className="text-gray-600">{vehicle.description}</p>
                <p className="text-2xl font-bold text-green-600">
                  ${vehicle.price}/day
                </p>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="mt-8 lg:mt-0">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Book this vehicle
              </h2>

              <div className="space-y-6">
                <DatePicker
                  startDate={bookingDetails.startDate}
                  endDate={bookingDetails.endDate}
                  onStartDateChange={(date) => setBookingDetails(prev => ({ ...prev, startDate: date }))}
                  onEndDateChange={(date) => setBookingDetails(prev => ({ ...prev, endDate: date }))}
                  error={dateError}
                />

                <ServiceSelector
                  selectedServices={selectedServices}
                  onServiceToggle={(serviceId) => {
                    setSelectedServices(prev =>
                      prev.includes(serviceId)
                        ? prev.filter(id => id !== serviceId)
                        : [...prev, serviceId]
                    );
                  }}
                />

                <div className="border-t pt-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Daily Rate</span>
                    <span className="font-medium">${vehicle.price}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Duration</span>
                    <span className="font-medium">
                      {calculateDays(bookingDetails.startDate, bookingDetails.endDate)} days
                    </span>
                  </div>
                  {selectedServices.length > 0 && (
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Additional Services</span>
                      <span className="font-medium">
                        ${bookingDetails.totalPrice - (vehicle.price * calculateDays(bookingDetails.startDate, bookingDetails.endDate))}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between items-center border-t pt-4 mt-4">
                    <span className="text-lg font-bold">Total Price</span>
                    <span className="text-2xl font-bold text-green-600">
                      ${calculating ? '...' : bookingDetails.totalPrice}
                    </span>
                  </div>
                </div>

                <Button
                  className="w-full"
                  disabled={calculating || !!dateError}
                >
                  Book Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default VehicleDetailPage;
