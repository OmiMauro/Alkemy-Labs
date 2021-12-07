import { Router } from 'express'
import {
  createCharacter,
  updateCharacter,
  getCharacter,
  deleteCharacter,
  getAllCharacters
} from '../controllers/characterController.js'
// method for verify authentication for access all routes

const characterRouter = Router()
characterRouter.get('/character', getCharacter)
characterRouter.put('/character/:id', updateCharacter)
characterRouter.post('/character', createCharacter)
characterRouter.delete('/character/:id', deleteCharacter)

characterRouter
  .route('/character')
  .get(getAllCharacters)
  .post(createCharacter)

characterRouter
  .route('/character/:id')
  .put(updateCharacter)
  .delete(deleteCharacter)
  .get(getCharacter)

export { characterRouter }
