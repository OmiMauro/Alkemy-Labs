import { Router } from 'express'
import { uploadFile } from '../services/uploadFiles.js'

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
  .post(uploadFile.single('image'), createGenre)
genreRouter
  .route('/:id')
  .all(requireSignin)
  .get(getGenre)
  .put(updateGenre)
  .delete(deleteGenre)
export { genreRouter }
