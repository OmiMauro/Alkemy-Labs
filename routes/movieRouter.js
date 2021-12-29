import { Router } from 'express'
import { uploadFile } from '../services/uploadFiles.js'
import {
  validateMovie,
  validateIDParamsMovieCharacter,
  validateIDParams,
  validateGenre
} from '../middlewares/validationMovie.js'

import { requireSignin } from '../controllers/authController.js'

import {
  createMovie,
  updateMovie,
  getMovie,
  deleteMovie,
  getAllMovies,
  addCharacterToMovie,
  addGenre
} from '../controllers/movieController.js'
const movieRouter = Router()

movieRouter
  .route('/')
  .all(requireSignin)
  .get(getAllMovies)
  .post(uploadFile.single('image'), validateMovie, createMovie)
movieRouter
  .route('/:id')
  .all(requireSignin, validateIDParams)
  .get(getMovie)
  .put(uploadFile.single('image'), validateMovie, updateMovie)
  .delete(deleteMovie)
movieRouter
  .route('/:id/genres')
  .all(requireSignin, validateGenre)
  .patch(addGenre)
movieRouter
  .route('/:movieId/characters')
  .all(requireSignin, validateIDParamsMovieCharacter)
  .patch(addCharacterToMovie)
export { movieRouter }
