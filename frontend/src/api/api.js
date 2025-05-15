import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  withCredentials: true
});

export const login = (email, password) => api.post('/login', { email, password });
export const register = (email, password, name) => api.post('/register', { email, password, name });
export const fetchMe = () => api.get('/me');
export const fetchVehicles = () => api.get('/vehicles');
export const fetchVehicle = id => api.get(`/vehicles/${id}`);
export const fetchOrders = () => api.get('/orders');
export const createOrder = (userEmail, vehicleId, date) => api.post('/orders', { userEmail, vehicleId, date });
export default {
  login,
  register,
  fetchMe,
  fetchVehicles,
  fetchVehicle,
  fetchOrders,
  createOrder
};
