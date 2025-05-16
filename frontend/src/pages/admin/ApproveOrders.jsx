import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import { getAllBookings, approveBooking, rejectBooking } from '../../api/booking';

export default function ApproveOrders() {
  const { user, token } = useContext(UserContext);
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    (async () => {
      try {
        const data = await getAllBookings(token);
        setBookings(data);
      } catch {
        setError('Failed to load bookings');
      } finally {
        setLoading(false);
      }
    })();
  }, [token]);

  const handleApprove = async id => {
    await approveBooking(id, token);
    setBookings(bs => bs.filter(b => b.id !== id));
  };
  const handleReject = async id => {
    await rejectBooking(id, token);
    setBookings(bs => bs.filter(b => b.id !== id));
  };

  if (loading) return <p>Loading bookings...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Admin: Approve Orders</h2>
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr>
            {['ID','User','Vehicle','From','To','Status','Actions'].map(th=>(<th key={th} className="border px-2 py-1">{th}</th>))}
          </tr>
        </thead>
        <tbody>
          {bookings.map(b=>(
            <tr key={b.id}>
              <td className="border px-2 py-1">{b.id}</td>
              <td className="border px-2 py-1">{b.user.name}</td>
              <td className="border px-2 py-1">{b.vehicle.name}</td>
              <td className="border px-2 py-1">{b.startDate}</td>
              <td className="border px-2 py-1">{b.endDate}</td>
              <td className="border px-2 py-1">{b.status}</td>
              <td className="border px-2 py-1 space-x-2">
                <button onClick={()=>handleApprove(b.id)} className="px-2 py-1 bg-green-600 text-white rounded">Approve</button>
                <button onClick={()=>handleReject(b.id)} className="px-2 py-1 bg-red-600 text-white rounded">Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
