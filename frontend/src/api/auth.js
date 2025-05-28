import api from './api'

export const loginApi = async (email, password) => {
  const res = await api.post('/login', { 
    email, 
    password 
  })
  return res.data
}

export const registerApi = async (email, password, name) => {
  const res = await api.post('/register', { 
    email, 
    password, 
    name,
    // role: 'customer' 默认注册为普通用户
  })
  return res.data
}


export const getMe = async (token) => {
  const res = await api.get('/me', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return res.data
}
