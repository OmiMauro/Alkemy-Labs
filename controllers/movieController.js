import { Movies } from '../models/Movies.js'
import { Genre } from '../models/Genre.js'
import { Character } from '../models/Character.js'
import sequelize from 'sequelize/dist/index.js'
import { validationResult } from 'express-validator'
import { StatusCodes } from 'http-status-codes'
import { ValidateData } from '../errors/ValidateData.js'

const { where, Op } = sequelize
const createMovie = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    throw new ValidateData('Validation Failed', errors.array())
  }
  const { userId: createdBy } = req.user
  const { path } = req.file
  const { title, dateCreated, rating, genres_fk } = req.body
  const movie = await Movies.create({
    title,
    dateCreated,
    rating,
    createdBy,
    image: path || '',
    genres_fk
  })
  res.status(201).json({ movie })
}

const updateMovie = async (req, res) => {
  const { id } = req.params
  const movieUpdate = {}
  const { title, dateCreated, rating, genres_fk } = req.body
  // const { path: image } = req.file
  const { userId: updatedBy } = req.user
  const movie = await Movies.update(
    {
      title,
      dateCreated,
      rating,
      updatedBy,
      genres_fk
      /* image */
    },
    {
      where: { _id: id }
    }
  )

  res.status(201).json({ movie })
}
const getMovie = async (req, res) => {
  const { id } = req.params
  const movie = await Movies.findByPk(id, {
    include: 'Characters'
  })
  res.status(200).json({ movie })
}
const deleteMovie = async (req, res) => {
  const { id } = req.params
  const movie = await Movies.destroy({ where: { _id: id } })
  res.status(201).json({ movie })
}
const getAllMovies = async (req, res) => {
  const { title, genre, order } = req.query
  const queryObj = {}
  let orderParams = ['createdAt', 'DESC']
  if (title) queryObj.title = { [Op.regexp]: title }
  if (genre) queryObj.genre = { [Op.eq]: genre }
  if (order) orderParams = ['dateCreated', order]
  const movies = await Movies.findAll({
    atributtes: ['title', 'image', 'dateCreated'],
    where: queryObj,
    order: [orderParams]
  })
  res.status(200).json({ movies })
}
const updateMovieAndCharacter = async (req, res) => {
  const { characterId, movieId } = req.params
  const character = await Character.findByPk(characterId)
  const movieFind = await Movies.findByPk(movieId)
  const movie = await movieFind.setCharacters(character)
  res.status(201).json({ movie })
}

export {
  createMovie,
  updateMovie,
  getMovie,
  deleteMovie,
  getAllMovies,
  updateMovieAndCharacter
}
