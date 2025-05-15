import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-primary mb-4">Welcome to RentFlex</h1>
      <p className="text-lg mb-6 text-center">Your one-stop car rental solution.</p>
      <Link to="/vehicles" className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
        Browse Vehicles
      </Link>
    </div>
  )
}