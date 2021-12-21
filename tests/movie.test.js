import { expect } from 'chai'
import request from 'supertest'
import { server, app } from '../index.js'

const api = request(app)
const url = '/api/v1/movies'
describe('Test all endpoints of Movies', () => {
  let token
  let id
  before(async () => {
    const res = await api.post('/api/v1/auth/login').send({
      email: 'emailuser@gmail.com',
      password: 'password1'
    })
    token = 'Bearer ' + res.body.token
  })
  it('#GET all movies, response 200', async () => {
    const res = await api.get(url).set('Authorization', token)
    expect(res.statusCode).to.equal(200)
    expect(res.body.movies).to.be.an('array')
  })
  it('#POST one movie, response 201', async () => {
    const res = await api
      .post(url)
      .set('Authorization', token)
      .attach('image', 'tests/piratasdelcaribe.jpg')
      .field('title', 'Piratas del Caribe')
      .field('dateCreated', '2002-05-10')
      .field('rating', '4')

    expect(res.statusCode).to.equal(201)
    expect(res.body).to.have.property('movie')
    expect(res.body.movie.image).to.not.be.empty
    expect(res.body.movie.title).to.equal('Piratas del Caribe')
    // expect(res.body.movie.dateCreated).to.eql('2002-05-10')
    expect(res.body.movie.rating).to.equal('4')
    id = res.body.movie._id
  })
  it('#PUT one movie by ID, response 201', async () => {
    const res = await api.put(`${url}/${id}`).set('Authorization', token)

    expect(res.statusCode).to.equal(201)
  })
  it('#DELETE one movie, response 200', async () => {
    const res = await api.delete(`${url}/${id}`).set('Authorization', token)
    expect(res.statusCode).to.equal(201)
  })
})
