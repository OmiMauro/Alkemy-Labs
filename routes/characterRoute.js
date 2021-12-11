import { Router } from 'express'
import {
  createCharacter,
  updateCharacter,
  getCharacter,
  deleteCharacter,
  getAllCharacters
} from '../controllers/characterController.js'

import { uploadFile } from '../services/uploadFiles.js'

import { requireSignin } from '../controllers/authController.js'
const characterRouter = Router()

characterRouter
  .route('/')
  .all(requireSignin)
  .get(getAllCharacters)
  .post(uploadFile.single('image'), createCharacter)

characterRouter
  .route('/:id')
  .all(requireSignin)
  .put(updateCharacter)
  .delete(deleteCharacter)
  .get(getCharacter)

export { characterRouter }
