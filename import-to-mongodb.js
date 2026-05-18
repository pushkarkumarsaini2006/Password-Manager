import { MongoClient } from 'mongodb'
import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'

dotenv.config()

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const passwordsFilePath = path.join(__dirname, 'passwords.json')

async function importToMongoDB() {
  const client = new MongoClient(process.env.MONGO_URI)
  
  try {
    console.log('Connecting to MongoDB...')
    await client.connect()
    console.log('✓ Connected to MongoDB')
    
    const db = client.db(process.env.DB_NAME)
    const collection = db.collection('passwords')
    
    // Read JSON file
    if (!fs.existsSync(passwordsFilePath)) {
      console.error('✗ passwords.json not found')
      return
    }
    
    const passwords = JSON.parse(fs.readFileSync(passwordsFilePath, 'utf-8'))
    console.log(`Found ${passwords.length} passwords in passwords.json`)
    
    // Clear existing collection
    await collection.deleteMany({})
    console.log('✓ Cleared existing passwords from MongoDB')
    
    // Insert new passwords
    if (passwords.length > 0) {
      const result = await collection.insertMany(passwords)
      console.log(`✓ Imported ${result.insertedCount} passwords to MongoDB`)
    }
    
    console.log('\n✓ Import complete!')
    
  } catch (error) {
    console.error('✗ Import failed:', error.message)
    process.exit(1)
  } finally {
    await client.close()
  }
}

importToMongoDB()
