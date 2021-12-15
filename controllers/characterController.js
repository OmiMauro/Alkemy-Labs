import sequelize from 'sequelize/dist/index.js'
import moment from 'moment'
import { Character } from '../models/Character.js'
const { where, Op } = sequelize

const createCharacter = async (req, res) => {
  const { name, dateBirth, weigth, history, movies_fk } = req.body
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
  const { name, dateBirth, weigth, history, movies_fk } = req.body
  const character = await Character.update(
    {
      name,
      dateBirth,
      weigth,
      history,
      updatedBy,
      movies_fk
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
    include: { all: true, nested: true }
  })
  res.status(200).json({ character })
}
const deleteCharacter = async (req, res) => {
  const { id } = req.params
  const character = await Character.destroy({ where: { _id: id } })
  res.status(201).json({ character })
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
  const character = await Character.findAll(
    { where: queryObj },
    { atributtes: ['name', 'image'] }
  )
  res.status(200).json({ character })
}
export {
  createCharacter,
  updateCharacter,
  getCharacter,
  getAllCharacters,
  deleteCharacter
}
