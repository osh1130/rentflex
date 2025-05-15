import axios from './api'

export const login = async (email, password) => {
  const res = await axios.post('/login', { email, password })
  return res.data
}

export const register = async (email, password, name) => {
  const res = await axios.post('/register', { email, password, name })
  return res.data
}

export const getMe = async (token) => {
  const res = await axios.get('/me', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return res.data
}
