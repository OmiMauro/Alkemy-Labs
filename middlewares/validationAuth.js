import { check } from 'express-validator'

const email = check('email', 'Debe ingresar un email valido')
  .notEmpty()
  .isEmail()
  .trim()
  .toUpperCase()
const name = check('name', 'Debe ingresar un nombre')
  .notEmpty()
  .isLength({ min: 3 })
  .trim()
  .toUpperCase()
const username = check('username', 'Debe ingresar un nombre')
  .notEmpty()
  .isLength({ min: 3 })
  .trim()
  .toUpperCase()
const password = check('password', 'Debe ingresar una contaseña valida ')
  .notEmpty()
  .isLength({ min: 3 })

const validateLogin = [email, password]
const validateRegister = [email, name, username, password]

export { validateLogin, validateRegister }
