import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import AdminLayout from '../../components/layout/AdminLayout';
import { getAllBookings, approveBooking, rejectBooking } from '../../api/booking';
import Loader from '../../components/common/Loader';
import { formatDate, getDateRangeString } from '../../utils/date';

export default function ApproveOrders() {
  const { token, user, loading: authLoading } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true); // 本地数据加载
  const [error, setError] = useState(null);
  const [operationLoading, setOperationLoading] = useState(null);
  const [operationError, setOperationError] = useState(null);
  const [operationSuccess, setOperationSuccess] = useState(null);
  const [filter, setFilter] = useState('pending'); // 'all', 'pending', 'approved', 'rejected'

  useEffect(() => {
    if (!authLoading && token) {
      const fetchBookings = async () => {
        try {
          setLoading(true);
          setError(null);
          const data = await getAllBookings(token);
          setBookings(data);
        } catch (err) {
          setError(err.response?.data?.message || 'Failed to load bookings');
        } finally {
          setLoading(false);
        }
      };
      fetchBookings();
    }
  }, [token, authLoading]);

  useEffect(() => {
    if (operationSuccess || operationError) {
      const timer = setTimeout(() => {
        setOperationSuccess(null);
        setOperationError(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [operationSuccess, operationError]);

  const handleApprove = async (id) => {
    if (!window.confirm('Are you sure you want to approve this booking?')) return;
    setOperationLoading(id);
    setOperationError(null);
    try {
      await approveBooking(id, token);
      const data = await getAllBookings(token);
      setBookings(data);
      setOperationSuccess('Booking approved successfully');
    } catch (err) {
      try {
        const data = await getAllBookings(token);
        setBookings(data);
        setOperationSuccess('Booking approved successfully');
      } catch {
        setOperationError(err.response?.data?.message || 'Failed to approve booking');
      }
    } finally {
      setOperationLoading(null);
    }
  };

  const handleReject = async (id) => {
    if (!window.confirm('Are you sure you want to reject this booking?')) return;
    setOperationLoading(id);
    setOperationError(null);
    try {
      await rejectBooking(id, token);
      const data = await getAllBookings(token);
      setBookings(data);
      setOperationSuccess('Booking rejected successfully');
    } catch (err) {
      try {
        const data = await getAllBookings(token);
        setBookings(data);
        setOperationSuccess('Booking rejected successfully');
      } catch {
        setOperationError(err.response?.data?.message || 'Failed to reject booking');
      }
    } finally {
      setOperationLoading(null);
    }
  };

  const filteredBookings = bookings.filter(b => 
    filter === 'all' ? true : b.status === filter
  );

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center py-12">
          <Loader size="lg" />
        </div>
      );
    }

    if (error) {
      return (
        <div className="p-4 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      );
    }

    if (filteredBookings.length === 0) {
      return (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <p className="text-gray-600">
            {filter === 'pending' 
              ? 'No pending bookings to approve.'
              : 'No bookings found.'}
          </p>
        </div>
      );
    }

    return (
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Booking Info</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicle</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredBookings.map(b => (
                <tr key={b.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <div className="font-medium text-gray-900">#{b.id}</div>
                      <div className="text-gray-500">
                        {getDateRangeString(b.start_date, b.end_date)}
                      </div>
                      <div className="font-medium text-green-600">
                        ${b.total_fee}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <img
                          className="h-10 w-10 rounded object-cover"
                          src={b.vehicle?.image_url || 'https://via.placeholder.com/100?text=Car'}
                          alt={`${b.vehicle?.make || ''} ${b.vehicle?.model || ''}`}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="font-medium text-gray-900">{b.vehicle ? `${b.vehicle.make} ${b.vehicle.model} ${b.vehicle.year}` : '--'}</div>
                        {/* 可加其它字段 */}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <div className="font-medium text-gray-900">{b.user?.name || '--'}</div>
                      <div className="text-gray-500">{b.user?.email || '--'}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${b.status === 'approved' ? 'bg-green-100 text-green-800' :
                        b.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'}`}
                    >
                      {b.status.charAt(0).toUpperCase() + b.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium space-x-2">
                    {b.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleApprove(b.id)}
                          disabled={operationLoading !== null}
                          className={`text-green-600 hover:text-green-900 ${
                            operationLoading !== null && 'opacity-50 cursor-not-allowed'
                          }`}
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(b.id)}
                          disabled={operationLoading !== null}
                          className={`text-red-600 hover:text-red-900 ${
                            operationLoading !== null && 'opacity-50 cursor-not-allowed'
                          }`}
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <AdminLayout>
      <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
        <h1 className="text-2xl font-bold text-gray-900">Manage Bookings</h1>
        <div className="flex space-x-2">
          {['all', 'pending', 'approved', 'rejected'].map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-3 py-1 rounded-lg text-sm font-medium ${
                filter === status
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {status === 'approved' ? 'Approved' : status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {operationSuccess && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">
          {operationSuccess}
        </div>
      )}
      {operationError && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
          {operationError}
        </div>
      )}

      {renderContent()}
    </AdminLayout>
  );
}
