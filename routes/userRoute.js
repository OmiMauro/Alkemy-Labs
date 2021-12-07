import { Router } from 'express'
// method for verify authentication for access all routes
const userRouter = Router()

userRouter.get('/', (req, res) => {})
userRouter.patch('/', (req, res) => {})
userRouter.post('/', (req, res) => {})
userRouter.delete('/', (req, res) => {})

export { userRouter }
