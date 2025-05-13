import axios from 'axios'

const api = axios.create({
  //baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  baseURL: 'http://localhost:8001/api',
  withCredentials: true
})

export default api