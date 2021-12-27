import { check, param } from 'express-validator'

const name = check('name', 'Debe ingresar un name valido mayor que 3 letras')
  .notEmpty()
  .isLength({ min: 3, max: 50 })
  .trim()
  .toUpperCase()

const id = param('id', 'Debe ingresar un ID')
  .notEmpty()
  .isUUID()

const validateIDParams = [id]

const validatePostGenre = [name]
export { validatePostGenre, validateIDParams }
