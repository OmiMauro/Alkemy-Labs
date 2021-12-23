import { check } from 'express-validator'

const title = check(
  'title',
  'Debe ingresar un titulo valido entre 3 y 50 letras'
)
  .notEmpty()
  .isLength({ min: 3, max: 50 })
const rating = check('rating', 'Debe ingresar un rating entre 1 y 5.')
  .notEmpty()
  .isIn(['1', '2', '3', '4', '5'])
const dateCreated = check(
  'dateCreated',
  'Debe ingresar una fecha valida con el siguiente formato YYYY-MM-DD'
)
  .notEmpty()
  .isDate()

const validatePostMovie = [title, rating, dateCreated]
export { validatePostMovie }
