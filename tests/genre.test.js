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
  const createGenre = async () => {
    return await api
      .post(url)
      .set('Authorization', token)
      .attach('image', 'tests/documental.jpg')
      .field('name', 'DOCUMENTAL')
  }
  it('#POST One genre, must be return statusCode 201', async () => {
    const res = await createGenre()
    expect(res.statusCode).equal(201)
    expect(res.body.genre.name).to.be.equal('DOCUMENTAL')
    expect(res.body.genre.image).to.not.be.empty
    id = res.body.genre._id
  })
  it('#GET ALL GENRES ', async () => {
    const res = await api.get(url).set('Authorization', token)
    expect(res.statusCode).equal(200)
    expect(res.body).to.have.property('genres')
    expect(res.body.genres).to.be.an('array')
  })
  it('#PUT one genre by id, must be return statusCode 201', async () => {
    const res = await api
      .put(`${url}/${id}`)
      .set('Authorization', token)
      .attach('image', 'tests/documental.jpg')
      .field('name', 'COMEDIA')
    expect(res.statusCode).to.be.equal(201)
  })
  it('#GET one genre by ID, must be return status 200', async () => {
    const res = await api.get(`${url}/${id}`).set('Authorization', token)
    expect(res.statusCode).equal(200)
    expect(res.body.genre.name).to.be.equal('COMEDIA')
    expect(res.body.genre.image).to.not.be.empty
    expect(res.body.genre.image).to.be.an('string')
  })
  it('#DELETE one genre by ID, must be return status 200', async () => {
    const res = await api.delete(`${url}/${id}`).set('Authorization', token)
    expect(res.statusCode).equal(200)
  })

  // testing for bad request
  it('DELETE one /genres/:id that no exist. Status Code 400 and msg with error by bad uuid', async () => {
    const newGenre = await createGenre()
    const { genre } = newGenre.body
    const res = await api
      .delete(`${url}/${genre._id}a`)
      .set('Authorization', token)
    expect(res.statusCode).to.equal(400)
    expect(res.body.msg[0]).contain('Validation Failed')
  })
  it('PUT one /genres/:id that no exist. Status Code 400 and msg with error by bad uuid', async () => {
    const newGenre = await createGenre()
    const { genre } = newGenre.body
    const res = await api
      .put(`${url}/${genre._id}a`)
      .set('Authorization', token)
      .attach('image', 'tests/documental.jpg')
      .field('name', 'CIENCIA FICCION')
    expect(res.statusCode).to.equal(400)
    expect(res.body.msg[0]).contain('Validation Failed')
  })
  it('GET one /genres/:id that no exist. Status Code 400 and msg with error by bad uuid', async () => {
    const newGenre = await createGenre()
    const { genre } = newGenre.body
    const res = await api
      .get(`${url}/${genre._id}a`)
      .set('Authorization', token)
    expect(res.statusCode).to.equal(400)
    expect(res.body.msg[0]).contain('Validation Failed')
  })
})
