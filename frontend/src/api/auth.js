import api from './api'

export const login = async (email, password) => {
  const res = await api.post('/login', { 
    email, 
    password 
  })
  return res.data
}

export const register = async (email, password, name) => {
  const res = await api.post('/register', { 
    email, 
    password, 
    name,
    role: 'customer' // 默认注册为普通用户
  })
  return res.data
}

// TODO: 后端需要实现此接口
export const getMe = async (token) => {
  const res = await api.get('/auth/me', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return res.data
}
