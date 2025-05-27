import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../contexts/UserContext';
import AdminLayout from '../../components/layout/AdminLayout';
import {
  getAllVehicles,
  createVehicle,
  updateVehicle,
  deleteVehicle
} from '../../api/vehicle';
import Loader from '../../components/common/Loader';

export default function AdminVehicleList() {
  const { token } = useContext(UserContext);

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
    name: '',
    type: '',
    transmission: 'Automatic',
    seats: 5,
    price: 0,
    description: '',
    image: '',
    available: true,
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
      name: '',
      type: '',
      transmission: 'Automatic',
      seats: 5,
      price: 0,
      description: '',
      image: '',
      available: true
    });
    setOperationError(null);
    setIsModalOpen(true);
  };

  const openEditModal = vehicle => {
    setEditingVehicle(vehicle);
    setFormData({
      name: vehicle.name,
      type: vehicle.type,
      transmission: vehicle.transmission || 'Automatic',
      seats: vehicle.seats || 5,
      price: vehicle.price,
      description: vehicle.description || '',
      image: vehicle.image || '',
      available: vehicle.available,
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
      [name]: inputType === 'checkbox' ? checked : 
              inputType === 'number' ? Number(value) : 
              value,
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
                {['ID', 'Name', 'Type', 'Price', 'Available', 'Actions'].map(th => (
                  <th key={th} className="border px-4 py-2 text-left">{th}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {vehicles.map(v => (
                <tr key={v.id} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{v.id}</td>
                  <td className="border px-4 py-2">{v.name}</td>
                  <td className="border px-4 py-2">{v.type}</td>
                  <td className="border px-4 py-2">${v.price}</td>
                  <td className="border px-4 py-2">
                    <span className={v.available ? 'text-green-600' : 'text-red-600'}>
                      {v.available ? 'Yes' : 'No'}
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
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
                <label className="block mb-1">Name</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  className="w-full border px-3 py-2 rounded"
                  disabled={operationLoading}
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Type</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleFormChange}
                  className="w-full border px-3 py-2 rounded"
                  disabled={operationLoading}
                  required
                >
                  <option value="">Select type</option>
                  <option value="Sedan">Sedan</option>
                  <option value="SUV">SUV</option>
                  <option value="Hatchback">Hatchback</option>
                  <option value="Electric">Electric</option>
                  <option value="Van">Van</option>
                </select>
              </div>
              <div>
                <label className="block mb-1">Price (per day)</label>
                <input
                  name="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={handleFormChange}
                  className="w-full border px-3 py-2 rounded"
                  disabled={operationLoading}
                  required
                />
              </div>
              <div className="flex items-center">
                <input
                  name="available"
                  type="checkbox"
                  checked={formData.available}
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
