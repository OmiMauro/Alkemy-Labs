import sequelize from 'sequelize/dist/index.js'
import moment from 'moment'
import { Character } from '../models/Character.js'
import { Movies } from '../models/Movies.js'
import { StatusCodes } from 'http-status-codes'
import { ValidateData } from '../errors/ValidateData.js'
import { validationResult } from 'express-validator'
import { NotFound } from '../errors/NotFound.js'
import { BadRequest } from '../errors/BadRequest.js'
const { where, Op } = sequelize

const createCharacter = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    throw new ValidateData('Validation Failed', errors.array())
  }
  const { name, dateBirth, weigth, history } = req.body
  const { path } = req.file
  const { userId: createdBy } = req.user
  const character = await Character.create({
    name,
    dateBirth,
    weigth,
    history,
    image: path,
    createdBy
  })
  if (!character) {
    throw new NotFound(
      'No se pudo crear un personaje con los datos ingresados.'
    )
  }
  res.status(201).json({ character })
}

const updateCharacter = async (req, res) => {
  const { id } = req.params
  // const { userId: updatedBy } = req.user
  const { name, dateBirth, weigth, history } = req.body
  const [character] = await Character.update(
    {
      name,
      dateBirth,
      weigth,
      history
    },
    {
      where: { _id: id }
    }
  )
  console.log(character)
  if (!character) {
    throw new NotFound('No se encontró un personaje con el ID ingresado')
  }
  res.status(201).json({ character })
}

const getCharacter = async (req, res) => {
  const { id } = req.params
  const character = await Character.findByPk(id, {
    include: 'Movies'
  })
  if (!character) {
    throw new NotFound('No se encontró un personaje con el ID ingresado')
  }
  res.status(200).json({ character })
}
const deleteCharacter = async (req, res) => {
  const { id } = req.params
  const character = await Character.destroy({ where: { _id: id } })
  console.log(character)
  if (!character) {
    throw new NotFound('No se encontró un personaje con el ID ingresado')
  }
  res.status(200).json({ character })
}
const getAllCharacters = async (req, res) => {
  const { name, age, weigth, movies } = req.query
  const queryObj = {}

  if (name) queryObj.name = { [Op.regexp]: name }
  if (weigth) queryObj.weigth = weigth
  if (age) {
    const date = moment().add(-age, 'year')
    queryObj.dateBirth = { [Op.gte]: date }
  }
  if (movies) {
    const include = [{ model: Movies, as: 'Movies', where: { _id: movies } }]
    const character = await Character.findAll(
      { include },
      { where: queryObj },
      { atributtes: ['name', 'image'] }
    )
    return res.status(200).json({ character })
  }
  const character = await Character.findAll(
    { where: queryObj },
    { atributtes: ['name', 'image'] }
  )
  if (!character) {
    throw new NotFound('No se encontró un personaje con la busqueda asociada')
  }
  res.status(200).json({ character })
}

const updateCharacterAndMovie = async (req, res) => {
  const { characterId, movieId } = req.params
  const characterFind = await Character.findByPk(characterId)
  if (!characterFind) {
    throw new NotFound('No se encontró un personaje con el ID ingresado')
  }
  const movieFind = await Movies.findByPk(movieId)
  if (!movieFind) {
    throw new NotFound('No se encontró una pelicula/serie con el ID ingresado')
  }
  const character = await characterFind.setMovies(movieFind)
  res.status(201).json({ character })
}
export {
  createCharacter,
  updateCharacter,
  getCharacter,
  getAllCharacters,
  deleteCharacter,
  updateCharacterAndMovie
}
