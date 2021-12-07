import { Router } from 'express'
// method for verify authentication for access all routes
const genreRouter = Router()

genreRouter.get('/', (req, res) => {})
genreRouter.patch('/', (req, res) => {})
genreRouter.post('/', (req, res) => {})
genreRouter.delete('/', (req, res) => {})

export { genreRouter }
