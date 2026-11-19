import 'dotenv/config'

import express from 'express'
import cors from 'cors'

import connectDB from './config/db.js'
import biodataRoutes from './routes/biodataRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'

const app = express()

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173'
}))

app.use(express.json({ limit: '1mb' }))

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Marriage Biodata API is running'
  })
})

app.use('/api/v1/biodata', biodataRoutes)
app.use('/api/v1/upload', uploadRoutes)

app.use((err, req, res, next) => {
  console.error(err)

  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error'
  })
})

const startServer = async () => {
  try {
    await connectDB()

    const PORT = process.env.PORT || 5000

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`)
    })
  } catch (error) {
    console.error('Server startup failed:', error.message)
    process.exit(1)
  }
}

startServer()