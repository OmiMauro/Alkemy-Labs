import { Genre } from '../models/Genre.js'
const createGenre = async (req, res) => {
  const { userId: createdBy } = req.user
  const { path } = req.file
  const { name } = req.body
  const genre = await Genre.create({
    name,
    createdBy,
    image: path
  })
  res.status(201).json({ genre })
}
const updateGenre = async (req, res) => {
  const { userId } = req.user
  const { id } = req.params
  const { name } = req.body
  console.log(id, name, userId)
  const genre = await Genre.update(
    { name },
    {
      where: { _id: id }
    }
  )
  console.log(genre)
  res.status(201).json({ genre })
}
const getGenre = async (req, res) => {
  const { id } = req.params
  const genre = await Genre.findByPk(id)
  res.status(200).json({ genre })
}
const deleteGenre = async (req, res) => {
  const { id } = req.params
  const genre = await Genre.destroy({ where: { _id: id } })
  res.status(200).json({ genre })
}
const getAllGenres = async (req, res) => {
  const genres = await Genre.findAll()
  res.status(200).json({ genres })
}
export { createGenre, updateGenre, getGenre, deleteGenre, getAllGenres }
