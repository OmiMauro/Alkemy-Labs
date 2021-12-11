import { Router } from 'express'
import { requireSignin } from '../controllers/authController.js'
// method for verify authentication for access all routes
import {
  createGenre,
  updateGenre,
  getGenre,
  deleteGenre,
  getAllGenres
} from '../controllers/genreController.js'
const genreRouter = Router()

genreRouter
  .route('/')
  .all(requireSignin)
  .get(getAllGenres)
  .post(createGenre)
genreRouter
  .route('/:id')
  .all(requireSignin)
  .get(getGenre)
  .put(updateGenre)
  .delete(deleteGenre)
export { genreRouter }
