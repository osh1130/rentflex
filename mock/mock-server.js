const express = require('express')
const cors = require('cors')
const app = express()

<<<<<<< HEAD
app.use(cors({ origin: 'http://localhost:3000', credentials: true }))
app.use(express.json())

// 假用户列表（模拟数据库）
const users = [
  { email: 'admin@example.com', password: 'admin123', role: 'admin', name: 'Admin' },
  { email: 'customer@example.com', password: 'cust123', role: 'customer', name: 'Customer' }
]

// 通用中间件：身份验证
function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1]
  const email = token?.replace('mock-token-', '')
  const user = users.find(u => u.email === email)
  if (!user) return res.status(401).json({ message: 'Invalid token' })
  req.user = user
  next()
}

// 仅管理员访问中间件
function adminOnly(req, res, next) {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admins only' })
  }
  next()
}

// 登录
app.post('/api/login', (req, res) => {
  const { email, password } = req.body
  const user = users.find(u => u.email === email && u.password === password)
  if (!user) return res.status(401).json({ message: 'Invalid credentials' })

  // 登录成功返回 token 和角色（假 token）
  res.json({
    token: 'mock-token-' + user.email,
    email: user.email,
    name: user.name,
    role: user.role
  })
})

// 注册（添加到 mock 列表）
app.post('/api/register', (req, res) => {
  const { email, password, name } = req.body
  if (users.find(u => u.email === email)) {
    return res.status(409).json({ message: 'User already exists' })
  }
  const newUser = { email, password, name, role: 'customer' } // 默认新用户是 customer
  users.push(newUser)
  res.status(201).json({ message: 'User registered' })
})

// 获取当前用户（模拟 token 提取用户）
app.get('/api/me', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1]
  const email = token?.replace('mock-token-', '')
  const user = users.find(u => u.email === email)
  if (!user) return res.status(401).json({ message: 'Invalid token' })

  res.json({ email: user.email, name: user.name, role: user.role })
=======
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}))
app.use(express.json())

// Mock 数据
const users = [
  { email: 'admin@example.com', password: 'admin123', name: 'Admin', role: 'admin' },
  { email: 'user@example.com', password: 'user123', name: 'Alice', role: 'customer' }
]

const vehicles = [
  { id: 1, name: 'Toyota Camry', type: 'Sedan', price: 70, description: 'A comfortable 5-seater sedan.' },
  { id: 2, name: 'Honda CRV', type: 'SUV', price: 90, description: 'A spacious SUV with great performance.' }
]

let orders = [
  { id: 1, userEmail: 'user@example.com', vehicleId: 1, vehicleName: 'Toyota Camry', date: '2025-05-13', status: 'Confirmed' }
]

// ====== base ======
app.get('/', (req, res) => {
  res.send('Mock API is running')
})

// ====== login ======
app.post('/api/login', (req, res) => {
  const { email, password } = req.body
  const user = users.find(u => u.email === email && u.password === password)
  if (user) {
    res.json({ email: user.email, name: user.name, role: user.role })
  } else {
    res.status(401).json({ message: 'Invalid email or password' })
  }
})

// ====== mock register ======
app.post('/api/register', (req, res) => {
  const { email, password, name } = req.body
  if (users.some(u => u.email === email)) {
    return res.status(400).json({ message: 'User already exists' })
  }
  users.push({ email, password, name, role: 'customer' })
  res.status(201).json({ message: 'Registration successful' })
})

// ====== get role ======
app.get('/api/me', (req, res) => {
  // 实际应从 token 中解析；此处 mock 用户
  res.json({ email: 'user@example.com', name: 'Alice', role: 'customer' })
})

// ====== get all car ======
app.get('/api/vehicles', (req, res) => {
  res.json(vehicles)
})

// ====== get a car ======
app.get('/api/vehicles/:id', (req, res) => {
  const vehicle = vehicles.find(v => v.id == req.params.id)
  if (vehicle) {
    res.json(vehicle)
  } else {
    res.status(404).json({ message: 'Vehicle not found' })
  }
})

// ====== admin ======
app.get('/api/orders', (req, res) => {
  res.json(orders)
})

// ====== booking ======
app.post('/api/orders', (req, res) => {
  const { userEmail, vehicleId, date } = req.body
  const vehicle = vehicles.find(v => v.id === vehicleId)
  if (!vehicle) return res.status(400).json({ message: 'Invalid vehicle' })

  const newOrder = {
    id: orders.length + 1,
    userEmail,
    vehicleId,
    vehicleName: vehicle.name,
    date,
    status: 'Pending'
  }
  orders.push(newOrder)
  res.status(201).json(newOrder)
>>>>>>> 28f00b8c764713a3f85a902a43d072ace3078ce0
})


// 车辆接口
let vehicles = [
  { id: 1, name: 'Toyota Camry', type: 'Sedan', price: 70, available: true },
  { id: 2, name: 'Honda CRV', type: 'SUV', price: 90, available: true },
  { id: 3, name: 'Ford Focus', type: 'Hatchback', price: 60, available: true },
  { id: 4, name: 'Chevrolet Malibu', type: 'Sedan', price: 75, available: true },
  { id: 5, name: 'Tesla Model 3', type: 'Electric', price: 120, available: false },
  { id: 6, name: 'BMW X5', type: 'SUV', price: 150, available: true },
  { id: 7, name: 'Audi A4', type: 'Sedan', price: 130, available: true },
  { id: 8, name: 'Hyundai Ioniq', type: 'Electric', price: 95, available: true },
  { id: 9, name: 'Kia Carnival', type: 'Van', price: 100, available: false },
  { id: 10, name: 'Nissan Leaf', type: 'Electric', price: 85, available: true }
]

let bookings = [
  {
    id: 1,
    user: 'test@example.com',
    vehicleId: 2,
    status: 'confirmed', // 或 pending, cancelled
    startDate: '2025-05-20',
    endDate: '2025-05-22'
  },
  {
    id: 2,
    user: 'customer@example.com',
    vehicleId: 3,
    status: 'pending',
    startDate: '2025-05-23',
    endDate: '2025-05-24'
  }
]

// 判断日期是否有重叠
function isDateOverlap(start1, end1, start2, end2) {
  return !(end1 < start2 || end2 < start1)
}

function getUserByToken(token) {
  const email = token?.replace('mock-token-', '')
  return users.find(u => u.email === email)
}

// 获取可用车辆（按日期过滤）
app.get('/api/vehicles', (req, res) => {
  const { start, end } = req.query
  const filtered = vehicles.filter(vehicle => {
    const overlap = bookings.some(b =>
      b.vehicleId === vehicle.id &&
      b.status !== 'cancelled' &&
      isDateOverlap(b.startDate, b.endDate, start, end)
    )
    return vehicle.available && !overlap
  })
  res.json(filtered)
})

// 管理端：获取所有车辆
app.get('/api/admin/vehicles', authMiddleware, adminOnly, (req, res) => {
  res.json(vehicles)
})

// 管理端：新增车辆
app.post('/api/admin/vehicles', authMiddleware, adminOnly, (req, res) => {
  const newVehicle = { id: vehicles.length + 1, ...req.body }
  vehicles.push(newVehicle)
  res.status(201).json(newVehicle)
})

// 管理端：更新车辆
app.put('/api/admin/vehicles/:id', authMiddleware, adminOnly, (req, res) => {
  const id = parseInt(req.params.id)
  vehicles = vehicles.map(v => v.id === id ? { ...v, ...req.body } : v)
  res.json({ message: 'Vehicle updated' })
})

// 管理端：删除车辆
app.delete('/api/admin/vehicles/:id', authMiddleware, adminOnly, (req, res) => {
  const id = parseInt(req.params.id)
  vehicles = vehicles.filter(v => v.id !== id)
  res.json({ message: 'Vehicle deleted' })
})



// 创建预订
app.post('/api/bookings', (req, res) => {
  const { vehicleId, startDate, endDate } = req.body
  const token = req.headers.authorization?.split(' ')[1]
  const user = getUserByToken(token)
  if (!user) return res.status(401).json({ message: 'Unauthorized' })

  const conflict = bookings.some(b =>
    b.vehicleId === vehicleId &&
    b.status !== 'cancelled' &&
    isDateOverlap(b.startDate, b.endDate, startDate, endDate)
  )
  if (conflict) return res.status(409).json({ message: 'Vehicle already booked' })

  const newBooking = {
    id: bookings.length + 1,
    user: user.email,
    vehicleId,
    status: 'pending',
    startDate,
    endDate
  }
  bookings.push(newBooking)
  res.status(201).json(newBooking)
})

// 获取当前用户的订单
app.get('/api/bookings', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1]
  const user = getUserByToken(token)
  if (!user) return res.status(401).json({ message: 'Unauthorized' })
  const result = bookings.filter(b => b.user === user.email)
  res.json(result)
})

// 取消订单
app.delete('/api/bookings/:id', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1]
  const user = getUserByToken(token)
  if (!user) return res.status(401).json({ message: 'Unauthorized' })

  const id = parseInt(req.params.id)
  const booking = bookings.find(b => b.id === id && b.user === user.email)
  if (!booking) return res.status(404).json({ message: 'Booking not found' })
  booking.status = 'cancelled'
  res.json({ message: 'Booking cancelled' })
})

app.get('/api/admin/bookings', (req, res) => {
  res.json(bookings)
})

app.put('/api/admin/bookings/:id/approve', (req, res) => {
  const id = parseInt(req.params.id)
  bookings = bookings.map(b => b.id === id ? { ...b, status: 'approved' } : b)
  res.json({ message: 'Approved' })
})

app.put('/api/admin/bookings/:id/reject', (req, res) => {
  const id = parseInt(req.params.id)
  bookings = bookings.map(b => b.id === id ? { ...b, status: 'rejected' } : b)
  res.json({ message: 'Rejected' })
})

// 启动
app.listen(8000, () => console.log('🚀 Mock API running at http://localhost:8000'))
