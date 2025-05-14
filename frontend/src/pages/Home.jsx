import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/api';

export default function Home() {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    api.fetchVehicles().then(res => setVehicles(res.data));
  }, []);

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {vehicles.map(v => (
        <div key={v.id} className="bg-white rounded-lg shadow p-4 hover:shadow-md transition">
          <h3 className="text-xl font-bold text-green-700 mb-2">{v.name}</h3>
          <p className="text-gray-600">Type: {v.type}</p>
          <p className="text-gray-600 mb-3">Price: ${v.price}/day</p>
          <Link to={`/vehicle/${v.id}`} className="block text-center py-2 bg-green-600 text-white rounded hover:bg-green-700">Book Now</Link>
        </div>
      ))}
    </div>
  );
}
