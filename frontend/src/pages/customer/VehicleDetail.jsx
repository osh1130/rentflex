import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/api';
import Button from '../../components/common/Button';
import Loader from '../../components/common/Loader';
import MainLayout from '../../components/layout/MainLayout';
import DatePicker from '../../components/booking/DatePicker';

const EXTRAS = [
  { id: 1, name: 'GPS Navigation', description: 'High-precision GPS device', fee: 10, active: true },
  { id: 2, name: 'Child Seat', description: 'Safe child seat', fee: 15, active: true },
  { id: 3, name: 'Extra Insurance', description: 'Full insurance coverage', fee: 20, active: true },
  // ...add more if needed
];

export default function VehicleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [extras, setExtras] = useState([]);
  const [dates, setDates] = useState({ start: '', end: '' });
  const [priceDetail, setPriceDetail] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    async function fetchVehicle() {
      try {
        setLoading(true);
        const res = await api.get(`/vehicles/${id}`);
        setVehicle(res.data);
      } catch (err) {
        setError('Failed to fetch vehicle info');
      } finally {
        setLoading(false);
      }
    }
    fetchVehicle();
  }, [id]);

  useEffect(() => {
    if (!dates.start || !dates.end) return;
    async function calc() {
      try {
        const res = await api.post('/bookings/calculate', {
          vehicle_id: Number(id),
          start_date: dates.start,
          end_date: dates.end,
          extras: extras,
        });
        setPriceDetail(res.data);
      } catch (err) {
        setPriceDetail(null);
      }
    }
    calc();
  }, [dates, extras, id]);

  const handleOrder = async () => {
    setSubmitting(true);
    setError('');
    setSuccess(false);
    try {
      await api.post('/bookings', {
        vehicle_id: Number(id),
        start_date: dates.start,
        end_date: dates.end,
        extras: extras,
      });
      setSuccess(true);
      setTimeout(() => navigate('/vehicles'), 2000);
    } catch (err) {
      setError('Order failed, please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Loader />;
  if (!vehicle) return <div className="p-8 text-center text-red-500">{error || 'Vehicle not found'}</div>;

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow">
        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={vehicle.image_url || 'https://via.placeholder.com/400x225?text=No+Image'}
            alt={`${vehicle.make} ${vehicle.model}`}
            className="w-full md:w-1/2 rounded object-cover"
          />
          <div className="flex-1 space-y-2">
            <h2 className="text-2xl font-bold">{vehicle.make} {vehicle.model} {vehicle.year}</h2>
            <div className="text-gray-600">Seats: {vehicle.seats}</div>
            <div className="text-gray-600">Mileage: {vehicle.mileage} km</div>
            <div className="text-gray-600">Available now: {vehicle.available_now ? 'Yes' : 'No'}</div>
            <div className="text-gray-600">Rental period: {vehicle.minimum_rent_period}~{vehicle.maximum_rent_period} days</div>
            <div className="text-green-600 font-bold text-xl mt-2">${vehicle.price_per_day}/day</div>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="font-semibold mb-2">Select rental period</h3>
          <DatePicker
            startDate={dates.start}
            endDate={dates.end}
            onStartDateChange={start => setDates(prev => ({ ...prev, start }))}
            onEndDateChange={end => setDates(prev => ({ ...prev, end }))}
          />
        </div>

        <div className="mt-6">
          <h3 className="font-semibold mb-2">Extras</h3>
          <div className="flex flex-wrap gap-4">
            {EXTRAS.filter(e => e.active).map(extra => (
              <label key={extra.id} className="flex items-center space-x-2 border rounded px-3 py-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={extras.includes(extra.id)}
                  onChange={e => {
                    setExtras(prev =>
                      e.target.checked
                        ? [...prev, extra.id]
                        : prev.filter(id => id !== extra.id)
                    );
                  }}
                />
                <span className="font-medium">{extra.name}</span>
                <span className="text-gray-500 text-sm">+${extra.fee}/day</span>
                <span className="text-gray-400 text-xs">{extra.description}</span>
              </label>
            ))}
          </div>
        </div>

        {priceDetail && (
          <div className="mt-6 bg-gray-50 p-4 rounded">
            <h4 className="font-semibold mb-2">Price Details</h4>
            <div className="text-lg font-bold text-green-700 mt-2">Total: ${priceDetail.total_fee}</div>
          </div>
        )}

        {success && <div className="text-green-600 mt-4">Order placed successfully! Redirecting...</div>}
        {error && <div className="text-red-500 mt-4">{error}</div>}

        <Button
          className="mt-8 w-full"
          loading={submitting}
          disabled={!dates.start || !dates.end || !vehicle.available_now}
          onClick={handleOrder}
        >
          Place Order
        </Button>
      </div>
    </MainLayout>
  );
}
