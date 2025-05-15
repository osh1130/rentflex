import api from './api'

// 获取可预订的车辆（可传日期范围过滤）
export const getAvailableVehicles = async (startDate, endDate) => {
  const params = {}
  if (startDate && endDate) {
    params.start = startDate
    params.end = endDate
  }
  const res = await api.get('/vehicles', { params })
  return res.data
}

export const bookVehicle = async (vehicleId, data, token) => {
  const res = await api.post('/bookings', { vehicleId, ...data }, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return res.data
}


// 管理员：获取所有车辆（无需日期过滤）
export const getAllVehicles = async (token) => {
  const res = await api.get('/admin/vehicles', {
    headers: { Authorization: `Bearer ${token}` }
  })
  return res.data
}

// 管理员：添加新车辆
export const createVehicle = async (vehicleData, token) => {
  const res = await api.post('/admin/vehicles', vehicleData, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return res.data
}

// 管理员：更新车辆
export const updateVehicle = async (id, vehicleData, token) => {
  const res = await api.put(`/admin/vehicles/${id}`, vehicleData, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return res.data
}

// 管理员：删除车辆
export const deleteVehicle = async (id, token) => {
  const res = await api.delete(`/admin/vehicles/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return res.data
}
