import { Router } from 'express'
import { uploadFile } from '../services/uploadFiles.js'

import { requireSignin } from '../controllers/authController.js'
// method for verify authentication for access all routes
import {
  createMovie,
  updateMovie,
  getMovie,
  deleteMovie,
  getAllMovies,
  updateMovieAndCharacter
} from '../controllers/movieController.js'
const movieRouter = Router()

movieRouter
  .route('/')
  .all(requireSignin)
  .get(getAllMovies)
  .post(uploadFile.single('image'), createMovie)
movieRouter
  .route('/:id')
  .all(requireSignin)
  .get(getMovie)
  .put(updateMovie)
  .delete(deleteMovie)
movieRouter
  .route('/:movieId/character/:characterId')
  .all(requireSignin)
  .put(updateMovieAndCharacter)
export { movieRouter }
