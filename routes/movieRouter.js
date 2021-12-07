import { Router } from 'express'
// method for verify authentication for access all routes
const movieRouter = Router()
movieRouter.get('/', (req, res) => {})
movieRouter.patch('/', (req, res) => {})
movieRouter.post('/', (req, res) => {})
movieRouter.delete('/', (req, res) => {})

export { movieRouter }
