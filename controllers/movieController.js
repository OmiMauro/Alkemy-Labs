import { Movies } from '../models/Movies.js'
import { Genre } from '../models/Genre.js'

const createMovie = async (req, res) => {
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
  const movie = await Movies.findByPk(id)
  res.status(201).json({ movie })
}
const deleteMovie = async (req, res) => {
  const { id } = req.params
  const movie = await Movies.destroy({ where: { _id: id } })
  res.status(201).json({ movie })
}
const getAllMovies = async (req, res) => {
  const movies = await Movies.findAll({
    include: 'Genres'
  })
  res.status(201).json({ movies })
}
export { createMovie, updateMovie, getMovie, deleteMovie, getAllMovies }
