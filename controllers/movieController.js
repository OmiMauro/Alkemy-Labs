import { Movies } from '../models/Movies.js'
import { Genre } from '../models/Genre.js'
import { Character } from '../models/Character.js'
import sequelize from 'sequelize/dist/index.js'
import { validationResult } from 'express-validator'
import { StatusCodes } from 'http-status-codes'
import { ValidateData } from '../errors/ValidateData.js'
import { NotFound } from '../errors/NotFound.js'
import { BadRequest } from '../errors/BadRequest.js'

const { where, Op } = sequelize
const createMovie = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    throw new ValidateData('Validation Failed', errors.array())
  }
  const { userId: createdBy } = req.user
  const { path } = req.file
  const { title, dateCreated, rating } = req.body
  const movie = await Movies.create({
    title,
    dateCreated,
    rating,
    createdBy,
    image: path || ''
  })
  if (!movie) {
    throw new BadRequest('No se pudo crear una movie con los datos ingresados.')
  }
  res.status(201).json({ movie })
}

const updateMovie = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    throw new ValidateData('Validation Failed', errors.array())
  }
  const { path } = req.file
  const { id } = req.params
  const { title, dateCreated, rating } = req.body
  const { userId: updatedBy } = req.user
  const movie = await Movies.update(
    {
      title,
      dateCreated,
      rating,
      updatedBy,
      image: path
    },
    {
      where: { _id: id }
    }
  )
  if (!movie) {
    throw new NotFound('No se encontró una movie con el ID ingresado')
  }
  res.status(201).json({ movie })
}
const getMovie = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    throw new ValidateData('Validation Failed', errors.array())
  }
  const { id } = req.params
  const movie = await Movies.findByPk(id, {
    include: 'Characters'
  })
  if (!movie) {
    throw new NotFound('No se encontró una movie con el ID ingresado')
  }
  res.status(200).json({ movie })
}
const deleteMovie = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    throw new ValidateData('Validation Failed', errors.array())
  }
  const { id } = req.params
  const movie = await Movies.destroy({ where: { _id: id } })
  if (!movie) {
    throw new NotFound('No se encontró una movie con el ID ingresado')
  }
  res.status(201).json({ movie })
}
const getAllMovies = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    throw new ValidateData('Validation Failed', errors.array())
  }
  const { title, genre, order } = req.query
  const queryObj = {}
  let orderParams = ['createdAt', 'DESC']
  if (title) queryObj.title = { [Op.iRegexp]: title }
  if (genre) queryObj.genres_fk = { [Op.eq]: genre }
  if (order) orderParams = ['dateCreated', order]
  const movies = await Movies.findAll({
    atributtes: ['title', 'image', 'dateCreated'],
    where: queryObj,
    order: [orderParams]
  })
  if (movies.length === 0) {
    throw new NotFound('No se encontraron movies con la busqueda ingresada')
  }
  res.status(200).json({ movies })
}
const addGenre = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    throw new ValidateData('Validation Failed', errors.array())
  }

  const { userId: updatedBy } = req.user

  const { id: idMovie } = req.params
  const { genres_fk } = req.body
  const movieFind = await Movies.findOne({ where: { _id: idMovie } })

  const genreFind = await Genre.findOne({ where: { _id: genres_fk } })
  if (!genreFind || !movieFind) {
    throw new NotFound(
      `No se encontró un ${genreFind ? 'genero' : ''}${
        movieFind ? 'a pelicula/serie' : ''
      } con el id ingresado`
    )
  }
  const movie = await movieFind.setGenre(genreFind)
  await movieFind.update({ updatedBy })
  res.status(201).json({ movie })
}

const addCharacterToMovie = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    throw new ValidateData('Validation Failed', errors.array())
  }
  const { userId: updatedBy } = req.user
  const { movieId } = req.params
  const { characterId } = req.body
  const movieFind = await Movies.findByPk(movieId)

  const characterFind = await Character.findByPk(characterId)

  if (!movieFind || !characterFind) {
    throw new NotFound(
      `No se encontró un ${!movieFind ? 'a pelicula/serie' : ''}${
        !characterFind ? 'personaje' : ''
      } con el id ingresado`
    )
  }
  console.log(movieFind, characterFind)
  const movie = await movieFind.addCharacters(characterFind)
  await movieFind.update({ updatedBy })
  console.log(movie)

  res.status(201).json({ movie })
}

export {
  createMovie,
  updateMovie,
  getMovie,
  deleteMovie,
  getAllMovies,
  addCharacterToMovie,
  addGenre
}
