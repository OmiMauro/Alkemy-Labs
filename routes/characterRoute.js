import { Router } from 'express'
import {
  createCharacter,
  updateCharacter,
  getCharacter,
  deleteCharacter,
  getAllCharacters,
  addMovieToCharacter
} from '../controllers/characterController.js'

import { uploadFile } from '../services/uploadFiles.js'
import {
  validateCharacter,
  validateIDParams,
  validateCharacterId
} from '../middlewares/validationCharacter.js'
import { requireSignin } from '../controllers/authController.js'

const characterRouter = Router()

characterRouter
  .route('/')
  .all(requireSignin)
  .get(getAllCharacters)
  .post(uploadFile.single('image'), validateCharacter, createCharacter)

characterRouter
  .route('/:id')
  .all(requireSignin, validateIDParams)
  .put(uploadFile.single('image'), validateCharacter, updateCharacter)
  .delete(deleteCharacter)
  .get(getCharacter)
characterRouter
  .route('/:characterId/movies')
  .all(requireSignin, validateCharacterId)
  .patch(addMovieToCharacter)
export { characterRouter }
