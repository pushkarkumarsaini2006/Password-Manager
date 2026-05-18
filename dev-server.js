import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

dotenv.config()

const app = express()
const port = 3002

// Middleware
app.use(express.json())
app.use(cors())

// Get directory name in ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// JSON file storage for passwords
const dbFilePath = path.join(__dirname, 'passwords.json')

// Initialize db file if it doesn't exist
function initializeDb() {
  if (!fs.existsSync(dbFilePath)) {
    const initialData = [
      {
        id: '1',
        site: 'GitHub',
        username: 'demo@github.com',
        password: 'demo123'
      },
      {
        id: '2',
        site: 'Gmail',
        username: 'demo@gmail.com',
        password: 'secure456'
      }
    ]
    fs.writeFileSync(dbFilePath, JSON.stringify(initialData, null, 2))
    console.log('Initialized passwords.json with demo data')
  }
}

// Read passwords from file
function readPasswords() {
  try {
    const data = fs.readFileSync(dbFilePath, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading passwords:', error)
    return []
  }
}

// Write passwords to file
function writePasswords(passwords) {
  try {
    fs.writeFileSync(dbFilePath, JSON.stringify(passwords, null, 2))
  } catch (error) {
    console.error('Error writing passwords:', error)
    throw error
  }
}

// Initialize database
initializeDb()

// API routes
app.get('/api', async (req, res) => {
  try {
    const passwords = readPasswords()
    res.json(passwords)
  } catch (error) {
    console.error('GET /api error:', error)
    res.status(500).json({ success: false, error: 'Failed to fetch passwords' })
  }
})

app.post('/api', async (req, res) => {
  try {
    const password = req.body
    if (!password.id) {
      return res.status(400).json({ success: false, error: 'Missing id' })
    }
    const passwords = readPasswords()
    passwords.push(password)
    writePasswords(passwords)
    res.json({ success: true, result: { acknowledged: true } })
  } catch (error) {
    console.error('POST /api error:', error)
    res.status(500).json({ success: false, error: 'Failed to save password' })
  }
})

app.delete('/api', async (req, res) => {
  try {
    const { id } = req.body
    if (!id) {
      return res.status(400).json({ success: false, error: 'Missing id' })
    }
    let passwords = readPasswords()
    const initialLength = passwords.length
    passwords = passwords.filter(p => p.id !== id)
    writePasswords(passwords)
    res.json({ success: true, result: { acknowledged: true, deletedCount: initialLength - passwords.length } })
  } catch (error) {
    console.error('DELETE /api error:', error)
    res.status(500).json({ success: false, error: 'Failed to delete password' })
  }
})

app.listen(port, () => {
  console.log(`Development server running on http://localhost:${port} (using JSON file storage)`)
})
