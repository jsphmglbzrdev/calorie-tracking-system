import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import authRoutes from './routes/authRoutes.js'
import foodRoutes from './routes/foodRoutes.js'
import cors from 'cors'

dotenv.config()
connectDB()

const app = express()

const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(cors())
app.use('/api/auth', authRoutes)
app.use('/api/food', foodRoutes)

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})