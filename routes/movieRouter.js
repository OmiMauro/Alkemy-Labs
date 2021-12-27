import { Router } from 'express'
import { uploadFile } from '../services/uploadFiles.js'
import {
  validatePostMovie,
  validateIDParamsMovieCharacter,
  validateIDParams,
  validateIdFk
} from '../middlewares/validationMovie.js'
import { requireSignin } from '../controllers/authController.js'
// method for verify authentication for access all routes
import {
  createMovie,
  updateMovie,
  getMovie,
  deleteMovie,
  getAllMovies,
  patchGenreFK,
  updateMovieAndCharacter
} from '../controllers/movieController.js'
const movieRouter = Router()

movieRouter
  .route('/')
  .all(requireSignin)
  .get(getAllMovies)
  .post(uploadFile.single('image'), validatePostMovie, createMovie)
movieRouter
  .route('/:id')
  .all(requireSignin, validateIDParams)
  .get(getMovie)
  .put(updateMovie)
  .delete(deleteMovie)
movieRouter
  .route('/:id/genres')
  .all(requireSignin, validateIDParams, validateIdFk)
  .patch(patchGenreFK)
movieRouter
  .route('/:movieId/character/:characterId')
  .all(requireSignin, validateIDParamsMovieCharacter)
  .put(updateMovieAndCharacter)
export { movieRouter }
