import bcrypt from 'bcrypt'
import jsonwebtoken from 'jsonwebtoken'
import expressJWT from 'express-jwt'

import { User } from '../models/User.js'
import { transporter } from '../services/emails.js'
import { Unauthenticated } from '../errors/Unauthenticated.js'
import { ValidateData } from '../errors/ValidateData.js'
import { validationResult } from 'express-validator'
import { BadRequest } from '../errors/BadRequest.js'

const loginUser = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    throw new ValidateData('Validation Failed', errors.array())
  }
  const { email, password } = req.body
  const user = await User.findOne({ where: { email } })
  if (!(user && (await bcrypt.compare(password, user.hashedPassword)))) {
    throw new Unauthenticated('The email or password is wrong')
  }
  const payload = {
    email: user.email,
    name: user.name,
    username: user.username,
    userId: user._id
  }
  const token = await jsonwebtoken.sign(payload, process.env.SECRET_KEY, {
    expiresIn: '1d'
  })
  res.status(201).json({ msg: 'The user was logged saccesfully', token })
}

const registerUser = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    throw new ValidateData('Validation Failed', errors.array())
  }
  const { email, password, username, name } = req.body
  const findUser = await User.findOne({ where: { email } })
  if (findUser) {
    return res.status(201).json({
      msg: 'The email is register. Please only login',
      user: { email, username: findUser.username, name: findUser.name }
    })
  }
  const hashedPassword = await bcrypt.hash(password, 9)
  const user = await User.create({
    email,
    hashedPassword,
    username,
    name
  })
  if (!user) {
    throw new BadRequest(
      'No se pudo crear un usuario con los datos ingresados.'
    )
  }
  if (user) {
    const text = 'Register in Challenge Alkemy'
    const from = process.env.EMAIL_MSG
    const html = `<b>Your account ${email} was register succesfully in the server. Thanks for use us services. Great Day!</b>`
    const mailData = {
      from,
      to: email,
      subject: 'Signup in Challenge Alkemy',
      text,
      html
    }
    await transporter.sendMail(mailData)
  }
  return res.status(201).json({
    msg: 'The user was register saccesfully',
    user: { email, username, name }
  })
}

const requireSignin = expressJWT({
  algorithms: ['HS256'],
  secret: process.env.SECRET_KEY,
  credentialsRequired: false
})
export { loginUser, registerUser, requireSignin }
