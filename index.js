import 'dotenv/config.js'
import express from 'express'
import sequelize from './db/database.js'
import { Character } from './models/Character.js'
import { Movies } from './models/Movies.js'

const server = express()

const port = process.env.PORT || 5000

const connectDB = () => {
  try {
    sequelize.authenticate()
    sequelize.sync({})
    console.log('Connect to DB')
  } catch (error) {
    console.log('Unable to connect to the database. ', error)
  }
}
const initServer = async () => {
  try {
    await connectDB()
    server.listen(port, () => console.log('Runing in', port))
  } catch (error) {
    console.error(error)
  }
}

initServer()
