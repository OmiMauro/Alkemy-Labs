import { check, param } from 'express-validator'

const title = check(
  'title',
  'Debe ingresar un titulo valido entre 3 y 50 letras'
)
  .notEmpty()
  .isLength({ min: 3, max: 50 })
  .trim()
  .toUpperCase()
const rating = check('rating', 'Debe ingresar un rating entre 1 y 5.')
  .notEmpty()
  .isIn(['1', '2', '3', '4', '5'])
const dateCreated = check(
  'dateCreated',
  'Debe ingresar una fecha valida con el siguiente formato YYYY-MM-DD'
)
  .notEmpty()
  .isDate()

const id = param('id', 'Debe ingresar un ID')
  .notEmpty()
  .isUUID()

const characterId = param('characterId', 'Debe ingresar el ID del personaje')
  .notEmpty()
  .isUUID()
const movieId = param('movieId', 'Debe ingresar el ID de la pelicula')
  .notEmpty()
  .isUUID()
const genreFk = check('genres_fk', 'Debe ingresar el id del genero')
  .notEmpty()
  .isUUID()

const validateIdFk = [genreFk]
const validateIDParams = [id]
const validateIDParamsMovieCharacter = [movieId, characterId]
const validatePostMovie = [title, rating, dateCreated]
export {
  validatePostMovie,
  validateIDParams,
  validateIDParamsMovieCharacter,
  validateIdFk
}
