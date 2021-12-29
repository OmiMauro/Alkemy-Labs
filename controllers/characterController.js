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
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    throw new ValidateData('Validation Failed', errors.array())
  }
  const { id } = req.params
  const { userId: updatedBy } = req.user
  const { path } = req.file

  const { name, dateBirth, weigth, history } = req.body
  const [character] = await Character.update(
    {
      name,
      dateBirth,
      weigth,
      history,
      image: path,
      updatedBy
    },
    {
      where: { _id: id }
    }
  )
  if (!character) {
    throw new NotFound('No se encontró un personaje con el ID ingresado')
  }
  res.status(201).json({ character })
}

const getCharacter = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    throw new ValidateData('Validation Failed', errors.array())
  }
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
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    throw new ValidateData('Validation Failed', errors.array())
  }
  const { id } = req.params
  const character = await Character.destroy({ where: { _id: id } })
  if (!character) {
    throw new NotFound('No se encontró un personaje con el ID ingresado')
  }
  res.status(200).json({ character })
}
const getAllCharacters = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    throw new ValidateData('Validation Failed', errors.array())
  }
  const { name, age, weigth, movies } = req.query
  const queryObj = {}
  if (name) queryObj.name = { [Op.iRegexp]: name }
  if (weigth) queryObj.weigth = weigth
  if (age) {
    const date = moment().add(-age, 'year')
    queryObj.dateBirth = { [Op.lte]: date.toDate() }
  }
  let character
  const atributtes = ['name', 'image']
  if (movies) {
    const include = [{ model: Movies, as: 'Movies', where: { _id: movies } }]
    character = await Character.findAll(
      { include },
      { where: queryObj },
      { atributtes }
    )
  } else {
    character = await Character.findAll({ where: queryObj }, { atributtes })
  }

  if (character.length === 0) {
    throw new NotFound('No se encontró un personaje con la busqueda asociada')
  }
  res.status(200).json({ character })
}

const addMovieToCharacter = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    throw new ValidateData('Validation Failed', errors.array())
  }
  const { userId: updatedBy } = req.user
  const { characterId } = req.params
  const { movieId } = req.body
  const characterFind = await Character.findByPk(characterId)
  const movieFind = await Movies.findByPk(movieId)
  if (!characterId || !movieFind) {
    throw new NotFound(
      `No se encontró un ${characterId ? 'personaje' : ''}${
        movieFind ? 'a pelicula/serie' : ''
      } con el id ingresado`
    )
  }
  const character = await characterFind.addMovies(movieFind)
  await characterFind.update({ updatedBy })
  res.status(201).json({ character })
}
export {
  createCharacter,
  updateCharacter,
  getCharacter,
  getAllCharacters,
  deleteCharacter,
  addMovieToCharacter
}
