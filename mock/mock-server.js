const express = require('express')
const cors = require('cors')
const app = express()

//Access-Control-Allow-Origin: *
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}))

app.use(express.json())

app.get('/api/vehicles', (req, res) => {
  res.json([
    { id: 1, name: 'Toyota Camry', type: 'Sedan', price: 70 },
    { id: 2, name: 'Honda CRV', type: 'SUV', price: 90 }
  ])
})

app.get('/api/orders', (req, res) => {
  res.json([
    { id: 1, vehicleName: 'Toyota Camry', date: '2025-05-13', status: 'Confirmed' }
  ])
})

app.get('/api/me', (req, res) => {
  res.json({ email: 'test@example.com', name: 'Test User' })
})

app.listen(8000, () => console.log('🚀 Mock API running at http://localhost:8000'))
