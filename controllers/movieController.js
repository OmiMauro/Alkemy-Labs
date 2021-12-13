import { Movies } from '../models/Movies.js'
const createMovie = async (req, res) => {
  const { userId } = req.user
  const { path } = req.file
  const { title, dateCreated, rating } = req.body
  const movie = await Movies.create({
    title,
    dateCreated,
    rating,
    createdBy: userId,
    image: path || ''
  })
  res.status(201).json({ movie })
}

const updateMovie = async (req, res) => {
  const { id } = req.params
  const { title, dateCreated, rating } = req.body
  // const { path } = req.file
  const { userId } = req.user

  const movie = await Movies.update(
    {
      title,
      dateCreated,
      rating,
      updatedBy: userId
      // image: path || ''
    },
    {
      where: { _id: id }
    }
  )
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
