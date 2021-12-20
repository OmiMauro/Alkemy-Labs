import sequelize from 'sequelize/dist/index.js'
import moment from 'moment'
import { Character } from '../models/Character.js'
import { Movies } from '../models/Movies.js'
const { where, Op } = sequelize

const createCharacter = async (req, res) => {
  const { name, dateBirth, weigth, history } = req.body
  console.log(req.file)
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
  res.status(201).json({ character })
}

const updateCharacter = async (req, res) => {
  const { id } = req.params
  const { userId: updatedBy } = req.user
  const { name, dateBirth, weigth, history } = req.body
  const character = await Character.update(
    {
      name,
      dateBirth,
      weigth,
      history,
      updatedBy
    },
    {
      where: { _id: id }
    }
  )
  res.status(201).json({ character })
}

const getCharacter = async (req, res) => {
  const { id } = req.params
  const character = await Character.findByPk(id, {
    include: 'Movies'
  })
  res.status(200).json({ character })
}
const deleteCharacter = async (req, res) => {
  const { id } = req.params
  const character = await Character.destroy({ where: { _id: id } })
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

  res.status(200).json({ character })
}

const updateCharacterAndMovie = async (req, res) => {
  const { characterId, movieId } = req.params
  const characterFind = await Character.findByPk(characterId)
  const movieFind = await Movies.findByPk(movieId)
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
