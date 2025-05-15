import React from 'react'

export default function VehicleCard({ vehicle, onBook, onEdit, onDelete, userRole }) {
  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-md transition">
      <h3 className="text-xl font-semibold mb-2">{vehicle.name}</h3>
      <p className="mb-1"><span className="font-medium">Type:</span> {vehicle.type}</p>
      <p className="mb-1"><span className="font-medium">Price:</span> ${vehicle.price}/day</p>
      {vehicle.available ? (
        <p className="text-green-600 font-medium">Available</p>
      ) : (
        <p className="text-red-600 font-medium">Unavailable</p>
      )}

      <div className="mt-4 space-x-2">
        {userRole === 'customer' && vehicle.available && (
          <button onClick={() => onBook(vehicle.id)} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
            Book
          </button>
        )}
        {userRole === 'admin' && (
          <>
            <button onClick={() => onEdit(vehicle.id)} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Edit
            </button>
            <button onClick={() => onDelete(vehicle.id)} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  )
}
