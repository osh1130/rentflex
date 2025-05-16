import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import {
  getAllUsers,
  blockUser,
  resetPassword
} from '../../api/user';

export default function AdminUserList() {
  const { user, token } = useContext(UserContext);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    async function fetchUsers (){
        try {
            const list = await getAllUsers(token);
            setUsers(list);
        } catch (err) {
            setError('Failed to load users');
        } finally {
            setLoading(false);
        }
        }
    fetchUsers();
    }, [token]);

  const handleBlock = async id => {
    await blockUser(id, token);
    setUsers(us => us.map(u => u.id === id ? { ...u, blocked: true } : u));
  };
  
  const handleReset = async id => {
    const res = await resetPassword(id, token);
    alert(`New temporary password: ${res.tempPassword}`);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Manage Users</h2>
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr>{['ID','Email','Name','Role','Blocked','Actions'].map(h=><th key={h} className="border px-2 py-1">{h}</th>)}</tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id} className={u.blocked ? 'opacity-50' : ''}>
              <td className="border px-2 py-1">{u.id}</td>
              <td className="border px-2 py-1">{u.email}</td>
              <td className="border px-2 py-1">{u.name}</td>
              <td className="border px-2 py-1">{u.role}</td>
              <td className="border px-2 py-1">{`${u.blocked}`}</td>
              <td className="border px-2 py-1 space-x-2">
                <button onClick={() => handleBlock(u.id)} disabled={u.blocked} className="px-2 py-1 bg-red-600 text-white rounded">Block</button>
                <button onClick={() => handleReset(u.id)} className="px-2 py-1 bg-yellow-500 text-white rounded">Reset PW</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}