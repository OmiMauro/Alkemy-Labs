import { StatusCodes } from 'http-status-codes'
import { CustomAPIError } from './CustomAPIError.js'

class ValidateData extends CustomAPIError {
  constructor (message, data) {
    super(message)
    this.statusCode = StatusCodes.BAD_REQUEST
    this.name = 'ValidationError'
    this.data = data
  }
}
export { ValidateData }
