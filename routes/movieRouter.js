import { Router } from 'express'
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
  .route('/movie')
  .get(getAllMovies)
  .post(createMovie)
movieRouter
  .route('/movie/:id')
  .get(getMovie)
  .put(updateMovie)
  .delete(deleteMovie)

export { movieRouter }
