import api from './api'

// 用户预订车辆
export const createBooking = async (bookingData) => {
  const res = await api.post('/bookings', bookingData)
  return res.data
}

// 获取用户所有订单
export const getMyBookings = async () => {
  const res = await api.get('/bookings')
  return res.data
}

// 取消订单
export const cancelBooking = async (bookingId) => {
  const res = await api.delete(`/bookings/${bookingId}`)
  return res.data
}

// 计算预订费用
export const calculateBookingFee = async (calculationData) => {
  const res = await api.post('/bookings/calculate', calculationData)
  return res.data
}

// ———— 管理员侧接口 ————

// 获取所有订单（审批列表）
export const getAllBookings = async (status) => {
  const res = await api.get('/admin/bookings', {
    params: status ? { status } : undefined
  })
  return res.data
}

// 批准订单
export const approveBooking = async (bookingId) => {
  const res = await api.post(`/admin/bookings/${bookingId}/approve`)
  return res.data
}

// 拒绝订单
export const rejectBooking = async (bookingId) => {
  const res = await api.post(`/admin/bookings/${bookingId}/reject`)
  return res.data
}