import { Router } from 'express'
import {
  loginUser,
  registerUser,
  logout
} from '../controllers/authController.js'
const authRouter = Router()

authRouter.post('/register', registerUser)
authRouter.post('/login', loginUser)
authRouter.post('/logout', logout)
export { authRouter }
