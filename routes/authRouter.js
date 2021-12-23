import { Router } from 'express'
import { loginUser, registerUser } from '../controllers/authController.js'
import {
  validateLogin,
  validateRegister
} from '../middlewares/validationAuth.js'
const authRouter = Router()

authRouter.post('/register', validateRegister, registerUser)
authRouter.post('/login', validateLogin, loginUser)
export { authRouter }
