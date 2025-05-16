import React, { useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext'

export default function Home() {
  const { user, loading } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) return; // 正在加载中，先不跳
    if (user) {
      // 已登录就直接跳转到对应页面，不再展示 Home 页面
      if (user.role === 'admin') {
        navigate('/admin/vehicles');
      } else {
        navigate('/vehicles');
      }
    }
  }, [user, navigate]);

  if (loading) return null;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-primary mb-4">Welcome to RentFlex</h1>
      <p className="text-lg mb-6 text-center">Your one-stop car rental solution.</p>
      {/* {!user && (
        <Link to="/guest-vehicles" className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
          Browse Vehicles
        </Link>
      )} */}

    </div>
  );
}
