import 'dotenv/config.js'
import express from 'express'
import sequelize from './db/database.js'
import cors from 'cors'
import morgan from 'morgan'

import { Character, Genre, Movies, User } from './models/index.js'
// Routes of server
import { genreRouter } from './routes/genreRoute.js'
import { characterRouter } from './routes/characterRoute.js'
import { movieRouter } from './routes/movieRouter.js'
import { authRouter } from './routes/authRouter.js'
const server = express()

const port = process.env.PORT || 5000

server.use(express.json())
/* server.use(express.urlencoded()) */
server.use(cors())
server.use(morgan('dev'))
server.use('/public', express.static('./public'))
// Define routes of API
server.use('/api/v1/characters', characterRouter)
server.use('/api/v1/genres', genreRouter)
server.use('/api/v1/movies', movieRouter)
server.use('/api/v1/auth', authRouter)

const connectDB = () => {
  try {
    sequelize.authenticate()
    const force = process.env.NODE_ENV === 'test'
    sequelize.sync({})
    console.log('Connect to DB')
  } catch (error) {
    console.log('Unable to connect to the database. ', error)
  }
}

connectDB()
const app = server.listen(port, () => console.log('Runing in', port))
export { server, app }
