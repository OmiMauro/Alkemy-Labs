import { server, app, Genre } from '../index.js'
import request from 'supertest'
import { expect } from 'chai'
const api = request(app)
const url = '/api/v1/genres'
describe('Testing Genres', () => {
  let token
  let id
  before(async () => {
    await Genre.destroy({ where: {} })
  })
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
    id = res.body.genre._id
  })
  it('#PUT one genre by id, must be return statusCode 201', async () => {
    const res = await api
      .put(`${url}/${id}`)
      .set('Authorization', token)
      .send({ name: 'Piratas del Caribe 5' })
    expect(res.statusCode).to.be.equal(201)
  })
  it('#GET one genre by ID, must be return status 200', async () => {
    const res = await api.get(`${url}/${id}`).set('Authorization', token)
    expect(res.statusCode).equal(200)
    expect(res.body.genre.name).to.be.equal('Piratas del Caribe 5')
    expect(res.body.genre.image).to.not.be.empty
  })
  it('#DELETE one genre by ID, must be return status 200', async () => {
    const res = await api.delete(`${url}/${id}`).set('Authorization', token)
    expect(res.statusCode).equal(200)
  })
})
