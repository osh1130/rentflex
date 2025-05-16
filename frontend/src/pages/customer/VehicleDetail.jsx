import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api/api';
import BookingDatePicker from '../../components/BookingDatePicker';
import { UserContext } from '../../contexts/UserContext';

export default function VehicleDetail() {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const [date, setDate] = useState(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    api.fetchVehicle(id).then(res => setVehicle(res.data));
  }, [id]);

  const handleBook = () => {
    if (!user) return alert('Please login first');
    api.createOrder(user.email, vehicle.id, date.toISOString().split('T')[0])
      .then(() => alert('Booking submitted'));
  };

  if (!vehicle) return <div className="p-6">Loading...</div>;

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold text-green-700 mb-4">{vehicle.name}</h2>
      <p className="text-gray-700 mb-2">{vehicle.description}</p>
      <p className="text-gray-600 mb-2">Type: {vehicle.type}</p>
      <p className="text-gray-600 mb-4">Price: ${vehicle.price}/day</p>
      <BookingDatePicker onSelect={setDate} />
      <button onClick={handleBook} disabled={!date}
        className="mt-4 w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed">
        Confirm Booking
      </button>
    </div>
  );
}
