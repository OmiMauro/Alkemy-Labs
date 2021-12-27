import { Router } from 'express'
import {
  createCharacter,
  updateCharacter,
  getCharacter,
  deleteCharacter,
  getAllCharacters,
  updateCharacterAndMovie
} from '../controllers/characterController.js'

import { uploadFile } from '../services/uploadFiles.js'
import {
  validatePostCharacter,
  validateIDParams,
  validateIDParamsMovieCharacter
} from '../middlewares/validationCharacter.js'
import { requireSignin } from '../controllers/authController.js'

const characterRouter = Router()

characterRouter
  .route('/')
  .all(requireSignin)
  .get(getAllCharacters)
  .post(uploadFile.single('image'), validatePostCharacter, createCharacter)

characterRouter
  .route('/:id')
  .all(requireSignin, validateIDParams)
  .put(updateCharacter)
  .delete(deleteCharacter)
  .get(getCharacter)
characterRouter
  .route('/:characterId/movies/:movieId')
  .all(requireSignin, validateIDParamsMovieCharacter)
  .put(updateCharacterAndMovie)
export { characterRouter }
