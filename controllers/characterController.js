import { where } from 'sequelize/dist'
import { Character } from '../models/Character.js'
const createCharacter = async (req, res) => {
  const character = await Character.create(req.body)

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
  const characters = await Character.findAll({ attributes: [''] })
  res.status(201).json({ characters })
}
export {
  createCharacter,
  updateCharacter,
  getCharacter,
  getAllCharacters,
  deleteCharacter
}
