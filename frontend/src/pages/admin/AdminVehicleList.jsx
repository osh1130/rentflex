import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import AdminLayout from '../../components/layout/AdminLayout';
import {
  getAllVehicles,
  createVehicle,
  updateVehicle,
  deleteVehicle
} from '../../api/vehicle';
import Loader from '../../components/common/Loader';

export default function AdminVehicleList() {
  const { token } = useContext(AuthContext);

  // Data states
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [operationLoading, setOperationLoading] = useState(false);
  const [operationError, setOperationError] = useState(null);
  const [operationSuccess, setOperationSuccess] = useState(null);

  // Modal & form states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: '',
    mileage: '',
    minimum_rent_period: '',
    maximum_rent_period: '',
    seats: '',
    price_per_day: '',
    image_url: '',
    available_now: true,
  });

  // Fetch all vehicles
  useEffect(() => {
    if (!token) return;
    async function fetchVehicles() {
      try {
        setLoading(true);
        setError(null);
        const data = await getAllVehicles(token);
        setVehicles(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load vehicles');
      } finally {
        setLoading(false);
      }
    }
    fetchVehicles();
  }, [token]);

  // Clear operation states after 3 seconds
  useEffect(() => {
    if (operationSuccess || operationError) {
      const timer = setTimeout(() => {
        setOperationSuccess(null);
        setOperationError(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [operationSuccess, operationError]);

  const openAddModal = () => {
    setEditingVehicle(null);
    setFormData({
      make: '',
      model: '',
      year: '',
      mileage: '',
      minimum_rent_period: '',
      maximum_rent_period: '',
      seats: '',
      price_per_day: '',
      image_url: '',
      available_now: true
    });
    setOperationError(null);
    setIsModalOpen(true);
  };

  const openEditModal = vehicle => {
    setEditingVehicle(vehicle);
    setFormData({
      make: vehicle.make || '',
      model: vehicle.model || '',
      year: vehicle.year || '',
      mileage: vehicle.mileage || '',
      minimum_rent_period: vehicle.minimum_rent_period || '',
      maximum_rent_period: vehicle.maximum_rent_period || '',
      seats: vehicle.seats || '',
      price_per_day: vehicle.price_per_day || '',
      image_url: vehicle.image_url || '',
      available_now: vehicle.available_now ?? true
    });
    setOperationError(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingVehicle(null);
    setOperationError(null);
  };

  const handleFormChange = e => {
    const { name, value, type: inputType, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: inputType === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setOperationLoading(true);
    setOperationError(null);
    
    try {
      if (editingVehicle) {
        const updated = await updateVehicle(editingVehicle.id, formData, token);
        setVehicles(vs => vs.map(v => (v.id === updated.id ? updated : v)));
        setOperationSuccess('Vehicle updated successfully');
      } else {
        const created = await createVehicle(formData, token);
        setVehicles(vs => [...vs, created]);
        setOperationSuccess('Vehicle created successfully');
      }
      closeModal();
    } catch (err) {
      setOperationError(err.response?.data?.message || 'Operation failed');
    } finally {
      setOperationLoading(false);
    }
  };

  const handleDelete = async id => {
    if (!window.confirm('Are you sure you want to delete this vehicle?')) return;
    
    setOperationLoading(true);
    setOperationError(null);
    
    try {
      await deleteVehicle(id, token);
      setVehicles(vs => vs.filter(v => v.id !== id));
      setOperationSuccess('Vehicle deleted successfully');
    } catch (err) {
      setOperationError(err.response?.data?.message || 'Delete failed');
    } finally {
      setOperationLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-4">
        <h2 className="text-2xl font-semibold mb-4">Admin: Manage Vehicles</h2>
        <div className="text-center py-8">
          <p className="text-gray-600">Loading vehicles...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <h2 className="text-2xl font-semibold mb-4">Admin: Manage Vehicles</h2>
        <div className="p-4 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Admin: Manage Vehicles</h2>

      {/* Operation feedback messages */}
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

      <button
        onClick={openAddModal}
        disabled={operationLoading}
        className={`mb-4 px-4 py-2 text-white rounded ${
          operationLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {operationLoading ? 'Processing...' : 'Add Vehicle'}
      </button>

      {vehicles.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600">No vehicles available. Add one to get started.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2 text-left">ID</th>
                <th className="border px-4 py-2 text-left">Name</th>
                <th className="border px-4 py-2 text-left">Min~Max Rent (days)</th>
                <th className="border px-4 py-2 text-left">Price</th>
                <th className="border px-4 py-2 text-left">Available</th>
                <th className="border px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map(v => (
                <tr key={v.id} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{v.id}</td>
                  <td className="border px-4 py-2">{`${v.make || ''} ${v.model || ''} ${v.year || ''}`.trim()}</td>
                  <td className="border px-4 py-2">{v.minimum_rent_period ?? '--'} ~ {v.maximum_rent_period ?? '--'}</td>
                  <td className="border px-4 py-2">${v.price_per_day != null ? v.price_per_day : '--'}</td>
                  <td className="border px-4 py-2">
                    <span className={v.available_now ? 'text-green-600' : 'text-red-600'}>
                      {v.available_now ? 'Yes' : 'No'}
                    </span>
                  </td>
                  <td className="border px-4 py-2 space-x-2">
                    <button
                      onClick={() => openEditModal(v)}
                      disabled={operationLoading}
                      className={`px-3 py-1 text-white rounded ${
                        operationLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-yellow-500 hover:bg-yellow-600'
                      }`}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(v.id)}
                      disabled={operationLoading}
                      className={`px-3 py-1 text-white rounded ${
                        operationLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'
                      }`}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded shadow-lg w-full max-w-2xl" style={{ maxHeight: '90vh', overflowY: 'auto' }}>
            <h3 className="text-xl font-semibold mb-4">
              {editingVehicle ? 'Edit Vehicle' : 'Add Vehicle'}
            </h3>
            
            {operationError && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                {operationError}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-1">Make</label>
                <input
                  name="make"
                  value={formData.make}
                  onChange={handleFormChange}
                  className="w-full border px-3 py-2 rounded"
                  disabled={operationLoading}
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Model</label>
                <input
                  name="model"
                  value={formData.model}
                  onChange={handleFormChange}
                  className="w-full border px-3 py-2 rounded"
                  disabled={operationLoading}
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Year</label>
                <input
                  name="year"
                  type="number"
                  min="1900"
                  max="2100"
                  value={formData.year}
                  onChange={handleFormChange}
                  className="w-full border px-3 py-2 rounded"
                  disabled={operationLoading}
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Mileage</label>
                <input
                  name="mileage"
                  type="number"
                  min="0"
                  value={formData.mileage}
                  onChange={handleFormChange}
                  className="w-full border px-3 py-2 rounded"
                  disabled={operationLoading}
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Min Rent Period (days)</label>
                <input
                  name="minimum_rent_period"
                  type="number"
                  min="1"
                  value={formData.minimum_rent_period}
                  onChange={handleFormChange}
                  className="w-full border px-3 py-2 rounded"
                  disabled={operationLoading}
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Max Rent Period (days)</label>
                <input
                  name="maximum_rent_period"
                  type="number"
                  min="1"
                  value={formData.maximum_rent_period}
                  onChange={handleFormChange}
                  className="w-full border px-3 py-2 rounded"
                  disabled={operationLoading}
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Seats</label>
                <input
                  name="seats"
                  type="number"
                  min="1"
                  value={formData.seats}
                  onChange={handleFormChange}
                  className="w-full border px-3 py-2 rounded"
                  disabled={operationLoading}
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Price Per Day</label>
                <input
                  name="price_per_day"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.price_per_day}
                  onChange={handleFormChange}
                  className="w-full border px-3 py-2 rounded"
                  disabled={operationLoading}
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Image URL</label>
                <input
                  name="image_url"
                  value={formData.image_url}
                  onChange={handleFormChange}
                  className="w-full border px-3 py-2 rounded"
                  disabled={operationLoading}
                  required
                />
              </div>
              <div className="flex items-center">
                <input
                  name="available_now"
                  type="checkbox"
                  checked={formData.available_now}
                  onChange={handleFormChange}
                  className="mr-2"
                  disabled={operationLoading}
                />
                <label>Available for rent</label>
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={operationLoading}
                  className="px-4 py-2 border rounded hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={operationLoading}
                  className={`px-4 py-2 text-white rounded ${
                    operationLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  {operationLoading ? 'Processing...' : editingVehicle ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
