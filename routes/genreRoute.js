import { Router } from 'express'
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
  .route('/genre')
  .get(getAllGenres)
  .post(createGenre)
genreRouter
  .route('/genre/:id')
  .get(getGenre)
  .put(updateGenre)
  .delete(deleteGenre)
export { genreRouter }
