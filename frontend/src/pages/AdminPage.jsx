import React, { useEffect, useState } from 'react';
import api from '../api/api';

export default function AdminPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.fetchOrders().then(res => setOrders(res.data));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-green-700 mb-4">Admin Panel - Order Review</h2>
      <table className="w-full border text-left text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">ID</th>
            <th className="p-2">User</th>
            <th className="p-2">Vehicle</th>
            <th className="p-2">Date</th>
            <th className="p-2">Status</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id} className="border-t">
              <td className="p-2">{order.id}</td>
              <td className="p-2">{order.userEmail}</td>
              <td className="p-2">{order.vehicleName}</td>
              <td className="p-2">{order.date}</td>
              <td className="p-2">{order.status}</td>
              <td className="p-2 space-x-2">
                <button className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600">Approve</button>
                <button className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600">Reject</button>
                <button className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600">Block User</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
