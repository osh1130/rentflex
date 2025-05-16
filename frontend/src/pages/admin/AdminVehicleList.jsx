import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext'
import {
  getAllVehicles,
  createVehicle,
  updateVehicle,
  deleteVehicle
} from '../../api/vehicle';

export default function AdminVehicleList() {
  const { user,token } = useContext(UserContext)
  const navigate = useNavigate();


  // 数据状态
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal & 表单
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    price: 0,
    available: true,
  });

//   useEffect(() => {
//   if (user === null) return; // 正在加载用户，不做跳转
//   if (!user || user.role !== 'admin') {
//     alert('Access denied');
//     navigate('/');
//   }
// }, [user, navigate]);

  // 拉取所有车辆
  useEffect(() => {
    if (!token) return;
    async function fetchVehicles() {
      try {
        const data = await getAllVehicles(token);
        setVehicles(data);
      } catch (err) {
        setError('Failed to load vehicles');
      } finally {
        setLoading(false);
      }
    }
    fetchVehicles();
  }, [token]);

  // 打开“新增”弹窗
  const openAddModal = () => {
    setEditingVehicle(null);
    setFormData({ name: '', type: '', price: 0, available: true });
    setIsModalOpen(true);
  };

  // 打开“编辑”弹窗
  const openEditModal = vehicle => {
    setEditingVehicle(vehicle);
    setFormData({
      name: vehicle.name,
      type: vehicle.type,
      price: vehicle.price,
      available: vehicle.available,
    });
    setIsModalOpen(true);
  };

  // 关闭弹窗
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingVehicle(null);
  };

  // 表单字段变化
  const handleFormChange = e => {
    const { name, value, type: inputType, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: inputType === 'checkbox' ? checked : value,
    }));
  };

  // 提交新增/编辑
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (editingVehicle) {
        const updated = await updateVehicle(editingVehicle.id, formData, token);
        setVehicles(vs => vs.map(v => (v.id === updated.id ? updated : v)));
      } else {
        const created = await createVehicle(formData, token);
        setVehicles(vs => [...vs, created]);
      }
      closeModal();
    } catch {
      alert('Operation failed');
    }
  };

  // 删除操作
  const handleDelete = async id => {
    if (!window.confirm('Are you sure you want to delete this vehicle?')) return;
    try {
      await deleteVehicle(id, token);
      setVehicles(vs => vs.filter(v => v.id !== id));
    } catch {
      alert('Delete failed');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error)   return <p className="text-red-600">{error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Admin: Manage Vehicles</h2>

      <button
        onClick={openAddModal}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Add Vehicle
      </button>

      <table className="w-full table-auto border-collapse">
        <thead>
          <tr>
            {['ID', 'Name', 'Type', 'Price', 'Available', 'Actions'].map(th => (
              <th key={th} className="border px-2 py-1">{th}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {vehicles.map(v => (
            <tr key={v.id}>
              <td className="border px-2 py-1">{v.id}</td>
              <td className="border px-2 py-1">{v.name}</td>
              <td className="border px-2 py-1">{v.type}</td>
              <td className="border px-2 py-1">${v.price}</td>
              <td className="border px-2 py-1">{v.available ? 'Yes' : 'No'}</td>
              <td className="border px-2 py-1 space-x-2">
                <button
                  onClick={() => openEditModal(v)}
                  className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(v.id)}
                  className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">
              {editingVehicle ? 'Edit Vehicle' : 'Add Vehicle'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-1">Name</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  className="w-full border px-2 py-1 rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Type</label>
                <input
                  name="type"
                  value={formData.type}
                  onChange={handleFormChange}
                  className="w-full border px-2 py-1 rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Price</label>
                <input
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleFormChange}
                  className="w-full border px-2 py-1 rounded"
                  required
                />
              </div>
              <div className="flex items-center">
                <input
                  id="available"
                  name="available"
                  type="checkbox"
                  checked={formData.available}
                  onChange={handleFormChange}
                />
                <label htmlFor="available" className="ml-2">Available</label>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  {editingVehicle ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
