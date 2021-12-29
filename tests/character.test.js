import { expect } from 'chai'
import request from 'supertest'
import { app, Character } from '../index.js'
const api = request(app)
describe('Characters of World Disney', () => {
  let token
  let id

  before(async () => {
    const deleteAllCharacters = await Character.destroy({ where: {} })
    const response = await api.post('/api/v1/auth/login').send({
      email: 'emailuser@gmail.com',
      password: 'password1'
    })
    token = `Bearer ${response.body.token}`
  })

  const character1 = () => {
    return api
      .post('/api/v1/characters')
      .set('Authorization', token)
      .attach('image', 'tests/Jack.jpg')
      .field('name', 'Jack')
      .field('dateBirth', '2020-11-19T00:00:00.000Z')
      .field('weigth', 90.1)
      .field('history', 'From Australia')
  }
  const character2 = () => {
    return api
      .post('/api/v1/characters')
      .set('Authorization', token)
      .attach('image', 'tests/Jack.jpg')
      .field('name', 'Ocnoor')
      .field('dateBirth', '2020-11-19T00:00:00.000Z')
      .field('weigth', 190.1)
      .field('history', 'The best character of world')
  }

  it('POST one /character', async () => {
    const res = await character1()
    const { character } = res.body
    id = character._id
    expect(res.statusCode).equal(201)
    expect(character.name).to.be.equal('JACK')
    expect(character.dateBirth).equal('2020-11-19T00:00:00.000Z')
    expect(character.weigth).equal(90.1)
  })
  it('PUT one /character/:id', async () => {
    const res = await api
      .put(`/api/v1/characters/${id}`)
      .set('Authorization', token)
      .attach('image', 'tests/Jack.jpg')
      .field('name', 'NEW JACK SPARROW')
      .field('dateBirth', '1990-11-19T00:00:00.000Z')
      .field('weigth', 100)
      .field('history', 'NEW HISTORY OF JACK')
    expect(res.statusCode).equal(201)
  })

  it('GET all /character', async () => {
    const res = await api.get('/api/v1/characters').set('Authorization', token)
    expect(res.statusCode).equal(200)
    expect(res.body).to.have.property('character')
  })
  it('GET one /characters/:id', async () => {
    const res = await api
      .get(`/api/v1/characters/${id}`)
      .set('Authorization', token)

    expect(res.statusCode).equal(200)
    expect(res.body.character.name).to.be.equal('NEW JACK SPARROW')
    expect(res.body.character.history).to.be.equal('NEW HISTORY OF JACK')
    expect(res.body.character.weigth).to.equal(100)
    expect(res.body.character.dateBirth).to.be.equal('1990-11-19T00:00:00.000Z')
  })
  it('DELETE one /characters/:id', async () => {
    const res = await api
      .delete(`/api/v1/characters/${id}`)
      .set('Authorization', token)
    expect(res.statusCode).equal(200)
  })

  // testing for bad request
  it('DELETE one /character/:id that no exist. Status Code 400 and msg', async () => {
    const createCharacter = await character2()
    const { character } = createCharacter.body
    const res = await api
      .delete(`/api/v1/characters/${character._id}a`)
      .set('Authorization', token)
    expect(res.statusCode).to.equal(400)
    expect(res.body.msg[0]).contain('Validation Failed')
  })
  it('PUT one /character/:id that no exist. Status Code 400 and msg', async () => {
    const createCharacter = await character1()
    const { character } = createCharacter.body
    const res = await api
      .put(`/api/v1/characters/${character._id}a`)
      .set('Authorization', token)
      .send({
        name: 'Jack Sparrow',
        weigth: 100,
        history: 'New History of Jack'
      })
    expect(res.statusCode).to.equal(400)
    expect(res.body.msg[0]).contain('Validation Failed')
  })
  it('GET one /character/:id that no exist. Status Code 400 and msg', async () => {
    const createCharacter = await character2()
    const { character } = createCharacter.body
    const res = await api
      .get(`/api/v1/characters/${character._id}a`)
      .set('Authorization', token)
    expect(res.statusCode).to.equal(400)
    expect(res.body.msg[0]).contain('Validation Failed')
  })
})
