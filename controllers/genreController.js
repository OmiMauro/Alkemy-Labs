import { validationResult } from 'express-validator'
import { StatusCodes } from 'http-status-codes'
import { BadRequest } from '../errors/BadRequest.js'
import { NotFound } from '../errors/NotFound.js'
import { ValidateData } from '../errors/ValidateData.js'
import { Genre } from '../models/Genre.js'
const createGenre = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    throw new ValidateData('Validation Failed', errors.array())
  }
  const { userId: createdBy } = req.user
  const { path } = req.file
  const { name } = req.body
  const genre = await Genre.create({
    name,
    createdBy,
    image: path
  })
  if (!genre) {
    throw new BadRequest('No se pudo crear un género con los datos ingresados.')
  }
  res.status(201).json({ genre })
}
const updateGenre = async (req, res) => {
  const { userId } = req.user
  const { id } = req.params
  const { name } = req.body
  const genre = await Genre.update(
    { name },
    {
      where: { _id: id }
    }
  )
  if (!genre) {
    throw new NotFound('No se encontró un personaje con el ID ingresado')
  }
  res.status(201).json({ genre })
}
const getGenre = async (req, res) => {
  const { id } = req.params
  const genre = await Genre.findByPk(id)
  if (!genre) {
    throw new NotFound('No se encontró un personaje con el ID ingresado')
  }
  res.status(200).json({ genre })
}
const deleteGenre = async (req, res) => {
  const { id } = req.params
  const genre = await Genre.destroy({ where: { _id: id } })
  if (!genre) {
    throw new NotFound('No se encontró un personaje con el ID ingresado')
  }
  res.status(200).json({ genre })
}
const getAllGenres = async (req, res) => {
  const genres = await Genre.findAll()
  if (!genres) {
    throw new NotFound('No se encontró un personaje con el ID ingresado')
  }
  res.status(200).json({ genres })
}
export { createGenre, updateGenre, getGenre, deleteGenre, getAllGenres }
