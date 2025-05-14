const express = require('express')
const cors = require('cors')
const app = express()

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
})

app.listen(8000, () => console.log('🚀 Mock API running at http://localhost:8000'))
