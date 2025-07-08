import { MongoClient } from 'mongodb'

let client = null
let db = null

async function connectToDatabase() {
  if (!client) {
    client = new MongoClient(process.env.MONGO_URI)
    await client.connect()
    db = client.db(process.env.DB_NAME)
  }
  return db
}

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  try {
    const database = await connectToDatabase()
    const collection = database.collection('passwords')

    switch (req.method) {
      case 'GET':
        try {
          const passwords = await collection.find({}).toArray()
          res.status(200).json(passwords)
        } catch (error) {
          res.status(500).json({ success: false, error: 'Failed to fetch passwords' })
        }
        break

      case 'POST':
        try {
          const password = req.body
          const result = await collection.insertOne(password)
          res.status(201).json({ success: true, result })
        } catch (error) {
          res.status(500).json({ success: false, error: 'Failed to save password' })
        }
        break

      case 'DELETE':
        try {
          const { id } = req.body
          const result = await collection.deleteOne({ id })
          res.status(200).json({ success: true, result })
        } catch (error) {
          res.status(500).json({ success: false, error: 'Failed to delete password' })
        }
        break

      default:
        res.status(405).json({ success: false, error: 'Method not allowed' })
    }
  } catch (error) {
    console.error('Database connection error:', error)
    res.status(500).json({ success: false, error: 'Database connection failed' })
  }
}
