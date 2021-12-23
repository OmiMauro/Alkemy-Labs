import { StatusCodes } from 'http-status-codes'

const errorHandler = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Try again later'
  }
  if (
    err.name === 'SequelizeDatabaseError' &&
    err.parent.code &&
    err.parent.code === '22P02'
  ) {
    customError = {
      statusCode: StatusCodes.BAD_REQUEST,
      msg: err.message
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
