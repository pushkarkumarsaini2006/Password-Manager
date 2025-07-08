import express from 'express'
import dotenv from 'dotenv'
import { MongoClient } from 'mongodb'
import cors from 'cors'

dotenv.config()

const app = express()
const port = 3002

// Middleware
app.use(express.json())
app.use(cors())

let client = null
let db = null

async function connectToDatabase() {
  if (!client) {
    client = new MongoClient(process.env.MONGO_URI)
    await client.connect()
    db = client.db(process.env.DB_NAME)
    console.log('Connected to MongoDB')
  }
  return db
}

// API routes
app.get('/api', async (req, res) => {
  try {
    const database = await connectToDatabase()
    const collection = database.collection('passwords')
    const passwords = await collection.find({}).toArray()
    res.json(passwords)
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch passwords' })
  }
})

app.post('/api', async (req, res) => {
  try {
    const password = req.body
    const database = await connectToDatabase()
    const collection = database.collection('passwords')
    const result = await collection.insertOne(password)
    res.json({ success: true, result })
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to save password' })
  }
})

app.delete('/api', async (req, res) => {
  try {
    const { id } = req.body
    const database = await connectToDatabase()
    const collection = database.collection('passwords')
    const result = await collection.deleteOne({ id })
    res.json({ success: true, result })
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to delete password' })
  }
})

app.listen(port, () => {
  console.log(`Development server running on http://localhost:${port}`)
})
