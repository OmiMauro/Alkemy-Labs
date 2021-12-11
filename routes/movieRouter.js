import { Router } from 'express'
import { requireSignin } from '../controllers/authController.js'
// method for verify authentication for access all routes
import {
  createMovie,
  updateMovie,
  getMovie,
  deleteMovie,
  getAllMovies
} from '../controllers/movieController.js'
const movieRouter = Router()

movieRouter
  .route('/')
  .all(requireSignin)
  .get(getAllMovies)
  .post(createMovie)
movieRouter
  .route('/:id')
  .all(requireSignin)
  .get(getMovie)
  .put(updateMovie)
  .delete(deleteMovie)

export { movieRouter }
