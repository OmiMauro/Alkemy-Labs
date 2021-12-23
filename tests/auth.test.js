import { expect } from 'chai'
import request from 'supertest'
import { app, server, User } from '../index.js'

const api = request(app)
describe('Test /api/v1/auth', () => {
  before(async () => {
    await User.destroy({ where: { email: 'emailuser@gmail.com' } })
  })
  it('/register Response 201-Create user with email, pwd, name and username.', async () => {
    const res = await api.post('/api/v1/auth/register').send({
      name: 'nameuser',
      username: 'username',
      email: 'emailuser@gmail.com',
      password: 'password1'
    })
    // expect(res).to.have.property('user')
    expect(res.statusCode).to.be.equal(201)
    expect(res.body.user.name).to.be.equal('nameuser')
    expect(res.body.user.username).to.be.equal('username')
    expect(res.body.user.email).to.be.equal('emailuser@gmail.com')
    expect(res.body.user.password).not.to.equal('password1')
  })
  it('/login - Response 201- user login with email and password registers', async () => {
    const res = await api.post('/api/v1/auth/login').send({
      email: 'emailuser@gmail.com',
      password: 'password1'
    })
    expect(res.statusCode).equal(201)
    expect(res.body.msg).to.be.equal('The user was logged saccesfully')
    expect(res.body.token).to.not.be.undefined

    // expect(res.body.token).not.be(undefined)
    // this is because I'am not secure length of token
    /* expect(res.body.token).to.be.length.greaterThan(15) */
  })
  it('/login - Response 401 - user login with email and password registers wrong', async () => {
    const res = await api.post('/api/v1/auth/login').send({
      email: 'mailuser@gmail.com',
      password: 'password1'
    })
    expect(res.statusCode).equal(401)
    expect(res.body.msg).to.be.equal('The email or password is wrong')

    // expect(res.body.token).not.be(undefined)
    // this is because I'am not secure length of token
    /* expect(res.body.token).to.be.length.greaterThan(15) */
  })
})
