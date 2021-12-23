import { CustomAPIError } from './CustomAPIError.js'
import { StatusCodes } from 'http-status-codes'
class NotFound extends CustomAPIError {
  constructor (message) {
    super(message)
    this.statusCode = StatusCodes.NOT_FOUND
  }
}

export { NotFound }
