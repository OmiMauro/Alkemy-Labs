import { Movies } from '../models/Movies.js'
const createMovie = async (req, res) => {
  const movie = await Movies.create(req.body)
  res.status(201).json({ movie })
}

const updateMovie = async (req, res) => {
  const { id } = req.params
  const movie = await Movies.update(req.body, {
    where: { _id: id }
  })
  res.stutus(201).json({ movie })
}
const getMovie = async (req, res) => {
  const { id } = req.params
  const movie = await Movies.findByPk(id)
  res.status(201).json({ movie })
}
const deleteMovie = async (req, res) => {
  const { id } = req.params
  const movie = await Movies.destroy({ where: { _id: id } })
  res.status(201).json({ movie })
}
const getAllMovies = async (req, res) => {
  const movies = await Movies.findAll({ attributes: [''] })
  res.status(201).json({ movies })
}
export { createMovie, updateMovie, getMovie, deleteMovie, getAllMovies }
