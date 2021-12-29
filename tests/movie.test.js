import { expect } from 'chai'
import request from 'supertest'
import { server, app, Movies } from '../index.js'

const api = request(app)
const url = '/api/v1/movies'
describe('Test all endpoints of Movies', () => {
  let token
  let id
  before(async () => {
    await Movies.destroy({ where: {} })
  })
  before(async () => {
    const res = await api.post('/api/v1/auth/login').send({
      email: 'emailuser@gmail.com',
      password: 'password1'
    })
    token = 'Bearer ' + res.body.token
  })
  const createMovie = async () => {
    return await api
      .post(url)
      .set('Authorization', token)
      .attach('image', 'tests/piratasdelcaribe.jpg')
      .field('title', 'PIRATAS DEL CARIBE')
      .field('dateCreated', '2002-05-10')
      .field('rating', '4')
  }

  it('#POST one movie, response 201', async () => {
    const res = await createMovie()
    expect(res.statusCode).to.equal(201)
    expect(res.body).to.have.property('movie')
    expect(res.body.movie.image).to.not.be.empty
    expect(res.body.movie.title).to.equal('PIRATAS DEL CARIBE')
    // expect(res.body.movie.dateCreated).to.eql('2002-05-10')
    expect(res.body.movie.rating).to.equal('4')
    id = res.body.movie._id
  })
  it('#GET one movie by id, response 200', async () => {
    const res = await api.get(`${url}/${id}`).set('Authorization', token)
    expect(res.statusCode).to.be.equal(200)
    expect(res.body).to.have.property('movie')
    expect(res.body.movie.title).to.be.equal('PIRATAS DEL CARIBE')
    expect(res.body.movie.rating).to.equal('4')
  })
  it('#PUT one movie by ID, response 201', async () => {
    const res = await api
      .put(`${url}/${id}`)
      .set('Authorization', token)
      .attach('image', 'tests/piratasdelcaribe.jpg')
      .field('title', 'PIRATAS 5')
      .field('dateCreated', '2015-10-12')
      .field('rating', '2')

    expect(res.statusCode).to.equal(201)
    const getMovie = await api.get(`${url}/${id}`).set('Authorization', token)
    expect(getMovie.body.movie.title).to.be.equal('PIRATAS 5')
    expect(getMovie.body.movie.rating).to.be.equal('2')
    expect(getMovie.body.movie.image).to.be.an('string')
  })
  it('#GET all movies, response 200', async () => {
    const res = await api.get(url).set('Authorization', token)
    expect(res.statusCode).to.equal(200)
    expect(res.body.movies).to.be.an('array')
  })
  it('#DELETE one movie, response 200', async () => {
    const res = await api.delete(`${url}/${id}`).set('Authorization', token)
    expect(res.statusCode).to.equal(201)
  })
  // testing for bad request
  it('DELETE one /movie/:id that no exist. Status Code 400 and msg', async () => {
    const newMovie = await createMovie()
    const { movie } = newMovie.body
    const res = await api
      .delete(`/api/v1/movies/${movie._id}a`)
      .set('Authorization', token)
    await expect(res.statusCode).to.equal(400)
    expect(res.body.msg[0]).contain('Validation Failed')
  })
  it('PUT one /movie/:id that no exist. Status Code 400 and msg', async () => {
    const newMovie = await createMovie()
    const { movie } = newMovie.body
    const res = await api
      .put(`/api/v1/movies/${movie._id}a`)
      .set('Authorization', token)
      .attach('image', 'tests/piratasdelcaribe.jpg')
      .field('title', 'PIRATAS 5')
      .field('dateCreated', '2015-5-14')
      .field('rating', '2')
    expect(res.statusCode).to.equal(400)
    expect(res.body.msg[0]).contain('Validation Failed')
  })
  it('GET one /movie/:id that no exist. Status Code 400 and msg', async () => {
    const newMovie = await createMovie()
    const { movie } = newMovie.body
    const res = await api
      .get(`/api/v1/movies/${movie._id}a`)
      .set('Authorization', token)
    expect(res.statusCode).to.equal(400)
    expect(res.body.msg[0]).contain('Validation Failed')
  })
})
