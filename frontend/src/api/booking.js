import api from './api'

// 用户预订车辆
export const bookVehicle = async (vehicleId, bookingData, token) => {
  const res = await api.post('/bookings', { vehicleId, ...bookingData }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return res.data
}

// 获取用户所有订单
export const getMyBookings = async (token) => {
  const res = await api.get('/bookings', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return res.data
}

// 取消订单
export const cancelBooking = async (bookingId, token) => {
  const res = await api.delete(`/bookings/${bookingId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return res.data
}


// ———— 管理员侧接口 ————

// 获取所有订单（审批列表）
export const getAllBookings = async (token) => {
  const res = await api.get('/admin/bookings', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// 批准订单
export const approveBooking = async (bookingId, token) => {
  const res = await api.post(
    `/admin/bookings/${bookingId}/approve`,
    null,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};

// 拒绝订单
export const rejectBooking = async (bookingId, token) => {
  const res = await api.post(
    `/admin/bookings/${bookingId}/reject`,
    null,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};