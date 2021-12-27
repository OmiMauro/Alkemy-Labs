import { check, param } from 'express-validator'

const name = check('name', 'Debe ingresar un name valido mayor que 3 letras')
  .notEmpty()
  .isLength({ min: 3 })
  .trim()
  .toUpperCase()
const weigth = check('weigth', 'Debe ingresar un peso mayor que 1')
  .notEmpty()
  .isFloat({ gt: 1 })
const history = check(
  'history',
  'Debe la historia del personaje entre 10 y 200 caracteres'
)
  .notEmpty()
  .isLength({ min: 10, max: 200 })
  .trim()
  .toUpperCase()

const id = param('id', 'Debe ingresar el ID')
  .notEmpty()
  .isUUID()
const characterId = param('characterId', 'Debe ingresar el ID del personaje')
  .notEmpty()
  .isUUID()
const movieId = param('movieId', 'Debe ingresar el ID de la pelicula')
  .notEmpty()
  .isUUID()
const validateIDParams = [id]
const validateIDParamsMovieCharacter = [characterId, movieId]
const validatePostCharacter = [name, weigth, history]

export {
  validatePostCharacter,
  validateIDParams,
  validateIDParamsMovieCharacter
}
