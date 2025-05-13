export default function VehicleCard({ vehicle }) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="text-xl font-semibold mb-2">{vehicle.name}</h3>
      <p className="mb-1">Type: {vehicle.type}</p>
      <p className="mb-3">Price: ${vehicle.price}/day</p>
      <a
        href={`/booking/${vehicle.id}`}
        className="inline-block px-4 py-2 bg-primary text-white rounded hover:bg-opacity-90"
      >
        Book Now
      </a>
    </div>
  )
}