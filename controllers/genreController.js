import { Genre } from '../models/Genre.js'
const createGenre = async (req, res) => {
  const genre = await Genre.create(req.body)

  res.status(201).json({ genre })
}
const updateGenre = async (req, res) => {
  const { id } = req.params
  const genre = await Genre.update(req.body, {
    where: { _id: id }
  })
  res.stutus(201).json({ genre })
}
const getGenre = async (req, res) => {
  const { id } = req.params
  const genre = await Genre.findByPk(id)
  res.status(201).json({ genre })
}
const deleteGenre = async (req, res) => {
  const { id } = req.params
  const genre = await Genre.destroy({ where: { _id: id } })
  res.status(201).json({ genre })
}
const getAllGenres = async (req, res) => {
  const genres = await Genre.findAll({ attributes: [''] })
  res.status(201).json({ genres })
}
export { createGenre, updateGenre, getGenre, deleteGenre, getAllGenres }
