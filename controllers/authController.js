import { User } from '../models/User.js'
import bcrypt from 'bcrypt'
import jsonwebtoken from 'jsonwebtoken'
import expressJWT from 'express-jwt'
const loginUser = async (req, res) => {
  const { email, password } = req.body
  if (email && password) {
    const user = await User.findOne({ where: { email } })
    if (!(user && comparePassword(password, user.hashedPassword))) {
      return res
        .status(404)
        .json({ error: 'The email or password wrong. Please try only time' })
    }
    const payload = {
      email: user.email,
      name: user.name,
      username: user.username,
      userId: user._id
    }
    const token = await jsonwebtoken.sign(payload, process.env.SECRET_KEY)
    res.status(200).json({ msg: 'The login was logged saccesfully', token })
  }
}
const registerUser = async (req, res) => {
  const { email, password, username, name } = req.body
  const user = await User.create({
    email,
    hashedPassword: password,
    username,
    name
  })
  return res.status(201).json({
    msg: 'The user was logged saccesfully',
    user: { email, username, name }
  })
}

const logout = (req, res) => {
  res.clearCookie('t')
  res.json({ msg: 'A cerrado su sesion' })
}
const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword)
}

const requireSignin = expressJWT({
  algorithms: ['HS256'],
  secret: process.env.SECRET_KEY
})
export { loginUser, registerUser, logout, requireSignin }