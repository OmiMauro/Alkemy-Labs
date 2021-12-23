import { StatusCodes } from 'http-status-codes'

const errorHandler = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Try again later'
  }
  if (err.name === 'UnauthorizedError') {
    customError.msg =
      'El Token ingresado no es valido. Por favor, ingrese nuevamente su session'
    customError.statusCode = StatusCodes.UNAUTHORIZED
  }
  if (err.name === 'ValidationError') {
    customError.msg = [customError.msg, ...err.data]
  }

  if (
    err.name === 'SequelizeForeignKeyConstraintError' &&
    err.parent.code === '23503'
  ) {
    customError.msg = `Está intentando ingresar datos donde no se cumple con la condición de clave foránea en ${err.parent.constraint}`
  }
  if (
    err.name === 'SequelizeDatabaseError' &&
    err.parent.code &&
    err.parent.code === '22P02'
  ) {
    customError = {
      statusCode: StatusCodes.BAD_REQUEST,
      msg: `La clave ingresada como parametro de busqueda no es valida. ${err.message}`
    }
  } else if (
    err.name === 'SequelizeDatabaseError' &&
    err.parent.code &&
    err.parent.code === '42703'
  ) {
    customError = {
      statusCode: StatusCodes.NOT_FOUND,
      msg: err.message
    }
  }
  return res.status(customError.statusCode).json({ msg: customError.msg })
}
export { errorHandler }
