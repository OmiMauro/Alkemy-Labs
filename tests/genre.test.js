import { server, app } from '../index.js'
import request from 'supertest'
import { expect } from 'chai'
const api = request(app)
const url = '/api/v1/genres'
describe('Testing Genres', () => {
  let token
  let id
  before(async () => {
    const res = await api.post('/api/v1/auth/login').send({
      email: 'emailuser@gmail.com',
      password: 'password1'
    })
    token = 'Bearer ' + res.body.token
  })
  it('#GET ALL GENRES ', async () => {
    const res = await api.get(url).set('Authorization', token)
    expect(res.statusCode).equal(200)
    expect(res.body).to.have.property('genres')
    expect(res.body.genres).to.be.an('array')
  })
  it('#POST One genre, must be return statusCode 201', async () => {
    const res = await api
      .post(url)
      .set('Authorization', token)
      .attach('image', 'tests/documental.jpg')
      .field('name', 'Piratas del Caribe 2')
    expect(res.statusCode).equal(201)
    expect(res.body.genre.name).to.be.equal('Piratas del Caribe 2')
    expect(res.body.genre.image).to.not.be.empty
    id = res.body.genre.id
  })
  it('', async () => {})
})
