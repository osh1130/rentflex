<<<<<<< HEAD
import React from 'react'
import { Link } from 'react-router-dom'
=======
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/api';
>>>>>>> 28f00b8c764713a3f85a902a43d072ace3078ce0

export default function Home() {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    api.fetchVehicles().then(res => setVehicles(res.data));
  }, []);

  return (
<<<<<<< HEAD
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-primary mb-4">Welcome to RentFlex</h1>
      <p className="text-lg mb-6 text-center">Your one-stop car rental solution.</p>
      <Link to="/vehicles" className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
        Browse Vehicles
      </Link>
=======
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {vehicles.map(v => (
        <div key={v.id} className="bg-white rounded-lg shadow p-4 hover:shadow-md transition">
          <h3 className="text-xl font-bold text-green-700 mb-2">{v.name}</h3>
          <p className="text-gray-600">Type: {v.type}</p>
          <p className="text-gray-600 mb-3">Price: ${v.price}/day</p>
          <Link to={`/vehicle/${v.id}`} className="block text-center py-2 bg-green-600 text-white rounded hover:bg-green-700">Book Now</Link>
        </div>
      ))}
>>>>>>> 28f00b8c764713a3f85a902a43d072ace3078ce0
    </div>
  );
}
