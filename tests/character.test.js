import { expect } from 'chai'
import request from 'supertest'
import { app, Character } from '../index.js'
const api = request(app)
describe('Characters of World Disney', () => {
  let token
  let id
  /*  before(async () => {
    const user = await api.post('/api/v1/auth/register').send({
      email: 'ominuka.mauro@gmail.com',
      password: 'password1',
      name: 'Manu',
      username: 'OmiMauro'
    })
  }) */
  before(async () => {
    const deleteAllCharacters = await Character.destroy({ where: {} })
    const response = await api.post('/api/v1/auth/login').send({
      email: 'emailuser@gmail.com',
      password: 'password1'
    })
    token = `Bearer ${response.body.token}`
  })
  after(async () => {
    const getCharacters = await Character.findAll({})
    console.log(getCharacters)
  })
  it('GET all /character', async () => {
    const res = await api.get('/api/v1/characters').set('Authorization', token)
    expect(res.statusCode).equal(200)
    expect(res.body).to.have.property('character')
  })
  it('POST one /character', async () => {
    const res = await api
      .post('/api/v1/characters')
      .set('Authorization', token)
      .attach('image', 'tests/Jack.jpg')
      .field('name', 'Jack')
      .field('dateBirth', '2020-11-19T00:00:00.000Z')
      .field('weigth', 90.1)
      .field('history', 'From Australia')
    const res2 = await api
      .post('/api/v1/characters')
      .set('Authorization', token)
      .attach('image', 'tests/Jack.jpg')
      .field('name', 'Jack')
      .field('dateBirth', '2020-11-19T00:00:00.000Z')
      .field('weigth', 90.1)
      .field('history', 'From Australia')
    const { character } = res.body
    id = character._id
    expect(res.statusCode).equal(201)
    expect(character.name).to.be.equal('Jack')
    expect(character.dateBirth).equal('2020-11-19T00:00:00.000Z')
    expect(character.weigth).equal(90.1)
  })
  it('PUT one /character/:id', async () => {
    const res = await api
      .put(`/api/v1/characters/${id}`)
      .set('Authorization', token)
      .send({
        name: 'Jack Sparrow',
        weigth: 100,
        history: 'New History of Jack',
        dateBirth: '1990-11-19T00:00:00.000Z'
      })
    expect(res.statusCode).equal(201)
  })
  it('GET one /characters/:id', async () => {
    const res = await api
      .get(`/api/v1/characters/${id}`)
      .set('Authorization', token)

    expect(res.statusCode).equal(200)
    expect(res.body.character.name).to.be.equal('Jack Sparrow')
    expect(res.body.character.history).to.be.equal('New History of Jack')
    expect(res.body.character.weigth).to.equal(100)
    expect(res.body.character.dateBirth).to.be.equal('1990-11-19T00:00:00.000Z')
  })
  it('DELETE one /characters/:id', async () => {
    const res = await api
      .delete(`/api/v1/characters/${id}`)
      .set('Authorization', token)
    expect(res.statusCode).equal(200)
  })
})
