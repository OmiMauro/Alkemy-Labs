import { User } from '../models/User.js'
import bcrypt from 'bcrypt'
import jsonwebtoken from 'jsonwebtoken'
const registerUser = async (req, res) => {
  const { email, password, username, name } = req.body
  const user = await User.create({
    email,
    hashedPassword: password,
    username,
    name,
    userId: user._id
  })
  return res.status(201).json({
    msg: 'The user was logged saccesfully',
    user: { email, username, name }
  })
}

const getUserBy = async (req, res) => {}
const deleteUser = async (req, res) => {}

export { registerUser, loginUser, getUser, deleteUser }
