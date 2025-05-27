import api, { withCache } from './api'

// 获取可预订的车辆（按日期范围过滤）
export const getAvailableVehicles = async (startDate, endDate) => {
  if (!startDate || !endDate) {
    throw new Error('Start date and end date are required')
  }

  const cacheKey = `vehicles_${startDate}_${endDate}`;
  return withCache(cacheKey, async () => {
    const res = await api.get('/vehicles', {
      params: {
        start: startDate,
        end: endDate
      }
    })
    return res.data
  })
}

export const bookVehicle = async (vehicleId, data) => {
  const res = await api.post('/bookings', { vehicleId, ...data })
  return res.data
}

// 管理员：获取所有车辆
export const getAllVehicles = async () => {
  const res = await api.get('/admin/vehicles')
  return res.data
}

// 管理员：获取单个车辆详情
export const getVehicleById = async (id) => {
  const cacheKey = `vehicle_${id}`;
  return withCache(cacheKey, async () => {
    const res = await api.get(`/admin/vehicles/${id}`)
    return res.data
  })
}

// 管理员：添加新车辆
export const createVehicle = async (vehicleData) => {
  const res = await api.post('/admin/vehicles', vehicleData)
  return res.data
}

// 管理员：更新车辆
export const updateVehicle = async (id, vehicleData) => {
  const res = await api.put(`/admin/vehicles/${id}`, vehicleData)
  return res.data
}

// 管理员：删除车辆
export const deleteVehicle = async (id) => {
  const res = await api.delete(`/admin/vehicles/${id}`)
  return res.data
}
