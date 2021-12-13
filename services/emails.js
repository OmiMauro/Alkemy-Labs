import { createTransport } from 'nodemailer'
// transporter reusable object
const user = process.env.EMAIL_MSG
const pass = process.env.PASS_MSG
const port = process.env.PORT_MSG
const host = process.env.HOST_MSG

const transporter = createTransport({
  host,
  port,
  auth: {
    user,
    pass
  }
})

export { transporter }
