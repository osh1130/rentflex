export default function AdminPanel() {
  const { user } = useContext(UserContext)
  const [vehicles, setVehicles] = useState([])
  const [bookings, setBookings] = useState([])

  useEffect(() => {
    const token = localStorage.getItem('token')
    getAllVehicles(token).then(setVehicles)
    getAllBookings(token).then(setBookings)
  }, [])

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold text-primary mb-4">Admin Panel</h2>
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Manage Vehicles</h3>
        {/* Link to add vehicle or list vehicles with edit/delete buttons */}
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2">Approve Orders</h3>
        {/* List bookings with approve/reject buttons styled with bg-green-600 / bg-red-600 */}
      </div>
    </div>
  )
}