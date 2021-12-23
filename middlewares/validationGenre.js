import { check } from 'express-validator'

const name = check('name', 'Debe ingresar un name valido mayor que 3 letras')
  .notEmpty()
  .isLength({ min: 3 })

const validatePostGenre = [name]
export { validatePostGenre }
