import 'dotenv/config.js'
import express from 'express'
import sequelize from './db/database.js'
import cors from 'cors'
import morgan from 'morgan'
/* import { Character } from './models/Character.js'
import { Movies } from './models/Movies.js'
import { User } from './models/User.js'
import { Genre } from './models/Genre.js' */

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
server.use('/api/v1/character', characterRouter)
server.use('/api/v1/genres', genreRouter)
server.use('/api/v1/movies', movieRouter)
server.use('/api/v1/auth', authRouter)

const connectDB = () => {
  try {
    sequelize.authenticate()

    sequelize.sync({
      /*  force: true  */
    })
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
export { connectDB, initServer }
