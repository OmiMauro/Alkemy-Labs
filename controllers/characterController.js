import sequelize from 'sequelize/dist/index.js'
import { Character } from '../models/Character.js'
const { where } = sequelize
const createCharacter = async (req, res) => {
  console.log(req.user)
  const { name, dateBirth, weigth, history } = req.body
  const { path } = req.file
  // const { userId } = req.user
  const character = await Character.create({
    name,
    dateBirth,
    weigth,
    history,
    image: path
    /* createdBy: userId */
  })
  res.status(201).json({ character })
}
const updateCharacter = async (req, res) => {
  const { id } = req.params
  const character = await Character.update(req.body, {
    where: { _id: id }
  })
  res.stutus(201).json({ character })
}
const getCharacter = async (req, res) => {
  const { id } = req.params
  const character = await Character.findByPk(id)
  res.status(201).json({ character })
}
const deleteCharacter = async (req, res) => {
  const { id } = req.params
  const character = await Character.destroy({ where: { _id: id } })
  res.status(201).json({ character })
}
const getAllCharacters = async (req, res) => {
  const character = await Character.findAll()
  console.log(req.user)
  res.status(200).json({ character })
}
export {
  createCharacter,
  updateCharacter,
  getCharacter,
  getAllCharacters,
  deleteCharacter
}
