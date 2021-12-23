import { check } from 'express-validator'

const name = check('name', 'Debe ingresar un name valido mayor que 3 letras')
  .notEmpty()
  .isLength({ min: 3 })
const weigth = check('weigth', 'Debe ingresar un peso mayor que 1')
  .notEmpty()
  .isFloat({ gt: 1 })
const history = check(
  'history',
  'Debe la historia del personaje entre 10 y 200 caracteres'
)
  .notEmpty()
  .isLength({ min: 10, max: 200 })

const validatePostCharacter = [name, weigth, history]
export { validatePostCharacter }
