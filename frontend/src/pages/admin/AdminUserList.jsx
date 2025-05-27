import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../contexts/UserContext';
import AdminLayout from '../../components/layout/AdminLayout';
import {
  getAllUsers,
  blockUser,
  resetPassword
} from '../../api/user';
import Loader from '../../components/common/Loader';

export default function AdminUserList() {
  const { token } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [operationLoading, setOperationLoading] = useState(null);
  const [operationError, setOperationError] = useState(null);
  const [operationSuccess, setOperationSuccess] = useState(null);
  const [tempPassword, setTempPassword] = useState(null);
  const [filter, setFilter] = useState('all'); // 'all', 'active', 'blocked'

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        const list = await getAllUsers(token);
        setUsers(list);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load users');
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchUsers();
    }
  }, [token]);

  useEffect(() => {
    if (operationSuccess || operationError) {
      const timer = setTimeout(() => {
        setOperationSuccess(null);
        setOperationError(null);
        setTempPassword(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [operationSuccess, operationError]);

  const handleBlock = async (id) => {
    if (!window.confirm('Are you sure you want to block this user?')) return;

    setOperationLoading(id);
    setOperationError(null);
    try {
      await blockUser(id, token);
      setUsers(us => us.map(u => u.id === id ? { ...u, blocked: true } : u));
      setOperationSuccess('User blocked successfully');
    } catch (err) {
      setOperationError(err.response?.data?.message || 'Failed to block user');
    } finally {
      setOperationLoading(null);
    }
  };
  
  const handleReset = async (id) => {
    if (!window.confirm('Are you sure you want to reset this user\'s password?')) return;

    setOperationLoading(id);
    setOperationError(null);
    setTempPassword(null);
    try {
      const res = await resetPassword(id, token);
      setUsers(us => us.map(u => u.id === id ? { ...u, passwordReset: true } : u));
      setOperationSuccess('Password reset successfully');
      setTempPassword(res.tempPassword);
    } catch (err) {
      setOperationError(err.response?.data?.message || 'Failed to reset password');
    } finally {
      setOperationLoading(null);
    }
  };

  const filteredUsers = users.filter(u => {
    if (filter === 'all') return true;
    if (filter === 'blocked') return u.blocked;
    return !u.blocked; // active
  });

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

    if (filteredUsers.length === 0) {
      return (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <p className="text-gray-600">No users found.</p>
        </div>
      );
    }

    return (
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.map(u => (
                <tr key={u.id} className={`hover:bg-gray-50 ${u.blocked ? 'bg-gray-50' : ''}`}>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-medium">
                        {u.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="ml-4">
                        <div className="font-medium text-gray-900">{u.name}</div>
                        <div className="text-sm text-gray-500">{u.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${u.role === 'admin' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}
                    >
                      {u.role.charAt(0).toUpperCase() + u.role.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${u.blocked ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}
                    >
                      {u.blocked ? 'Blocked' : 'Active'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium space-x-2">
                    {u.role !== 'admin' && (
                      <>
                        <button
                          onClick={() => handleBlock(u.id)}
                          disabled={u.blocked || operationLoading !== null}
                          className={`text-red-600 hover:text-red-900 ${
                            (u.blocked || operationLoading !== null) && 'opacity-50 cursor-not-allowed'
                          }`}
                        >
                          Block
                        </button>
                        <button
                          onClick={() => handleReset(u.id)}
                          disabled={operationLoading !== null}
                          className={`text-yellow-600 hover:text-yellow-900 ${
                            operationLoading !== null && 'opacity-50 cursor-not-allowed'
                          }`}
                        >
                          Reset PW
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
        <h1 className="text-2xl font-bold text-gray-900">Manage Users</h1>
        <div className="flex space-x-2">
          {['all', 'active', 'blocked'].map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-3 py-1 rounded-lg text-sm font-medium ${
                filter === status
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {operationSuccess && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">
          {operationSuccess}
          {tempPassword && (
            <div className="mt-2 p-2 bg-yellow-50 rounded border border-yellow-200">
              <strong>Temporary Password:</strong> {tempPassword}
              <div className="text-sm text-yellow-700 mt-1">
                Please securely share this password with the user.
              </div>
            </div>
          )}
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